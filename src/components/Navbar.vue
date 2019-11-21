<template>
  <nav
    class="navbar container is-spaced"
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-brand">
      <g-link
        to="/"
        class="navbar-item"
        href="https://gridsome.org/">
        <img
          src="../favicon.png"
          alt="Gridsome Logo">
      </g-link>

      <a
        role="button"
        class="navbar-burger burger">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <g-link
          to="/"
          class="navbar-item">
          Home
        </g-link>
        <g-link
          to="/collections"
          class="navbar-item">
          Collections
        </g-link>
        <g-link
          to="/"
          class="navbar-item">
          Contact
        </g-link>
        <g-link
          to="/"
          class="navbar-item">
          About
        </g-link>
      </div>

      <div class="navbar-end">
        <div
          class="navbar-item has-dropdown"
          :class="{'is-active': searchResults.length}">
          <div class="control">
            <label for="search">
              <input
                id="search"
                v-model="searchTerm"
                class="input is-small"
                type="text"
                placeholder="Search">
            </label>
          </div>
          <div class="navbar-dropdown">
            <g-link
              v-for="result in searchResults"
              :key="result.id"
              :to="result.path"
              class="navbar-item">
              {{ result.title }}
            </g-link>
            <hr class="navbar-divider">
            <div class="navbar-item">
              View more results
            </div>
          </div>
        </div>
        <g-link
          to="/cart"
          class="navbar-item">
          Cart - {{ cart.length }} Item{{ cart.length !== 1 ? 's' : '' }}
        </g-link>
      </div>
    </div>
  </nav>
</template>

<script>
import FlexSearch from 'flexsearch'

export default {
  data: () => ({
    searchIndex: null,
    searchTerm: ''
  }),
  computed: {
    cart () { return this.$store.state.cart },
    searchResults () {
      const searchTerm = this.searchTerm
      if (!this.searchIndex || searchTerm.length < 3) return []
      return this.searchIndex.search({ query: searchTerm, limit: 5 })
    }
  },
  watch: {
    $route (to, from) {
      this.searchTerm = ''
    }
  },
  async mounted () {
    const { searchFields, index } = await fetch('/search.json').then(r => r.json())
    this.searchIndex = new FlexSearch({
      tokenize: 'strict',
      depth: 3,
      workers: 2,
      doc: {
        id: 'id',
        field: searchFields
      }
    })
    this.searchIndex.import(index, { serialize: false })
  }
}
</script>
