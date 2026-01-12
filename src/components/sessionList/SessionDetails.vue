<script setup lang="ts">
import type { Session } from '../../utils/types';
import { formatTime } from '../../utils/composables/dateFormatter';

interface Props {
  session: Session;
  isFirst?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm w-full">
    <div 
      v-if="session.coach" 
      class="flex items-center gap-2 text-gray-300 bg-gray-900/30 rounded-lg p-2 sm:p-0 sm:bg-transparent min-w-0"
    >
      <svg class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="truncate">Coach : {{ session.coach }}</span>
    </div>
    
    <div class="flex items-center gap-2 text-gray-300 bg-gray-900/30 rounded-lg p-2 sm:p-0 sm:bg-transparent">
      <svg class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ formatTime(session.date_session) }}</span>
    </div>
  </div>
</template>