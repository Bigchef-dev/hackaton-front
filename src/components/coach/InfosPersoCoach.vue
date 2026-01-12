<script setup lang="ts">
import type { Coach } from '../../utils/types';


const props = defineProps({
  coach: {
    type: Object as () => Coach,
    required: true
  },
});

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div>
      <p class="text-sm text-gray-600">Nom</p>
      <p class="text-xl font-semibold text-gray-800">{{ coach.name }} {{ coach.lastName }}</p>
    </div>
    <div>
      <p class="text-sm text-gray-600">Sport</p>
      <div v-for="sport in coach.sport" :key="sport.id">
        
        <p class="text-xl font-semibold text-gray-800">{{ sport.name }}</p>
      </div>

    </div>

    <div>
      <p class="text-sm text-gray-600">Club</p>
      <p class="text-xl font-semibold text-gray-800">{{ coach.club.name }}</p>
    </div>
    <!-- <div class="mt-1">
            <p v-for="athlete in coach.athletes" :key="athlete.name" class="text-sm text-gray-800">
              • {{ athlete.name }} ({{ athlete.level }})
            </p>
        </div> -->
  </div>
</template>