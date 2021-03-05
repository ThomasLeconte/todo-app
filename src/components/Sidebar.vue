<template>
  <div class="sidebar">
      <div class="header">
        <div class="content">
          Connecté en tant que ...
          <button>Déconnexion</button>
        </div>
      </div>
      <div class="content">
        <h2 class="title">Listes disponibles : {{ getLists.length }}</h2>
        <div class="sidebar-list">
          <SidebarItem v-for="item in getLists" :key="item.id" :name="item.name" :id="item.id" />
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
    computed: {
        ...mapGetters("todolist", ["getLists"])
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
    flex-basis: 25%;
    width: 100%;
  }
  .sidebar .header .content{
    padding: 10px;
    padding-right: 0;
    background-color: #f7f7f7;
    width: 85%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
  .sidebar .content{
    flex-basis: 75%;
    padding-top: 30px;
    width: 100%;
    margin: 20px;
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
  }
</style>