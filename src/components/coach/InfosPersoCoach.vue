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
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="group">
      <p class="text-sm text-slate-400 mb-2">Nom</p>
      <p class="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
        {{ coach.name }} {{ coach.lastName }}
      </p>
    </div>
    
    <div class="group">
      <p class="text-sm text-slate-400 mb-2">Sport</p>
      <div v-for="sport in coach.sport" :key="sport.id">
        <p class="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
          {{ sport.name }}
        </p>
      </div>
    </div>
    
    <div class="group">
      <p class="text-sm text-slate-400 mb-2">Club</p>
      <p class="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
        {{ coach.club.name }}
      </p>
    </div>
    
    <!-- <div class="mt-1">
      <p v-for="athlete in coach.athletes" :key="athlete.name" class="text-sm text-slate-300">
        • {{ athlete.name }} ({{ athlete.level }})
      </p>
    </div> -->
  </div>
</template>