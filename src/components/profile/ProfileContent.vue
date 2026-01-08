<script setup lang="ts">

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
})

const emit = defineEmits(['profile-updated'])

</script>

<template>
  <div class="bg-white rounded-xl shadow p-6 space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">
            <p>{{ user.name }} {{ user.lastName }}</p>
            <br/>
          </h2>
          <div class="text-sm text-gray-500">
            <p>{{ user.email }}</p>
            <br/>
            <p>{{ user.phone }}</p>
            <br/>
            <p>{{ user.address }}</p>
            <br/>
            <p>{{ user.birthdate }}</p>
            <br/>
            <p>{{ user.gender }}</p>
            <br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
