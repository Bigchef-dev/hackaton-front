<script setup lang="ts">
import { ref } from 'vue';

// Création entraînement

export interface Session {
  id: number;
  date_session: Date;
  reccurcivite: number;
  duree: number;
  id_sport: number;
}

export interface Activity {
  id: number;
  theme: string;
  id_type_stat: number;
}

const defaultActivity: Activity = {
  id: Date.now(),
  theme: 'Compétition',
  id_type_stat: 0,
}

/* Session */
const session = ref<Session>({
  id: Date.now(),
  date_session: new Date(),
  reccurcivite: 0,
  duree: 60,
  id_sport: 1,
});

const submitSession = () => {
  const payload = {
    ...session.value,
    activities: defaultActivity,
  };

  console.log('Session créée :', payload);
  // TODO: appel API
};
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-bold mb-4">
        Planifier une compétition
    </h3>
    
    <!-- Infos session -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
        <label class="block text-sm font-medium mb-1">
            Date de la compétition
        </label>
        <input
            type="date"
            v-model="session.date_session"
            class="w-full border rounded-md p-2"
        />
        </div>

        <div>
        <label class="block text-sm font-medium mb-1">
            Durée (minutes)
        </label>
        <input
            type="number"
            min="1"
            v-model.number="session.duree"
            class="w-full border rounded-md p-2"
        />
        </div>
    </div>

    <!-- Submit -->
    <div class="pt-4">
        <button
        @click="submitSession"
        class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
        Créer la compétition
        </button>
    </div>
    </div>
</template>