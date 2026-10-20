// SHOPIFY BUY BUTTON: vul deze twee waarden in (je vindt ze in de code die Shopify
// genereert bij "Buy Button maken"; zie README). Zet daarna per product het
// `shopifyId` in src/data/products.ts. Zolang iets leeg is, toont de site een plaatshouder.

export const shopify = {
  domain: '',                 // bv. 'underware.myshopify.com'
  storefrontAccessToken: '',  // bv. '1a2b3c...'
  moneyFormat: '%E2%82%AC%20%7B%7Bamount_with_comma_separator%7D%7D', // € 29,00
};
