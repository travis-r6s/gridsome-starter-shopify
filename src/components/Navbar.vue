<template>
  <nav
    class="navbar container is-spaced"
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-brand">
      <g-link
        to="/"
        class="navbar-item"
        href="https://bulma.io">
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
          to="/"
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
  computed: {
    cart () { return this.$store.state.cart }
  }
}
</script>
