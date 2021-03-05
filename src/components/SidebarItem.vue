<template>
  <div class="sidebar-item">
      {{ this.name }}
  </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props:{
        name: {type: String, default: "Liste"}
    },
}
</script>

<style>

</style>