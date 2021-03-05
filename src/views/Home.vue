<template>
  <div class="home" v-if="getProfile != null">
    <div class="first-column">
      <Sidebar />
    </div>
    <div class="second-column">
      <TodoList />
    </div>
  </div>
  <div class="home-notConnected" v-else>
    Vous n'êtes pas connecté... <router-link to="/login">Connectez vous ici !</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import TodoList from '@/components/TodoList.vue'
import { mapGetters } from "vuex";
export default {
  name: 'Home',
  components: {
    Sidebar,
    TodoList
  },
  mounted(){
    if(localStorage.getItem("token")){
      this.$store.dispatch("todolist/loadLists");
    }
  },
  computed: {
    ...mapGetters("account", ["getProfile"])
  },
}
</script>

<style scoped>
  .home{
    display: flex;
  }

  .first-column{
    flex-basis: 30%;
  }

  .second-column{
    flex-basis: 70%;
  }
</style>
