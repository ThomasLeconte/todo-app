<template>
  <div class="home" v-if="getProfile != null">
    <Sidebar />
    <TodoList />
  </div>
  <div class="home" v-else>
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
    this.$store.dispatch("todolist/loadLists");
  },
  computed: {
    ...mapGetters("account", ["getProfile"])
  },
}
</script>
