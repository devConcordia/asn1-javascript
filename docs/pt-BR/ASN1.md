
ASN1

	@ref https://en.wikipedia.org/wiki/X.690
	@ref docs/ASN1 Encoding Rules - ITUT.pdf
	
	1. Encoding of class of tag (identifier octets) {
		
		Um byte é utilizado para representa as informações de class (C), 
		codificação (E) e tipo (T).
		
		Sua estrutura é CCETTTTT.
		
		1.1. Tag Class {
			
			Os primeiros dois bits representam a classe da tag.
			
				00000000
				↑↑
			   class
				
							   Dec	  Binary
			UNIVERSAL			0 		00
			APPLICATION 		1 		01 
			CONTEXT_SPECIFIC	2 		10 
			PRIVATE				3 		11
		
		}
		
		1.2. Tag Encode	{
			
			O terceiro bit indica qual é a caracteristica do conteudo.
			
				00000000
				  ↑
				encoding
			
			PRIMITIVE 		0
			CONSTRUCTED 	1

		}
		
		1.3. Tag Types {
		
			Os ultimos 5 bits indicam o tipo.
			
				00000000
				   ↑↑↑↑↑
				   type
			
									   Dec		Binary
			End-of-Content (EOC)		0		00000
			BOOLEAN						1		00001
			INTEGER						2		00010
			BIT STRING					3		00011
			OCTET STRING				4		00100
			NULL						5		00101
			OBJECT IDENTIFIER			6		00110
			Object Descriptor			7		00111
			EXTERNAL					8		01000
			REAL (float)				9		01001
			ENUMERATED					10		01010
			EMBEDDED PDV				11		01011
			UTF8String					12		01100
			RELATIVE-OID				13		01101
			Reserved					14		01110
			Reserved					15		01111
			SEQUENCE and SEQUENCE OF	16		10000
			SET and SET OF				17		10001
			NumericString				18		10010
			PrintableString				19		10011
			T61String					20		10100
			VideotexString				21		10101
			IA5String					22		10110
			UTCTime						23		10111
			GeneralizedTime				24		11000
			GraphicString				25		11001
			VisibleString				26		11010
			GeneralString				27		11011
			UniversalString				28		11100
			CHARACTER STRING			29		11101
			BMPString					30		11110
			
		}
		
		1.4 Number Tag Types > 30 (high tag number) {
			
			@ref docs/ASN1 Encoding Rules - ITUT.pdf → 8.1.2
			
			Quando 5 bits não for suficiente para declara a Number Tag Type,
			o primeiro byte será CCE11111 e será utilizado os bytes 
			seguidos.
			
			Todos os bytes que irão identificar o Number Tag Type deverão 
			iniciar com 1, com exceção do ultimo byte.
			
										 Ultimo byte
											  ↓
				CCE11111 1aaaaaaa 1bbbbbbb 0ccccccc
							 ↑
						not be zero
			
			Number Tag Type = aaaaaaa + bbbbbbb + ccccccc
			
			Exemplo:
				
				01011111 10000010 00001110
					
					Number Tag Type = 10000010 + 00001110 -> 111000100 = 46
				
		}
		
	}
	
	2. Length {
		
		Um byte é utilizado para representar o tamanho
		do conteudo aramazenado em bytes.
		
		2.1. Definite {
		
			O primeiro bit define se é Short (0) ou Long (1).
			
				00000000
				↑
			 Definite
		
		}
		
		2.2. Short {
		
			Short (0) indica que os 7 bits são suficiente para expressar 
			o tamanho do conteudo - que será entre 0 ~ 127 bytes.
			
				Examplos:
					
					• 00111001, o tamnho é 57 bytes;
					• 01111111, o tamnho é 127 bytes;
				
		}
		
		2.3. Long {
		
			Long (1) indica que os 7 bits não são suficiente para expressar o tamanho do conteudo.
			Nesse caso os ultimos 7 bits irão indicar quantos bytes seguintes serão utilizados
			para expressar o tamnho do contudo.
			
				Examplos:
					
					• 10000001 11110011, o tamanho é 243 bytes;
					• 10000010 00000001 10110011, o tamanho é 435 bytes;
		
		}
		
		2.4. Tabela {
		
			Definite short	0	nnnnnnn 	o tamanho max é de 127 bytes
			Indefinite		1	0000000
			Definite long	1	nnnnnnn 	max de 126 octetos para representar o tamanho
			Reserved		1	1111111
		
		}
		
	}
		
	3. Content {
		
	}
	
	
	
	
JSON
	
	[
		[
			String,						version
   			String,						numero de serie
			[
			  OID,						algoritimo de assinatura
			  String					null
			],
			[							emissor
				[
					OID,
					String
				],
				...
			],
			[
				Date,					inicio
				Date,					fim
			],
			[							receptor
				[
					OID,
					String
				],
				...
			],
			[
				[
					OID,				algoritimo
					OID
				],
				String					chave publica
			],
			...
		],
		[
			OID,						algoritimo de assinatura
			String                      null
		],
		String
	]
	