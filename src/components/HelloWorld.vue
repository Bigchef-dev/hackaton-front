<script setup lang="ts">
import AdminDashboard from './AdminDashboard.vue';
import { ref } from 'vue'

defineProps<{ msg: string }>()

</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="count++">You clicked me {{ count }} times.</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
