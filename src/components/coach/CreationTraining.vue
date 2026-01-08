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

export interface Measure {
  id: number;
  name: string;
  value: number;
  unity: string;
  activityId: number;
}

/* Session */
const session = ref<Session>({
  id: Date.now(),
  date_session: new Date(),
  reccurcivite: 0,
  duree: 60,
  id_sport: 1,
});

/* Activities (au moins 1) */
const activities = ref<Activity[]>([
  {
    id: Date.now(),
    theme: '',
    id_type_stat: 0,
  },
]);

const measures = ref<Measure[]>([]);

/* Actions */
const addActivity = () => {
  activities.value.push({
    id: Date.now(),
    theme: '',
    id_type_stat: 0,
  });
};

const removeActivity = (index: number) => {
  if (activities.value.length > 1) {
    // Supprimer aussi les mesures liées à cette activité
    const activityId = activities.value[index].id;
    measures.value = measures.value.filter(m => m.activityId !== activityId);
    activities.value.splice(index, 1);
  }
};

const addMeasure = (activityId: number) => {
  measures.value.push({
    id: Date.now(),
    name: '',
    value: 0,
    unity: '',
    activityId: activityId,
  });
};

const removeMeasure = (index: number) => {
  if (measures.value.length > 1) {
    measures.value.splice(index, 1);
  }
};

const getMeasuresForActivity = (activityId: number) => {
  return measures.value.filter(m => m.activityId === activityId);
};

const submitSession = () => {
  if (activities.value.length === 0) {
    alert('Une session doit contenir au moins une activité');
    return;
  }

  const payload = {
    ...session.value,
    activities: activities.value,
    measures: measures.value,
  };

  console.log('Session créée :', payload);
  // TODO: appel API
};

</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h3 class="text-xl font-bold">
        Créer un entraînement
    </h3>

    <!-- Infos session -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
        <label class="block text-sm font-medium mb-1">
            Date de la session
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

        <div>
        <label class="block text-sm font-medium mb-1">
            Récurrence (jours)
        </label>
        <input
            type="number"
            min="0"
            v-model.number="session.reccurcivite"
            class="w-full border rounded-md p-2"
        />
        </div>
    </div>

    <!-- Activities -->
    <div class="space-y-4">

        <h4 class="font-semibold">
        Activités
        </h4>

        <div
        v-for="(activity, index) in activities"
        :key="activity.id"
        class="border rounded-lg p-4 space-y-3"
        >

        <div>
            <label class="block text-sm font-medium mb-1">
            Thème
            </label>
            <input
            type="text"
            v-model="activity.theme"
            class="w-full border rounded-md p-2"
            placeholder="Ex : endurance, technique..."
            />
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">
            Type de statistique
            </label>
            <select
            v-model.number="activity.id_type_stat"
            class="w-full border rounded-md p-2"
            >
            <option disabled :value="0">Sélectionner</option>
            <option :value="1">Temps</option>
            <option :value="2">Répétitions</option>
            <option :value="3">Distance</option>
            </select>
        </div>

        <!-- Mesures pour cette activité -->
        <div class="space-y-3 mt-4 pl-4 border-l-2 border-gray-200">

            <h5 class="font-semibold text-sm">
            Mesures pour cette activité
            </h5>

            <div
            v-for="(measure) in getMeasuresForActivity(activity.id)"
            :key="measure.id"
            class="border rounded-lg p-3 space-y-2 bg-gray-50"
            >
            <div>
                <label class="block text-sm font-medium mb-1">
                Nom
                </label>
                <input
                type="text"
                v-model="measure.name"
                class="w-full border rounded-md p-2"
                placeholder="Ex : vitesse, distance..."
                />
            </div>

            <div class="grid grid-cols-2 gap-2">
                <div>
                <label class="block text-sm font-medium mb-1">
                    Valeur
                </label>
                <input
                    type="number"
                    v-model.number="measure.value"
                    class="w-full border rounded-md p-2"
                    placeholder="0"
                />
                </div>

            <div>
                <label class="block text-sm font-medium mb-1">
                    Unité
                </label>
                <input
                    type="text"
                    v-model="measure.unity"
                    class="w-full border rounded-md p-2"
                    placeholder="Ex : km, sec..."
                />
                </div>
            </div>

            <button
                @click="removeMeasure(measures.indexOf(measure))"
                type="button"
                class="text-red-600 text-sm hover:underline"
            >
                Supprimer cette mesure
            </button>
            </div>

            <button
            @click="addMeasure(activity.id)"
            type="button"
            class="text-blue-600 font-medium hover:underline text-sm"
            >
            + Ajouter une mesure
            </button>
        </div>

        <button
            v-if="activities.length > 1"
            @click="removeActivity(index)"
            type="button"
            class="text-red-600 text-sm hover:underline mt-2"
        >
            Supprimer cette activité
        </button>
        </div>

        <button
        @click="addActivity"
        type="button"
        class="text-blue-600 font-medium hover:underline"
        >
        + Ajouter une activité
        </button>
    </div>

    <!-- Submit -->
    <div class="pt-4">
        <button
        @click="submitSession"
        class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
        Créer la session
        </button>
    </div>
    </div>
</template>