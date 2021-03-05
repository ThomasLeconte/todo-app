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
  mounted() {
    if(this.getLists.length == 0 && this.getProfile != null){
      this.$store.dispatch("todolist/load");
    }
  },
  methods: {
    //async getTodos(){ let test = await this.$store.dispatch("todolist/loadTasksOfList", 30); }
  },
  computed: {
    ...mapGetters("account", ["getProfile"]),
    ...mapGetters("todolist", ["getLists"])
  },
}
</script>

<style scoped>
  .home{
    display: flex;
  }

  .first-column{
    flex-basis: 25%;
    background-color: #ecf0f1;
    height: 100vh;
    display: flex;
    justify-content: center;
    box-shadow: 5px 0 5px -3px #888;
  }

  .second-column{
    flex-basis: 75%;

    height: 100vh;
  }
</style>
