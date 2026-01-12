<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import CreationAthlete from './CreationAthlete.vue'
import CreationCoach from './CreationCoach.vue'
import InfosPerso from './InfosPerso.vue'
import StatPres from './StatPres.vue'
import { useAuthStore } from '../../utils/stores/login'
import { PresidentComposable } from '../../utils/composables/president'
import { ClubComposable } from '../../utils/composables/club'
import type { Athlete, Club, Coach, President } from '../../utils/types'
import DeleteX from './DeleteX.vue'
import { UserComposable } from '../../utils/composables/user'

const router = useRouter()
const store = useAuthStore()
const user = store.currentUser

const userPresident = ref<President | null>(null)
const club = ref<Club | null>(null)
const athletes = reactive<Athlete[]>([])
const coachesList = ref<Coach[]>([])
const unhandledAthletes = ref<Athlete[]>([])

const presidentController = new PresidentComposable()
const clubController = new ClubComposable()
const userController = new UserComposable()

type Action = 'coach' | 'athletes' | 'stats' | null
const activeAction = ref<Action>(null)

const goToProfile = () => {
  router.push({
    name: 'Profile',
    query: { user: JSON.stringify(userPresident.value) }
  })
}

onMounted(async () => {
  document.title = 'Dashboard Président – SportTrack'

  if (!store.isAuthenticated || user.role !== 'PRESIDENT') {
    router.push({ name: 'Login' })
    return
  }

  userPresident.value = await presidentController.getPresidentById(user.id)
  club.value = await clubController.getClubById(userPresident.value!.club.id)
  unhandledAthletes.value = await userController.getUnhandledAthletes()

  athletes.splice(0, athletes.length, ...(club.value?.athletes || []))
  coachesList.value = club.value?.coaches ?? []
  console.log(unhandledAthletes.value);

})

function associateAthlete(athleteId: number) {
  clubController.addAthleteToClub(
    userPresident.value!.club.id,
    athleteId
  ).then(async () => {
    const updatedClub = await clubController.getClubById(userPresident.value!.club.id);
    athletes.splice(0, athletes.length, ...(updatedClub?.athletes || []));
    unhandledAthletes.value = await userController.getUnhandledAthletes();
  })
}

function dissociateAthlete(athleteId: number) {
  console.log('dissociation of athlete '+ athleteId);
  
  clubController.removeAthleteFromClub(
    userPresident.value!.club.id,
    athleteId
  ).then(async () => {
    const updatedClub = await clubController.getClubById(userPresident.value!.club.id);
    athletes.splice(0, athletes.length, ...(updatedClub?.athletes || []));
    unhandledAthletes.value = await userController.getUnhandledAthletes();
  })
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
    <!-- Effets de fond animés -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <!-- HEADER -->
    <header class="relative mb-14">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6 backdrop-blur-sm">
        <span class="text-sm font-medium">Espace Président</span>
      </div>

      <h1 class="text-5xl md:text-6xl font-bold mb-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Tableau de bord
      </h1>

      <div class="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-500">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Informations personnelles
            </h2>

            <button
              @click="goToProfile"
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all hover:scale-105">
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
    </header>

    <!-- ACTIONS -->
    <section class="relative mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Gestion du club
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- ATHLETES -->
        <button
          @click="activeAction = activeAction === 'athletes' ? null : 'athletes'"
          class="group relative p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-slate-600 transition-all duration-500 cursor-pointer overflow-hidden">
          <div 
            class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-green-600 to-emerald-600"
          ></div>

          <div class="relative z-10 flex items-center gap-4">
            <div 
              class="text-5xl transition-transform duration-500">
              <svg class="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="text-left">
              <h3 
                class="text-2xl font-bold mb-2 text-green-400">
                Gérer les athlètes
              </h3>
              <p class="text-slate-400 text-sm">
                Ajoutez et supprimez les athlètes de votre club
              </p>
            </div>
          </div>
        </button>

        <!-- COACHS -->
        <button
          @click="activeAction = activeAction === 'coach' ? null : 'coach'"
          class="group relative p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-slate-600 transition-all duration-500 cursor-pointer overflow-hidden">
          <div 
            class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-blue-600 to-purple-600"
          ></div>

          <div class="relative z-10 flex items-center gap-4">
            <div 
              class="text-5xl transition-transform duration-500">
              <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="text-left">
              <h3 
                class="text-2xl font-bold mb-2 text-blue-400">
                Gérer les coachs
              </h3>
              <p class="text-slate-400 text-sm">
                Ajoutez et supprimez les coachs de votre club
              </p>
            </div>
          </div>
        </button>
      </div>
    </section>

    <!-- CONTENU DYNAMIQUE -->
    <section class="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-500">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      
      <div class="relative z-10">
        <div v-if="activeAction === null" class="grid md:grid-cols-2 gap-8">
          <div class="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Liste des athlètes
            </h3>
            <DeleteX :athletes="athletes" :isCoach="false" :coaches="[]" />
            <button @click="activeAction = 'athletes'" class="mt-4 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-all hover:scale-105">
              + Ajouter un athlète
            </button>
          </div>

          <div class="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Liste des coachs
            </h3>
            <DeleteX :coaches="coachesList" :isCoach="true" :athletes="[]" />
            <button @click="activeAction = 'coach'" class="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-all hover:scale-105">
              + Ajouter un coach
            </button>
          </div>
        </div>

        <div v-else-if="activeAction === 'coach'" class="space-y-8">
          <div class="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un coach
            </h3>
            <CreationCoach />
          </div>
          <div class="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Liste des coachs
            </h3>
            <DeleteX :coaches="coachesList" :isCoach="true" :athletes="[]"/>
          </div>
        </div>

        <div v-else-if="activeAction === 'athletes'" class="space-y-8">
          <div class="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un athlète
            </h3>
            <CreationAthlete :athletes="athletes" />
          </div>
          <div class="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Liste des athlètes
            </h3>
            <DeleteX :coaches="[]" :isCoach="false" :athletes="athletes"/>
          </div>
        </div>

        <div v-else-if="activeAction === 'stats'">
          <StatPres />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

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