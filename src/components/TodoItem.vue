<template>
  <div class="todo-item" @click="updateCheck">
      <div class='todo-name'>
        <input type="checkbox" class="checkbox" @update:modelValue="check" v-model="check"/>
        <p>{{ name }}</p>
      </div>
      <div class="actions">
          <span class="action" v-on:click="edit()"><i class="far fa-edit"></i></span>
          <span class="action" v-on:click="supprimer()"><i class="far fa-trash-alt"></i></span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props:{
        id: {type: Number},
        name: {type: String, default: "Liste"},
        checked: {type: Boolean, default: false},
    },
    data(){
        return{
            check: this.checked
        }
    },
    methods:{
        async supprimer(){
            console.log("Suppresion??");
            let data = {
                id : this.id,
            }
            console.log(this.id);
            await this.$store.dispatch('todolist/delTodoTask', data);
            console.log("Suppresion");
        },
        updateCheck(){
            this.check = !this.check;
        }
    },
}
</script>

<style scoped>
    .todo-item{
        background-color: #ecf0f1;
        border-radius: 10px;
        height: 10vh;
        display: flex;
        justify-content: left;
        margin: 0 2vw 2vh 2vw;
        margin-left: 5%;
        margin-right: 10%;
        padding-left: 20px;
        align-items: center;
        display: flex;
        justify-content: space-between;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
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
    .todo-item:hover{
        background-color: #f7f7f7;
        transition: 0.2s ease-in-out;
        cursor: pointer;
    }
    .todo-item:hover > .actions{
        display: block;
    }

    .todo-item:active{
        background-color: #17a2ff;
        color: white;
    }

    .todo-name{
        display: flex;
    }
</style>