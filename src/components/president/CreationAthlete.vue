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
  <div class="p-4 sm:p-6  rounded-lg shadow-md max-w-4xl mx-auto">
    <h3 class="text-xl font-bold mb-6 text-center sm:text-left">
      Associer un athlète à votre club
    </h3>

    <!-- Athlètes -->
    <div class="space-y-4">
      <h4 class="font-semibold text-lg">Athlètes disponibles</h4>

      <!-- Aucun athlète -->
      <div
        v-if="athletes.length === 0"
        class="text-sm text-gray-500 italic"
      >
        Aucun athlète sans club pour le moment.
      </div>

      <!-- Liste des athlètes -->
      <div
        v-for="(athlete, index) in athletes"
        :key="`athlete-${index}`"
        class="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-sm transition"
      >
        <!-- Infos athlète -->
        <div class="flex items-center gap-4">
          <div>
            <p class="font-medium text-gray-900">
              {{ athlete.name }} {{ athlete.lastName }}
            </p>
            <p class="text-sm text-gray-500">
              {{ athlete.email }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end">
          <button @click="associateAthleteToClub(athlete.id)" class="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Associer au club
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

