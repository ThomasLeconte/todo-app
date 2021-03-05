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
    if("token" in localStorage){
      this.$store.commit("account/load");
    }
    if("lists" in localStorage){
      this.$store.commit("todolist/load");
    }
    
    /*if("token" in localStorage){
      this.$store.commit('account/load');
    }
    //Si l'utilisateur arrive pour la première fois (de sa session d'utilisation) sur l'appli, 
    //on définit une variable qui atteste qu'une synchronisation a été effectuée ou pas
    if(!("sync" in sessionStorage)){
      sessionStorage.setItem("sync", false);
    }
    //Si la var. de synchronisation existe et qu'elle est à false, il faut synchroniser les données
    //locales avec l'API
    if(sessionStorage.getItem("sync") == "false"){
      console.log("Synchronisation en cours ...");
      //Si le profil est déjà définit, on le récupère dans le state de l'appli
      if("token" in localStorage){
        console.log("Récupération du profil sauvegardé ...");
        this.$store.commit('account/load');
        console.log(localStorage)
        //Etant donné qu'on a besoin d'un token pour récupérer les tâches / listes du compte, cela
        //inclut d'avoir préalablement récupéré celui-ci. Une fois fait, on vérifie que les listes
        //stockées dans le cache sont égales aux listes stockées dans l'API
        console.log("Récupération des listes sauvegardées ...");
        if("lists" in localStorage){
          this.$store.dispatch("todolist/load");
        }else{
          this.$store.commit("todolist/setLists", []);
        }
        //La synchronisation est terminée
        sessionStorage.setItem("sync", true);
        console.log("Synchronisation terminée !");
      }else{
        //La synchronisation est terminée
        sessionStorage.setItem("sync", true);
        console.log("Aucune donnée existante !");
      }
    }*/
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
