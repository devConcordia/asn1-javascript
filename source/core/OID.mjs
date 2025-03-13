
/** OID
 *	
 */
export default class OID {
	
	static GetName( id ) {
		
		let nodes = id.split(".");
		
		let target = oids;
		
		for( let n of nodes ) {
			
			if( !(n in target) ) 
				return '';
			
			target = target[n];
			
		}
		
		return target.N;
		
	}
	
}

/// some OIDS
const oids = {
	"1": {
		"2": {
			"840": {
				"10045": {
					"2": {
						"1": {
							"N": "ecPublicKey"
						}
					},
					"3": {
						"1": {
							"7": {
								"N": "prime256v1"
							}
						}
					}
				},
				"113549": {
					"1": {
						"1": {
							"1": {
								"N": "rsaEncryption"
							},
							"4": {
								"N": "md5WithRSAEncryption"
							},
							"11": {
								"N": "sha256WithRSAEncryption"
							},
							"13": {
								"N": "sha512WithRSAEncryption"
							}
						},
						"7": {
							"1": {
								"N": "id_data"
							},
							"2": {
								"N": "signedData"
							}
						},
						"9": {
							"1": {
								"N": "emailAddress"
							},
							"3": {
								"N": "contentType"
							},
							"4": {
								"N": "id_messageDigest"
							},
							"5": {
								"N": "signingTime"
							},
							"16": {
								"2": {
									"47": {
										"N": "id_aa_signingCertificateV2"
									}
								}
							}
						}
					}
				},
				"113583": {
					"1": {
						"1": {
							"8": {
								"N": "revocationInfoArchival"
							}
						}
					}
				}
			}
		},
		"3": {
			"6": {
				"1": {
					"5": {
						"5": {
							"7": {
								"1": {
									"1": {
										"N": "authorityInfoAccess"
									}
								},
								"2": {
									"1": {
										"N": "cps"
									}
								},
								"3": {
									"1": {
										"N": "idKpServerAuth"
									},
									"2": {
										"N": "id_kp_clientAuth"
									},
									"4": {
										"N": "id_kp_emailProtection"
									}
								},
								"48": {
									"1": {
										"1": {
											"N": "id_pkix_ocsp_basic"
										},
										"N": "idSdOcsp"
									},
									"2": {
										"N": "caIssuers"
									}
								}
							}
						}
					}
				}
			}
		}
	},
	"2": {
		"5": {
			"4": {
				"3": {
					"N": "commonName"
				},
				"4": {
					"N": "surname"
				},
				"5": {
					"N": "serialNumber"
				},
				"6": {
					"N": "countryName"
				},
				"7": {
					"N": "localityName"
				},
				"8": {
					"N": "stateOrProvinceName"
				},
				"9": {
					"N": "streetAddress"
				},
				"10": {
					"N": "organizationName"
				},
				"11": {
					"N": "organizationalUnitName"
				},
				"12": {
					"N": "title"
				},
				"13": {
					"N": "description"
				},
				"14": {
					"N": "searchGuide"
				},
				"15": {
					"N": "businessCategory"
				},
				"16": {
					"N": "postalAddress"
				},
				"17": {
					"N": "postalCode"
				},
				"20": {
					"N": "telephoneNumber"
				},
				"35": {
					"N": "userPassword"
				}
			},
			"29": {
				"14": {
					"N": "subjectKeyIdentifier"
				},
				"15": {
					"N": "keyUsage"
				},
				"17": {
					"N": "subjectAltName"
				},
				"19": {
					"N": "basicConstraints"
				},
				"20": {
					"N": "cRLNumber"
				},
				"21": {
					"N": "reasonCode"
				},
				"31": {
					"N": "cRLDistributionPoints"
				},
				"32": {
					"N": "certificatePolicies"
				},
				"35": {
					"N": "authorityKeyIdentifier"
				},
				"37": {
					"N": "extKeyUsage"
				}
			}
		},
		"16": {
			"76": {
				"1": {
					"1": {
						"0": {
							"N": "raiz"
						},
						"3": {
							"N": "serasa_acp"
						}
					},
					"3": {
						"2": {
							"N": "nome_pj"
						},
						"3": {
							"N": "cnpj"
						},
						"4": {
							"N": "dados_pj"
						},
						"7": {
							"N": "cei_pj"
						}
					}
				}
			},
			"840": {
				"1": {
					"101": {
						"3": {
							"4": {
								"2": {
									"1": {
										"N": "sha256"
									}
								}
							}
						}
					}
				}
			}
		},
		"23": {
			"42": {
				"2": {
					"7": {
						"11": {
							"N": "accountNumber_11"
						}
					}
				}
			},
			"140": {
				"1": {
					"2": {
						"1": {
							"N": "domainValidated"
						},
						"2": {
							"N": "organizationValidated"
						}
					}
				}
			}
		}
	}
};