<template>
  <div class = "all">
    <div class="boutons">
        <input v-on:click="filterAll" type="button" value="All">
        <input v-on:click="filterCheck" type="button" value="Check">
        <input v-on:click="filterUncheck" type="button" value="UnCheck">
        <input v-on:click="ajout" type="button" value="Ajout">
    </div>
    <div class="todolist">
      <div class="todolist-item">
        <TodoListItem v-for="item in todos" :key="item.id" :name="item.name" :id="item.id" :checked="item.checked" />
      </div>
    </div>
  </div>
</template>


<script>
import TodoListItem from '@/components/TodoListItem.vue'
import { defineComponent } from 'vue';
import { mapGetters } from "vuex";

export default defineComponent({
  name: 'TodoList',
  components: {
      TodoListItem
  },
  props:{
    id: {type: Number},
  },
  data(){
    return {
      filter: 'all',
      todos: [],
    }
  },
  methods: {
    async ajout(){
      var newTask = {todolist_id : this.id, name : "tache 1",completed : false};
      this.todos.push(newTask);
      await this.$store.dispatch('todolist/newTodoList', newTask);              
    },
    filterAll(){
        this.filter = 'all';
    },
    filterCheck(){
        this.filter = 'check';
    },
    filterUncheck(){
        this.filter = 'uncheck';
    }
  },
  
  computed:{
    ...mapGetters("todolist", ["getTodo"]),
    filterList(){
      const listFiltre = [];
      if(this.filter =='all'){
        return this.todos;
      }else if(this.filter == 'check'){
        for(let i = 0; i < this.todos.length; i++){
          if(this.todos[i].completed){
            listFiltre.push(this.todos[i]);
          }
        }
        return listFiltre;
      }else if(this.filter == 'uncheck'){
        for(let i = 0; i < this.todos.length; i++){
          if(!(this.todos[i].completed)){
            listFiltre.push(this.todos[i]);
          }
        }
        return listFiltre;
      }else{
        return this.todos;
      }
    }
  },
  beforeMount(){
    this.todos = this.getTodo(this.id);
    console.log(this.id);
  }
});
</script>

