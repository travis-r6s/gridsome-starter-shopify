<template>
  <Layout>
    <h3 class="title">
      Your Account
    </h3>
  </Layout>
</template>

<script>
export default {
  name: 'Account',
  meta: {
    auth: true
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  }
}
</script>
