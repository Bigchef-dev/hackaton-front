<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String
});
</script>

<template>
  <div>
    <!-- Header Section -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4 shadow-lg">
        <slot name="icon">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </slot>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ title }}</h1>
      <p class="text-gray-600">{{ subtitle }}</p>
    </div>

    <!-- Card Content -->
    <div class="card shadow-xl border border-gray-100">
      <slot name="badge" />
      <slot />
    </div>

    <!-- Footer -->
    <slot name="footer" />
  </div>
</template>