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

// Données de démonstration - Groupes
const fakeGroups: Group[] = [
  {
    id: 1,
    name: 'Groupe Débutants',
    id_club: props.clubId
  },
  {
    id: 2,
    name: 'Groupe Intermédiaires',
    id_club: props.clubId
  },
  {
    id: 3,
    name: 'Groupe Avancés',
    id_club: props.clubId
  },
  {
    id: 4,
    name: 'Groupe Compétition',
    id_club: props.clubId
  },
  {
    id: 5,
    name: 'Groupe Elite',
    id_club: props.clubId
  }
];

// Données de démonstration - Athlètes par groupe
const fakeGroupAthletes: Record<number, Athlete[]> = {
  1: [
    {
      id: 1,
      name: 'Lucas',
      lastName: 'Petit',
      birthDate: '2010-05-15',
      phoneNumber: '06 11 22 33 44',
      email: 'lucas.petit@example.com',
      gender: 'M',
      type: 'ATHLETE',
      id_league: 0
    },
    {
      id: 2,
      name: 'Emma',
      lastName: 'Moreau',
      birthDate: '2011-08-20',
      phoneNumber: '06 22 33 44 55',
      email: 'emma.moreau@example.com',
      gender: 'F',
      type: 'ATHLETE',
      id_league: 0
    },
    {
      id: 3,
      name: 'Hugo',
      lastName: 'Simon',
      birthDate: '2010-12-10',
      phoneNumber: '06 33 44 55 66',
      email: 'hugo.simon@example.com',
      gender: 'M',
      type: 'ATHLETE',
      id_league: 0
    }
  ],
  2: [
    {
      id: 4,
      name: 'Léa',
      lastName: 'Laurent',
      birthDate: '2008-03-25',
      phoneNumber: '06 44 55 66 77',
      email: 'lea.laurent@example.com',
      gender: 'F',
      type: 'ATHLETE',
      id_league: 0
    },
    {
      id: 5,
      name: 'Thomas',
      lastName: 'Lefebvre',
      birthDate: '2009-07-14',
      phoneNumber: '06 55 66 77 88',
      email: 'thomas.lefebvre@example.com',
      gender: 'M',
      type: 'ATHLETE',
      id_league: 0
    }
  ],
  3: [
    {
      id: 6,
      name: 'Chloé',
      lastName: 'Roux',
      birthDate: '2006-11-30',
      phoneNumber: '06 66 77 88 99',
      email: 'chloe.roux@example.com',
      gender: 'F',
      type: 'ATHLETE',
      id_league: 0
    },
    {
      id: 7,
      name: 'Nathan',
      lastName: 'Girard',
      birthDate: '2007-02-18',
      phoneNumber: '06 77 88 99 00',
      email: 'nathan.girard@example.com',
      gender: 'M',
      type: 'ATHLETE',
      id_league: 0
    },
    {
      id: 8,
      name: 'Camille',
      lastName: 'Blanc',
      birthDate: '2006-09-05',
      phoneNumber: '06 88 99 00 11',
      email: 'camille.blanc@example.com',
      gender: 'F',
      type: 'ATHLETE',
      id_league: 0
    }
  ],
  4: [
    {
      id: 9,
      name: 'Alexandre',
      lastName: 'Guerin',
      birthDate: '2004-04-22',
      phoneNumber: '06 99 00 11 22',
      email: 'alexandre.guerin@example.com',
      gender: 'M',
      type: 'ATHLETE',
      id_league: 0
    },
    {
      id: 10,
      name: 'Marine',
      lastName: 'Faure',
      birthDate: '2005-06-12',
      phoneNumber: '06 00 11 22 33',
      email: 'marine.faure@example.com',
      gender: 'F',
      type: 'ATHLETE',
      id_league: 0
    }
  ],
  5: [
    {
      id: 11,
      name: 'Maxime',
      lastName: 'Bonnet',
      birthDate: '2002-01-08',
      phoneNumber: '06 11 22 33 44',
      email: 'maxime.bonnet@example.com',
      gender: 'M',
      type: 'ATHLETE',
      id_league: 0
    }
  ]
};

const groupAthletes = ref<Record<number, Athlete[]>>(fakeGroupAthletes);

