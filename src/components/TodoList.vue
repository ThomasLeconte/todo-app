<template>
  <div class="todolist-view">
    <div class="header"><i class="fas fa-home"></i> {{ name }} - Tasks</div>
    <div class="main-buttons">
      <input v-on:click="filterAll" type="button" value="All" />
      <input v-on:click="filterCheck" type="button" value="Check" />
      <input v-on:click="filterUncheck" type="button" value="UnCheck" />
    </div>
    <div class="todos-list">
      <TodoItem
        v-for="item in todosFiltered"
        :key="item.id"
        :name="item.name"
        :id="item.id"
        :todolist_id="item.todolist_id"
        :checked="item.checked"
      />
    </div>
    <div class="todos-add">
        <input v-model="newTodoName" placeholder="Write your task here ...">
        <button v-on:click="ajout" class="button">Add task</button>
    </div>
  </div>
</template>


<script>
import TodoItem from "@/components/TodoItem.vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "TodoList",
  props: {
    id: { type: Number },
    name: { type: String },
  },
  components: {
    TodoItem,
  },
  data() {
    return {
      filter: "all",
      todos: [],
      todosFiltered: [],
      newTodoName: ""
    };
  },
  methods: {
    async ajout() {
      var newTask = { todolist_id: this.id, name: this.newTodoName, completed: false };
      this.todos.push(newTask);
      let response = await this.$store.dispatch(
        "todolist/newTodoTask",
        newTask
      );
      response
        ? console.log("Task added !")
        : console.log("Error during task creation");
      this.refreshList();
    },
    filterAll() {
      this.filter = "all";
      this.applyFilter();
    },
    filterCheck() {
      this.filter = "check";
      this.applyFilter();
    },
    filterUncheck() {
      this.filter = "uncheck";
      this.applyFilter();
    },
    applyFilter(){
      let result = [];
      if (this.filter == 'check'){
        this.todos.forEach(todo => {
          if(todo.checked == true){
            result.push(todo);
          }
        });
        this.todosFiltered = result;
      }else if( this.filter == 'uncheck'){
        this.todos.forEach(todo => {
          if(todo.checked == false){
            result.push(todo);
          }
        });
        this.todosFiltered = result;
      }else{
        this.todosFiltered = this.todos;
      }
    },
    async refreshList(){
      let listOfTodos = await this.$store.dispatch("todolist/loadTasksOfList", this.id);
      listOfTodos.forEach(todo => {
        if(todo.completed == 1){
          todo.checked = true;
        }else{
          todo.checked = false;
        }
      });
      this.todos = listOfTodos;
      this.applyFilter();
    }
  },

  computed: {
    ...mapGetters("todolist", ["getTodosByListId"]),
  },
  beforeMount() {
    if(this.getTodosByListId(this.id) !== undefined){
      this.todos = this.getTodosByListId(this.id);
      this.refreshList();
    }
  },
});
</script>

<style scoped>
  .todolist-view {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header{
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 5vh;
    text-align: left;
  }

  .main-buttons{
    margin-bottom: 2vh;
  }

  .todos-list{
    width: 100%;
    flex-basis: 70vh;
    max-height: 70vh;
    overflow-y: auto;
  }

  .todos-add{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .todos-add input{
    width: 80%;
    border: 1px solid rgb(143, 143, 143);
    padding: 2vh 2vw;
    border-radius: 5px;
    margin-right: 10px;
  }

  .todos-add button{
    width: 10%;
    padding: 1vh 2vw;
  }

  .button{
    background-color: #dadcdd;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 80%;
    transition: 0.2s ease-in-out;
  }
  .button:hover{
    background-color: #17a2ff;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
</style>

