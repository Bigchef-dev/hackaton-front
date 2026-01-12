<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CreationAthlete from './CreationAthlete.vue'
import CreationCoach from './CreationCoach.vue'
import InfosPerso from './InfosPerso.vue'
import StatPres from './StatPres.vue'
import DeleteX from './DeleteX.vue'
import DeleteAthlete from './DeleteAthlete.vue'
import { useAuthStore } from '../../utils/stores/login'
import { PresidentComposable } from '../../utils/composables/president'
import { ClubComposable } from '../../utils/composables/club'
import type { Athlete, Club, Coach, President } from '../../utils/types'
import { UserComposable } from '../../utils/composables/user'
import { fetchModule } from 'vite'

const router = useRouter()
const store = useAuthStore()
const user = store.currentUser

const userPresident = ref<President | null>(null)
const club = ref<Club | null>(null)
const athletes = ref<Athlete[]>([])
const coachesList = ref<Coach[]>([])
const freeAthletes = ref<Athlete[]>([])

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
  userController.getUnhandledAthletes().then((freeAths) => {
    freeAthletes.value = freeAths
  })

  athletes.value = club.value?.athletes ?? []
  coachesList.value = club.value?.coaches ?? []
})



function deleteCoach(coachId: number) {
  userController.deleteUser(coachId).then(async () => {
    if (club.value) {
      const updatedClub = await clubController.getClubById(club.value.id)
      coachesList.value = updatedClub.coaches || []
    }
  })
}

function deleteAthlete(athleteId: number) {
  clubController.removeAthleteFromClub(club.value!.id, athleteId).then(async () => {
    if (club.value) {
      const updatedClub = await clubController.getClubById(club.value.id)
      athletes.value = updatedClub.athletes || []
    }
    userController.getUnhandledAthletes().then((freeAths) => {
      freeAthletes.value = freeAths
    })
  })
}

function addAthlete(athlete: number) {
  clubController.addAthleteToClub(club.value!.id, athlete).then(async () => {
    if (club.value) {
      const updatedClub = await clubController.getClubById(club.value.id)
      athletes.value = updatedClub.athletes || []
      // Met à jour la liste des athlètes libres
      userController.getUnhandledAthletes().then((freeAths) => {
        freeAthletes.value = freeAths
      })
    }
  })
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">

    <!-- HEADER -->
    <header class="mb-14">
      <h1
        class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Tableau de bord – Président
      </h1>

      <div class="relative bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-2xl font-semibold">Informations personnelles</h2>

          <button @click="goToProfile"
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-slate-600 transition-all hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Voir le profil
          </button>
        </div>

        <InfosPerso v-if="userPresident" :president="userPresident" />
      </div>
    </header>

    <!-- ACTIONS -->
    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Gestion du club
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- COACHS -->
        <button @click="activeAction = activeAction === 'coach' ? null : 'coach'"
          class="group relative p-6 bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-2xl hover:bg-blue-900/40 transition-all hover:scale-105">
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-full bg-blue-500/20 text-blue-400 text-2xl">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="font-semibold text-lg">Gérer les coachs</span>
          </div>
        </button>


        <!-- ATHLETES -->
        <button @click="activeAction = activeAction === 'athletes' ? null : 'athletes'"
          class="group relative p-6 bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-2xl hover:bg-green-900/40 transition-all hover:scale-105">
          <div class="flex items-center gap-4">
            <div class="p-3 rounded-full bg-green-500/20 text-green-400 text-2xl">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span class="font-semibold text-lg">Gérer les athlètes</span>
          </div>
        </button>
      </div>
    </section>

    <!-- CONTENU DYNAMIQUE -->
    <section class="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-8">
      <div v-if="activeAction === null" class="grid md:grid-cols-2 gap-8">
        <div>
          <DeleteX :coaches="[]" :is-coach="false" :athletes="athletes" @delete-athlete="deleteAthlete" @delete-coach="deleteCoach" />
          <button @click="activeAction = 'athletes'" class="mt-4 text-blue-400 hover:underline">
            + Ajouter un athlète
          </button>
        </div>

        <div>
          <DeleteX :coaches="coachesList" :is-coach="true" :athletes="[]" @delete-coach="deleteCoach" @delete-athlete="deleteAthlete" />
          <button @click="activeAction = 'coach'" class="mt-4 text-purple-400 hover:underline">
            + Ajouter un coach
          </button>
        </div>
      </div>

      <div v-else-if="activeAction === 'coach'" class="space-y-8">
        <!-- <CreationCoach /> -->
        <DeleteX :coaches="coachesList" :is-coach="true" :athletes="[]" @delete-coach="deleteCoach" @delete-athlete="deleteAthlete" />
      </div>

      <div v-else-if="activeAction === 'athletes'" class="space-y-8">
        <CreationAthlete :athletes="freeAthletes" @associate-athlete="addAthlete" />
        <DeleteX :coaches="[]" :is-coach="false" :athletes="athletes" @delete-athlete="deleteAthlete" @delete-coach="deleteCoach" />
      </div>

      <div v-else-if="activeAction === 'stats'">
        <StatPres />
      </div>
    </section>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #020617;
}

::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>