// Computed pour obtenir les athlètes du groupe sélectionné
const selectedGroupAthletes = computed(() => {
  if (selectedGroupId.value === null) return [];
  return groupAthletes.value[selectedGroupId.value] || [];
});

onMounted(async () => {
  loading.value = true;
  try {
    groups.value = await clubApi.getClubGroups(String(props.clubId));
    usingFakeData.value = false;
    // TODO: Charger les athlètes pour chaque groupe
  } catch (e) {
    console.error(e);
    groups.value = fakeGroups;
    groupAthletes.value = fakeGroupAthletes;
    usingFakeData.value = true;
  } finally {
    loading.value = false;
  }
});

const selectGroup = (groupId: number) => {
  selectedGroupId.value = selectedGroupId.value === groupId ? null : groupId;
};

const deleteGroup = (groupId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) return;
  
  groups.value = groups.value.filter(g => g.id !== groupId);
  delete groupAthletes.value[groupId];
  
  if (selectedGroupId.value === groupId) {
    selectedGroupId.value = null;
  }
  
  if (usingFakeData.value) {
    alert('Groupe supprimé (données de démonstration)');
  } else {
    alert('Groupe supprimé avec succès');
  }
};

const removeAthleteFromGroup = (athleteId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir retirer cet athlète du groupe ?')) return;
  
  if (selectedGroupId.value !== null) {
    groupAthletes.value[selectedGroupId.value] = groupAthletes.value[selectedGroupId.value].filter(
      a => a.id !== athleteId
    );
    
    if (usingFakeData.value) {
      alert('Athlète retiré du groupe (données de démonstration)');
    } else {
      alert('Athlète retiré du groupe avec succès');
    }
  }
};

const addAthleteToGroup = () => {
  if (selectedGroupId.value === null) return;
  
  // TODO: Ouvrir un modal pour sélectionner un athlète à ajouter
  alert('Fonctionnalité d\'ajout d\'athlète à implémenter');
};
</script>

<template>
  <div>
    <h3 class="text-xl font-bold mb-4">
      Gestion des groupes
    </h3>

    <!-- Avertissement données de démonstration -->
    <div v-if="usingFakeData" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
      ⚠️ Données de démonstration affichées (erreur de connexion)
    </div>

    <!-- Loading -->
    <p v-if="loading">Chargement des groupes...</p>

    <!-- Empty -->
    <p v-else-if="groups.length === 0" class="text-gray-500">
      Aucun groupe pour ce club
    </p>

    <!-- Groups list -->
    <div v-else class="space-y-3">
      <div
        v-for="group in groups"
        :key="group.id"
        class="border rounded-lg overflow-hidden"
      >
        <!-- En-tête du groupe -->
        <div
          class="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
          :class="{ 'bg-blue-50': selectedGroupId === group.id }"
          @click="selectGroup(group.id)"
        >
          <div class="flex items-center gap-2">
            <svg
              class="w-5 h-5 transition-transform"
              :class="{ 'rotate-90': selectedGroupId === group.id }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="font-medium">{{ group.name }}</span>
            <span class="text-sm text-gray-500">
              ({{ groupAthletes[group.id]?.length || 0 }} athlètes)
            </span>
          </div>

          <!-- Actions du groupe -->
          <div class="space-x-2 text-sm">
            <button
              @click.stop="deleteGroup(group.id)"
              class="text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </div>
        </div>

        <!-- Liste des athlètes (affichée si le groupe est sélectionné) -->
        <div
          v-if="selectedGroupId === group.id"
          class="bg-gray-50 p-4 border-t"
        >
          <div class="flex justify-between items-center mb-3">
            <h4 class="font-semibold text-gray-700">Athlètes du groupe</h4>
            <button
              @click="addAthleteToGroup"
              class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un athlète
            </button>
          </div>

          <!-- Liste des athlètes -->
          <div v-if="selectedGroupAthletes.length === 0" class="text-center text-gray-500 py-4">
            Aucun athlète dans ce groupe
          </div>

          <ul v-else class="space-y-2">
            <li
              v-for="athlete in selectedGroupAthletes"
              :key="athlete.id"
              class="bg-white border rounded-lg p-3 flex justify-between items-center hover:shadow-sm transition-shadow"
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
        </div>
      </div>
    </div>
  </div>
</template>