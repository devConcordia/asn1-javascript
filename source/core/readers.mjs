
/** readAsUtcTime
 *	
 *	Type short
 *	@ref https://tools.ietf.org/html/rfc5280#section-4.1.2.5.1
 *
 *	@param {Array} input
 *	@return {Date}
 */
export function readAsTime( input, type ) {

	if( type == 'short' )
		input = (( parseInt( input.slice( 0, 2 ) ) > 50 )? '19' : '20' ) + input;

	let date = input.split('');

	date.splice( 4, 0, '-' );
	date.splice( 7, 0, '-' );
	date.splice( 10, 0, 'T' );
	date.splice( 13, 0, ':' );
	date.splice( 16, 0, ':' );

	return new Date( date.join('') )

}

/** readAsObjectIdentifier
 *
 *	@param {Array} input
 *	@return {String}
 */
export function readAsObjectIdentifier( input ) {

	let output = Math.floor( input.charCodeAt(0)/40 ) +'.'+ (input.charCodeAt(0) % 40),
		value = 0;

	for( let i = 1; i < input.length; i++ ) {

		value <<= 7;
		value |= input.charCodeAt(i) & 127;

		if( ~input.charCodeAt(i) & 128 ) {

			output += '.'+ value;
			value = 0;

		}

	}

	return output

};

/** readAsStringHex
 *
 *	@param {Array} input
 *	@return {String}
 */
export function readAsStringHex( input ) {

	let output = '';

	for( let code of input )
		output += ( '00' + code.charCodeAt(0).toString(16) ).slice( -2 );

	return output

}

/** readAsBmpString
 *
 *	@ref https://en.wikipedia.org/wiki/Universal_Coded_Character_Set
 *
 *	@param {Array} input
 *	@return {String}
 */
export function readAsBmpString( input ) {

	let output = '',
		i = 0;

	while( i < input.length )
		output += String.fromCharCode( input.charCodeAt( i++ ) + (input.charCodeAt( i++ ) || 0) );

	return output

}

