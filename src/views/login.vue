<template>
  <div class="login">
    <h1>Se connecter</h1>
    <div class="success-alert" v-show="getProfile != null">
      Vous êtes déjà connecté !
    </div>
    <div class="warning-alert" v-show="error">
      Veuillez vérifier vos identifiants et réessayez...
    </div>
    <div class="login-form">
      <input type="email" v-model="email" placeholder="Email" class="form-input"/>
      <input type="password" v-model="password" placeholder="Mot de passe" class="form-input"/>
      <button @click="submit" class="form-submit">Se connecter</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'Login',
  data(){
    return{
      email: null,
      password: null,
      error: false
    }
  },
  methods: {
    async submit(){
      let data = {
        email: this.email,
        password: this.password
      }
      let response = await this.$store.dispatch('account/login', data);
      response ? window.location.href = "/home" : this.error = true;
    }
  },
  computed: {
    ...mapGetters("account", ["getProfile"]),
  },
}
</script>

<style scoped>
  .login-form{
    display: flex;
    flex-direction: column;
  }

  .success-alert{
    background-color: rgba(39, 174, 96,0.4);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    padding: 20px;
    margin: 20px;
  }

  .warning-alert{
    background-color: rgba(231, 76, 60,0.4);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    padding: 20px;
    margin: 20px;
  }
</style>