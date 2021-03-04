<template>
  <div class="home">
    <Sidebar />
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Home',
  components: {
    Sidebar,
    TodoList
  }
}
</script>
