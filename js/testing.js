/*
let data = {
    "https://ark.frantiq.fr/ark:/26678/pcrtSpZKiFuqSw" : {
        "http://purl.org/dc/terms/created" : [
            {
                "value" : "2007-02-08",
                "type" : "literal",
                "datatype" : "http://www.w3.org/2001/XMLSchema#date"
            }
        ],
        "http://purl.org/dc/terms/description" : [
            {
                "value" : "14767",
                "type" : "literal",
                "datatype" : "http://www.w3.org/2001/XMLSchema#string"
            }
        ],
        "http://purl.org/dc/terms/identifier" : [
            {
                "value" : "14767",
                "type" : "literal",
                "datatype" : "http://www.w3.org/2001/XMLSchema#string"
            }
        ],
        "http://purl.org/dc/terms/modified" : [
            {
                "value" : "2014-06-17",
                "type" : "literal",
                "datatype" : "http://www.w3.org/2001/XMLSchema#date"
            }
        ],
        "http://purl.org/umu/uneskos#memberOf" : [
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtnbDLi2FkAj",
                "type" : "uri"
            }
        ],
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" : [
            {
                "value" : "http://www.w3.org/2004/02/skos/core#Concept",
                "type" : "uri"
            }
        ],
        "http://www.w3.org/2004/02/skos/core#altLabel" : [
            {
                "value" : "plante",
                "type" : "literal",
                "lang" : "fr"
            }
        ],
        "http://www.w3.org/2004/02/skos/core#inScheme" : [
            {
                "value" : "https://ark.frantiq.fr/ark:/TH_1",
                "type" : "uri"
            }
        ],
        "http://www.w3.org/2004/02/skos/core#narrower" : [
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/crtZpQkNsYe6b",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrt8SU11vZSLn",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtATL3ZnpSP5",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtNQhoS8U7Ve",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtP3aHTZILi9",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtPpPoKulDjv",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtRwq6H6iDlg",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtS6BRsTOPnY",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtrbx1Opdxf4",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtxu8i90ticA",
                "type" : "uri"
            }
        ],
        "http://www.w3.org/2004/02/skos/core#prefLabel" : [
            {
                "value" : "نباتات",
                "type" : "literal",
                "lang" : "ar"
            },
            {
                "value" : "Flora",
                "type" : "literal",
                "lang" : "de"
            },
            {
                "value" : "flora",
                "type" : "literal",
                "lang" : "en"
            },
            {
                "value" : "flora",
                "type" : "literal",
                "lang" : "es"
            },
            {
                "value" : "flore",
                "type" : "literal",
                "lang" : "fr"
            },
            {
                "value" : "mondo vegetale",
                "type" : "literal",
                "lang" : "it"
            },
            {
                "value" : "flora",
                "type" : "literal",
                "lang" : "nl"
            }
        ],
        "http://www.w3.org/2004/02/skos/core#related" : [
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtAwa0oj0foK",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtBDFoDRAo75",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtL0KNvdoXv0",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtLnVNH2ynJc",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtMY50Z2K4Fh",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtfM38kDsAdt",
                "type" : "uri"
            },
            {
                "value" : "https://ark.frantiq.fr/ark:/26678/pcrtvw7qwGBX9r",
                "type" : "uri"
            }
        ]
    }
};

render2ViewElements(data, [
    {searchedKey: 'identifier', dataType: 'string', searchedValue: 'value', titleToDisplay:'Identificateur'},
    {searchedKey: 'description', dataType: 'string', searchedValue: 'value', titleToDisplay:'Description'},
    {searchedKey: 'created', dataType: 'date', searchedValue: 'value', titleToDisplay:'Date de création'},
    {searchedKey: 'modified', dataType: 'date', searchedValue: 'value', titleToDisplay:'Date de modification'},
    {searchedKey: 'altLabel', dataType: 'string', searchedValue: 'value', withLang: true, titleToDisplay:'AltLabel'},
    {searchedKey: 'prefLabel', dataType: 'array', searchedValue: 'value', withLang: true, titleToDisplay:'PrefLabel'},
    {searchedKey: 'inScheme', dataType: 'string', searchedValue: 'value', titleToDisplay:'InScheme'},
    {searchedKey: 'memberOf', dataType: 'string', searchedValue: 'value', titleToDisplay:'Membre à'},
    {searchedKey: 'narrower', dataType: 'array', searchedValue: 'value', titleToDisplay:'Limité'},
    {searchedKey: 'related', dataType: 'array', searchedValue: 'value', titleToDisplay:'Relatif'},
]);
*/
