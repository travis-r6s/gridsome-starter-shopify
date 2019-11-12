// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Plugins
import Vuex from 'vuex'
import VueApollo from 'vue-apollo'
import Notifications from 'vue-notification/dist/ssr.js'

// Dependencies
import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

// Styles
import '~/styles/main.scss'
import 'typeface-karla'
import 'typeface-prata'

export default function (Vue, { appOptions }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  // Import global plugins
  Vue.use(Vuex)
  Vue.use(VueApollo)
  Vue.use(Notifications)

  // Create Apollo client
  const apolloClient = new ApolloClient({
    fetch,
    uri: `https://${process.env.GRIDSOME_SHOPIFY_STOREFRONT}.myshopify.com/api/2019-07/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.GRIDSOME_SHOPIFY_STOREFRONT_TOKEN
    }
  })

  // Add client to vue-apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

  // Add provider to vue app
  appOptions.apolloProvider = apolloProvider

  // Create Vuex store
  appOptions.store = new Vuex.Store({
    state: {
      cart: []
    },
    mutations: {
      addToCart: (state, newItem) => {
        const itemExists = state.cart.find(item => item.variantId === newItem.variantId)

        if (itemExists) itemExists.qty += newItem.qty
        else state.cart.push(newItem)
      },
      removeFromCart: (state, itemId) => {
        const updatedCart = state.cart.filter(item => item.variantId !== itemId)
        state.cart = updatedCart
      }
    }
  })
}
