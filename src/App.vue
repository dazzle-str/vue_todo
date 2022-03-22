<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    async login () {
      const auth = this.$store.state.app.auth()
      await auth.anonymousAuthProvider().signIn().then(() => {
        console.log('登录成功')
      })
      const loginState = await auth.getLoginState()
      console.log(loginState.isAnonymousAuth)
    }
  },
  created () {
    this.login()
  }
}
</script>

<style></style>
