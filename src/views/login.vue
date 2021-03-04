<template>
  <div class="login">
    <h1>Se connecter</h1>
    <div class="login-form">
      <input type="email" v-model="email" placeholder="Email" class="form-input"/>
      <input type="password" v-model="password" placeholder="Mot de passe" class="form-input"/>
      <button @click="submit" class="form-submit">Se connecter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      email: null,
      password: null
    }
  },
  methods: {
    submit(){
      let data = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('account/login', data);
      console.log(this.$store.state);
    }
  }
}
</script>

<style scoped>
  .login-form{
    display: flex;
    flex-direction: column;
  }
</style>