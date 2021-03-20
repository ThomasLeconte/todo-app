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
        background: linear-gradient(to right, #4d0026 0%, #f05fa7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
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
        transition: 0.2s ease-in-out;
        cursor: pointer;
        background-image: linear-gradient(-45deg, #af2269, #e98ebb, #af2269);
        color: #f5eeee;
    }
    .sidebar-item:hover > .actions{
        display: block;
    }

    .sidebar-item:active{
        background-color: #17a2ff;
        color: white;
    }
</style>