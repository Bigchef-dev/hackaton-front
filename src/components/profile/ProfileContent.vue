<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  user: Object
})

const emit = defineEmits(['profile-updated'])

const form = ref({ ...props.user })

const submit = () => {
  // appel API ici
  emit('profile-updated', form.value)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-6 space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">
            <!-- <p>{{ user.name }} {{ user.lastName }}</p> -->
            <p>Amélie Dupond</p>
            <br/>
          </h2>
          <div class="text-sm text-gray-500">
            <!-- {{ user.email }} -->
            <p>Dupond@jsp.com</p> <br/>
            <!-- {{ user.phone }} -->
            <p>06 12 34 56 78</p> <br/>
            <!-- {{ user.address }} -->
            <p>12 rue des Fleurs, 75000 Paris</p> <br/>
            <!-- {{ user.birthdate }} -->
            <p>15/08/1990</p> <br/>
            <!-- {{ user.gender }} -->
            <p>F</p> <br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
