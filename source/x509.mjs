
import Asn1 from './Asn1.mjs';

/** indexedFields
 *	
 */
function indexedFields( array ) {

	let output = new Object;

	for( let subarray of array ) {

		let key = subarray[0],
			field = output[ key ];

		if( field ) {

			field.push( subarray[1] );

		} else {

			output[ key ] = new Array( subarray[1] );

		}

	}

	return output

}

/** x509
 *
 */
export default class x509 extends Asn1 {

	constructor( input ) {

		super( input );

		let asn = this.toJSON();

		let version = null,
			serial = null,
			encryption = null,
			validate = new Object,
			emitter = new Object,
			claimant = new Object,
			publicKey = new Object,
			extensions = new Object;

		let fields = asn[0];
		
		for( let i = 0; i < fields.length; i++ ) {

			if( fields[i][0] instanceof Date ) {

				version = fields[ i-4 ] || 0;
				serial = fields[ i-3 ] || 0;
				encryption = fields[ i-2 ];

				emitter = indexedFields( fields[ i-1 ] );

				validate.start = fields[i][0];
				validate.end = fields[i][1];

				claimant = indexedFields( fields[ i+1 ] );

				publicKey.algorithm = fields[ i+2 ][0];
				publicKey.data = fields[ i+2 ][1];

				extensions = indexedFields( fields[ i+3 ] || []);

				break;

			}

		}

		Object.assign( this, {
			version,
			serial,
			encryption,
			emitter,
			validate,
			claimant,
			publicKey,
			extensions
		});

	}

}
