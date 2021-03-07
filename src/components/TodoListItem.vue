<template>
  <div class="sidebar-item">
      <p>{{ name }}</p>
      <div class="actions">
          <input type="checkbox" @update:modelValue="updateCompleted()" checked:this.checked>
          <span class="action" v-on:click="edit()"><i class="far fa-edit"></i></span>
          <span class="action" v-on:click="suppr()"><i class="far fa-trash-alt"></i></span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TodoListItem',
    props:{
        id: {type: Number},
        name: {type: String, default: "Liste"},
        checked: {type: Boolean, default: false},
    },
    methods:{
        updateCompleted(todo){
        todo.completed = !todo.completed
        console.log(todo);
        },
        supprimer(todo){
        this.todos.splice(this.todos.indexOf(todo), 1);
        },
    }
}
</script>

<style scoped>
    .sidebar-item{
        background-color: #ecf0f1;
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
        background-color: #17a2ff;
        color: white;
    }
</style>