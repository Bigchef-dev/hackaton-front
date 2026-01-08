<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CoachComposable } from '../../utils/composables/coach';
import type { Coach } from '../../utils/types';

const coachApi = new CoachComposable();

const coaches = ref<Coach[]>([]);
const loading = ref(false);

const loadCoaches = async () => {
  loading.value = true;
  try {
    coaches.value = await coachApi.getAllCoaches();
  } catch (error) {
    console.error(error);
    alert('Erreur lors du chargement des coachs');
  } finally {
    loading.value = false;
  }
};

const deleteCoach = async (coachId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce coach ?')) return;

  try {
    await coachApi.deleteCoach(coachId);
    alert('Coach supprimé avec succès');
    // Retirer le coach supprimé de la liste locale
    coaches.value = coaches.value.filter(c => c.id !== coachId);
  } catch (error) {
    console.error(error);
    alert('Erreur lors de la suppression du coach');
  }
};

onMounted(() => {
  loadCoaches();
});
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-bold mb-4">Voir / Supprimer un coach</h3>

    <div v-if="loading" class="text-gray-500">
      Chargement des coachs...
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
          <tr v-for="coach in coaches" :key="coach.id" class="hover:bg-gray-50">
            <td class="border p-2">{{ coach.name }}</td>
            <td class="border p-2">{{ coach.lastName }}</td>
            <td class="border p-2">{{ coach.email }}</td>
            <td class="border p-2">{{ coach.phoneNumber }}</td>
            <td class="border p-2">
              <button
                @click="deleteCoach(coach.id)"
                class="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </td>
          </tr>
          <tr v-if="coaches.length === 0">
            <td colspan="5" class="text-center p-4 text-gray-500">
              Aucun coach disponible
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
