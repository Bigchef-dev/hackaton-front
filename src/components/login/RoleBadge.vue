<template>
  <div class="flex items-center justify-center mb-6">
    <span class="badge badge-primary text-sm px-4 py-1.5">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: String
});
</script>