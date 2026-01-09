<script setup lang="ts">
import { ref } from 'vue';
import type { Coach, Athlete } from '../../utils/types';
import UserInfoModal from '../UserInfoModal.vue';

const loading = ref(false);
const usingFakeData = ref(false);
const selectedCoach = ref<Coach | null>(null);
const selectedAthlete = ref<Athlete | null>(null);

const props = defineProps({
  coaches: {
    type: Array as () => Coach[],
    required: true,
  },
  athletes: {
    type: Array as () => Athlete[],
    required: true,
  },
  isCoach: {
    type: Boolean,
    required: true,
  },
});

const selectedUser = (user: any) => {
    if (props.isCoach){
        selectedCoach.value = user as Coach;
        return;
    }
    else {
        selectedAthlete.value = user as Athlete;
        return;
    }
};

const closeUserDetails = () => {
    if (props.isCoach){
        selectedCoach.value = null;
        return;
    }
    else {
        selectedAthlete.value = null;
        return;
    }
};



</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div v-if= "props.isCoach">
        <h3 class="text-xl font-bold mb-4">
            Voir / Supprimer un coach
        </h3>
    </div>
    <div v-else>
        <h3 class="text-xl font-bold mb-4">
            Voir / Supprimer un athlète
        </h3>
    </div>

    <!-- Avertissement données de démonstration -->
    <div v-if="usingFakeData" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
      ⚠️ Données de démonstration affichées (erreur de connexion)
    </div>

    <div v-if="loading" class="text-gray-500">
        <div v-if="props.isCoach">
            Chargement des coachs...
        </div>
        <div v-else>
            Chargement des athlètes...
        </div>
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
          <tr v-for="user in props.isCoach ? props.coaches : props.athletes" :key="user.id" class="hover:bg-gray-50">
            <td class="border p-2" @click="selectedUser(user)">{{ user.name }}</td>
            <td class="border p-2" @click="selectedUser(user)">{{ user.lastName }}</td>
            <td class="border p-2" @click="selectedUser(user)">{{ user.email }}</td>
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
            <div v-if="isCoach">
                <td colspan="5" class="text-center p-4 text-gray-500">
                    Aucun coach disponible
                </td>
            </div>
            <div v-else>
                <td colspan="5" class="text-center p-4 text-gray-500">
                    Aucun athlète disponible
                </td>
            </div>
          </tr>
        </tbody>
      </table>

      <!-- Mobile cards -->
      <div class="md:hidden space-y-4">
        <div v-for="user in props.isCoach ? props.coaches : props.athletes" :key="user.id" class="border rounded-lg p-4 shadow-sm bg-gray-50 space-y-2">
          <div><span class="font-semibold">Prénom:</span> {{ user.name }}</div>
          <div><span class="font-semibold">Nom:</span> {{ user.lastName }}</div>
          <div><span class="font-semibold">Email:</span> {{ user.email }}</div>
          <button
            @click=""
            class="text-red-600 hover:underline mt-2"
          >
            Supprimer
          </button>
        </div>
        <div v-if="props.isCoach && coaches.length === 0" class="text-center text-gray-500 p-4">
          Aucun coach disponible
        </div>
        <div v-else-if="!props.isCoach && athletes.length === 0" class="text-center text-gray-500 p-4">
          Aucun athlète disponible
        </div>
      </div>
    </div>

    <!-- Modal d'affichage des détails du coach -->
    <div v-if= "props.isCoach">
        <UserInfoModal 
        v-if="selectedCoach" 
        :user="selectedCoach" 
        @close="closeUserDetails" 
        />
    </div>
    <div v-else>
        <UserInfoModal 
        v-if="selectedAthlete" 
        :user="selectedAthlete" 
        @close="closeUserDetails" 
        />
    </div>
  </div>
</template>

<style scoped>
table th,
table td {
  vertical-align: middle;
}
</style>
