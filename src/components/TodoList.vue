<template>

    <div clas="boutons">
        <input v-on:click="filterAll" type="button" value="All">
        <input v-on:click="filterCheck" type="button" value="Check">
        <input v-on:click="filterUncheck" type="button" value="UnCheck">
        <input v-on:click="ajout" type="button" value="Ajout">
    </div>
    <div class="todolist">
        <ul>
            <li v-for="todo in filterList" :key="todo.name">
                <input type="checkbox" id="test" v-bind:value="todo.id" v-bind:name="todo.name" @update:modelValue="updateCompleted(todo)" v-model ="todo.completed">
                <label for="checkbox">{{todo.name}}</label>
                <input v-on:click="suppr(todo)" class="favorite styled" type="button" value="Suppression">
            </li>
        </ul>
    </div>
</template>


<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    
  },
  props: {
    
  },
  data(){
    return {
      todos: [
        {
          id : 1,
          name : 'tache 1',
          completed : false
        },
        {
          id : 2,
          name : 'tache 2',
          completed : true
        }
      ]
      ,
      newTodo: '',
      filter: 'all',
    }
  },
  methods: {
    updateCompleted(todo){
        todo.completed = !todo.completed
    },
    ajout(){
        var longueur = this.todos.length+1;
        var newTask = {id : longueur, name : "tache " + longueur,completed : false};
        this.todos.push(newTask)
        
    },
    suppr(todo){
        this.todos.splice(this.todos.indexOf(todo), 1);
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
    
  }
});
</script>

