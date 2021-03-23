<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  async mounted(){
    if("token" in localStorage){
        this.$store.commit("account/load");
    }

    if(!("sync" in sessionStorage)){
      sessionStorage.setItem("sync", "false");
    }

    if(sessionStorage.getItem("sync") == "false"){
      console.log("Synchronisation du cache en cours ...");
      if("token" in localStorage){

        localStorage.removeItem("profile");
        console.log("Récupération du profil utilisateur ...");
        this.$store.dispatch("account/getUser");

        localStorage.removeItem("lists");
        console.log("Récupération des listes de tâches ...");
        this.$store.commit("todolist/load");

        console.log("Synchronisation temrinée !");
        sessionStorage.setItem("sync", "true");
      }else{
        console.log("Aucun compte connecté ...");
      }
    }else{
      if("token" in localStorage){
        this.$store.commit("account/load");
      }
      if("lists" in localStorage){
        this.$store.commit("todolist/setSyncState");
        this.$store.commit("todolist/load");
      }
    }
  }

}
</script>

<style>

body{
  padding: 0;
  margin: 0;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
