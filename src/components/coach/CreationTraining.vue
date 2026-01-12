<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SessionComposable } from '../../utils/composables/session';
import type { Session, Activity, TypeMeasure, SessionCreate, Coach, Group } from '../../utils/types';
import { ClubComposable } from '../../utils/composables/club';

const sessionApi = new SessionComposable();
const clubController = new ClubComposable();
const activitesExistantes = ref<Activity[]>([]);
const activiteSelectionnee = ref<number | null>(null);
const groupSelectionne = ref<number | null>(null);
const groupsClub = ref<Group[]>([]);

  const props = defineProps<{
    coach: Coach;
  }>();

onMounted(() => {
  sessionApi.getAllActivities().then((activities) => {
    activitesExistantes.value = activities;
    console.log('Activités préexistantes :', activities);
  });

  clubController.getClubById(props.coach.clubId).then((club) => {
    groupsClub.value = club.groups || [];
  });
});

/* Session */
const session = ref<SessionCreate>({
  title: 'Nouvelle Session',
  location: 'Salle de sport',
  date_session: new Date(),
  reccurrence: 0,
  duree: 60,
  id_sport: 1,
  type: 'TRAINING',
  activities_id: [],
  group_id: 0,
  coach_id: props.coach.id,
});

const typeMeasures = ref<TypeMeasure[]>([]);

// /* Actions pour les activités */
// const addActivity = () => {
//   if (!session.value.activities) {
//     session.value.activities = [];
//   }
//   const newActivity = { id: Date.now(), theme: '', baseMetric: { name: '', duration: 0, intensity: 'low', participants: 0 } };
//   session.value.activities.push(newActivity);
//   console.log(session.value.activities);
// };

const addExistingActivity = () => {
  if (!activiteSelectionnee.value) {
    alert('Veuillez sélectionner une activité');
    return;
  }

  if (!session.value.activities_id) {
    session.value.activities_id = [];
  }

  const alreadyAdded = session.value.activities_id.some(
    (id) => id === activiteSelectionnee.value
  );

  if (alreadyAdded) {
    alert('Cette activité est déjà ajoutée à la session');
    return;
  }

  const activityToAdd = activitesExistantes.value.find(
    (a) => a.id === activiteSelectionnee.value
  );

  if (activityToAdd) {
    session.value.activities_id.push(activityToAdd.id);
    activiteSelectionnee.value = null; // Reset selection
    console.log('Activité ajoutée :', activityToAdd);
  }
};

function addExistingGroup() {
  if (!groupSelectionne.value) {
    alert('Veuillez sélectionner un groupe');
    return;
  }

  session.value.group_id = groupSelectionne.value;
  console.log('Groupe ajouté à la session :', groupSelectionne.value);
};

const removeActivity = (index: number) => {
  if (session.value.activities_id && session.value.activities_id.length >= 1) {
    const activityId = session.value.activities_id[index];
    typeMeasures.value = typeMeasures.value.filter((m: any) => m.activityId !== activityId);
    session.value.activities_id.splice(index, 1);
  }
};

/* Soumission de la session via l'API */
const submitSession = async () => {
  console.log(session);
  
  if (!session.value.activities_id || session.value.activities_id.length === 0) {
    alert('Une session doit contenir au moins une activité');
    return;
  }

  try {
    const payload = {
      ...session.value,
      activities_id: session.value.activities_id,
    };

    console.log('Payload de la session à créer :', payload);
    const createdSession = await sessionApi.createSession(payload as SessionCreate);
    alert('Session créée avec succès');
    console.log('Session créée :', createdSession);

    // Reset formulaire
    session.value = {
      ...session.value,
      date_session: new Date(),
      activities_id: []
    };
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
        <label class="block text-sm font-medium mb-1">Titre de la session</label>
        <input type="text" v-model="session.title" class="w-full border rounded-md p-2" />
      </div>
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
        <input type="number" min="0" v-model.number="session.reccurrence" class="w-full border rounded-md p-2" />
      </div>
    </div>

    <!-- Activities -->
    <div class="space-y-4">
      <h4 class="font-semibold">Activités de la session</h4>

      <!-- Liste des activités ajoutées -->
      <div v-if="session.activities_id && session.activities_id.length > 0" class="space-y-3">
        <div v-for="(activityId, index) in session.activities_id" :key="activityId"
          class="border rounded-lg p-4 bg-gray-50 flex justify-between items-center">
          <div>
            <p class="font-medium">{{ activitesExistantes.find(a => a.id === activityId)?.type || 'Sans thème' }}</p>
            <p class="text-sm text-gray-600">ID: {{ activityId }}</p>
            <p class="text-sm text-gray-600">
              Métrique de l'activite:
              <span v-if="activitesExistantes.find(a => a.id === activityId)?.baseMetrics">
                {{ activitesExistantes.find(a => a.id === activityId)?.baseMetrics.name }},
                Durée: {{ activitesExistantes.find(a => a.id === activityId)?.baseMetrics.duration }} min,
                Intensité: {{ activitesExistantes.find(a => a.id === activityId)?.baseMetrics.intensity }},
              </span>
              <span v-else>
                Aucune métrique définie
              </span>
            </p>
          </div>
          <button @click="removeActivity(index)" type="button" class="text-red-600 text-sm hover:underline">
            Supprimer
          </button>
        </div>
      </div>

      <div v-else class="text-gray-500 text-sm italic">
        Aucune activité ajoutée pour le moment
      </div>

      <!-- Ajouter une nouvelle activité
      <div class="border-t pt-4 mt-4">
        <h5 class="font-semibold text-sm mb-3">Ajouter une nouvelle activité</h5>
        <button @click="addActivity" type="button" 
                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          + Créer une nouvelle activité
        </button>
      </div> -->

      <!-- Ajouter une activité existante -->
      <div class="border-t pt-4 mt-4">
        <h5 class="font-semibold text-sm mb-3">Ajouter une activité existante</h5>
        <div class="flex gap-2">
          <select v-model="activiteSelectionnee" class="flex-1 border rounded-md p-2">
            <option :value="null">-- Sélectionner une activité --</option>
            <option v-for="activity in activitesExistantes" :key="activity.id" :value="activity.id">
              {{ activity.type || 'Sans thème' }}
            </option>
          </select>
          <button type="button" @click="addExistingActivity"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap">
            Ajouter
          </button>
        </div>
      </div>

      <div class="border-t pt-4 mt-4">
        <h5 class="font-semibold text-sm mb-3">Ajouter une groupe à la session</h5>
        <div class="flex gap-2">
          <select v-model="groupSelectionne" class="flex-1 border rounded-md p-2">
            <option :value="null">-- Sélectionner un groupe --</option>
            <option v-for="group in groupsClub" :key="group.id" :value="group.id">
              {{ group.name || 'Sans nom' }}
            </option>
          </select>
          <button type="button" @click="addExistingGroup"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap">
            Ajouter
          </button>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="pt-6 border-t mt-6">
      <button @click="submitSession" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium">
        Créer la session
      </button>
    </div>
  </div>
</template>