<template>
  <Layout>
    <div class="container">
      <div class="hero">
        <div class="hero-body">
          <div class="container">
            <h3 class="title">
              Cart
            </h3>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Your Cart'
  },
  computed: {
    cart () { return this.$store.state.cart }
  }
}
</script>
