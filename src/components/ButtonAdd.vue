<template>
    <div class="justify-center items-center mb-2">
        <button
            class="w-full flex  gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg transition hover:scale-105">

            <div class="flex items-center text-center w-full">
                <slot></slot>
                <span class=" md:inline text-center w-full">{{ text }}</span>
            </div>
        </button>
    </div>

</template>

<script setup lang="ts">

defineProps<{
    text?: string;
}>();

</script>