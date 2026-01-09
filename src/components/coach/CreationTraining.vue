<script setup lang="ts">
import { ref } from 'vue';
import { SessionComposable } from '../../utils/composables/session';
import type { Session, Activity, TypeMeasure } from '../../utils/types';

const sessionApi = new SessionComposable();

/* Session */
const session = ref<Session>({
  id: Date.now(),
  date_session: new Date(),
  reccurcivite: 0,
  duree: 60,
  id_sport: 1,
});

/* Activities et mesures */
const activities = ref<Activity[]>([
  { id: Date.now(), theme: '', id_type_stat: 0 },
]);

const typeMeasures = ref<TypeMeasure[]>([]);

/* Actions pour les activités */
const addActivity = () => {
  activities.value.push({
    id: Date.now(),
    theme: '',
    id_type_stat: 0,
  });
};

const removeActivity = (index: number) => {
  if (activities.value.length > 1) {
    const activityId = activities.value[index].id;
    typeMeasures.value = typeMeasures.value.filter((m: any) => m.activityId !== activityId);
    activities.value.splice(index, 1);
  }
};

/* Actions pour les mesures */
const addTypeMeasure = (activityId: number) => {
  typeMeasures.value.push({
    id: Date.now(),
    name: '',
    unit: '',
    activityId,
  });
};

const removeTypeMeasure = (index: number) => {
  if (typeMeasures.value.length > 1) {
    typeMeasures.value.splice(index, 1);
  }
};

const getTypeMeasuresForActivity = (activityId: number) => {
  return typeMeasures.value.filter((m: any) => m.activityId === activityId);
};

/* Soumission de la session via l'API */
const submitSession = async () => {
  if (!activities.value.length) {
    alert('Une session doit contenir au moins une activité');
    return;
  }

  try {
    const payload = {
      ...session.value,
      activities: activities.value,
      measures: typeMeasures.value,
    };

    const createdSession = await sessionApi.createSession(payload as Session);
    alert('Session créée avec succès');
    console.log('Session créée :', createdSession);

    // Reset formulaire
    session.value = { ...session.value, id: Date.now(), date_session: new Date() };
    activities.value = [{ id: Date.now(), theme: '', id_type_stat: 0 }];
    typeMeasures.value = [];
  } catch (error) {
    console.error(error);
    alert('Erreur lors de la création de la session ' + error);
  }
};
</script>

<template>
  <div class="p-8 bg-slate-800/40 backdrop-blur-md border border-white/5 rounded-2xl">
    <h3 class="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Créer un entraînement
    </h3>

    <!-- Infos session -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="group">
        <label class="block text-sm font-medium mb-2 text-slate-300 group-hover:text-slate-200 transition-colors">
          Date de la session
        </label>
        <input 
          type="date" 
          v-model="session.date_session" 
          class="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all" 
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
          class="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all" 
        />
      </div>
      
      <div class="group">
        <label class="block text-sm font-medium mb-2 text-slate-300 group-hover:text-slate-200 transition-colors">
          Récurrence (jours)
        </label>
        <input 
          type="number" 
          min="0" 
          v-model.number="session.reccurcivite" 
          class="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all" 
        />
      </div>
    </div>

    <!-- Activities -->
    <div class="space-y-6">
      <h4 class="text-xl font-semibold text-slate-200">Activités</h4>

      <div
        v-for="(activity, index) in activities"
        :key="activity.id"
        class="border border-slate-700 rounded-2xl p-6 space-y-4 bg-slate-900/30 hover:border-slate-600 transition-all"
      >
        <div class="group">
          <label class="block text-sm font-medium mb-2 text-slate-300 group-hover:text-slate-200 transition-colors">
            Thème
          </label>
          <input 
            type="text" 
            v-model="activity.theme" 
            class="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all" 
            placeholder="Ex : endurance, technique..." 
          />
        </div>

        <!-- Mesures -->
        <div class="space-y-4 mt-6 pl-6 border-l-2 border-purple-500/30">
          <h5 class="font-semibold text-sm text-slate-300">Mesures pour cette activité</h5>

          <div
            v-for="typeMeasure in getTypeMeasuresForActivity(activity.id)"
            :key="typeMeasure.id"
            class="border border-slate-700 rounded-xl p-4 space-y-3 bg-slate-900/50"
          >
            <div class="group">
              <label class="block text-sm font-medium mb-2 text-slate-300 group-hover:text-slate-200 transition-colors">
                Nom
              </label>
              <input 
                type="text" 
                v-model="typeMeasure.name" 
                class="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all" 
                placeholder="Ex : vitesse, distance..." 
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="group">
                <label class="block text-sm font-medium mb-2 text-slate-300 group-hover:text-slate-200 transition-colors">
                  Unité
                </label>
                <input 
                  type="text" 
                  v-model="typeMeasure.unit" 
                  class="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all" 
                  placeholder="Ex : km, sec..." 
                />
              </div>
            </div>

            <button 
              @click="removeTypeMeasure(typeMeasures.indexOf(typeMeasure))" 
              type="button" 
              class="text-red-400 text-sm hover:text-red-300 hover:underline transition-colors"
            >
              Supprimer cette mesure
            </button>
          </div>

          <button 
            @click="addTypeMeasure(activity.id)" 
            type="button" 
            class="text-purple-400 font-medium hover:text-purple-300 hover:underline text-sm transition-colors"
          >
            + Ajouter une mesure
          </button>
        </div>

        <button 
          v-if="activities.length > 1" 
          @click="removeActivity(index)" 
          type="button" 
          class="text-red-400 text-sm hover:text-red-300 hover:underline mt-4 transition-colors"
        >
          Supprimer cette activité
        </button>
      </div>

      <div class="flex gap-4">
        <button 
          @click="addActivity" 
          type="button" 
          class="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors"
        >
          + Ajouter une activité
        </button>

        <button 
          type="button" 
          class="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors"
        >
          + Ajouter une activité préexistante
        </button>
      </div>
    </div>

    <!-- Submit -->
    <div class="pt-8">
      <button 
        @click="submitSession" 
        class="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-purple-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
      >
        <span class="relative z-10">Créer la session</span>
        <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    </div>
  </div>
</template>