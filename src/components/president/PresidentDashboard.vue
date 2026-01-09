<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CreationAthlete from './CreationAthlete.vue';
import CreationCoach from './CreationCoach.vue';
import InfosPerso from './InfosPerso.vue';
import StatPres from './StatPres.vue';
import DeleteCoach from './DeleteCoach.vue';
import DeleteAthlete from './DeleteAthlete.vue';
import { useAuthStore } from '../../utils/stores/login';
import { PresidentComposable } from '../../utils/composables/president';
import { type Athlete, type Club, type Coach, type President } from '../../utils/types';
import { ClubComposable } from '../../utils/composables/club';

const router = useRouter();
const store = useAuthStore();
const user = store.currentUser;
const userPresident = ref<President | null>(null);
const presidentController = new PresidentComposable();
const clubController = new ClubComposable();
const club = ref<Club | null>(null);
const coachesList = ref<Coach[]>([]);
const athletes = ref<Athlete[]>([]);

const goToProfile = () => {
  router.push({
    name: 'Profile',
    query: {
      user: JSON.stringify(userPresident.value)
    }
  });
};

onMounted(async () => {
  document.title = 'Tableau de Bord President - SportTrack';
  if (store.isAuthenticated === false || user.role !== 'PRESIDENT') {
    router.push({ name: 'Login' });
  }
  userPresident.value = await presidentController.getPresidentById(user.id);
  club.value = await clubController.getClubById(userPresident.value.club.id);
  athletes.value = club.value.athletes?.length ? club.value.athletes : [];
  coachesList.value = club.value.coaches?.length ? club.value.coaches : [];

  console.log(club.value);
  console.log(athletes.value);
  console.log(coachesList.value);


});



type Action =
  | 'coach'
  | 'athletes'
  | 'stats'
  | null;

const activeAction = ref<Action>(null);

</script>

<template>
  <div class="president-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">
        Tableau de bord – Président
      </h1>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            Informations personnelles
          </h2>

          <button @click="goToProfile" class="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Voir le profil
          </button>
        </div>

        <InfosPerso v-if="userPresident" :president="userPresident" />
      </div>
    </div>

    <!-- Actions Président -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Gestion du club
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <!-- Gérer les coachs -->
        <button @click="activeAction = activeAction === 'coach' ? null : 'coach'"
          class="bg-white hover:bg-blue-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 rounded-full p-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="font-semibold text-gray-800">
              Gérer les coachs
            </span>
          </div>
        </button>

        <!-- Gérer les athlètes -->
        <button @click="activeAction = activeAction === 'athletes' ? null : 'athletes'"
          class="bg-white hover:bg-green-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-green-100 rounded-full p-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="font-semibold text-gray-800">
              Gérer les athlètes
            </span>
          </div>
        </button>

        <!-- Statistiques du club -->
        <button @click="activeAction = activeAction === 'stats' ? null : 'stats'"
          class="bg-white hover:bg-orange-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-orange-100 rounded-full p-3">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span class="font-semibold text-gray-800">
              Statistiques du club
            </span>
          </div>
        </button>
      </div>
    </div>

    <!-- Interface dynamique -->
    <div v-if="activeAction === null" class="mt-12 bg-white rounded-lg shadow-md p-8">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          Gestion du club
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <div>
            <DeleteAthlete :athletes="athletes" />
            <button @click="activeAction = 'athletes'" type="button"
              class="text-blue-600 font-medium hover:underline mt-4">
              + Ajouter un athlète
            </button>

          </div>


          <div>
            <DeleteCoach :coaches="coachesList" />
            <button @click="activeAction = 'coach'" type="button"
              class="text-blue-600 font-medium hover:underline mt-4">
              + Ajouter un coach
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeAction" class="mt-12 bg-white rounded-lg shadow-md p-8">

      <div v-if="activeAction === 'coach'" class="space-y-6">
        <CreationCoach />
        <DeleteCoach :coaches="coachesList" />
      </div>

      <div v-else-if="activeAction === 'athletes'">
        <CreationAthlete />
        <DeleteAthlete :athletes="athletes" />
      </div>

      <div v-else-if="activeAction === 'stats'">
        <StatPres />
      </div>
    </div>
  </div>
</template>

<style scoped>
.president-dashboard {
  min-height: 100vh;
}
</style>
