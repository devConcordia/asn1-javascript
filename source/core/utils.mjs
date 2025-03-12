
let decodeBase64 = null;

if( typeof window == 'undefined' ) {
	
	/// running in node.js
	decodeBase64 = function( input ) {
		
		return Buffer.from( input, 'base64').toString();
		
	}
	
} else {
	
	/// running in browser
	decodeBase64 = atob;
	
}

export { decodeBase64 }
