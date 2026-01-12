<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Athlete } from '../../utils/types';
import UserInfoModal from '../UserInfoModal.vue';


const loading = ref(false);
const usingFakeData = ref(false);
const selectedAthlete = ref<Athlete | null>(null);
const props = defineProps({
  athletes: {
    type: Array as () => Athlete[],
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'deleteAthlete', athleteId: number): void;
}>();



const selectAthlete = (athlete: Athlete) => {
  selectedAthlete.value = athlete;
};

const closeAthleteDetails = () => {
  selectedAthlete.value = null;
};



</script>

<template>
  <div class="p-6  rounded-lg shadow-md">
    <h3 class="text-xl font-bold mb-4">Voir / Supprimer un athlète</h3>

    <!-- Avertissement données de démonstration -->
    <div v-if="usingFakeData" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
      ⚠️ Données de démonstration affichées (erreur de connexion)
    </div>

    <div v-if="loading" class="text-gray-500">
      Chargement des athlètes...
    </div>

    <div v-else>
      <!-- Table desktop -->
      <table class="hidden md:table w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2 text-left">Prénom</th>
            <th class="border p-2 text-left">Nom</th>
            <th class="border p-2 text-left">Email</th>
            <th class="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="athlete in athletes" :key="athlete.id" class="hover:bg-gray-50 cursor-pointer ">
            <td class="border p-2" @click="selectAthlete(athlete)">{{ athlete.name }}</td>
            <td class="border p-2" @click="selectAthlete(athlete)">{{ athlete.lastName }}</td>
            <td class="border p-2" @click="selectAthlete(athlete)">{{ athlete.email }}</td>
            <td class="border p-2">
              <button @click="emit('deleteAthlete', athlete.id)" class="border p-2 text-red-600 hover:underline">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="athletes.length === 0" class="text-center p-4 text-gray-500">
        Aucun athlète disponible
      </div>
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-4">
      <div v-for="athlete in athletes" :key="athlete.id" class="border rounded-lg p-4 shadow-sm bg-gray-50 space-y-2">
        <div><span class="font-semibold">Prénom:</span> {{ athlete.name }}</div>
        <div><span class="font-semibold">Nom:</span> {{ athlete.lastName }}</div>
        <div><span class="font-semibold">Email:</span> {{ athlete.email }}</div>
        <button @click="emit('deleteAthlete', athlete.id)" class="text-red-600 hover:underline mt-2 border p-2 rounded">
          Supprimer
        </button>
      </div>
      <div v-if="athletes.length === 0" class="text-center text-gray-500 p-4">
        Aucun athlète disponible
      </div>
    </div>

    <!-- Modal d'affichage des détails de l'athlète -->
    <UserInfoModal v-if="selectedAthlete" :user="selectedAthlete" @close="closeAthleteDetails" />
  </div>
</template>

<style scoped>
table th,
table td {
  vertical-align: middle;
}
</style>