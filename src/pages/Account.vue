<template>
  <Layout>
    <div class="container">
      <h3 class="title">
        Your Account
      </h3>
      <div v-if="customer">
        <p v-if="!orders.length">
          No orders yet.
        </p>
        <table
          v-else
          class="table is-fullwidth">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Total Items</th>
              <th>Total Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id">
              <th>{{ order.name }}</th>
              <th>{{ order.lineItems.edges.length }}</th>
              <th>{{ formatCurrency(order.totalPrice) }}</th>
              <th>
                <a
                  :href="order.statusUrl"
                  target="_blank"
                  rel="noreferrer">
                  View Order
                </a>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
</template>

<script>
// import { CustomerOrders } from '@/graphql/Customer'
import gql from 'graphql-tag'
export default {
  name: 'Account',
  computed: {
    orders () { return this.customer.orders.edges.map(({ node }) => node) }
  },
  methods: {
    formatCurrency ({ currencyCode, amount }) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currencyCode }).format(amount)
    }
  },
  apollo: {
    customer: {
      query: gql`query customerOrders ($accessToken: String!) {
        customer (customerAccessToken: $accessToken) {
          orders (first: 10) {
            edges {
              node {
                id
                name
                statusUrl
                lineItems (first: 100) {
                  edges {
                    node {
                      title
                      quantity
                    }
                  }
                }
                totalPrice: totalPriceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }`,
      variables () {
        const accessToken = sessionStorage.getItem('store-token')
        console.log(accessToken)
        return { accessToken }
      }
    }
  }
}
</script>
