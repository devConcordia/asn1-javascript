
import { decodeBase64 } from './core/utils.mjs';

import { tags, labels, lengths } from "./core/constants.mjs";
import { parserBasicEncodingRules } from "./core/BER.mjs";

import OID from "./core/OID.mjs";


/** Asn1
 *	
 *	@ref A Layman's Guide to a Subset of ASN.1, BER, and DER - An RSA Laboratories Technical Note - Burton S. Kaliski Jr.
 *	
 */
export default class Asn1 {

	constructor( data ) {
		
		this.data = data;
		
	}
	
	static FromPEM( data ) {
		
		/// remove header and footer ("-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----")
		data = data.replace( /\-{5}[A-Z\s]+\-{5}/g, '' );
		
		/// remove break lines
		data = data.replace(/[\r\n]/gm,'').trim();
		
		/// decode base64
		data = decodeBase64( data );
		
		return new Asn1( data );
		
	}
	
	/** toJSON
	 *
	 *	@return {Array}
	 */
	toJSON() {

		return parserBasicEncodingRules( this.data, null );

	}
	
	/** toString
	 *	
	 *	@param {Function} formatter			function( tagClass, tagEncode, tagType, length, content, depth ) { ... }
	 *	@return {String}
	 */
	toString( formatter = Asn1.SIMPLE ) {

		return parserBasicEncodingRules( this.data, formatter );

	}

	/** SIMPLE
	 *	
	 *	@param {Number} tagClass 
	 *	@param {Number} tagEncode
	 * 	@param {Number} tagType
	 *	@param {Number} length
	 *  @param {String} content
	 *	@param {Number} depth
	 *	@return {String}
	 */
	static SIMPLE( tagClass, tagEncode, tagType, length, content, depth ) {

		let padding = new Array( depth ).fill('   ').join('');

		let type = ( tagClass == tags.CONTEXT_SPECIFIC )? "["+ tagType +"]" : labels.types[ tagType ];

		if( type === undefined )
			type = 'TYPE_'+ tagType.toString();

		
		if( type == 'OBJECT_IDENTIFIER' )
			content = OID.GetName(content) +' ('+ content +')';
		
		
		if( Array.isArray( content ) ) {

			content = ' ::= {\n'+ content.join('\n') +'\n'+ padding +'}';

		} else {

			type = type.padEnd( 20, ' ') +'\t';

		}
		
		return padding + (tagEncode == tags.PRIMITIVE? '*': '') + type + content;

	}

	/** DETAILS
	 *	
	 *	@param {Number} tagClass 
	 *	@param {Number} tagEncode
	 * 	@param {Number} tagType
	 *	@param {Number} length
	 *  @param {String} content
	 *	@param {Number} depth
	 *	@return {String}
	 */
	static DETAILS( tagClass, tagEncode, tagType, length, content, depth ) {
		
		if( content == null ) content = '*';
		
		let padding = new Array( depth ).fill('   ').join('');

		let type = ( tagClass == tags.CONTEXT_SPECIFIC )? "["+ tagType +"]" : labels.types[ tagType ];

		if( type == 'OBJECT_IDENTIFIER' )
			content = OID.GetName(content) +' ('+ content +')';
		
		let details = " → "+ labels.classes[ tagClass ] +", "+ labels.features[ tagEncode ] +", length("+ length +")";

		if( Array.isArray( content ) ) {

			content = ' ::= {'+ details.padStart(70) +'\n'+ content.join('\n') +'\n'+ padding +'}';

		} else {

			type = type.padEnd( 20 ) +'\t';
			
			content = content.padEnd( 20 ) +'\t'+ details;

		}
		
		return padding + (tagEncode == tags.PRIMITIVE? '*': '') + type + content;

	}

}
