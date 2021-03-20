<template>
  <div class="register">
    <div class="card">
      <div class="task-icon"><i class="fas fa-tasks"></i></div>
      <div class="data">
          <h1>Register</h1>
          <div class="success-alert" v-show="getProfile.length > 0">
            Vous êtes maintenant enregistré(e) !
          </div>
          <div class="warning-alert" v-show="getErrors.length > 0">
              <p v-for="(error, index) in getErrors" :key="index">{{error}}</p>
          </div>  
          <div class="register-form">
              <input type="text" v-model="name" placeholder="Name" class="form-input"/>          
              <input type="email" v-model="email" placeholder="Email" class="form-input"/>
              <input type="password" v-model="password" placeholder="Password" class="form-input"/>
              <button @click="submit" class="form-submit">Submit</button>
              <h2 class="login-link"><router-link to="/login" class="root">Already got a TodoApp account ? <br/>Sign in</router-link></h2>
          </div>
      </div>
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
  mounted(){
    this.$store.commit("account/resetErrors");
  },
  methods: {
    submit(){
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.commit("account/resetErrors");
      this.$store.dispatch('account/register', data);
    }
  },
  computed: {
    ...mapGetters("account", ["getProfile"]),
    ...mapGetters("account", ["getErrors"])
  }
}
</script>

<style scoped>

  .register{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .register .card{
    display: flex;
    background: linear-gradient(135deg, #4d0026, #f05fa7);
    background-size: 110% 150%;
    border-radius: 1.5em;
    justify-content: center;
    align-items: center;
    padding: 2%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    width: 60vw;
  }

  .card .task-icon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 10em;
    flex-basis: 40%;
  }

  .card .data{
    flex-basis: 60%;
  }

  .task-icon i{
    font-size: 1.2em; 
    color: #c9c9c9;
  }

  h1{
    text-transform: uppercase;
    background: linear-gradient(to right, #a6a6a6 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }

  .form-input{
    width: 80%;
    border: 1px solid white;
    border-radius: 2em;
    padding: 2vh;
    margin: 2vh;
    text-align: center;
    font-weight: bold;
  }

  .form-submit{
    width: 60%;
    border-radius: 2em;
    padding: 2vh;
    margin: 2vh;
    text-align: center;
    border: 0.15em solid transparent;
    background-image: linear-gradient(-45deg, #a6a6a6, #ffffff, #a6a6a6);
    color: #4d0026;
    transition: all ease 1s;
    background-size: 300% 300%;
    background-position: 0 0;
    font-weight: bold;

  }

  .form-submit:hover{
    cursor: pointer;
    color: #4d0026;
    background-position: 100% 50%;
  }

  .root{
    color: white;
    text-decoration: none;
  }

  .login-link{
    text-transform: uppercase;
    font-size: 1em;
  }
  
  .register-form{
    margin: 0% 10%;
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