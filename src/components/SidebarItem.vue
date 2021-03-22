<template>
  <div class="sidebar-item" v-on:click="selectTodo()">
      <p>
          {{ name }} <span class="todos-counter">{{ calculateTodosNotCompleted() }}</span>
      </p>
      
      <div class="actions">
          <span class="action" v-on:click="suppr()"><i class="far fa-trash-alt"></i></span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props:{
        id: {type: Number},
        name: {type: String, default: "Liste"},
        nb_todos: {type: Number, default: 0},
        todos: {type: Array}
    },
    methods:{
        async suppr(){
            let data = {
                id: this.id,
            }
            await this.$store.dispatch('todolist/delTodoList', data);
        },
        selectTodo() {
            this.$emit('eventEdit', {id: this.id, name : this.name });
        },
        calculateTodosNotCompleted(){
            let compteur = 0;
            if(this.todos != undefined){
                this.todos.forEach(todo => {
                    if(todo.completed == 0){
                        compteur = compteur + 1;
                    }
                });
            }
            return compteur;
        },
    },
    beforeMount() {
        this.calculateTodosNotCompleted()
    }
}
</script>

<style scoped>
    .sidebar-item{
        border-radius: 10px;
        width: 90%;
        height: 50px;
        display: flex;
        justify-content: left;
        margin-left: 5%;
        margin-right: 10%;
        padding-left: 10px;
        align-items: center;
        display: flex;
        font-weight: bold;
        justify-content: space-between;
    }
    .actions{
        display: none;
    }

    .action{
        margin-right: 20px;
    }
    .action:hover{
        color: rgb(241, 205, 42);
    }
    .sidebar-item:hover{
        background-color: #f7f7f7;
        transition: 0.2s ease-in-out;
        cursor: pointer;
    }
    .sidebar-item:hover > .actions{
        display: block;
    }

    .sidebar-item:active{
        background-image: linear-gradient(-45deg, #690537, #f05fa7, #690537);
        background-size: 300% 300%;
        background-position: 0 0;
        color: white;
    }

    .todos-counter{
        display: inline-block;
        background-color: rgba(240, 95, 167, 0.5);
        padding: 5px;
        margin-left: 10px;
        font-size: 1.2em;
        width: 15px;
        line-height: 15px;
        text-align: center;
        border-radius: 100%;
        color: #690537;
    }
</style>