// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    addCollection({ typeName: 'Product' })
    addCollection({ typeName: 'Collection' })
  })

  // Add products
  api.createPages(async ({ graphql, createPage }) => {
    let hasNextPage = false
    let queryCursor = ''
    const queryParameters = {}

    do {
      if (queryCursor) {
        queryParameters.cursor = queryCursor
      }

      const { data } = await graphql(`
        query($cursor: String) {
          shopify {
            products(first: 250, after: $cursor) {
              pageInfo {
                hasNextPage,
                hasPreviousPage
              }
              edges {
                cursor,
                node {
                  id,
                  title,
                  handle
                }
              }
            }
          }
        }
      `, queryParameters)

      data.shopify.products.edges.forEach(({ node, cursor }) => {
        // TODO: Attach these as a ContentType, instead of creating new pages
        createPage({
          path: `/products/${node.handle}`,
          component: './src/templates/Product.vue',
          context: {
            id: node.id,
            path: node.handle,
            handle: node.handle,
            title: node.title
          }
        })

        hasNextPage = data.shopify.products.pageInfo.hasNextPage
        queryCursor = cursor
      })
    }
    while (hasNextPage)
  })
  api.createPages(async ({ graphql, createPage }) => {
    let hasNextPage = false
    let queryCursor = ''
    const queryParameters = {}

    do {
      if (queryCursor) {
        queryParameters.cursor = queryCursor
      }

      const { data } = await graphql(`
        query($cursor: String) {
          shopify {
            collections(first: 250, after: $cursor) {
              pageInfo {
                hasNextPage,
                hasPreviousPage
              }
              edges {
                cursor,
                node {
                  id,
                  title,
                  handle
                }
              }
            }
          }
        }
      `, queryParameters)

      data.shopify.collections.edges.forEach(({ node, cursor }) => {
        // TODO: Attach these as a ContentType, instead of creating new pages
        createPage({
          path: `/collection/${node.handle}`,
          component: './src/templates/Collection.vue',
          context: {
            id: node.id,
            path: node.handle,
            handle: node.handle,
            title: node.title
          }
        })

        hasNextPage = data.shopify.collections.pageInfo.hasNextPage
        queryCursor = cursor
      })
    }
    while (hasNextPage)
  })
}
