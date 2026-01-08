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
    // Retirer l'athlète supprimé de la liste locale
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
      <table class="w-full border-collapse border border-gray-200">
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
              <button
                @click="deleteAthlete(athlete.id)"
                class="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </td>
          </tr>
          <tr v-if="athletes.length === 0">
            <td colspan="5" class="text-center p-4 text-gray-500">
              Aucun athlète disponible
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table th, table td {
  vertical-align: middle;
}
</style>
