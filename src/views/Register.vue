<template>
  <div class="register">
    <h1>S'inscrire</h1>
    <div class="success-alert" v-show="getProfile != null">
      Vous êtes maintenant enregistré(e) !
    </div>
    <div class="login-form">
      <input type="text" v-model="name" placeholder="Votre nom" class="form-input"/>
      <input type="email" v-model="email" placeholder="Email" class="form-input"/>
      <input type="password" v-model="password" placeholder="Mot de passe" class="form-input"/>
      <button @click="submit" class="form-submit">Se connecter</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'Register',
  data(){
    return{
      email: null,
      name: null,
      password: null,
    }
  },
  methods: {
    submit(){
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('account/register', data);
    }
  },
  computed: {
    ...mapGetters("account", ["getProfile"])
  }
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
</style>