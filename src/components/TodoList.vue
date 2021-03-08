<template>
  <div class="todolist-view">
    <div class="header"><i class="fas fa-home"></i> {{ name }} - Tâches</div>
    <div class="main-buttons">
      <input v-on:click="filterAll" type="button" value="All" />
      <input v-on:click="filterCheck" type="button" value="Check" />
      <input v-on:click="filterUncheck" type="button" value="UnCheck" />
      <input v-on:click="ajout" type="button" value="Ajout" />
    </div>
    <div class="todos-list">
      <TodoItem
        v-for="item in todos"
        :key="item.id"
        :name="item.name"
        :id="item.id"
        :checked="item.checked"
      />
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
    };
  },
  methods: {
    async ajout() {
      var newTask = { todolist_id: this.id, name: "tache 1", completed: false };
      this.todos.push(newTask);
      let response = await this.$store.dispatch(
        "todolist/newTodoTask",
        newTask
      );
      response
        ? console.log("Tâche ajoutée !")
        : console.log("Erreur lors de l'ajout de la tâche...");
    },
    filterAll() {
      this.filter = "all";
    },
    filterCheck() {
      this.filter = "check";
    },
    filterUncheck() {
      this.filter = "uncheck";
    },
  },

  computed: {
    ...mapGetters("todolist", ["getTodosByListId"]),
    filterList() {
      const listFiltre = [];
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "check") {
        for (let i = 0; i < this.todos.length; i++) {
          if (this.todos[i].completed) {
            listFiltre.push(this.todos[i]);
          }
        }
        return listFiltre;
      } else if (this.filter == "uncheck") {
        for (let i = 0; i < this.todos.length; i++) {
          if (!this.todos[i].completed) {
            listFiltre.push(this.todos[i]);
          }
        }
        return listFiltre;
      } else {
        return this.todos;
      }
    },
  },
  beforeMount() {
    this.todos = this.getTodosByListId(this.id);
    console.log(this.id);
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
  }
</style>

