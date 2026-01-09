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
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-bold mb-4">Créer un entraînement</h3>

    <!-- Infos session -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium mb-1">Date de la session</label>
        <input type="date" v-model="session.date_session" class="w-full border rounded-md p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Durée (minutes)</label>
        <input type="number" min="1" v-model.number="session.duree" class="w-full border rounded-md p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Récurrence (jours)</label>
        <input type="number" min="0" v-model.number="session.reccurcivite" class="w-full border rounded-md p-2" />
      </div>
    </div>

    <!-- Activities -->
    <div class="space-y-4">
      <h4 class="font-semibold">Activités</h4>

      <div
        v-for="(activity, index) in activities"
        :key="activity.id"
        class="border rounded-lg p-4 space-y-3"
      >
        <div>
          <label class="block text-sm font-medium mb-1">Thème</label>
          <input type="text" v-model="activity.theme" class="w-full border rounded-md p-2" placeholder="Ex : endurance, technique..." />
        </div>

        <!-- Mesures -->
        <div class="space-y-3 mt-4 pl-4 border-l-2 border-gray-200">
          <h5 class="font-semibold text-sm">Mesures pour cette activité</h5>

          <div
            v-for="typeMeasure in getTypeMeasuresForActivity(activity.id)"
            :key="typeMeasure.id"
            class="border rounded-lg p-3 space-y-2 bg-gray-50"
          >
            <div>
              <label class="block text-sm font-medium mb-1">Nom</label>
              <input type="text" v-model="typeMeasure.name" class="w-full border rounded-md p-2" placeholder="Ex : vitesse, distance..." />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-sm font-medium mb-1">Unité</label>
                <input type="text" v-model="typeMeasure.unit" class="w-full border rounded-md p-2" placeholder="Ex : km, sec..." />
              </div>
            </div>

            <button @click="removeTypeMeasure(typeMeasures.indexOf(typeMeasure))" type="button" class="text-red-600 text-sm hover:underline">
              Supprimer cette mesure
            </button>
          </div>

          <button @click="addTypeMeasure(activity.id)" type="button" class="text-blue-600 font-medium hover:underline text-sm">
            + Ajouter une mesure
          </button>
        </div>

        <button v-if="activities.length > 1" @click="removeActivity(index)" type="button" class="text-red-600 text-sm hover:underline mt-2">
          Supprimer cette activité
        </button>
      </div>

      <button @click="addActivity" type="button" class="text-blue-600 font-medium hover:underline">
        + Ajouter une activité
      </button>

      <br/>

      <button type="button" class="text-blue-600 font-medium hover:underline">
        + Ajouter une activité préexistante
      </button>
    </div>

    <!-- Submit -->
    <div class="pt-4">
      <button @click="submitSession" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        Créer la session
      </button>
    </div>
  </div>
</template>
