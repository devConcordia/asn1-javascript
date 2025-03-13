
# Asn1 File Reader

Esse projeto é um leitor de arquivos ASN.1 (Abstract Syntax Notation One).

### Example

Para ler um certificado em formato PEM:

```javascript

let asn1 = Asn1.FromPEM( pemCertificate );
					
console.log( asn1.toString() );

```

### Resultado

```
SEQUENCE ::= {
   SEQUENCE ::= {
      [0] ::= {
         *INTEGER             	02
      }
      *INTEGER             	50be89c80de683fc
      SEQUENCE ::= {
         *OBJECT_IDENTIFIER   	sha256WithRSAEncryption (1.2.840.113549.1.1.11)
         *NULL                	
      }
      SEQUENCE ::= {
         SET ::= {
            SEQUENCE ::= {
               *OBJECT_IDENTIFIER   	countryName (2.5.4.6)
               *PRINTABLE_STRING    	US
            }
         }
         SET ::= {
            SEQUENCE ::= {
               *OBJECT_IDENTIFIER   	organizationName (2.5.4.10)
               *PRINTABLE_STRING    	Google Trust Services
            }
         }
         SET ::= {
            SEQUENCE ::= {
               *OBJECT_IDENTIFIER   	commonName (2.5.4.3)
               *PRINTABLE_STRING    	Google Internet Authority G3
            }
         }
      }
...
```
