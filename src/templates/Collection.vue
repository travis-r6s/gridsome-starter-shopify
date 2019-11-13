<template>
  <Layout>
    <div class="container has-text-centered">
      <h1 class="title is-family-secondary">
        {{ collection.title }}
      </h1>
      <hr>
      <br>
      <div class="columns is-multiline">
        <div
          v-for="product in collection.products"
          :key="product.id"
          class="column is-4">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  :src="product.images[0].src"
                  :alt="product.images[0].altText || product.title">
              </figure>
            </div>
            <div class="card-content has-text-left">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4 is-family-secondary">
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
                    :to="`product/${product.handle}`"
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

<script>
export default {
  computed: {
    collection () { return this.$page.shopifyCollection }
  },
  methods: {
    formatCurrency ({ currencyCode, amount }) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currencyCode }).format(amount)
    }
  }
}
</script>

<page-query>
query Collection ($id: ID!) {
  shopifyCollection (id: $id) {
    id
    title
    descriptionHtml
    products {
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
      images (limit: 1) {
        id
        altText
        src: transformedSrc (maxWidth: 400, maxHeight: 300, crop: CENTER)
      }
    }
  }
}
</page-query>
