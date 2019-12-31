module.exports = {
  siteName: 'Gridsome + Shopify 😍',
  templates: {
    ShopifyProduct: [
      {
        path: '/product/:handle',
        component: './src/templates/Product.vue'
      }
    ],
    ShopifyCollection: [
      {
        path: '/collection/:handle',
        component: './src/templates/Collection.vue'
      }
    ]
  },
  plugins: [
    {
      use: 'gridsome-source-shopify',
      options: {
        storeName: process.env.GRIDSOME_SHOPIFY_STOREFRONT,
        storefrontToken: process.env.GRIDSOME_SHOPIFY_STOREFRONT_TOKEN
      }
    },
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        flexsearch: {
          profile: 'match'
        },
        collections: [
          {
            typeName: 'ShopifyProduct',
            indexName: 'Product',
            fields: ['title', 'handle', 'description', 'tags']
          },
          {
            typeName: 'ShopifyCollection',
            indexName: 'Collection',
            fields: ['title', 'handle', 'description']
          }
        ],
        searchFields: ['title', 'handle', 'tags']
      }
    }
  ]
}
