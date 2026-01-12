<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CoachComposable } from '../../utils/composables/coach';
import type { Coach, CreateCoachPayload } from '../../utils/types';

const coachApi = new CoachComposable();

const coaches = ref<CreateCoachPayload[]>([]);

const createEmptyCoach = (): CreateCoachPayload => ({
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
  gender: 'X',
  clubId: 0,
  password: 'adminpass',
  type: 'COACH',
  sportIds: [1],
});

onMounted(() => {
  // Initialiser avec un coach vide
  coaches.value = [createEmptyCoach()];
});

const addCoach = () => {
  coaches.value.push(createEmptyCoach());
};

const removeCoach = (index: number) => {
  if (coaches.value.length > 1) {
    coaches.value.splice(index, 1);
  }
};

const submitCoaches = async () => {
  if (!coaches.value.length) {
    alert("Vous n'avez créé aucun coach");
    return;
  }

  // Validation basique
  for (const coach of coaches.value) {
    if (!coach.name || !coach.lastName || !coach.email) {
      alert('Veuillez remplir au moins le prénom, nom et email pour chaque coach');
      return;
    }
  }

  try {
    for (const coach of coaches.value) {
      await coachApi.createCoach(coach);
    }

    alert('Coach(s) créé(s) avec succès');

    // Reset formulaire
    coaches.value = [createEmptyCoach()];
  } catch (error) {
    console.error(error);
    alert('Erreur lors de la création des coachs: ' + error);
  }
};
</script>

<template>
  <div
    class="relative p-6 rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm hover:border-slate-600 transition-all duration-500">
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500">
    </div>

    <div class="relative z-10">
      <!-- Title -->
      <h3
        class="text-2xl font-semibold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Créer un coach
      </h3>

      <!-- Desktop -->
      <div class="hidden md:grid grid-cols-1 gap-6">
        <div v-for="(coach, index) in coaches" :key="index"
          class="p-6 rounded-xl border border-slate-700 bg-slate-800/40 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <input v-model="coach.name" placeholder="Prénom *" class="form-input" />
            <input v-model="coach.lastName" placeholder="Nom *" class="form-input" />
          </div>

          <input v-model="coach.email" type="email" placeholder="Email *" class="form-input" />

          <div class="grid grid-cols-2 gap-4">
            <input v-model="coach.phoneNumber" placeholder="Téléphone" class="form-input" />
            <input v-model="coach.birthDate" type="date" class="form-input" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <select v-model="coach.gender" class="form-input">
              <option value="X">Autre</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
            <input v-model.number="coach.clubId" type="number" placeholder="Club ID" class="form-input" />
          </div>

          <button v-if="coaches.length > 1" @click="removeCoach(index)" type="button"
            class="text-red-400 hover:text-red-300 text-sm transition">
            Supprimer ce coach
          </button>
        </div>
      </div>

      <!-- Mobile -->
      <div class="md:hidden space-y-6">
        <div v-for="(coach, index) in coaches" :key="index"
          class="p-5 rounded-xl border border-slate-700 bg-slate-800/50 space-y-3">
          <input v-model="coach.name" placeholder="Prénom *" class="form-input" />
          <input v-model="coach.lastName" placeholder="Nom *" class="form-input" />
          <input v-model="coach.email" type="email" placeholder="Email *" class="form-input" />
          <input v-model="coach.phoneNumber" placeholder="Téléphone" class="form-input" />
          <input v-model="coach.birthDate" type="date" class="form-input" />

          <select v-model="coach.gender" class="form-input">
            <option value="X">Autre</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>



          <select v-model="coach.sportId" ></select>
          

          <button v-if="coaches.length > 1" @click="removeCoach(index)" type="button"
            class="text-red-400 hover:text-red-300 text-sm">
            Supprimer ce coach
          </button>
        </div>
      </div>

      <!-- Add coach -->
      <button @click="addCoach" type="button" class="mt-6 text-blue-400 hover:text-blue-300 transition">
        + Ajouter un coach
      </button>

      <!-- Submit -->
      <div class="pt-6">
        <button @click="submitCoaches" class="px-6 py-2 rounded-lg font-medium
                 bg-gradient-to-r from-blue-500/20 to-purple-500/20
                 border border-blue-500/30 text-blue-400
                 hover:bg-blue-500/30 hover:scale-105
                 transition-all duration-300">
          Créer le coach{{ coaches.length > 1 ? 's' : '' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background-color: rgba(30, 41, 59, 0.6);
  /* slate-800 */
  border: 1px solid rgb(51, 65, 85);
  /* slate-700 */
  color: white;
  transition: all 0.2s ease;
}

.form-input::placeholder {
  color: rgb(148, 163, 184);
  /* slate-400 */
}

.form-input:focus {
  outline: none;
  border-color: rgb(96, 165, 250);
  /* blue-400 */
  background-color: rgba(30, 41, 59, 0.8);
}
</style>