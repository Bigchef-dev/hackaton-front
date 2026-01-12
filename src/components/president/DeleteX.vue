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
  if (props.isCoach) {
    selectedCoach.value = user as Coach;
  } else {
    selectedAthlete.value = user as Athlete;
  }
};

const closeUserDetails = () => {
  if (props.isCoach) {
    selectedCoach.value = null;
  } else {
    selectedAthlete.value = null;
  }
};
</script>

<template>
  <div
    class="relative p-6 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm hover:border-slate-600 transition-all duration-500"
  >
    <!-- Overlay gradient -->
    <div
      class="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
      :class="props.isCoach
        ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'
        : 'bg-gradient-to-r from-green-500/5 to-emerald-500/5'"
    ></div>

    <div class="relative z-10">
      <!-- Title -->
      <h3
        class="text-xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        {{ props.isCoach ? 'Voir / Supprimer un coach' : 'Voir / Supprimer un athlète' }}
      </h3>

      <!-- Fake data warning -->
      <div
        v-if="usingFakeData"
        class="mb-4 p-3 rounded-lg border border-yellow-500/40 bg-yellow-500/10 text-yellow-300 text-sm"
      >
        ⚠️ Données de démonstration affichées (erreur de connexion)
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-slate-400 text-sm">
        {{ props.isCoach ? 'Chargement des coachs...' : 'Chargement des athlètes...' }}
      </div>

      <!-- CONTENT -->
      <div v-else>
        <!-- Desktop table -->
        <table class="hidden md:table w-full border-collapse">
          <thead>
            <tr class="bg-slate-800/60 text-slate-300">
              <th class="p-3 text-left">Prénom</th>
              <th class="p-3 text-left">Nom</th>
              <th class="p-3 text-left">Email</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in props.isCoach ? props.coaches : props.athletes"
              :key="user.id"
              class="border-t border-slate-700 hover:bg-slate-800/40 transition cursor-pointer"
            >
              <td class="p-3" @click="selectedUser(user)">{{ user.name }}</td>
              <td class="p-3" @click="selectedUser(user)">{{ user.lastName }}</td>
              <td class="p-3" @click="selectedUser(user)">{{ user.email }}</td>
              <td class="p-3">
                <button class="text-red-400 hover:text-red-300 transition">
                  Supprimer
                </button>
              </td>
            </tr>

            <tr
              v-if="(props.isCoach ? props.coaches : props.athletes).length === 0"
            >
              <td colspan="4" class="text-center p-6 text-slate-500">
                {{ props.isCoach ? 'Aucun coach disponible' : 'Aucun athlète disponible' }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile cards -->
        <div class="md:hidden space-y-4">
          <div
            v-for="user in props.isCoach ? props.coaches : props.athletes"
            :key="user.id"
            class="p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition"
          >
            <div class="text-sm"><span class="text-slate-400">Prénom :</span> {{ user.name }}</div>
            <div class="text-sm"><span class="text-slate-400">Nom :</span> {{ user.lastName }}</div>
            <div class="text-sm"><span class="text-slate-400">Email :</span> {{ user.email }}</div>

            <button class="mt-3 text-red-400 hover:text-red-300 text-sm">
              Supprimer
            </button>
          </div>

          <div
            v-if="props.isCoach && props.coaches.length === 0"
            class="text-center text-slate-500 p-4"
          >
            Aucun coach disponible
          </div>

          <div
            v-else-if="!props.isCoach && props.athletes.length === 0"
            class="text-center text-slate-500 p-4"
          >
            Aucun athlète disponible
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <UserInfoModal
      v-if="props.isCoach && selectedCoach"
      :user="selectedCoach"
      @close="closeUserDetails"
    />

    <UserInfoModal
      v-if="!props.isCoach && selectedAthlete"
      :user="selectedAthlete"
      @close="closeUserDetails"
    />
  </div>
</template>

<style scoped>
table th,
table td {
  vertical-align: middle;
}
</style>
