<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ClubComposable } from '../../utils/composables/club';
import type { Group, Athlete } from '../../utils/types';

const props = defineProps<{
  clubId: number;
}>();

const clubApi = new ClubComposable();

const groups = ref<Group[]>([]);
const loading = ref(false);
const usingFakeData = ref(false);

/* Groupes ouverts */
const openedGroupIds = ref<number[]>([]);

/* Panneau ajout athlète par groupe */
const showAddAthletePanel = ref<Record<number, boolean>>({});

/* Création de groupe */
const newGroupName = ref('');
const creatingGroup = ref(false);

/* Filtrage par sport */
const selectedSport = ref<string>('all');
const availableSports = ref<string[]>([]);

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

/* Tous les athlètes */
const allAthletes = ref<Athlete[]>(
  Object.values(fakeGroupAthletes).flat()
);

/* ---------------- HELPERS ---------------- */

const getAthleteSport = (athleteId: number) => {
  if (athleteId % 2 === 0) {
    return "Nage pingouin";
  }
  return "Glisse manchot (handisport uniquement)";
};

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

const getAvailableAthletes = (groupId: number): Athlete[] => {
  const currentIds = getGroupAthletes(groupId).map(a => a.id);
  let available = allAthletes.value.filter(a => !currentIds.includes(a.id));
  
  // Appliquer le filtre par sport
  if (selectedSport.value !== 'all') {
    available = available.filter(a => getAthleteSport(a.id) === selectedSport.value);
  }
  
  return available;
};

// Computed pour extraire la liste des sports uniques
const updateAvailableSports = () => {
  const sports = new Set<string>();
  allAthletes.value.forEach(athlete => {
    if (getAthleteSport(athlete.id)) {
      sports.add(getAthleteSport(athlete.id));
    }
  });
  availableSports.value = Array.from(sports).sort();
};

// Computed pour filtrer les groupes affichés selon le sport sélectionné
const filteredGroups = computed(() => {
  if (selectedSport.value === 'all') {
    return groups.value;
  }
  
  return groups.value.filter(group => {
    const athletes = getGroupAthletes(group.id);
    return athletes.some(athlete => getAthleteSport(athlete.id) === selectedSport.value);
  });
});

/* ---------------- LIFECYCLE ---------------- */

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
    updateAvailableSports();
  }
});

/* ---------------- ACTIONS ---------------- */

const deleteGroup = (groupId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) return;

  groups.value = groups.value.filter(g => g.id !== groupId);
  delete groupAthletes.value[groupId];
  openedGroupIds.value = openedGroupIds.value.filter(id => id !== groupId);
};

const removeAthleteFromGroup = (groupId: number, athleteId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir retirer cet athlète du groupe ?')) return;

  groupAthletes.value[groupId] =
    groupAthletes.value[groupId].filter(a => a.id !== athleteId);
};

const addAthleteToGroup = (groupId: number) => {
  showAddAthletePanel.value[groupId] = true;
};

const addAthlete = (groupId: number, athlete: Athlete) => {
  groupAthletes.value[groupId].push(athlete);
  showAddAthletePanel.value[groupId] = false;
};

