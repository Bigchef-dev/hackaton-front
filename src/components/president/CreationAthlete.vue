<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AthleteComposable } from '../../utils/composables/athlete';
import type { Athlete, League } from '../../utils/types';
import { LeagueComposable } from '../../utils/composables/league';


const athleteApi = new AthleteComposable();

const athletes = ref<Athlete[]>([
  {
    id: 0,
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    gender: 'X',
    type: 'ATHLETE',
    id_league: 0,
  },
]);

const leagueApi = new LeagueComposable();
const leagues = ref<League[]>([]);

onMounted(async () => {
  try {
    leagues.value = await leagueApi.getAllLeagues();
  } catch (error) {
    console.error(error);
    alert('Erreur lors du chargement des ligues');
  }
});

const addAthlete = () => {
  athletes.value.push({
    id: athletes.value.length,
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    gender: 'X',
    type: 'ATHLETE',
    id_league: 0,
  });
};

const removeAthlete = (index: number) => {
  if (athletes.value.length > 1) {
    athletes.value.splice(index, 1);
  }
};

const submitAthletes = async () => {
  if (!athletes.value.length) {
    alert("Vous n'avez créé aucun athlète");
    return;
  }

  try {
    for (const athlete of athletes.value) {
      await athleteApi.createAthlete(athlete);
    }

    alert('Athlète(s) créé(s) avec succès');

    // reset formulaire
    athletes.value = [athletes.value[0]];
  } catch (error) {
    console.error(error);
    alert('Erreur lors de la création');
  }
};
</script>

<template>
  <div class="p-4 sm:p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
    <h3 class="text-xl font-bold mb-6 text-center sm:text-left">
      Créer un athlète
    </h3>

    <!-- Athlètes -->
    <div class="space-y-4">
      <h4 class="font-semibold text-lg">Athlètes</h4>

      <div
        v-for="(athlete, index) in athletes"
        :key="`athlete-${index}`"
        class="border rounded-lg p-4 space-y-3"
      >
        <!-- Prénom / Nom -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Prénom</label>
            <input type="text" v-model="athlete.name" class="w-full border rounded-md p-2" placeholder="Ex : Jean" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Nom</label>
            <input type="text" v-model="athlete.lastName" class="w-full border rounded-md p-2" placeholder="Ex : Dupont" />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input type="email" v-model="athlete.email" class="w-full border rounded-md p-2" placeholder="Ex : jean.dupont@example.com" />
        </div>

        <!-- Téléphone / Date de naissance -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Téléphone</label>
            <input type="tel" v-model="athlete.phoneNumber" class="w-full border rounded-md p-2" placeholder="Ex : 06 12 34 56 78" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Date de naissance</label>
            <input type="date" v-model="athlete.birthDate" class="w-full border rounded-md p-2" />
          </div>
        </div>

        <!-- Sexe / League -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Sexe</label>
            <select v-model="athlete.gender" class="w-full border rounded-md p-2">
              <option value="">Sélectionner</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
              <option value="X">Autre</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">League</label>
            <select v-model="athlete.id_league" class="w-full border rounded-md p-2">
              <option :value="0">Sélectionner une ligue</option>
              <option v-for="league in leagues" :key="league.id" :value="league.id">{{ league.nom }}</option>
            </select>
          </div>
        </div>

        <!-- Supprimer un athlète -->
        <button
          v-if="athletes.length > 1"
          @click="removeAthlete(index)"
          type="button"
          class="text-red-600 text-sm hover:underline mt-2 w-full sm:w-auto"
        >
          Supprimer cet athlète
        </button>
      </div>

      <!-- Ajouter un athlète -->
      <button
        @click="addAthlete"
        type="button"
        class="text-blue-600 font-medium hover:underline text-sm w-full sm:w-auto"
      >
        + Ajouter un athlète
      </button>
    </div>

    <!-- Submit -->
    <div class="pt-4">
      <button
        @click="submitAthletes"
        class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto"
      >
        Créer l'athlète{{ athletes.length > 1 ? 's' : '' }}
      </button>
    </div>
  </div>
</template>
