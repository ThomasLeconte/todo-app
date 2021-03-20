<template>
  <div class="sidebar-item" v-on:click="selectTodo()">
      <p>{{ name }}</p>
      <div class="actions">
          <span class="action"><i class="far fa-edit"></i></span>
          <span class="action" v-on:click="suppr()"><i class="far fa-trash-alt"></i></span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props:{
        id: {type: Number},
        name: {type: String, default: "Liste"}
    },
    methods:{
        async suppr(){
            let data = {
                id: this.id,
            }
            await this.$store.dispatch('todolist/delTodoList', data);
            console.log("done");
        },
        selectTodo() {
            this.$emit('eventEdit', {id: this.id, name : this.name })
        }
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
</style>