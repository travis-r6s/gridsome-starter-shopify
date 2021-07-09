<template>
  <Layout>
    <div class="container">
      <div class="columns">
        <div class="column is-three-fifths">
          <figure class="image">
            <img
              v-if="product.images.length"
              :src="product.images[0].src"
              :alt="product.images[0].altText || product.title">
          </figure>
          <br>
          <div class="columns">
            <div
              v-for="image in product.images"
              :key="image.id"
              class="column is-3">
              <figure class="image is-square">
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
          <h5
            v-if="currentVariant"
            class="subtitle">
            {{ currentVariant.price.amount }}
          </h5>
          <div
            class="content"
            v-html="product.descriptionHtml" />
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
                  class="button is-primary"
                  @click="addToCart"
                  @keyup.enter="addToCart">
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
      title: this.$page.shopifyProduct.title
    }
  },
  data: () => ({
    selectedOptions: {},
    quantity: 1
  }),
  computed: {
    product () { return this.$page.shopifyProduct },
    productOptions () { return this.product.options.filter(({ name }) => name !== 'Title') },
    currentVariant () {
      const matchedVariant = this.product.variants.find(variant =>
        variant.selectedOptions.every(({ name, value }) => value === this.selectedOptions[ name ])
      )
      return matchedVariant
    }
  },
  watch: {
    '$route.fullPath': {
      immediate: true,
      handler () {
        this.setInitialSelectedOptions()
      }
    }
  },
  methods: {
    setInitialSelectedOptions () {
      const [firstVariant] = this.product.variants
      this.selectedOptions = firstVariant.selectedOptions.reduce((options, { name, value }) => ({ [ name ]: value, ...options }), {})
    },
    async addToCart () {
      const variant = this.currentVariant
      const payload = {
        qty: this.quantity,
        productTitle: this.product.title,
        variantTitle: variant.title,
        variantId: variant.id,
        price: variant.price,
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
query Product ($id: ID!) {
  shopifyProduct (id: $id) {
    id
    descriptionHtml
    title
    tags
    images(limit: 4) {
      id
      altText
      src: transformedSrc(maxWidth: 600, maxHeight: 400, crop: CENTER)
      thumbnail: transformedSrc(maxWidth: 150, maxHeight: 150, crop: CENTER)
    }
    options {
      id
      name
      values
    }
    variants {
      id
      title
      price {
        amount(format: true)
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
