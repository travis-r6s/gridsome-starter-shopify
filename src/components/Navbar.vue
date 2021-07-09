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

      <button
        class="navbar-burger burger"
        :class="{'is-active': isMenuActive}"
        @click="isMenuActive = !isMenuActive"
        @keyup="isMenuActive = !isMenuActive">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>

    <div
      class="navbar-menu"
      :class="{'is-active': isMenuActive}">
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
          to="/about"
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
              v-for="({ node: result }) in searchResults"
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
export default {
  data: () => ({
    isMenuActive: false,
    searchTerm: ''
  }),
  computed: {
    cart () { return this.$store.state.cart },
    searchResults () {
      const searchTerm = this.searchTerm
      if (searchTerm.length < 3) return []
      return this.$search.search({ query: searchTerm, limit: 8, suggest: true })
    }
  },
  watch: {
    $route (to, from) {
      this.searchTerm = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-burger {
  background-color: transparent;
  border: none;
}
</style>
