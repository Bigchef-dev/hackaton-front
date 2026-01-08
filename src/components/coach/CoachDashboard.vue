<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CreationTraining from './CreationTraining.vue';
import CreationCompetition from './CreationCompetition.vue';
import GestionAthlete from './GestionAthlete.vue';
import CoachStat from './CoachStat.vue';

const router = useRouter();

const goToProfile = () => {
  router.push({
    name: 'Profile',
    query: {
      user: JSON.stringify(coach.value)
    }
  });
  console.log('push done :', JSON.stringify(coach.value));
};

interface Athlete {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  gender: string;
  sport: string;
  club: string;
  level: string;
}

interface Coach {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  gender: string;
  sport: string;
  club: string;
  athletes: Athlete[];
}

const coach = ref<Coach>({
  name: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com',
  phone: '06 60 06 60 06',
  address: '8 place des Holder, 00000 Pôle-Nord',
  birthdate: '15/08/1990',
  gender: 'M',
  sport: 'Plongée Sous-Marine',
  club: 'FC Pingouin',
  athletes: [
    {
      name: 'Alice',
      lastName: 'Martin',
      email: 'alice.martin@example.com',
      phone: '06 12 34 56 78',
      address: '12 rue des Fleurs, 75000 Paris',
      birthdate: '15/08/1990',
      gender: 'F',
      sport: 'Plongée Sous-Marine',
      club: 'FC Pingouin',
      level: 'Avancé',
    },
    {
      name: 'Bob',
      lastName: 'Dupont',
      email: 'bob.dupont@example.com',
      phone: '06 12 34 56 78',
      address: '12 rue des Fleurs, 75000 Paris',
      birthdate: '15/08/1990',
      gender: 'M',
      sport: 'Plongée Sous-Marine',
      club: 'FC Pingouin',
      level: 'Intermédiaire',
    },
  ],
});

type Action =
  | 'training'
  | 'match'
  | 'athletes'
  | 'stats'
  | null;

const activeAction = ref<Action>(null);

</script>

<template>
  <div class="coach-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Tableau de Bord Coach</h1>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Informations du coach</h2>
          <button @click="goToProfile" class="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Voir le profil
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p class="text-sm text-gray-600">Nom</p>
            <p class="text-xl font-semibold text-gray-800">{{ coach.name }} {{ coach.lastName }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Sport</p>
            <p class="text-xl font-semibold text-gray-800">{{ coach.sport }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Club</p>
            <p class="text-xl font-semibold text-gray-800">{{ coach.club }}</p>
          </div>
          <div class="mt-1">
            <p v-for="athlete in coach.athletes" :key="athlete.name" class="text-sm text-gray-800">
              • {{ athlete.name }} ({{ athlete.level }})
            </p>
        </div>
      </div>
    </div>

    <!-- Actions rapides -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Actions rapides</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button @click="activeAction = 'training'" class="bg-white hover:bg-blue-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 rounded-full p-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <span class="font-semibold text-gray-800">Créer un entraînement</span>
          </div>
        </button>

        <button @click="activeAction = 'match'" class="bg-white hover:bg-green-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-green-100 rounded-full p-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <span class="font-semibold text-gray-800">Planifier un match</span>
          </div>
        </button>

        <button @click="activeAction = 'athletes'" class="bg-white hover:bg-purple-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 rounded-full p-3">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <span class="font-semibold text-gray-800">Gérer les athlètes</span>
          </div>
        </button>

        <button @click="activeAction = 'stats'" class="bg-white hover:bg-orange-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-orange-100 rounded-full p-3">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span class="font-semibold text-gray-800">Voir les statistiques</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Statistiques des Athlètes -->

    <!-- Calendrier TODO : link -->

    <!-- Interface dynamique -->
    <div v-if="activeAction" class="mt-12 bg-white rounded-lg shadow-md p-8">

      <div v-if="activeAction === 'training'" class="space-y-6">
        <CreationTraining />
      </div>

      <div v-else-if="activeAction === 'match'">
        <CreationCompetition />
      </div>

      <div v-else-if="activeAction === 'athletes'">
        <GestionAthlete />
      </div>

      <div v-else-if="activeAction === 'stats'">
        <CoachStat />
      </div>

    </div>
  </div>
  </div>
</template>

<style scoped>
.coach-dashboard {
  min-height: 100vh;
}
</style>
