<template>
  <Layout>
    <div class="container has-text-centered">
      <h3 class="title">
        Login
      </h3>
      <div class="columns is-centered">
        <div class="column is-4">
          <form
            class="form"
            @submit.prevent="login">
            <div class="field">
              <div class="control">
                <label
                  class="label"
                  for="email">Email
                  <input
                    id="email"
                    v-model.trim="user.email"
                    class="input"
                    type="email"
                    placeholder="Your Email"
                    value="hello@"
                    required>
                </label>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label
                  class="label"
                  for="password">Password
                  <input
                    id="password"
                    v-model.trim="user.password"
                    class="input"
                    type="password"
                    required>
                </label>
              </div>
            </div>
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button
                  :class="{'is-loading': isLoading}"
                  class="button is-primary"
                  type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
// Queries
import { LoginCustomer } from '@/graphql/Auth.js'

export default {
  name: 'Login',
  data: () => ({
    isLoading: false,
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async login () {
      const user = this.user
      this.isLoading = true
      try {
        const { data: { customerAccessTokenCreate: authResult } } = await this.$apollo.mutate({
          mutation: LoginCustomer,
          variables: { input: user }
        })
        sessionStorage.setItem('store-token', authResult.accessToken)
        await this.$store.commit('setIsAuthenticated', true)
        this.$router.push('account')
      } catch (error) {
        this.isLoading = false
        console.error(error)
        this.$notify({
          title: 'Something went wrong. Please try again.',
          type: 'danger'
        })
      }
    }
  }
}
</script>
