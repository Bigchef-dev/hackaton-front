<script setup lang="ts">
import type { Session } from '../../utils/types';
import SessionHeader from './SessionHeader.vue';
import SessionDetails from './SessionDetails.vue';
import SessionActivities from './SessionActivities.vue';

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
  <div class="space-y-3 sm:space-y-4 w-full">
    <SessionHeader :session="session" is-first />
    
    <SessionDetails :session="session" is-first />

    <button
      @click="$emit('toggle')"
      class="w-full mt-3 sm:mt-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 text-sm sm:text-base"
    >
      <span>{{ isExpanded ? 'Masquer' : 'Voir' }} le programme</span>
      <svg
        :class="['w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300', isExpanded ? 'rotate-180' : '']"
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
      is-first
    />
  </div>
</template>