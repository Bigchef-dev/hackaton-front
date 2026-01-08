<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ClubComposable } from '../../utils/composables/club';
import type { Group } from '../../utils/types';

const props = defineProps<{
  clubId: number;
}>();

const clubApi = new ClubComposable();

const groups = ref<Group[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    groups.value = await clubApi.getClubGroups(String(props.clubId));
  } catch (e) {
    console.error(e);
    error.value = 'Erreur lors du chargement des groupes';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h3 class="text-xl font-bold mb-4">
      Gestion des groupes
    </h3>

    <!-- Loading -->
    <p v-if="loading">Chargement des groupes...</p>

    <!-- Error -->
    <p v-else-if="error" class="text-red-600">
      {{ error }}
    </p>

    <!-- Empty -->
    <p v-else-if="groups.length === 0" class="text-gray-500">
      Aucun groupe pour ce club
    </p>

    <!-- Groups list -->
    <ul v-else class="space-y-3">
      <li
        v-for="group in groups"
        :key="group.id"
        class="border rounded-lg p-4 flex justify-between items-center"
      >
        <span class="font-medium">
          {{ group.name }}
        </span>

        <!-- Actions futures -->
        <div class="space-x-2 text-sm">
          <button class="text-blue-600 hover:underline">
            Voir
          </button>
          <button class="text-red-600 hover:underline">
            Supprimer
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
