
# Asn1

Esse projeto é a implementação em JavaScript de um leitor de dados que seguem a estrutura ASN.1 (Abstract Syntax Notation One).
Por padrão, a leitura segue o formato Basic Encoding Rules (BER).

Os certificados SSL seguem o padrão X.509, que utiliza ASN.1 para definir sua estrutura e normalmente emprega o formato Distinguished Encoding Rules (DER) para codificação.

**Esclarecimento**: DER é um subconjunto estrito de BER.

Na tabela a seguir, é possível identificar as estruturas de dados e as extensões dos arquivos.

| Encoding | Formato  | Extensões                      | Observação                                         |
|----------|----------|--------------------------------|----------------------------------------------------|
| Binary   | DER      | `.der`, `.cer`                 |                                                    |
|          | PKCS#12  | `.pfx`, `.p12`                 | Pode conter chave privada e múltiplos certificados |
| Base64   | PEM      | `.pem`, `.crt`, `.cer`, `.key` | Possuem o cabeçalho `-----BEGIN CERTIFICATE-----`  |
|          | PKCS#7   | `.p7b`, `.p7c`                 | Normalmente usado para cadeias de certificação     |


## Exemplo

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
