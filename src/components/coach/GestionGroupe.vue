<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Group, Athlete } from '../../utils/types';

const props = defineProps<{
  athletes: Athlete[];
  groups: Group[];
  clubId: number;
}>();

const emit = defineEmits<{
  (e: 'addGroup', name: string): string;
  (e: 'removeGroup', groupId: number): number;
  (e: 'addAthleteToGroup', payload: { groupId: number; athleteId: number }): { groupId: number; athleteId: number };
  (e: 'removeAthleteFromGroup', payload: { groupId: number; athleteId: number }): { groupId: number; athleteId: number };
}>();

const loading = ref(false);
const usingFakeData = ref(false);

/* Groupes ouverts */
const openedGroupIds = ref<number[]>([]);

/* Panneau ajout athlète par groupe */
const showAddAthletePanel = ref<Record<number, boolean>>({});

/* Création de groupe */
const newGroupName = ref('');
const creatingGroup = ref(false);

// Utiliser computed au lieu de ref pour que groupAthletes soit réactif aux props
const groupAthletes = computed(() => {
  const groupAthletesMap: Record<number, Athlete[]> = {};
  props.athletes.forEach(athlete => {
    athlete.groups?.forEach(groupId => {
      if (!groupAthletesMap[groupId.id]) {
        groupAthletesMap[groupId.id] = [];
      }
      groupAthletesMap[groupId.id].push(athlete);
    });
  });
  return groupAthletesMap;
});

/* ---------------- HELPERS ---------------- */

const isGroupOpen = (groupId: number) =>
  openedGroupIds.value.includes(groupId);

const toggleGroup = (groupId: number) => {
  if (isGroupOpen(groupId)) {
    openedGroupIds.value = openedGroupIds.value.filter(id => id !== groupId);
    showAddAthletePanel.value[groupId] = false;
  } else {
    openedGroupIds.value.push(groupId);
    showAddAthletePanel.value[groupId] = false;
  }
};

const getGroupAthletes = (groupId: number): Athlete[] =>
  groupAthletes.value[groupId] || [];

const getAllAthletesFromClubNotInGroup = (groupId: number): Athlete[] => {
  const athletesInGroup = new Set(
    getGroupAthletes(groupId).map(athlete => athlete.id)
  );

  return props.athletes.filter(
    athlete => !athletesInGroup.has(athlete.id)
  );
};

/* ---------------- ACTIONS ---------------- */

const removeAthleteFromGroup = (groupId: number, athleteId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir retirer cet athlète du groupe ?')) return;
  emit('removeAthleteFromGroup', { groupId, athleteId });
};

const addAthleteToGroup = (groupId: number) => {
  showAddAthletePanel.value[groupId] = true;
};

const addAthlete = (groupId: number, athlete: Athlete) => {
  emit('addAthleteToGroup', { groupId, athleteId: athlete.id });
};

/* ---------------- CREATE GROUP ---------------- */

const createGroup = async () => {
  if (!newGroupName.value.trim()) return;

  creatingGroup.value = true;

  try {
    if (!usingFakeData.value) {
      emit('addGroup', newGroupName.value);
    }

    newGroupName.value = '';
  } catch (e) {
    console.error(e);
    alert('Erreur lors de la création du groupe');
  } finally {
    creatingGroup.value = false;
  }
};
</script>

<template>
  <div>
    <h3 class="text-xl font-bold mb-4">Gestion des groupes</h3>

    <div v-if="usingFakeData" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
      ⚠️ Données de démonstration affichées
    </div>

    <p v-if="loading">Chargement...</p>

    <p v-else-if="props.groups.length === 0" class="text-gray-500">
      Aucun groupe pour ce club
    </p>

    <div v-else class="space-y-3">
      <div v-for="group in props.groups" :key="group.id" class="border rounded-lg overflow-hidden">
        <!-- HEADER -->
        <div class="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          :class="{ 'bg-blue-50': isGroupOpen(group.id) }" @click="toggleGroup(group.id)">
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ group.name }}</span>
            <span class="text-sm text-gray-500">
              ({{ getGroupAthletes(group.id).length }} athlètes)
            </span>
          </div>

          <button v-if="group.name != 'Default Group'" @click.stop="emit('removeGroup', group.id)" class="text-red-600 hover:underline text-sm">
            Supprimer
          </button>
        </div>

        <!-- CONTENT -->
        <div v-if="isGroupOpen(group.id)" class="bg-gray-50 p-4 border-t">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-semibold text-gray-700">Athlètes</h4>
            <button v-if="group.name != 'Default Group'" @click="addAthleteToGroup(group.id)"
              class="bg-blue-600 text-white px-3 py-1 rounded text-sm">
              + Ajouter
            </button>
          </div>

          <div v-if="getGroupAthletes(group.id).length === 0" class="text-gray-500">
            {{ group.name != 'Default Group' ? 'Aucun athlète dans ce groupe' : 'Aucun athlète dans le club, contactez votre président pour en ajouter.'}}
          </div>

          <ul v-else class="space-y-2">
            <li v-for="athlete in getGroupAthletes(group.id)" :key="athlete.id"
              class="bg-white border rounded p-3 flex justify-between items-center">
              <div>
                <div class="font-medium">
                  {{ athlete.name }} {{ athlete.lastName }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ athlete.email }}
                </div>
              </div>
              <button v-if="group.name != 'Default Group'" @click="removeAthleteFromGroup(group.id, athlete.id)"
                class="text-red-600 hover:underline text-sm">
                Retirer
              </button>
            </li>
          </ul>

          <!-- ADD ATHLETE PANEL -->
          <div v-if="showAddAthletePanel[group.id]" class="mt-4 bg-white border rounded-lg p-4">
            <div class="flex justify-between mb-2">
              <h5 class="font-semibold">Ajouter un athlète</h5>
              <button class="text-sm text-gray-500" @click="showAddAthletePanel[group.id] = false">
                Fermer
              </button>
            </div>

            <div v-if="getAllAthletesFromClubNotInGroup(group.id).length === 0" class="text-gray-500">
              Tous les athlètes sont déjà dans ce groupe
            </div>

            <ul v-else class="space-y-2">
              <li v-for="athlete in getAllAthletesFromClubNotInGroup(group.id)" :key="athlete.id"
                class="flex justify-between items-center border rounded p-2">
                <span>
                  {{ athlete.name }} {{ athlete.lastName }}
                </span>
                <button @click="addAthlete(group.id, athlete)"
                  class="text-green-600 text-xl font-bold border border-green-600 rounded-full w-7 h-7 flex items-center justify-center hover:bg-green-600 hover:text-white">
                  +
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CREATE GROUP -->
      <div class="mt-6 p-4 border rounded-lg bg-gray-50">
        <h4 class="font-semibold mb-2">Créer un nouveau groupe</h4>

        <div class="flex gap-2">
          <input v-model="newGroupName" type="text" placeholder="Nom du groupe"
            class="flex-1 border rounded px-3 py-2" />

          <button @click="createGroup" :disabled="creatingGroup || !newGroupName"
            class="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">
            Créer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>