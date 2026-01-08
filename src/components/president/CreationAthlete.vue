<script setup lang="ts">
import { ref } from 'vue';

interface Athlete {
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
  level: string;
}

const athletes = ref<Athlete[]>([
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
    level: '',
  }
]);

/* Actions */
const addAthlete = () => {
  athletes.value.push({
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
    level: '',
  });
};

const removeAthlete = (index: number) => {
  if (athletes.value.length > 1) {
    athletes.value.splice(index, 1);
  }
};

const submitAthletes = () => {
  if (athletes.value.length === 0) {
    alert('Vous n\'avez créé aucun athlète');
    return;
  }

  const payload = {
    athletes: athletes.value,
  };

  console.log('Athlète(s) créés :', payload);
  // TODO: appel API
};

</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-bold mb-6">
      Créer un athlète
    </h3>

    <!-- Athlètes -->
    <div class="space-y-4">
      <h4 class="font-semibold">
        Athlètes
      </h4>

      <div
        v-for="(athlete, index) in athletes"
        :key="athlete.id"
        class="border rounded-lg p-4 space-y-3"
      >

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Prénom
            </label>
            <input
              type="text"
              v-model="athlete.name"
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
              v-model="athlete.lastName"
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
            v-model="athlete.email"
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
              v-model="athlete.phone"
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
              v-model="athlete.birthdate"
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
            v-model="athlete.address"
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
              v-model="athlete.gender"
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
              v-model="athlete.sport"
              class="w-full border rounded-md p-2"
              placeholder="Ex : Plongée Sous-Marine"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">
              Club
            </label>
            <input
              type="text"
              v-model="athlete.club"
              class="w-full border rounded-md p-2"
              placeholder="Ex : FC Pingouin"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Niveau
            </label>
            <select
              v-model="athlete.level"
              class="w-full border rounded-md p-2"
            >
              <option value="">Sélectionner</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        <button
          v-if="athletes.length > 1"
          @click="removeAthlete(index)"
          type="button"
          class="text-red-600 text-sm hover:underline mt-2"
        >
          Supprimer cet athlète
        </button>
      </div>

      <button
        @click="addAthlete"
        type="button"
        class="text-blue-600 font-medium hover:underline text-sm"
      >
        + Ajouter un athlète
      </button>
    </div>

    <!-- Submit -->
    <div class="pt-4">
      <button
        @click="submitAthletes"
        class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Créer l'athlète{{ athletes.length > 1 ? 's' : '' }}
      </button>
    </div>
  </div>
</template>