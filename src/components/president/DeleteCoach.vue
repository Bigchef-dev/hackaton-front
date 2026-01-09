<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CoachComposable } from '../../utils/composables/coach';
import type { Coach } from '../../utils/types';

const coachApi = new CoachComposable();

const coaches = ref<Coach[]>([]);
const loading = ref(false);
const usingFakeData = ref(false);

// Données de démonstration
const fakeCoaches: Coach[] = [
  {
    id: 1,
    name: 'Jean',
    lastName: 'Dupont',
    birthDate: '1990-01-01',
    phoneNumber: '06 12 34 56 78',
    email: 'jean.dupont@example.com', // Validation logic for email format should be implemented in the application layer
    gender: "M",
    type: "COACH",
    clubId: 0,
  },

  {
    id: 2,
    name: 'Marie',
    lastName: 'Martin',
    birthDate: '1992-02-02',
    email: 'marie.martin@example.com',
    phoneNumber: '06 98 76 54 32',
    gender: "F",
    type: "COACH",
    clubId: 0,
  },
  {
    id: 3,
    name: 'Pierre',
    lastName: 'Dubois',
    birthDate: '1988-03-03',
    email: 'pierre.dubois@example.com',
    phoneNumber: '07 11 22 33 44',
    gender: "M",
    type: "COACH",
    clubId: 0,
  },
  {
    id: 4,
    name: 'Sophie',
    lastName: 'Bernard',
    birthDate: '1995-04-04',
    email: 'sophie.bernard@example.com',
    phoneNumber: '06 55 66 77 88',
    gender: "F",
    type: "COACH",
    clubId: 0,
  }
];

const loadCoaches = async () => {
  loading.value = true;
  try {
    coaches.value = await coachApi.getAllCoaches();
    usingFakeData.value = false;
  } catch (error) {
    console.error(error);
    // Utiliser les données de démonstration en cas d'erreur
    coaches.value = fakeCoaches;
    usingFakeData.value = true;
  } finally {
    loading.value = false;
  }
};

const deleteCoach = async (coachId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce coach ?')) return;
  
  // Si on utilise les données de démonstration, supprimer localement
  if (usingFakeData.value) {
    coaches.value = coaches.value.filter(c => c.id !== coachId);
    alert('Coach supprimé (données de démonstration)');
    return;
  }

  try {
    await coachApi.deleteCoach(coachId);
    alert('Coach supprimé avec succès');
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

    <!-- Avertissement données de démonstration -->
    <div v-if="usingFakeData" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
      ⚠️ Données de démonstration affichées (erreur de connexion)
    </div>

    <div v-if="loading" class="text-gray-500">
      Chargement des coachs...
    </div>

    <div v-else>
      <!-- Desktop table -->
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
          <tr v-for="coach in coaches" :key="coach.id" class="hover:bg-gray-50">
            <td class="border p-2">{{ coach.name }}</td>
            <td class="border p-2">{{ coach.lastName }}</td>
            <td class="border p-2">{{ coach.email }}</td>
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

      <!-- Mobile cards -->
      <div class="md:hidden space-y-4">
        <div
          v-for="coach in coaches"
          :key="coach.id"
          class="border rounded-lg p-4 shadow-sm bg-gray-50 space-y-2"
        >
          <div><span class="font-semibold">Prénom:</span> {{ coach.name }}</div>
          <div><span class="font-semibold">Nom:</span> {{ coach.lastName }}</div>
          <div><span class="font-semibold">Email:</span> {{ coach.email }}</div>
          <button
            @click="deleteCoach(coach.id)"
            class="text-red-600 hover:underline mt-2"
          >
            Supprimer
          </button>
        </div>
        <div v-if="coaches.length === 0" class="text-center text-gray-500 p-4">
          Aucun coach disponible
        </div>
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
