<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Mon profil'
  },
  subtitle: {
    type: String,
    default: 'Informations personnelles'
  }
})
</script>

<template>
  <div class="space-y-6">

    <!-- Header Section -->
    <div class="flex items-center justify-between">

      <div class="flex items-center gap-4">
        <!-- Avatar / Icon -->
        <div class="inline-flex items-center justify-center w-14 h-14 bg-primary-600 rounded-full shadow">
          <slot name="icon">
            <svg
              class="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </slot>
        </div>

        <!-- Titles -->
        <div>
          <h1 class="text-xl font-semibold text-gray-900">
            {{ title }}
          </h1>
          <p class="text-sm text-gray-500">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <!-- Header actions -->
      <slot name="actions" />
    </div>

    <!-- Card Content -->
    <div class="bg-white rounded-xl shadow border border-gray-100">
      <slot name="badge" />

      <div class="p-6">
        <slot />
      </div>
    </div>

    <!-- Footer -->
    <slot name="footer" />

  </div>
</template>
