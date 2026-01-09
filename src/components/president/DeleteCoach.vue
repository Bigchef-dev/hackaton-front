<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CoachComposable } from '../../utils/composables/coach';
import type { Coach } from '../../utils/types';
import UserInfoModal from '../UserInfoModal.vue';

const coachApi = new CoachComposable();

const loading = ref(false);
const usingFakeData = ref(false);
const selectedCoach = ref<Coach | null>(null);


  defineProps({
    coaches: {
      type: Array as () => Coach[],
      required: true,
    },
  });

const selectCoach = (coach: Coach) => {
  selectedCoach.value = coach;
};

const closeCoachDetails = () => {
  selectedCoach.value = null;
};



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
            <td class="border p-2" @click="selectCoach(coach)">{{ coach.name }}</td>
            <td class="border p-2" @click="selectCoach(coach)">{{ coach.lastName }}</td>
            <td class="border p-2" @click="selectCoach(coach)">{{ coach.email }}</td>
            <td class="border p-2">
              <button
                @click=""
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
            @click=""
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

    <!-- Modal d'affichage des détails du coach -->
    <UserInfoModal 
      v-if="selectedCoach" 
      :user="selectedCoach" 
      @close="closeCoachDetails" 
    />
  </div>
</template>

<style scoped>
table th,
table td {
  vertical-align: middle;
}
</style>
