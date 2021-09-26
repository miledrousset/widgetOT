/**
 * <b>requestsRequiredData</b> parameters required for api search requests <br>
 * <b>using_proxy</b> if true, proxy_url should be defined <br>
 * <b>api</b>  base api search url <br>
 * <b>proxy_url</b> string,  proxy url to bypass CORS response <br>
 * <b>details_url</b> string base api for selected entity details <br>
 * @type {{requestsRequiredData: {fbclid: string, lang: string, theso: string},using_proxy: boolean, api: string,proxy_url: string, details_url: string}}
 */
var configurationData = {
    api: "https://frollo.notre-dame.science/opentheso/api/searchwidget",
    api_empty_field:"https://frollo.notre-dame.science/opentheso/api/topterm?theso=th13&lang=fr",
    sub_category_url:"https://frollo.notre-dame.science/opentheso/api/narrower",
    using_proxy: true,
    proxy_url: "https://cors-anywhere.herokuapp.com/",
    details_url: "https://frollo.notre-dame.science/opentheso/api",
    theso: 'th13',
    requestsRequiredData: {
        lang: 'fr',
        theso: 'th13',
        fbclid: 'IwAR0Le2NbvvhCGoW0lewV6FULx8DYJ6UuhahuOo6IoapnDeUvGNUZ--i0J20'
    },
  

};
