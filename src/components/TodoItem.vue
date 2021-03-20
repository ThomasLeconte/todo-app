<template>
  <div class="todo-item">
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
            check: this.checked,
            todoName: this.name,
            isEditing: false
        }
    },
    methods:{
        async supprimer(){
            let data = {
                id : this.id,
            }
            console.log(this.id);
            await this.$store.dispatch('todolist/delTodoTask', data);
            console.log("Task number : " + this.id + " is deleted." );
            this.$parent.refreshList();
        },
        async updateCheck(){
            let complete = 1;
            if(this.checked == true){
                complete = 0;
            }
            let data = {
                id : this.id,
                name: this.name,
                todolist_id : this.todolist_id,
                completed : complete
            }
            await this.$store.dispatch('todolist/updateComplete', data);
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
        background-image: linear-gradient(-45deg, #af2269, #e98ebb, #af2269);
        color: #f5eeee;
        font-weight: bold;
        transition: all ease 1s;
        background-size: 200% 300%;
        background-position: 0 0;
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
        color: #af2269;
        font-size: 150%;
    }
    .action:hover{
        color: rgb(241, 205, 42);
    }
    .todo-item:hover{
        background-color: #ff6699;
        cursor: pointer;
        background-position: 20% 20%;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 8px 15px rgba(0,0,0,0.23);
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
        align-items: center;
    }

    p{
        margin : 10px;
    }

</style>