<template>
  <Layout>
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <figure class="image">
            <img
              :src="product.images.edges[0].node.src"
              :alt="product.images.edges[0].node.altText || product.title">
          </figure>
          <br>
          <div class="columns">
            <div
              v-for="({ node: image }) in product.images.edges"
              :key="image.id"
              class="column is-3">
              <figure class="image is-4by3">
                <img
                  :src="image.thumbnail"
                  :alt="image.altText || product.title">
              </figure>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <h3 class="title">
            {{ product.title }}
          </h3>
          <h5 class="subtitle">
            {{ formatCurrency(variant.priceV2) }}
          </h5>
          <div
            v-html="product.descriptionHtml"
            class="content" />
          <div class="field is-grouped is-grouped-left">
            <div class="control">
              <button class="button is-primary">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: this.$page.shopify.product.title
    }
  },
  computed: {
    product () { return this.$page.shopify.product },
    variant () { return this.product.variants.edges[ 0 ].node }
  },
  methods: {
    formatCurrency ({ currencyCode, amount }) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currencyCode }).format(amount)
    }
  }
}
</script>

<page-query>
query Product ($handle: String!) {
  shopify {
    product: productByHandle(handle: $handle) {
      id
      descriptionHtml
      title
      tags
      images(first: 4) {
        edges {
          node {
            id
            altText
            src: transformedSrc(maxWidth: 600, maxHeight: 400, crop: CENTER)
            thumbnail: transformedSrc(maxWidth: 150, maxHeight: 150, crop: CENTER)
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
}
</page-query>
