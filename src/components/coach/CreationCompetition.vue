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
  <div class="p-8 bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl">
    <h3 class="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
      Planifier une compétition
    </h3>
    
    <!-- Infos session -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="group">
        <label class="block text-sm font-medium mb-2 text-slate-300 group-hover:text-slate-200 transition-colors">
          Date de la compétition
        </label>
        <input
          type="date"
          v-model="session.date_session"
          class="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
        />
      </div>
      
      <div class="group">
        <label class="block text-sm font-medium mb-2 text-slate-300 group-hover:text-slate-200 transition-colors">
          Durée (minutes)
        </label>
        <input
          type="number"
          min="1"
          v-model.number="session.duree"
          class="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
        />
      </div>
    </div>
    
    <!-- Submit -->
    <div class="pt-6">
      <button
        @click="submitSession"
        class="group relative px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-500 hover:to-emerald-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
      >
        <span class="relative z-10">Créer la compétition</span>
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    </div>
  </div>
</template>