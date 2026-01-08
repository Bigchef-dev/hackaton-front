<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CalendarEventType } from '../../utils/types';
import CalandarContainer from '../calandar/CalandarContainer.vue';

interface Athlete {
  name: string;
  sport: string;
  club: string;
  level: string;
}

const events = ref<CalendarEventType[]>([]);
const athlete = ref<Athlete>({
  name: 'John Doe',
  sport: 'Football',
  club: 'FC Example',
  level: 'Professional',
});

onMounted(() => {
  events.value = [
    {
      id: 1,
      title: 'Entraînement Technique',
      description: 'Session de travail technique',
      start: new Date(2026, 0, 10, 10, 0).toISOString(),
      end: new Date(2026, 0, 10, 12, 0).toISOString(),
      type: 'training',
      location: 'Stade Central',
    },
    {
      id: 2,
      title: 'Match Officiel',
      description: 'Match contre rival',
      start: new Date(2026, 0, 12, 15, 0).toISOString(),
      end: new Date(2026, 0, 12, 17, 0).toISOString(),
      type: 'match',
      location: 'Stade Municipal',
    },
    {
      id: 3,
      title: 'Récupération',
      description: 'Séance de récupération',
      start: new Date(2026, 0, 13, 9, 0).toISOString(),
      end: new Date(2026, 0, 13, 10, 30).toISOString(),
      type: 'recovery',
      location: 'Centre de Récupération',
    },
    {
      id: 4,
      title: 'Préparation Physique',
      description: 'Renforcement musculaire',
      start: new Date(2026, 0, 15, 14, 0).toISOString(),
      end: new Date(2026, 0, 15, 15, 30).toISOString(),
      type: 'training',
      location: 'Gymnase',
    },
  ];
});
</script>

<template>
  <div class="athlete-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Tableau de Bord Athlète</h1>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p class="text-sm text-gray-600">Nom</p>
            <p class="text-xl font-semibold text-gray-800">{{ athlete.name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Sport</p>
            <p class="text-xl font-semibold text-gray-800">{{ athlete.sport }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Club</p>
            <p class="text-xl font-semibold text-gray-800">{{ athlete.club }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Niveau</p>
            <p class="text-xl font-semibold text-gray-800">{{ athlete.level }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Calendrier -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Mon Calendrier d'Entraînement</h2>
      <CalandarContainer :events="events" />
    </div>

    <!-- Légende -->
    <div class="mt-6 bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Légende</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center gap-3">
          <div class="w-4 h-4 bg-blue-500 rounded"></div>
          <span class="text-gray-700">Entraînement</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-4 h-4 bg-red-500 rounded"></div>
          <span class="text-gray-700">Match</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-4 h-4 bg-green-500 rounded"></div>
          <span class="text-gray-700">Récupération</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.athlete-dashboard {
  min-height: 100vh;
}
</style>
