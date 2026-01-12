<script setup lang="ts">
import type { Session } from '../../utils/types';
import SessionTypeBadge from './SessionTypeBadge.vue';
import SessionCountdown from './SessionCountdown.vue';
import { formatDate, formatDateShort } from '../../utils/composables/dateFormatter';

interface Props {
  session: Session;
  isFirst?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="flex items-start justify-between gap-3 w-full">
    <div class="flex-1 min-w-0">
      <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 flex-wrap" v-if="isFirst">
        <SessionTypeBadge :type="session.type" />
        <span class="text-gray-400 text-xs sm:text-sm">
          <span class="hidden sm:inline">{{ formatDate(session.date_session) }}</span>
          <span class="sm:hidden">{{ formatDateShort(session.date_session) }}</span>
        </span>
      </div>
      
      <div class="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap" v-else>
        <SessionTypeBadge :type="session.type" :is-first="false" />
        <span class="text-gray-400 text-xs sm:text-sm">
          <span class="hidden sm:inline">{{ formatDate(session.date_session) }}</span>
          <span class="sm:hidden">{{ formatDateShort(session.date_session) }}</span>
        </span>
      </div>
      
      <h3 v-if="isFirst" class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
        Prochaine Seance
      </h3>
      
      <SessionCountdown v-if="isFirst" :date="session.date_session" />
    </div>
    
    <div v-if="isFirst" class="text-right flex-shrink-0">
      <div class="text-gray-400 text-xs sm:text-sm">Durée</div>
      <div class="text-white text-lg sm:text-xl font-bold">
        {{ session.duree }}h
      </div>
    </div>
  </div>
</template>