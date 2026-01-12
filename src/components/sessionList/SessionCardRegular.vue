<script setup lang="ts">
import type { Session } from '../../utils/types';
import SessionHeader from './SessionHeader.vue';
import SessionActivities from './SessionActivities.vue';
import { formatTime } from '../../utils/composables/dateFormatter';

interface Props {
  session: Session;
  isExpanded: boolean;
}

defineProps<Props>();

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <div class="space-y-2 sm:space-y-3 w-full">
    <div class="flex items-start justify-between gap-3 w-full">
      <div class="flex-1 min-w-0">
        <SessionHeader :session="session" />
        
        <div class="text-white font-semibold text-sm sm:text-base">
          {{ formatTime(session.date_session) }}
        </div>
        
        <div v-if="session.coach" class="text-gray-400 text-xs sm:text-sm mt-1 truncate">
          Coach : {{ session.coach }}
        </div>
      </div>

      <div class="text-right flex-shrink-0">
        <div class="text-gray-500 text-xs">Durée</div>
        <div class="text-white font-semibold text-sm sm:text-base">{{ session.duree }}h</div>
      </div>
    </div>

    <button
      @click="$emit('toggle')"
      class="w-full bg-gray-700/50 hover:bg-gray-700 active:bg-gray-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm"
    >
      <span>{{ isExpanded ? 'Masquer' : 'Voir' }} le programme</span>
      <svg
        :class="['w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300', isExpanded ? 'rotate-180' : '']"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <SessionActivities 
      v-if="session.activities" 
      :activities="session.activities" 
      :is-expanded="isExpanded"
    />
  </div>
</template>