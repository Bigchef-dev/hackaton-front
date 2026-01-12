<template>
    <button class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
        <span class="text-white font-semibold">{{ text }}</span>
                                </button>
</template>
<script setup lang="ts">
defineProps<{
    text?: string;
}>();
</script>