const createGroup = async () => {
  if (!newGroupName.value.trim()) return;

  creatingGroup.value = true;

  try {
    if (!usingFakeData.value) {
      // TODO: API create group
      // await clubApi.createGroup(...)
    }

    const newId =
      Math.max(0, ...groups.value.map(g => g.id)) + 1;

    const newGroup: Group = {
      id: newId,
      name: newGroupName.value,
      id_club: props.clubId
    };

    groups.value.push(newGroup);
    groupAthletes.value[newId] = [];
    openedGroupIds.value.push(newId);

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
  <!-- Effets de fond -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
  </div>

  <div>
    <h3 class="text-xl font-bold mb-4 gradient-text">Gestion des groupes</h3>

    <div v-if="usingFakeData" class="mb-4 p-3 bg-yellow-900/30 border border-yellow-600 text-yellow-300 rounded">
      ⚠️ Données de démonstration affichées
    </div>

    <p v-if="loading" class="text-purple-300">Chargement...</p>

    <p v-else-if="filteredGroups.length === 0" class="text-purple-300">
      Aucun groupe trouvé pour ce filtre
    </p>

    <div v-else class="space-y-3">
      <div
        v-for="group in filteredGroups"
        :key="group.id"
        class="border rounded-lg overflow-hidden border-purple-900/30 bg-surface"
      >

        <!-- HEADER -->
        <div
          class="p-4 flex justify-between items-center cursor-pointer hover:bg-purple-900/20 transition-colors"
          :class="{ 'bg-purple-900/20': isGroupOpen(group.id) }"
          @click="toggleGroup(group.id)"
        >
          <div class="flex items-center gap-2">
            <span class="font-medium gradient-text">{{ group.name }}</span>
            <span class="text-sm text-purple-300">
              ({{ getGroupAthletes(group.id).length }} athlètes)
            </span>
          </div>

          <button
            @click.stop="deleteGroup(group.id)"
            class="text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            Supprimer
          </button>
        </div>

        <!-- CONTENT -->
        <div v-if="isGroupOpen(group.id)" class="p-4 border-t border-purple-900/30">
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-semibold text-purple-300">Athlètes</h4>
            <button
              @click="addAthleteToGroup(group.id)"
              class="bg-accent-blue text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              + Ajouter
            </button>
          </div>

          <div
            v-if="getGroupAthletes(group.id).length === 0" class="text-purple-300">
            Aucun athlète dans ce groupe
          </div>

          <ul v-else class="space-y-2">
            <li
              v-for="athlete in getGroupAthletes(group.id)"
              :key="athlete.id"
              class="bg-purple-900/20 border border-purple-900/30 rounded p-3 flex justify-between items-center transition-colors hover:bg-purple-900/30"
            >
              <div>
                <div class="font-medium text-white">
                  {{ athlete.name }} {{ athlete.lastName }}
                </div>
                <div class="text-sm text-purple-200">
                  {{ athlete.email }}
                </div>
                <div class="text-sm text-blue-300 font-medium mt-1">
                  {{ getAthleteSport(athlete.id) }}
                </div>
              </div>
              <button
                @click="removeAthleteFromGroup(group.id, athlete.id)"
                class="text-red-400 hover:text-red-300 text-sm transition-colors"
              >
                Retirer
              </button>
            </li>
          </ul>

          <!-- ADD ATHLETE PANEL -->
          <div
            v-if="showAddAthletePanel[group.id]" class="mt-4 bg-surface-light border rounded-lg p-4 border-gray-600 fade-in">

          <!-- FILTRAGE PAR SPORT -->
          <div class="mb-4 p-2 bg-surface-light border rounded border-gray-600">
            <label class="block font-semibold mb-2 text-purple-200">
              Filtrer par sport
            </label>
            <select
              v-model="selectedSport"
              class="w-full border rounded px-3 py-2 bg-surface text-white border-gray-600"
            >
              <option value="all">Tous les sports</option>
              <option
                v-for="sport in availableSports"
                :key="sport"
                :value="sport"
              >
                {{ sport }}
              </option>
            </select>
          </div>
            <div class="flex justify-between mb-2">
              <h5 class="font-semibold text-white">Ajouter un athlète</h5>
              <button
                class="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                @click="showAddAthletePanel[group.id] = false"
              >
                Fermer
              </button>
            </div>

            <div
              v-if="getAvailableAthletes(group.id).length === 0" class="text-gray-400">
              <span v-if="selectedSport === 'all'">
                Tous les athlètes sont déjà dans ce groupe
              </span>
              <span v-else>
                Aucun athlète disponible pour le sport sélectionné
              </span>
            </div>

            <ul v-else class="space-y-2">
              <li
                v-for="athlete in getAvailableAthletes(group.id)"
                :key="athlete.id"
                class="flex justify-between items-center border rounded p-2 border-gray-600 hover:bg-gray-800 transition-colors"
              >
                <div>
                  <span class="font-medium text-white">
                    {{ athlete.name }} {{ athlete.lastName }}
                  </span>
                  <span class="text-sm text-blue-400 ml-2">
                    ({{ getAthleteSport(athlete.id) }})
                  </span>
                </div>
                <button
                  @click="addAthlete(group.id, athlete)"
                  class="text-green-600 text-xl font-bold hover:text-green-500 transition-colors"
                >
                  +
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CREATE GROUP -->
      <div class="mt-6 p-4 border rounded-lg bg-surface-light border-gray-600">
        <h4 class="font-semibold mb-2 text-white">Créer un nouveau groupe</h4>

        <div class="flex gap-2">
          <input
            v-model="newGroupName"
            type="text"
            placeholder="Nom du groupe"
            class="flex-1 border rounded px-3 py-2 bg-surface text-white border-gray-600 focus:ring-2 focus:ring-accent-purple focus:outline-none"
          />

          <button
            @click="createGroup"
            :disabled="creatingGroup || !newGroupName"
            class="bg-accent-purple text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-purple-600 transition-colors"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --bg-surface-light: #2D1B69;
  --accent-purple: #8B5CF6;
  --accent-pink: #EC4899;
  --accent-blue: #3B82F6;
  --text-primary: #E5E7EB;
  --text-secondary: #9CA3AF;
  --danger: #EF4444;
  --success: #10B981;
  --border-color: rgba(139, 92, 246, 0.2);
}

.dark-theme {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
}

.gradient-text {
  background: linear-gradient(90deg, var(--accent-purple), var(--accent-pink));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.3);
}
</style>