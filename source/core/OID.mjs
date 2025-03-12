
/** OID
 *	
 *	@ref http://oid-info.com/index.htm
 *	
 */
export default class OID {
	
	static Get( id ) {
		
		for( let key in OID ) {
			
			let target = OID[ key ]
			
			if( typeof target == 'string' ) {
				
				if( target == id ) return key;
				
			} else {
				
				if( target.includes(id) ) return key;
				
			}
			
		}
		
		return 'not found';
		
	}
	
	static ecPublicKey = 						'1.2.840.10045.2.1';
	static prime256v1 = 						'1.2.840.10045.3.1.7';
	
	static rsaEncryption = 						'1.2.840.113549.1.1.1';
	static md5WithRSAEncryption = 				'1.2.840.113549.1.1.4';
	
	static sha256WithRSAEncryption = 			'1.2.840.113549.1.1.11';
	static sha512WithRSAEncryption = 			'1.2.840.113549.1.1.13';
	
	static emailAddress = 						'1.2.840.113549.1.9.1';
	static contentType = 						'1.2.840.113549.1.9.3';
	static id_messageDigest = 					'1.2.840.113549.1.9.4';
	static id_aa_signingCertificateV2 = 		'1.2.840.113549.1.9.16.2.47';
	
	static id_data = 							'1.2.840.113549.1.7.1';
	static signedData = 						'1.2.840.113549.1.7.2';
	static signingTime = 						'1.2.840.113549.1.9.5';
	
	static revocationInfoArchival = 			'1.2.840.113583.1.1.8';
	
	
	static authorityInfoAccess = 				'1.3.6.1.5.5.7.1.1';
	
	static cps = 								'1.3.6.1.5.5.7.2.1';
	
	static idKpServerAuth = 					'1.3.6.1.5.5.7.3.1';
	static id_kp_clientAuth = 					'1.3.6.1.5.5.7.3.2';
	static id_kp_emailProtection = 				'1.3.6.1.5.5.7.3.4';
	
	static idSdOcsp = 							'1.3.6.1.5.5.7.48.1';
	static id_pkix_ocsp_basic = 				'1.3.6.1.5.5.7.48.1.1';
	static caIssuers = 							'1.3.6.1.5.5.7.48.2';
	
	
	static sha256 = 							'2.16.840.1.101.3.4.2.1';
	
	static commonName = 						'2.5.4.3';
	static surname = 							'2.5.4.4';
	
	static serialNumber =						'2.5.4.5';
			
	static countryName = 						'2.5.4.6';
	static localityName = 						'2.5.4.7';
	static stateOrProvinceName = 				'2.5.4.8';
	static streetAddress = 						'2.5.4.9';
	static organizationName = 					'2.5.4.10';
	static organizationalUnitName = 			'2.5.4.11';
			
	static title = 								'2.5.4.12';
	static description = 						'2.5.4.13';
	static searchGuide = 						'2.5.4.14';
	static businessCategory = 					'2.5.4.15';
	static postalAddress = 						'2.5.4.16';
	static postalCode = 						'2.5.4.17';
	static telephoneNumber = 					'2.5.4.20';
	static userPassword = 						'2.5.4.35';
			
	static subjectKeyIdentifier = 				'2.5.29.14';
	static keyUsage = 							'2.5.29.15';
	static subjectAltName = 					'2.5.29.17';
	static basicConstraints = 					'2.5.29.19';
	static cRLNumber = 							'2.5.29.20';
	static reasonCode =							'2.5.29.21';
	static cRLDistributionPoints = 				'2.5.29.31';
	static certificatePolicies = 				'2.5.29.32';
	static authorityKeyIdentifier =				'2.5.29.35';
	static extKeyUsage = 						'2.5.29.37';
	
	/// Infraestrutura de Chaves Públicas Brasileira 
	/// ATRIBUIÇÃO DE OID NA ICP-BRASIL (DOC-ICP-04.01)
	static raiz = 								'2.16.76.1.1.0';
	static serasa_acp = 						'2.16.76.1.1.3';
	
	static serasa_cd = [
												'2.16.76.1.2.1.6',
												'2.16.76.1.2.2.1',
												'2.16.76.1.2.3.3',
												'2.16.76.1.2.4.1',
												'2.16.76.1.2.101.1',
												'2.16.76.1.2.102.1',
												'2.16.76.1.2.103.1',
												'2.16.76.1.2.104.1',
												'2.16.76.1.2.304.2',
												'2.16.76.1.2.303.2'
	];

	static dados_pj = 							'2.16.76.1.3.4';
	static nome_pj = 							'2.16.76.1.3.2';
	static cnpj = 								'2.16.76.1.3.3';
	static cei_pj = 							'2.16.76.1.3.7';
	
	static accountNumber_11 = 					'2.23.42.2.7.11';
	
	static domainValidated = 					'2.23.140.1.2.1';
	static organizationValidated = 				'2.23.140.1.2.2';
	
}