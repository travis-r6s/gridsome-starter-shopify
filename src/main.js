// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuex from 'vuex'
import '~/styles/main.scss'

export default function (Vue, { appOptions }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(Vuex)

  appOptions.store = new Vuex.Store({
    state: {
      cart: []
    },
    mutations: {
      addToCart: (state, newItem) => {
        const itemExists = state.cart.find(item => item.id === newItem.id)

        if (itemExists) itemExists.qty += newItem.qty
        else state.cart.push(newItem)
      }
    }
  })
}
