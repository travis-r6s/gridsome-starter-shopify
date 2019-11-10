<template>
  <Layout>
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <h3 class="title">
            Products
          </h3>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns is-multiline">
        <div
          v-for="({ node: product }) in $page.shopify.products.edges"
          :key="product.id"
          class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  :src="product.images.edges[0].node.src"
                  :alt="product.images.edges[0].node.altText || product.title">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">
                    {{ product.title }}
                  </p>
                  <p class="subtitle is-6">
                    {{ formatCurrency(product.priceRange.minVariantPrice) }}
                  </p>
                </div>
              </div>

              <div
                v-html="product.descriptionHtml"
                class="content" />
              <div class="field is-grouped is-grouped-right">
                <div class="control">
                  <g-link
                    :to="`products/${product.handle}`"
                    class="button is-primary is-outlined">
                    View Product
                  </g-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ShopifyProducts {
  shopify {
    products (first: 30) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          priceRange {
            minVariantPrice {
              currencyCode
              amount
            }
          }
          images (first: 1) {
            edges {
              node {
                id
                altText
                src: transformedSrc (maxWidth: 400, maxHeight: 300, crop: CENTER)
              }
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Come, shop!'
  },
  methods: {
    formatCurrency ({ currencyCode, amount }) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currencyCode }).format(amount)
    }
  }
}
</script>
