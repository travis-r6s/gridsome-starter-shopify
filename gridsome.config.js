module.exports = {
  siteName: 'Gridsome + Shopify 😍',
  plugins: [
    {
      use: '@gridsome/source-graphql',
      options: {
        url: `https://${process.env.GRIDSOME_SHOPIFY_STOREFRONT}.myshopify.com/api/2019-07/graphql.json`,
        fieldName: 'shopify',
        typeName: 'shopifyTypes',
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.GRIDSOME_SHOPIFY_STOREFRONT_TOKEN
        }
      }
    }
  ]
}
