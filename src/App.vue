<template>
  <div class="app">
    <router-view/>
  </div>
  <!--<div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>-->

</template>

<script>
export default {
  mounted(){
    this.$store.commit('account/load');
    //console.log(this.$store.getters["account/getProfile"]);
  }
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>
