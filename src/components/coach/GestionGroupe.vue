<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ClubComposable } from '../../utils/composables/club';
import type { Group, Athlete } from '../../utils/types';

const props = defineProps<{
  clubId: number;
}>();

const clubApi = new ClubComposable();
const groups = ref<Group[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const usingFakeData = ref(false);
const selectedGroupId = ref<number | null>(null);
const showAddAthletePanel = ref(false);

/* ---------------- FAKE DATA ---------------- */

const fakeGroups: Group[] = [
  { id: 1, name: 'Groupe Débutants', id_club: props.clubId },
  { id: 2, name: 'Groupe Intermédiaires', id_club: props.clubId },
  { id: 3, name: 'Groupe Avancés', id_club: props.clubId },
  { id: 4, name: 'Groupe Compétition', id_club: props.clubId },
  { id: 5, name: 'Groupe Elite', id_club: props.clubId }
];

const fakeGroupAthletes: Record<number, Athlete[]> = {
  1: [
    { id: 1, name: 'Lucas', lastName: 'Petit', birthDate: '2011-05-15', phoneNumber: '', email: 'lucas.petit@example.com', gender: 'M', type: 'ATHLETE', id_league: 0 },
    { id: 2, name: 'Emma', lastName: 'Moreau', birthDate: '2012-08-20', phoneNumber: '', email: 'emma.moreau@example.com', gender: 'F', type: 'ATHLETE', id_league: 0 },
    { id: 3, name: 'Noah', lastName: 'Bernard', birthDate: '2011-11-03', phoneNumber: '', email: 'noah.bernard@example.com', gender: 'M', type: 'ATHLETE', id_league: 0 },
    { id: 4, name: 'Lina', lastName: 'Dupont', birthDate: '2013-02-14', phoneNumber: '', email: 'lina.dupont@example.com', gender: 'F', type: 'ATHLETE', id_league: 0 }
  ],

  2: [
    { id: 5, name: 'Hugo', lastName: 'Simon', birthDate: '2009-12-10', phoneNumber: '', email: 'hugo.simon@example.com', gender: 'M', type: 'ATHLETE', id_league: 0 },
    { id: 6, name: 'Manon', lastName: 'Leroy', birthDate: '2010-06-18', phoneNumber: '', email: 'manon.leroy@example.com', gender: 'F', type: 'ATHLETE', id_league: 0 },
    { id: 7, name: 'Tom', lastName: 'Rousseau', birthDate: '2008-09-27', phoneNumber: '', email: 'tom.rousseau@example.com', gender: 'M', type: 'ATHLETE', id_league: 0 }
  ],

  3: [
    { id: 8, name: 'Chloé', lastName: 'Roux', birthDate: '2007-11-30', phoneNumber: '', email: 'chloe.roux@example.com', gender: 'F', type: 'ATHLETE', id_league: 0 },
    { id: 9, name: 'Nathan', lastName: 'Girard', birthDate: '2006-02-18', phoneNumber: '', email: 'nathan.girard@example.com', gender: 'M', type: 'ATHLETE', id_league: 0 },
    { id: 10, name: 'Camille', lastName: 'Blanc', birthDate: '2006-09-05', phoneNumber: '', email: 'camille.blanc@example.com', gender: 'F', type: 'ATHLETE', id_league: 0 }
  ],

  4: [
    { id: 11, name: 'Alexandre', lastName: 'Guerin', birthDate: '2004-04-22', phoneNumber: '', email: 'alexandre.guerin@example.com', gender: 'M', type: 'ATHLETE', id_league: 0 },
    { id: 12, name: 'Marine', lastName: 'Faure', birthDate: '2005-06-12', phoneNumber: '', email: 'marine.faure@example.com', gender: 'F', type: 'ATHLETE', id_league: 0 },
    { id: 13, name: 'Julien', lastName: 'Marchand', birthDate: '2003-01-19', phoneNumber: '', email: 'julien.marchand@example.com', gender: 'M', type: 'ATHLETE', id_league: 0 }
  ],

  5: [
    { id: 14, name: 'Maxime', lastName: 'Bonnet', birthDate: '2002-01-08', phoneNumber: '', email: 'maxime.bonnet@example.com', gender: 'M', type: 'ATHLETE', id_league: 0 },
    { id: 15, name: 'Sarah', lastName: 'Perrin', birthDate: '2001-07-03', phoneNumber: '', email: 'sarah.perrin@example.com', gender: 'F', type: 'ATHLETE', id_league: 0 }
  ]
};


const groupAthletes = ref<Record<number, Athlete[]>>(fakeGroupAthletes);

/* Liste globale des athlètes */
const allAthletes = ref<Athlete[]>(
  Object.values(fakeGroupAthletes).flat()
);

const selectedGroupAthletes = computed(() => {
  if (selectedGroupId.value === null) return [];
  return groupAthletes.value[selectedGroupId.value] || [];
});

const availableAthletes = computed(() => {
  if (selectedGroupId.value === null) return [];

  const currentIds = selectedGroupAthletes.value.map(a => a.id);

  return allAthletes.value.filter(
    athlete => !currentIds.includes(athlete.id)
  );
});

onMounted(async () => {
  loading.value = true;
  try {
    groups.value = await clubApi.getClubGroups(String(props.clubId));
    usingFakeData.value = false;
  } catch (e) {
    console.error(e);
    groups.value = fakeGroups;
    usingFakeData.value = true;
  } finally {
    loading.value = false;
  }
});

const selectGroup = (groupId: number) => {
  if (selectedGroupId.value === groupId) {
    selectedGroupId.value = null;
    showAddAthletePanel.value = false;
  } else {
    selectedGroupId.value = groupId;
    showAddAthletePanel.value = false;
  }
};

const deleteGroup = (groupId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) return;

  groups.value = groups.value.filter(g => g.id !== groupId);
  delete groupAthletes.value[groupId];

  if (selectedGroupId.value === groupId) {
    selectedGroupId.value = null;
  }
};

