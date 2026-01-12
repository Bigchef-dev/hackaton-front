<script setup lang="ts">
import { ref } from 'vue';
import type { Athlete } from '../../utils/types';

//const athletes = ref<Array<Athlete>>([]);

// const athletes = ref<Array<Athlete>>([
//   {
//     id: 1,
//     name: 'Lucas',
//     lastName: 'Martin',
//     email: 'lucas.martin@email.com',
//     birthDate: '22/05/2000',
//     phoneNumber: '0612345678',
//     gender: 'M',
//     type: 'ATHLETE',
//     id_league: 0,
//   },
//   {
//     id: 2,
//     name: 'Emma',
//     lastName: 'Durand',
//     email: 'emma.durand@email.com',
//     birthDate: '19/11/1998',
//     phoneNumber: '0698765432',
//     gender: 'F',
//     type: 'ATHLETE',
//     id_league: 0,
//   },
//   {
//     id: 3,
//     name: 'Thomas',
//     lastName: 'Lefevre',
//     email: 'thomas.lefevre@email.com',
//     birthDate: '15/03/1999',
//     phoneNumber: '0654321098',
//     gender: 'M',
//     type: 'ATHLETE',
//     id_league: 0,
//   },
//   {
//     id: 4,
//     name: 'Sarah',
//     lastName: 'Moreau',
//     email: 'sarah.moreau@email.com',
//     birthDate: '22/05/2000',
//     phoneNumber: '0612345678',
//     gender: 'F',
//     type: 'ATHLETE',
//     id_league: 0,
//   },
//   {
//     id: 5,
//     name: 'Nicolas',
//     lastName: 'Bernard',
//     email: 'nicolas.bernard@email.com',
//     birthDate: '10/07/1995',
//     phoneNumber: '0654321098',
//     gender: 'M',
//     type: 'ATHLETE',
//     id_league: 0,
//   },
// ]);

const props = defineProps({
  athletes: {
    type: Array as () => Athlete[],
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'associate-athlete', athleteId: number): void;
}>();
/*
const getAllAthletesWithoutClub = async () => {
  // TODO : appeler l'API pour récupérer les athlètes sans club
  const athletesWithoutClub = await athleteApi.getAllAthletesWithoutClub();
  athletes.value = athletesWithoutClub;
};
*/

const associateAthleteToClub = async (athleteId: number) => {
  emit('associate-athlete', athleteId);
};
</script>

<template>
  <div
    class="relative p-6 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm max-w-4xl mx-auto hover:border-slate-600 transition-all duration-500"
  >
    <!-- Overlay décoratif -->
    <div class="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

    <div class="relative z-10">
      <!-- Titre -->
      <h3
        class="text-2xl font-semibold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        Associer un athlète à votre club
      </h3>

      <!-- Athlètes -->
      <div class="space-y-6">
        <h4 class="text-lg font-medium text-slate-300">
          Athlètes disponibles
        </h4>

        <!-- Aucun athlète -->
        <div
          v-if="athletes.length === 0"
          class="text-slate-500 italic text-sm"
        >
          Aucun athlète sans club pour le moment.
        </div>

        <!-- Liste des athlètes -->
        <div
          v-for="(athlete, index) in athletes"
          :key="`athlete-${index}`"
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl border border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 transition-all duration-300"
        >
          <!-- Infos athlète -->
          <div>
            <p class="font-medium text-slate-100">
              {{ athlete.name }} {{ athlete.lastName }}
            </p>
            <p class="text-sm text-slate-400">
              {{ athlete.email }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end">
            <button
              @click="associateAthleteToClub(athlete.id)"
              class="px-4 py-2 text-sm font-medium rounded-lg
                     bg-gradient-to-r from-green-500/20 to-emerald-500/20
                     border border-green-500/30 text-green-400
                     hover:bg-green-500/30 hover:scale-105
                     transition-all duration-300"
            >
              Associer au club
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

