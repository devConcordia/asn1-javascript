
import { tags, labels, lengths } from "./constants.mjs";
import { readAsTime, readAsObjectIdentifier, readAsStringHex, readAsBmpString } from "./readers.mjs";


/** parserBasicEncodingRules (BER)
 *
 *	@param {String} data
 *	@param {Function} formatter
 *	@param {Object} flags 					{ {Number} depth, {Boolean} isContextSpecific, {Boolean} isEncapsulates }
 *	@return {Array} or {String}
 */
export function parserBasicEncodingRules( data, formatter = null, flags = new Object ) {

	if( flags.depth == undefined ) flags.depth = 0;
	if( flags.isContextSpecific == undefined ) flags.isContextSpecific = false;
	if( flags.isEncapsulates == undefined ) flags.isEncapsulates = false;

	let output = new Array(),
		index = 0;

	while( index < data.length ) {

		let octet = data.charCodeAt( index );

		let tagClass =  octet >> 6,			///	@ref docs/ASN1.txt 1.1
			tagEncode = ( octet >> 5 ) & 1,	///	@ref docs/ASN1.txt 1.2
			tagType = octet  & 31;		///	@ref docs/ASN1.txt 1.3

		/** For tags with a number greater than or equal to 31,
		 *	the identifier shall comprise a leading octet followed
		 *	by one or more subsequent octets.
		 */
		if( tagType === 31 ) {

			tagType = '';

			do {

				octet = data.charCodeAt( ++index );

				tagType += (octet & 127).toString(2);

			} while( (octet >> 7) === 1 );

			tagType = parseInt( tagType, 2 );

		}

		octet = data.charCodeAt( ++index );

		/// @ref docs/ASN1.md 2.2 and 2.3
		let length = 127 & octet;

		/** 
		 *	In the long form, the length octets shall
		 *	consist of an initial octet and one or
		 *	more subsequent octets
		 *
		 *	@ref docs/ASN1.md 2.1
		 */
		if( ( octet >> 7 ) === lengths.LONG ) {

			let until = index + length;

			length = '';

			while( index < until ) {

				length = ( length * 256 ) + data.charCodeAt( ++index );

			}

			if( isNaN( length ) ) return null

		}
		
		///
		let content = data.slice( ++index, index + length );

		if( tagClass === tags.UNIVERSAL ) {

			if( tagEncode === tags.CONSTRUCTED && !flags.isContextSpecific && !flags.isEncapsulates ) {

				content = parserBasicEncodingRules( content, formatter, { depth: flags.depth+1 } );

			} else {

				switch( tagType ) {

					case tags.END_OF_CONTENT:
					case tags.NULL:
					case tags.UTF8_STRING:
					case tags.NUMERIC_STRING:
					case tags.PRINTABLE_STRING:
					case tags.T61_STRING:
					case tags.IA5_STRING:
					case tags.VISIBLE_STRING:
							/// do nothing
						break;

					case tags.BOOLEAN:
							content = content[0] == 1;
						break;

					case tags.INTEGER:
					case tags.ENUMERATED:
					case tags.BIT_STRING:
					case tags.RELATIVE_OID:
							content = readAsStringHex( content );
						break;

					case tags.OBJECT_IDENTIFIER:
							content = readAsObjectIdentifier( content );
						break;

					case tags.OCTET_STRING:

							if( !flags.isContextSpecific ) {
								if( flags.isEncapsulates ) {
						
									content = readAsStringHex( content );
						
								} else {
						
									content = parserBasicEncodingRules( content, formatter, { isEncapsulates: true, depth: flags.depth+1 } );
						
								}
							}

						break;

					case tags.EXTERNAL:
					case tags.SEQUENCE:
					case tags.SET:
							content = parserBasicEncodingRules( content, formatter, { depth: flags.depth+1 } );
						break;

					case tags.UTC_TIME:
							content = readAsTime( content, 'short' );
						break;

					case tags.GENERALIZED_TIME:
							content = readAsTime( content );
						break;

					case tags.BMP_STRING:
							content = readAsBmpString( content );
						break;
					
					case tags.CHARACTER_STRING:
					case tags.EMBEDDED_PDV:
					case tags.GRAPHIC_STRING:
					case tags.GENERAL_STRING:
					case tags.OBJECT_DESCRIPTOR:
					case tags.REAL:
					case tags.VIDEO_TEXT_STRING:
					case tags.UNIVERSAL_STRING:
					default:
							content = "Asn1.js can\'t read "+ (_types[ tagType ] || tagType );
						break;
				}

			}

		} else if( tagClass === tags.CONTEXT_SPECIFIC ) {

			if( tagEncode === tags.CONSTRUCTED ) {

				content = parserBasicEncodingRules( content, formatter, { 
					depth: flags.depth+1, 
					isContextSpecific: true 
				});

			} else {
		
				if( tagType === tags.END_OF_CONTENT )
					content = readAsStringHex( content.slice() );
				
			}

		} else {

			content = readAsStringHex( content );

		}

		if( typeof formatter == 'function' ) {

			if( content instanceof Date ) content = content.toLocaleString();
			if( typeof content == 'boolean' ) content = content? 'true' : 'false';

			output.push( formatter( tagClass, tagEncode, tagType, length, content, flags.depth ) );

		} else {

			output.push( content );

		}

		index += length;

	}

	return output;

}
