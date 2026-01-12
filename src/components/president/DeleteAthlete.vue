<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AthleteComposable } from '../../utils/composables/athlete';
import type { Athlete } from '../../utils/types';

const athleteApi = new AthleteComposable();

const athletes = ref<Athlete[]>([]);
const loading = ref(false);

const loadAthletes = async () => {
  loading.value = true;
  try {
    athletes.value = await athleteApi.getAllAthletes();
  } catch (error) {
    console.error(error);
    alert('Erreur lors du chargement des athlètes');
  } finally {
    loading.value = false;
  }
};

const deleteAthlete = async (athleteId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet athlète ?')) return;

  try {
    await athleteApi.deleteAthlete(athleteId);
    alert('Athlète supprimé avec succès');
    athletes.value = athletes.value.filter(a => a.id !== athleteId);
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
            <th class="border p-2 text-left">Téléphone</th>
            <th class="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="athlete in athletes" :key="athlete.id" class="hover:bg-gray-50">
            <td class="border p-2">{{ athlete.name }}</td>
            <td class="border p-2">{{ athlete.lastName }}</td>
            <td class="border p-2">{{ athlete.email }}</td>
            <td class="border p-2">{{ athlete.phoneNumber }}</td>
            <td class="border p-2">
              <button @click="deleteAthlete(athlete.id)" class="text-red-600 hover:underline">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile cards -->
      <div class="md:hidden space-y-4">
        <div
          v-for="athlete in athletes"
          :key="athlete.id"
          class="border rounded-lg p-4 shadow-sm bg-gray-50"
        >
          <div><span class="font-semibold">Prénom:</span> {{ athlete.name }}</div>
          <div><span class="font-semibold">Nom:</span> {{ athlete.lastName }}</div>
          <div><span class="font-semibold">Email:</span> {{ athlete.email }}</div>
          <div><span class="font-semibold">Téléphone:</span> {{ athlete.phoneNumber }}</div>
          <button
            @click="deleteAthlete(athlete.id)"
            class="text-red-600 hover:underline mt-2"
          >
            Supprimer
          </button>
        </div>
      </div>

      <div v-if="athletes.length === 0" class="text-center p-4 text-gray-500">
        Aucun athlète disponible
      </div>
    </div>
  </div>
</template>

<style scoped>
table th,
table td {
  vertical-align: middle;
}
</style>