const removeAthleteFromGroup = (athleteId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir retirer cet athlète du groupe ?')) return;

  if (selectedGroupId.value !== null) {
    groupAthletes.value[selectedGroupId.value] =
      groupAthletes.value[selectedGroupId.value].filter(
        a => a.id !== athleteId
      );
  }
};

const addAthleteToGroup = () => {
  showAddAthletePanel.value = true;
};

const addAthlete = (athlete: Athlete) => {
  if (selectedGroupId.value === null) return;

  groupAthletes.value[selectedGroupId.value].push(athlete);
};
</script>

<template>
  <div>
    <h3 class="text-xl font-bold mb-4">Gestion des groupes</h3>

    <div
      v-if="usingFakeData"
      class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded"
    >
      ⚠️ Données de démonstration affichées
    </div>

    <p v-if="loading">Chargement...</p>

    <p v-else-if="groups.length === 0" class="text-gray-500">
      Aucun groupe pour ce club
    </p>

    <div v-else class="space-y-3">
      <div
        v-for="group in groups"
        :key="group.id"
        class="border rounded-lg overflow-hidden"
      >
        <!-- HEADER -->
        <div
          class="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          :class="{ 'bg-blue-50': selectedGroupId === group.id }"
          @click="selectGroup(group.id)"
        >
          <div class="flex items-center gap-2">
            <span class="font-medium">{{ group.name }}</span>
            <span class="text-sm text-gray-500">
              ({{ groupAthletes[group.id]?.length || 0 }} athlètes)
            </span>
          </div>

          <button
            @click.stop="deleteGroup(group.id)"
            class="text-red-600 hover:underline text-sm"
          >
            Supprimer
          </button>
        </div>

        <!-- CONTENT -->
        <div v-if="selectedGroupId === group.id" class="bg-gray-50 p-4 border-t">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-semibold text-gray-700">Athlètes</h4>
            <button
              @click="addAthleteToGroup"
              class="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              + Ajouter
            </button>
          </div>

          <div v-if="selectedGroupAthletes.length === 0" class="text-gray-500">
            Aucun athlète dans ce groupe
          </div>

          <ul v-else class="space-y-2">
            <li
              v-for="athlete in selectedGroupAthletes"
              :key="athlete.id"
              class="bg-white border rounded p-3 flex justify-between items-center"
            >
              <div>
                <div class="font-medium">
                  {{ athlete.name }} {{ athlete.lastName }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ athlete.email }}
                </div>
              </div>
              <button
                @click="removeAthleteFromGroup(athlete.id)"
                class="text-red-600 hover:underline text-sm"
              >
                Retirer
              </button>
            </li>
          </ul>

          <!-- ADD ATHLETE PANEL -->
          <div
            v-if="showAddAthletePanel"
            class="mt-4 bg-white border rounded-lg p-4"
          >
            <div class="flex justify-between mb-2">
              <h5 class="font-semibold">Ajouter un athlète</h5>
              <button
                class="text-sm text-gray-500"
                @click="showAddAthletePanel = false"
              >
                Fermer
              </button>
            </div>

            <div v-if="availableAthletes.length === 0" class="text-gray-500">
              Tous les athlètes sont déjà dans ce groupe
            </div>

            <ul v-else class="space-y-2">
              <li
                v-for="athlete in availableAthletes"
                :key="athlete.id"
                class="flex justify-between items-center border rounded p-2"
              >
                <span>
                  {{ athlete.name }} {{ athlete.lastName }}
                </span>
                <button
                  @click="addAthlete(athlete)"
                  class="text-green-600 text-xl font-bold"
                >
                  +
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
