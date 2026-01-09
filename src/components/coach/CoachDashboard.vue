<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CreationTraining from './CreationTraining.vue';
import CreationCompetition from './CreationCompetition.vue';
import GestionGroupes from './GestionGroupe.vue';
import CoachStat from './CoachStat.vue';
import InfosPersoCoach from './InfosPersoCoach.vue';
import { type Athlete, type CalendarEventType, type Coach } from '../../utils/types';
import CalandarContainer from '../calandar/CalandarContainer.vue';
import { ClubComposable } from '../../utils/composables/club';
import { CoachComposable } from '../../utils/composables/coach';
import { useAuthStore } from '../../utils/stores/login';

const router = useRouter();
const store = useAuthStore();
const user = store.currentUser;
const userCoach = ref<Coach | null>(null);
const clubController = new ClubComposable();
const CoachController = new CoachComposable();
const athletesList = ref<Athlete[]>([]);

onMounted(async () => {
  document.title = 'Tableau de Bord Coach - SportTrack';
  if (store.isAuthenticated === false || user.role !== 'COACH') {
    router.push({ name: 'Login' });
  }
  userCoach.value = await CoachController.getCoachById(user.id);
  athletesList.value = await clubController.getClubAthletes(userCoach.value.club.id);
});

const goToProfile = () => {
  router.push({
    name: 'Profile',
  });
};

type Action =
  | 'training'
  | 'match'
  | 'athletes'
  | 'stats'
  | null;

const activeAction = ref<Action>(null);
const activeCard = ref<number | null>(null);

const events = ref<CalendarEventType[]>([]);

onMounted(() => {
  events.value = [
    {
      id: 1,
      title: 'Entraînement Technique',
      description: 'Session de travail technique',
      start: new Date(2026, 0, 10, 10, 0).toISOString(),
      end: new Date(2026, 0, 10, 12, 0).toISOString(),
      type: 'training',
      location: 'Stade Central',
    },
    {
      id: 2,
      title: 'Match Officiel',
      description: 'Match contre rival',
      start: new Date(2026, 0, 12, 15, 0).toISOString(),
      end: new Date(2026, 0, 12, 17, 0).toISOString(),
      type: 'match',
      location: 'Stade Municipal',
    },
    {
      id: 3,
      title: 'Récupération',
      description: 'Séance de récupération',
      start: new Date(2026, 0, 13, 9, 0).toISOString(),
      end: new Date(2026, 0, 13, 10, 30).toISOString(),
      type: 'recovery',
      location: 'Centre de Récupération',
    },
    {
      id: 4,
      title: 'Préparation Physique',
      description: 'Renforcement musculaire',
      start: new Date(2026, 0, 15, 14, 0).toISOString(),
      end: new Date(2026, 0, 15, 15, 30).toISOString(),
      type: 'training',
      location: 'Gymnase',
    },
  ];
});

const actionCards = [
  {
    action: 'training',
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    label: 'Créer un entraînement',
    gradient: 'from-blue-600 to-purple-600',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400'
  },
  {
    action: 'match',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    label: 'Planifier un match',
    gradient: 'from-green-600 to-emerald-600',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-400'
  },
  {
    action: 'athletes',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    label: 'Gérer les groupes',
    gradient: 'from-purple-600 to-pink-600',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-400'
  },
  {
    action: 'stats',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    label: 'Voir les statistiques',
    gradient: 'from-orange-600 to-red-600',
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-400'
  }
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
    <!-- Effets de fond -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
          Tableau de Bord Coach
        </h1>
        <div class="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:bg-slate-800/60 hover:border-white/10 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Informations du coach</h2>
            <button @click="goToProfile" class="group flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all duration-300 hover:scale-105">
              <svg class="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="font-medium text-slate-200 group-hover:text-white transition-colors">Voir le profil</span>
            </button>
          </div>
          <InfosPersoCoach v-if="userCoach" :coach="userCoach" />
        </div>
      </div>

      <!-- Calendrier -->
      <div class="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 mb-8 hover:bg-slate-800/60 hover:border-white/10 transition-all duration-300">
        <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Mon Calendrier d'Entraînement
        </h2>
        <CalandarContainer :events="events" />
      </div>

      <!-- Actions rapides -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Actions rapides
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            v-for="(card, index) in actionCards"
            :key="index"
            @click="activeAction = card.action as Action"
            @mouseenter="activeCard = index"
            @mouseleave="activeCard = null"
            class="group relative p-8 bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl hover:bg-slate-800/60 hover:border-white/10 transition-all duration-300 cursor-pointer text-left"
            :class="activeCard === index ? 'scale-105' : ''"
          >
            <div 
              class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              :class="`bg-gradient-to-r ${card.gradient}`"
            ></div>

            <div class="relative z-10">
              <div 
                class="mb-4 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                :class="[card.bgColor, activeCard === index ? 'scale-110' : '']"
              >
                <svg class="w-7 h-7 transition-colors" :class="card.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="card.icon" />
                </svg>
              </div>
              <span 
                class="text-lg font-semibold transition-all duration-300"
                :class="activeCard === index ? `bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent` : 'text-slate-200'"
              >
                {{ card.label }}
              </span>
            </div>
          </button>
        </div>
      </div>

      <!-- Interface dynamique -->
      <div v-if="activeAction" class="bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 hover:bg-slate-800/60 hover:border-white/10 transition-all duration-300">
        <div v-if="activeAction === 'training'" class="space-y-6">
          <CreationTraining />
        </div>

        <div v-else-if="activeAction === 'match'">
          <CreationCompetition />
        </div>

        <div v-else-if="activeAction === 'athletes'">
          <GestionGroupes :club-id="1" />
        </div>

        <div v-else-if="activeAction === 'stats'">
          <CoachStat />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>