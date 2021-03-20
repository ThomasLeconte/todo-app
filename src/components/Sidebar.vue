<template>
  <div class="sidebar">
      <div class="header">
        <div class="content">
          <div class="user-profile">
            <div class="first-column">
              <i class="fas fa-user"></i>
            </div>
            <div class="second-column">
              Name : <span class="name">{{getProfile.name}}</span><br>
              Email : {{getProfile.email}}
              <button class="button" @click="logout"><i class="fas fa-sign-out-alt"></i> Disconnect</button>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-header">
          <h2 class="title">Available lists : {{ getLists.length }}</h2>
          <button class="button" style="width:auto" @click="addList"><i class="far fa-plus-square"></i> Add list</button>
        </div>
        <div class="sidebar-list" v-if="getSyncState">
          <SidebarItem @eventEdit="selectSideBar" v-for="item in getLists" :key="item.id" :name="item.name" :id="item.id" />
        </div>
        <div class="sidebar-list" v-else>
          <p class="warning-text">Please wait during application initialization...</p>
        </div>
      </div>
  </div>
</template>

<script>
import SidebarItem from '@/components/SidebarItem.vue'
import { mapGetters } from "vuex";

export default {
    name: 'Sidebar',
    components: {
      SidebarItem
    },
    methods:{
      addList(){
        this.$router.push("/lists/add");
      },
      logout(){
        this.$store.commit("todolist/logout");
        this.$store.commit("account/logout");
        this.$router.push("/login");
      },
      selectSideBar(payload){
        this.$emit('selectTodo', { id: payload.id, name : payload.name })
      }
    },
    computed: {
      ...mapGetters("todolist", ["getLists"]),
      ...mapGetters("todolist", ["getSyncState"]),
      ...mapGetters("account", ["getProfile"]),
    }
}
</script>

<style scoped>
  .sidebar{
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .header{
    flex-basis: 10%;
    width: 100%;
  }
  .sidebar .header .content{
    padding: 10px;
    padding-right: 0;
    background-color: #f7f7f7;
    width: 85%;
    font-weight: bold;
    color: #4d0026;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
  .sidebar .content{
    flex-basis: 90%;
    width: 100%;
    margin: 20px;
    max-height: 80vh;
    overflow-y: auto;
  }
  .sidebar .title{
    margin-left: 1vw;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 1em;
  }
  .sidebar-list{
    display: flex;
    flex-direction: column;
    width: 95%;
    padding-top: 20px;
  }
  .user-profile{
    display: flex;
  }
  .user-profile .name{
    font-weight: bold;
    text-transform: uppercase;
  }
  .user-profile .first-column{
    flex-basis: 30%;
    font-size: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-profile .second-column{
    flex-basis: 70%;
  }
  .button{
    background-image: linear-gradient(-45deg, #690537, #f05fa7, #690537);
    border: none;
    border-radius: 10px;
    color: #4d0026;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 80%;
    font-weight: bold;
    transition: all ease 1s;
    background-size: 300% 300%;
    background-position: 0 0;
  }
  .button:hover{
    background-color: #17a2ff;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  .content-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92%;
  }
  .warning-text{
    padding: 20px;
  }

  h2{
    color: #690537;
  }
</style>