<template>
  <div class="sidebar">
      <h1>Listes disponibles : </h1>
      <SidebarItem v-for="item in getLists" :key="item.id" :name="item.name" />
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

<style>

</style>