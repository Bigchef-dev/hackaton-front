<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Session } from '../../utils/types';
import CalandarContainer from '../calandar/CalendarContainer.vue';


interface Athlete {
  name: string;
  sport: string;
  club: string;
  level: string;
}

const events = ref<Session[]>([]);
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
    date_session: new Date('2026-01-12T09:00:00'),
    recurrence: 7, // Hebdomadaire
    duree: 1.5,
    coach: 'Jean Entraineur',
    type: 'ENTRAINEMENT',
    id_sport: 1,
    activities: [{ id: 101, theme: 'Échauffement cardio' }, { id: 102, theme: 'Exercices de passes' }]
  },
  {
    id: 2,
    date_session: new Date('2026-01-14T18:30:00'),
    recurrence: 0,
    duree: 2,
    coach: 'Marc Arbitre',
    type: 'COMPETITION',
    id_sport: 1,
    activities: [{ id: 103, theme: 'Competition amical contre l\'équipe B' }]
  },
  {
    id: 3,
    date_session: new Date('2026-01-15T10:00:00'),
    recurrence: 7,
    duree: 1,
    coach: 'Lucie Coach',
    type: 'ENTRAINEMENT',
    id_sport: 2,
    activities: [{ id: 104, theme: 'Renforcement musculaire' }]
  },
  {
    id: 4,
    date_session: new Date('2026-01-18T10:00:00'),
    recurrence: 0,
    duree: 3,
    coach: 'Jean Entraineur',
    type: 'ENTRAINEMENT',
    id_sport: 1,
    activities: [{ id: 105, theme: 'Tactique et stratégie' }, { id: 106, theme: 'Analyse vidéo' }]
  },
  {
    id: 5,
    date_session: new Date('2026-01-18T15:00:00'),
    recurrence: 0,
    duree: 2,
    type: 'COMPETITION',
    id_sport: 1,
    activities: [{ id: 107, theme: 'Finale régionale' }]
  }
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
          <span class="text-gray-700">COMPETITION</span>
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
