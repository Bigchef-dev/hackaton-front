<script setup lang="ts">
import { ref } from 'vue';

interface Coach {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  gender: string;
  sport: string;
  club: string;
}

const coaches = ref<Coach[]>([
  {
    id: Date.now(),
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthdate: '',
    gender: '',
    sport: '',
    club: '',
  }
]);

/* Actions */
const addCoach = () => {
  coaches.value.push({
    id: Date.now() + Math.random(),
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthdate: '',
    gender: '',
    sport: '',
    club: '',
  });
};

const removeCoach = (index: number) => {
  if (coaches.value.length > 1) {
    coaches.value.splice(index, 1);
  }
};

const submitCoaches = () => {
  if (coaches.value.length === 0) {
    alert('Vous n\'avez créé aucun coach');
    return;
  }

  const payload = {
    coaches: coaches.value,
  };

  console.log('Coach(s) créés :', payload);
  // TODO: appel API
};
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-bold mb-6">
      Créer un coach
    </h3>

    <!-- Coaches -->
    <div class="space-y-4">
      <h4 class="font-semibold">
        Coachs
      </h4>

      <div
        v-for="(coach, index) in coaches"
        :key="coach.id"
        class="border rounded-lg p-4 space-y-3"
      >

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Prénom
            </label>
            <input
              type="text"
              v-model="coach.name"
              class="w-full border rounded-md p-2"
              placeholder="Ex : Jean"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Nom
            </label>
            <input
              type="text"
              v-model="coach.lastName"
              class="w-full border rounded-md p-2"
              placeholder="Ex : Dupont"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            v-model="coach.email"
            class="w-full border rounded-md p-2"
            placeholder="Ex : jean.dupont@example.com"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              v-model="coach.phone"
              class="w-full border rounded-md p-2"
              placeholder="Ex : 06 12 34 56 78"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Date de naissance
            </label>
            <input
              type="date"
              v-model="coach.birthdate"
              class="w-full border rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Adresse postale
          </label>
          <input
            type="text"
            v-model="coach.address"
            class="w-full border rounded-md p-2"
            placeholder="Ex : 12 rue des Fleurs, 75000 Paris"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Sexe
            </label>
            <select
              v-model="coach.gender"
              class="w-full border rounded-md p-2"
            >
              <option value="">Sélectionner</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Sport
            </label>
            <input
              type="text"
              v-model="coach.sport"
              class="w-full border rounded-md p-2"
              placeholder="Ex : Plongée Sous-Marine"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">
            Club
          </label>
          <input
            type="text"
            v-model="coach.club"
            class="w-full border rounded-md p-2"
            placeholder="Ex : FC Pingouin"
          />
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

      <button
        @click="addCoach"
        type="button"
        class="text-blue-600 font-medium hover:underline text-sm"
      >
        + Ajouter un coach
      </button>
    </div>

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