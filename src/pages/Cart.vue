<template>
  <Layout>
    <div class="hero">
      <div class="hero-body">
        <div class="container">
          <h3 class="title">
            Cart
          </h3>
        </div>
      </div>
    </div>
    <div class="container">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th />
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in cart"
            :key="item.variantId">
            <td>
              <figure class="image is-square">
                <img
                  :src="item.image.thumbnail"
                  :alt="item.image.altText || item.title">
              </figure>
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ totalPrice(item) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Layout>
</template>

<script>
import currency from 'currency.js'
export default {
  metaInfo: {
    title: 'Your Cart'
  },
  computed: {
    cart () { return this.$store.state.cart }
  },
  methods: {
    totalPrice ({ qty, price }) {
      return currency(price.amount, { formatWithSymbol: true, symbol: '£' }).multiply(qty).format()
    }
  }
}
</script>
