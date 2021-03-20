<template>
  <div class="todolist-view">
    <div class="header"><i class="fas fa-tasks"></i> {{ name }} - Tasks</div>
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
    font-size: 2.5em;
    font-weight: bold;
    margin-bottom: 5vh;
    text-align: left;
    background: linear-gradient(to right, #4d0026 0%, #f05fa7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .main-buttons{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 2vh;
  }

  .main-buttons input{
    margin: 0 10px 0 10px;
    border-radius: 5px;
    border: 2px solid #690537;
    cursor: pointer;
    padding: 7% 15%;
    text-align: center;
    border: 0.15em solid transparent;
    background-image: linear-gradient(-45deg, #690537, #f05fa7, #690537);
    color: #f5eeee;
    font-weight: bold;
    background-size: 300% 300%;
    background-position: 0 0;
    transition: 0.2s ease-in-out;
  }

  .main-buttons input:hover{
    cursor: pointer;
    color: #ebdfdf;
    background-position: 100% 50%;
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
    border: 1px solid #333;
    border-radius: 5px;
    padding: 2vh 2vw;
    margin-right: 10px;
  }

  .todos-add button{
    width: 10%;
    padding: 1vh 2vw;
    color: #ebdfdf;
    font-weight: bold;
  }

  .button{
    border-radius: 5px;
    border: 2px solid #690537;
    cursor: pointer;
    padding: 7% 15%;
    text-align: center;
    border: 0.15em solid transparent;
    background-image: linear-gradient(-45deg, #690537, #f05fa7, #690537);
    color: #a6a6a6;
    transition: all ease 1s;
    background-size: 300% 300%;
    background-position: 0 0;
  }
  .button:hover{
    cursor: pointer;
    color: #ebdfdf;
    background-position: 100% 50%;
  }
</style>

