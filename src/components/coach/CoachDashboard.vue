<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CreationTraining from './CreationTraining.vue';
import CreationCompetition from './CreationCompetition.vue';
import GestionGroupes from './GestionGroupe.vue';
import CoachStat from './CoachStat.vue';
import InfosPersoCoach from './InfosPersoCoach.vue';
import {  type CalendarEventType, type Group } from '../../utils/types';
import CalendarContainer from '../calendar/CalendarContainer.vue';
import { type Athlete, type Session, type Coach } from '../../utils/types';
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
const groupList = ref<Group[]>([]);

onMounted(async () => {
  document.title = 'Tableau de Bord Coach - SportTrack';
  if (store.isAuthenticated === false || user.role !== 'COACH') {
    router.push({ name: 'Login' });
  }
  userCoach.value = await CoachController.getCoachById(user.id);
  athletesList.value = (await clubController.getClubById(userCoach.value.club.id)).athletes || []; // TODO : dynamic club id
  groupList.value = (await clubController.getClubById(userCoach.value.club.id)).groups || [];

  console.log(athletesList.value);
  console.log(groupList.value);

});


function addGroup(name: string) {
  clubController.createGroup({ name, clubId: userCoach!.value!.club.id }).then(() => {
    clubController.getClubById(userCoach!.value!.club.id).then((club) => {
      groupList.value = club.groups || [];
    });
  });
}

function addAthleteToGroup(payload: { groupId: number; athleteId: number }) {
  console.log("Add Athlete " + payload.athleteId + " to group");

  clubController.addAthleteToGroup(payload.groupId, payload.athleteId).then(() => {
    clubController.getClubById(userCoach!.value!.club.id).then((club) => {
      athletesList.value = club.athletes || [];
      groupList.value = club.groups || [];
    });
  });
}

function removeAthleteFromGroup(payload: { groupId: number; athleteId: number }) {
  console.log("Remove Athlete " + payload.athleteId + " from group");

  clubController.removeAthleteFromGroup(payload.groupId, payload.athleteId).then(() => {
    clubController.getClubById(userCoach!.value!.club.id).then((club) => {
      athletesList.value = club.athletes || [];
      groupList.value = club.groups || [];
    });
  });
}

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

const events = ref<Session[]>([]);

onMounted(() => {
  events.value = [
    {
      id: 1,
      date_session: new Date(2026, 0, 10, 10, 0),
      type: 'ENTRAINEMENT',
      duree : 2,
      recurrence : 0,
      id_sport : 1
    },
    {
      id: 2,
      date_session: new Date(2026, 0, 12, 15, 0),
      type: 'COMPETITION',
      duree : 2,
      recurrence : 0,
      id_sport : 1
    },
    {
      id: 3,
      date_session: new Date(2026, 0, 13, 9, 0),
      type: 'ENTRAINEMENT',
      duree : 2,
      recurrence : 0,
      id_sport : 1
    },
    {
      id: 4,
      date_session: new Date(2026, 0, 15, 14, 0),
      type: 'ENTRAINEMENT',
      duree : 2,
      recurrence : 0,
      id_sport : 1

    },
  ];
});
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Voir le profil
          </button>
        </div>
        <InfosPersoCoach v-if="userCoach" :coach="userCoach" />
      </div>
    </div>

    <!-- Calendrier TODO : link -->
    <div class="bg-white rounded-2xl shadow-lg">
      <CalendarContainer :events="events" />
    </div>

    <!-- Actions rapides -->
    <br />
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Actions rapides</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button @click="activeAction = 'training'"
          class="bg-white hover:bg-blue-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 rounded-full p-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span class="font-semibold text-gray-800">Créer un entraînement</span>
          </div>
        </button>

        <button @click="activeAction = 'match'"
          class="bg-white hover:bg-green-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-green-100 rounded-full p-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="font-semibold text-gray-800">Planifier un match</span>
          </div>
        </button>

        <button @click="activeAction = 'athletes'"
          class="bg-white hover:bg-purple-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 rounded-full p-3">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="font-semibold text-gray-800">Gérer les groupes</span>
          </div>
        </button>

        <button @click="activeAction = 'stats'"
          class="bg-white hover:bg-orange-50 rounded-lg shadow-md p-6 text-left transition-colors">
          <div class="flex items-center gap-3">
            <div class="bg-orange-100 rounded-full p-3">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span class="font-semibold text-gray-800">Voir les statistiques</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Statistiques des Athlètes -->

    <!-- Interface dynamique -->
    <div v-if="activeAction" class="mt-12 bg-white rounded-lg shadow-md p-8">

      <div v-if="activeAction === 'training'" class="space-y-6">
        <CreationTraining :coach="userCoach!" :clubId="userCoach!.club.id" />
      </div>

      <div v-else-if="activeAction === 'match'">
        <CreationCompetition />
      </div>

      <div v-else-if="activeAction === 'athletes' && userCoach">
        <GestionGroupes :athletes="athletesList" :groups="groupList" :clubId="userCoach?.club.id" @add-group="addGroup"
          @add-athlete-to-group="addAthleteToGroup" @remove-athlete-from-group="removeAthleteFromGroup" />
        <!-- TODO : changer l'id par default !!!!!!!!!!!!!!!!! -->
      </div>

      <div v-else-if="activeAction === 'stats'">
        <CoachStat />
      </div>

    </div>
  </div>
</template>

<style scoped>
.coach-dashboard {
  min-height: 100vh;
}
</style>
