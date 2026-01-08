<script setup lang="ts">
import { ref } from 'vue'
import AdminDashboard from './AdminDashboard.vue';

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <AdminDashboard />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
