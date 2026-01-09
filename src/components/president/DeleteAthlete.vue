<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AthleteComposable } from '../../utils/composables/athlete';
import type { Athlete } from '../../utils/types';
import UserInfoModal from '../UserInfoModal.vue';

const athleteApi = new AthleteComposable();
const athletes = ref<Athlete[]>([]);
const loading = ref(false);
const usingFakeData = ref(false);
const selectedAthlete = ref<Athlete | null>(null);

// Données de démonstration
const fakeAthletes: Athlete[] = [
  {
    id: 1,
    name: 'Jean',
    lastName: 'Dupont',
    birthDate: '1990-01-01',
    phoneNumber: '06 12 34 56 78',
    email: 'jean.dupont@example.com',
    gender: "M",
    type: "ATHLETE",
    id_league: 0,
  },
  {
    id: 2,
    name: 'Marie',
    lastName: 'Martin',
    birthDate: '1992-02-02',
    email: 'marie.martin@example.com',
    phoneNumber: '06 98 76 54 32',
    gender: "F",
    type: "ATHLETE",
    id_league: 0,
  },
  {
    id: 3,
    name: 'Pierre',
    lastName: 'Dubois',
    birthDate: '1988-03-03',
    email: 'pierre.dubois@example.com',
    phoneNumber: '07 11 22 33 44',
    gender: "M",
    type: "ATHLETE",
    id_league: 0,
  },
  {
    id: 4,
    name: 'Sophie',
    lastName: 'Bernard',
    birthDate: '1995-04-04',
    email: 'sophie.bernard@example.com',
    phoneNumber: '06 55 66 77 88',
    gender: "F",
    type: "ATHLETE",
    id_league: 0,
  }
];

const loadAthletes = async () => {
  loading.value = true;
  try {
    athletes.value = await athleteApi.getAllAthletes();
    usingFakeData.value = false;
  } catch (error) {
    console.error(error);
    athletes.value = fakeAthletes;
    usingFakeData.value = true;
  } finally {
    loading.value = false;
  }
};

const selectAthlete = (athlete: Athlete) => {
  selectedAthlete.value = athlete;
};

const closeAthleteDetails = () => {
  selectedAthlete.value = null;
};

const deleteAthlete = async (athleteId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet athlète ?')) return;
  
  if (usingFakeData.value) {
    athletes.value = athletes.value.filter(a => a.id !== athleteId);
    if (selectedAthlete.value?.id === athleteId) {
      selectedAthlete.value = null;
    }
    alert('Athlète supprimé (données de démonstration)');
    return;
  }

  try {
    await athleteApi.deleteAthlete(athleteId);
    alert('Athlète supprimé avec succès');
    athletes.value = athletes.value.filter(a => a.id !== athleteId);
    if (selectedAthlete.value?.id === athleteId) {
      selectedAthlete.value = null;
    }
  } catch (error) {
    console.error(error);
    alert('Erreur lors de la suppression de l\'athlète');
  }
};

onMounted(() => {
  loadAthletes();
});
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
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
          <tr v-for="athlete in athletes" :key="athlete.id" class="hover:bg-gray-50 cursor-pointer">
            <td class="border p-2" @click="selectAthlete(athlete)">{{ athlete.name }}</td>
            <td class="border p-2" @click="selectAthlete(athlete)">{{ athlete.lastName }}</td>
            <td class="border p-2" @click="selectAthlete(athlete)">{{ athlete.email }}</td>
            <td class="border p-2">
              <button @click.stop="deleteAthlete(athlete.id)" class="text-red-600 hover:underline">
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
      <div
        v-for="athlete in athletes"
        :key="athlete.id"
        class="border rounded-lg p-4 shadow-sm bg-gray-50 space-y-2"
      >
        <div><span class="font-semibold">Prénom:</span> {{ athlete.name }}</div>
        <div><span class="font-semibold">Nom:</span> {{ athlete.lastName }}</div>
        <div><span class="font-semibold">Email:</span> {{ athlete.email }}</div>
        <button
          @click="deleteAthlete(athlete.id)"
          class="text-red-600 hover:underline mt-2"
        >
          Supprimer
        </button>
      </div>
      <div v-if="athletes.length === 0" class="text-center text-gray-500 p-4">
        Aucun athlète disponible
      </div>
    </div>

    <!-- Modal d'affichage des détails de l'athlète -->
    <UserInfoModal 
      v-if="selectedAthlete" 
      :user="selectedAthlete" 
      @close="closeAthleteDetails" 
    />
  </div>
</template>

<style scoped>
table th,
table td {
  vertical-align: middle;
}
</style>