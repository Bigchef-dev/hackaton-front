<script setup lang="ts">
import { ref } from 'vue';
import { CoachComposable } from '../../utils/composables/coach';
import type { Coach } from '../../utils/types';

const coachApi = new CoachComposable();

const coaches = ref<Coach[]>([
  {
    id: 0,
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    gender: 'X',
    type: 'COACH',
    clubId: 0,
  },
]);

const addCoach = () => {
  coaches.value.push({
    id: Date.now() + Math.random(),
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    gender: 'X',
    type: 'COACH',
    clubId: 0,
  });
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

  try {
    for (const coach of coaches.value) {
      await coachApi.createCoach(coach);
    }

    alert('Coach(s) créé(s) avec succès');

    // Reset formulaire
    coaches.value = [coaches.value[0]];
    Object.assign(coaches.value[0], {
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
      gender: 'X',
      clubId: 0,
    });
  } catch (error) {
    console.error(error);
    alert('Erreur lors de la création des coachs');
  }
};
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-bold mb-6">Créer un coach</h3>

    <!-- Desktop grid -->
    <div class="hidden md:grid grid-cols-1 gap-4">
      <div
        v-for="(coach, index) in coaches"
        :key="coach.id"
        class="border rounded-lg p-4 space-y-3"
      >
        <div class="grid grid-cols-2 gap-4">
          <input v-model="coach.name" placeholder="Prénom" class="border rounded-md p-2" />
          <input v-model="coach.lastName" placeholder="Nom" class="border rounded-md p-2" />
        </div>
        <input v-model="coach.email" placeholder="Email" class="border rounded-md p-2 w-full" />
        <div class="grid grid-cols-2 gap-4">
          <input v-model="coach.phoneNumber" placeholder="Téléphone" class="border rounded-md p-2" />
          <input v-model="coach.birthDate" type="date" class="border rounded-md p-2" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <select v-model="coach.gender" class="border rounded-md p-2">
            <option value="">Sélectionner</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
            <option value="X">Autre</option>
          </select>
          <input v-model="coach.clubId" placeholder="ClubId" class="border rounded-md p-2" />
        </div>
        <button
          v-if="coaches.length > 1"
          @click="removeCoach(index)"
          type="button"
          class="text-red-600 text-sm hover:underline mt-2"
        >
          Supprimer ce coach
        </button>
      </div>
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-4">
      <div
        v-for="(coach, index) in coaches"
        :key="coach.id"
        class="border rounded-lg p-4 shadow-sm bg-gray-50 space-y-2"
      >
        <div><span class="font-semibold">Prénom:</span> <input v-model="coach.name" class="border rounded-md p-1 w-full" /></div>
        <div><span class="font-semibold">Nom:</span> <input v-model="coach.lastName" class="border rounded-md p-1 w-full" /></div>
        <div><span class="font-semibold">Email:</span> <input v-model="coach.email" class="border rounded-md p-1 w-full" /></div>
        <div><span class="font-semibold">Téléphone:</span> <input v-model="coach.phoneNumber" class="border rounded-md p-1 w-full" /></div>
        <div><span class="font-semibold">Date de naissance:</span> <input v-model="coach.birthDate" type="date" class="border rounded-md p-1 w-full" /></div>
        <div><span class="font-semibold">Sexe:</span> 
          <select v-model="coach.gender" class="border rounded-md p-1 w-full">
            <option value="">Sélectionner</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
            <option value="X">Autre</option>
          </select>
        </div>
        <div><span class="font-semibold">ClubId:</span> <input v-model="coach.clubId" class="border rounded-md p-1 w-full" /></div>
        <button
          v-if="coaches.length > 1"
          @click="removeCoach(index)"
          type="button"
          class="text-red-600 text-sm hover:underline mt-2"
        >
          Supprimer ce coach
        </button>
      </div>
    </div>

    <!-- <button
      @click="addCoach"
      type="button"
      class="text-blue-600 font-medium hover:underline mt-4"
    >
      + Ajouter un coach
    </button> -->

    <!-- Submit -->
    <div class="pt-4">
      <button
        @click="submitCoaches"
        class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Créer le coach{{ coaches.length > 1 ? 's' : '' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
input, select {
  width: 100%;
}
</style>
