<template>
  <div class="todo-item" @click="updateCheck">
      <div class='todo-name'>
        <input type="checkbox" class="checkbox" @change="updateCheck" v-model="check"/>
        <p v-if="!isEditing">{{ name }}</p>
        <input v-else type="text" v-model="todoName" @keyup.enter="isEditing=false;editTodo()" @blur="isEditing=false;editTodo()" ref="todoInput">
      </div>
      <div class="actions">
          <span class="action" v-on:click="enableEditing"><i class="far fa-edit"></i></span>
          <span class="action" v-on:click="supprimer()"><i class="far fa-trash-alt"></i></span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TodoItem',
    props:{
        id: {type: Number},
        todolist_id: {type: Number},
        name: {type: String, default: "Liste"},
        checked: {type: Boolean, default: false},
    },
    data(){
        return{
            check: this.$props.checked,
            todoName: this.$props.name,
            isEditing: false
        }
    },
    methods:{
        async supprimer(){
            let data = {
                id: this.id,
                todolist_id: this.todolist_id
            }
            await this.$store.dispatch('todolist/delTodoTask', data);
            console.log("Task number : " + this.id + " is deleted.");
            this.$parent.refreshList();
        },
        async updateCheck(){
            let data = {
                id : this.id,
                name: this.name,
                todolist_id : this.todolist_id,
                completed : !this.check ? 1 : 0
            }
            await this.$store.dispatch('todolist/updateComplete', data);
            this.check = !this.check;
            this.$parent.refreshList();
        },
        async editTodo(){
            let complete = 1;
            if(this.checked == true){
                complete = 0;
            }
            let data = {
                id : this.id,
                name: this.todoName,
                todolist_id : this.todolist_id,
                completed : complete
            }
            await this.$store.dispatch('todolist/modifyTodo', data);
            this.$parent.refreshList();
        },
        enableEditing(){
            this.isEditing=true;
            this.$nextTick(() => {
                this.$refs.todoInput.focus();
            })
        }
    },
}
</script>

<style scoped>
    .todo-item{
        border: 0.15em solid transparent;
        color: #333;
        background-color: #ecf0f1;
        border: 1px solid #ecf0f1;
        font-weight: bold;
        transition: 0.2s ease-in-out;
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
        transition: 0.2s ease-in-out;
    }
    .actions{
        display: none;
    }

    .action{
        margin-right: 20px;
        color: #af2269;
        font-size: 150%;
    }
    .action:hover{
        color: rgb(241, 205, 42);
    }
    .todo-item:hover{
        border: 1px solid #af2269;
        cursor: pointer;
        transition: 0.2s ease-in-out;
    }
    .todo-item:hover > .actions{
        display: block;
    }

    .todo-name{
        display: flex;
        align-items: center;
    }

    .checkbox{
        transform: scale(1.4);
        border-radius: 20px;
    }

    p{
        margin : 10px;
    }

</style>