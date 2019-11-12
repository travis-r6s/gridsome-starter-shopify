<template>
  <Layout>
    <div class="container">
      <div class="columns">
        <div class="column is-three-fifths">
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
        <div class="column is-two-fifths">
          <h3 class="title is-family-secondary">
            {{ product.title }}
          </h3>
          <h5 class="subtitle">
            {{ formatCurrency(currentVariant.priceV2) }}
          </h5>
          <div
            v-html="product.descriptionHtml"
            class="content" />
          <div
            v-for="option in productOptions"
            :key="option.id"
            class="field">
            <div class="control">
              <label
                :for="option.name"
                class="label">
                {{ option.name }}
                <div class="select is-fullwidth">
                  <select
                    :id="option.name"
                    v-model="selectedOptions[option.name]">
                    <option
                      v-for="value in option.values"
                      :key="value"
                      :value="value">
                      {{ value }}
                    </option>
                  </select>
                </div>
              </label>
            </div>
          </div>
          <br>
          <div class="field is-grouped is-grouped-right">
            <div class="field has-addons is-fullwidth">
              <div class="control">
                <label
                  class="label"
                  for="quantity">
                  Quantity
                </label>
                <input
                  id="quantity"
                  v-model.number="quantity"
                  class="input quantity"
                  type="number"
                  placeholder="Find a repository">
              </div>
              <div class="add-to-cart">
                <button
                  @click="addToCart"
                  @keyup.enter="addToCart"
                  class="button is-primary">
                  Add To Cart
                </button>
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
  metaInfo () {
    return {
      title: this.$page.shopify.product.title
    }
  },
  data: () => ({
    selectedOptions: {},
    quantity: 1
  }),
  computed: {
    product () { return this.$page.shopify.product },
    productOptions () { return this.product.options.filter(({ name }) => name !== 'Title') },
    variants () { return this.product.variants.edges.map(({ node: variant }) => variant) },
    currentVariant () {
      const matchedVariant = this.variants.find(variant =>
        variant.selectedOptions.every(
          ({ name, value }) => value === this.selectedOptions[ name ]
        )
      )
      return matchedVariant
    }
  },
  created () {
    console.log(this.productOptions)
    const [firstVariant] = this.variants
    this.selectedOptions = firstVariant.selectedOptions.reduce((options, { name, value }) => ({ [ name ]: value, ...options }), {})
  },
  methods: {
    formatCurrency ({ currencyCode, amount }) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currencyCode }).format(amount)
    },
    async addToCart () {
      const variant = this.currentVariant
      const payload = {
        qty: this.quantity,
        productTitle: this.product.title,
        variantTitle: variant.title,
        variantId: variant.id,
        price: variant.priceV2,
        image: variant.image
      }
      await this.$store.commit('addToCart', payload)
      this.$notify({
        title: `Added ${payload.productTitle} to Cart`,
        type: 'primary'
      })
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
      options {
        id
        name
        values
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
            selectedOptions {
              name
              value
            }
            image {
              id
              altText
              thumbnail: transformedSrc(maxWidth: 150, maxHeight: 150, crop: CENTER)
            }
          }
        }
      }
    }
  }
}
</page-query>

<style lang="scss" scoped>
.is-fullwidth {
  width: 100%;
  .control {
    width: 100%;
  }
}
.quantity {
  width: 100%;
  height: 50px;
}
.add-to-cart {
  display: flex;
  align-items: flex-end;
}
</style>
