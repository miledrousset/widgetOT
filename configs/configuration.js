/**
 * <b>requestsRequiredData</b> parameters required for api search requests <br>
 * <b>using_proxy</b> if true, proxy_url should be defined <br>
 * <b>api</b>  base api search url <br>
 * <b>proxy_url</b> string,  proxy url to bypass CORS response <br>
 * <b>details_url</b> string base api for selected entity details <br>
 * @type {{requestsRequiredData: {fbclid: string, lang: string, theso: string},using_proxy: boolean, api: string,proxy_url: string, details_url: string}}
 */
var configurationData = {
    using_proxy: false,
    proxy_url: "https://cors-anywhere.herokuapp.com/",
    
//    api: "https://frollo.notre-dame.science/opentheso/api/searchwidget",
//    api_empty_field:"https://frollo.notre-dame.science/opentheso/api/topterm?theso=th13&lang=fr",
//    sub_category_url:"https://frollo.notre-dame.science/opentheso/api/narrower",      
//    details_url: "https://frollo.notre-dame.science/opentheso/api",
//    theso: 'th13',

    api: "https://pactols2.frantiq.fr/pactols2/api/searchwidget",
    api_empty_field:"https://pactols2.frantiq.fr/pactols2/api/topterm?theso=TH_1&lang=ar",
    sub_category_url:"https://pactols2.frantiq.fr/pactols2/api/narrower",  
    details_url: "https://pactols2.frantiq.fr/pactols2/api",  
    theso: 'TH_1',
    lang: 'ar',
    
    requestsRequiredData: {
        lang: 'ar',
      //  theso: 'th13',
        theso: 'TH_1',
        fbclid: 'IwAR0Le2NbvvhCGoW0lewV6FULx8DYJ6UuhahuOo6IoapnDeUvGNUZ--i0J20'
    },
  

};
