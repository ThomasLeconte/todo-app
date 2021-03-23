<template>
  <div class="home" v-if="getToken != null">
    <div class="first-column">
      <Sidebar @selectTodo="test" ref="Sidebar"/>
    </div>
    <div class="second-column" v-if="listSelected">
      <TodoList :key="idList" :id="idList" :name="nameList"/>
    </div>
    <div class="select-list" v-else>
      <i class="fas fa-tasks"></i>
      <p class="warning-text">Please select a TO-DO list on your left, or create a new one with "Add list" button 😉</p>
    </div>
  </div>
  <div class="home-notConnected" v-else>
    <i class="fas fa-user-lock"></i>
    <p>You're not logged in.</p>
    <router-link to="/login" class="button">Click here for log in yourself</router-link>
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
   data(){
    return {
      listSelected : false,
      idList : null,
      nameList : null,
    }
  },
  mounted() {
    if(this.getLists.length == 0 && this.getToken != null){
      this.$store.dispatch("todolist/load");
    }
    document.title = global.appName+"Home";
  },
  methods: {
    test(payload){
      this.idList = payload.id;
      this.nameList = payload.name;
      this.listSelected = true;
    }
  },
  computed: {
    ...mapGetters("account", ["getToken"]),
    ...mapGetters("todolist", ["getSyncState"]),
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

  .select-list{
    flex-basis: 75%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .select-list i{
    font-size: 5em;
  }

  .select-list .warning-text{
    padding: 20px;
    max-width: 30vw;
    font-size: 1.2em;
  }

  .home-notConnected{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .home-notConnected i{
    font-size: 5em;
    margin: 20px;
  }

  .button{
    width: 35vw;
    border-radius: 2em;
    padding: 2vh;
    margin: 2vh;
    text-align: center;
    text-decoration: none;
    border: 0.15em solid transparent;
    background-image: linear-gradient(-45deg, #a6a6a6, #ffffff, #a6a6a6);
    color: #4d0026;
    transition: all ease 1s;
    background-size: 300% 300%;
    background-position: 0 0;
    font-weight: bold;
  }

  .button:hover{
    cursor: pointer;
    color: #4d0026;
    background-position: 100% 50%;
  }
</style>
