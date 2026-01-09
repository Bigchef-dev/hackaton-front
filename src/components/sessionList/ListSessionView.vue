<script setup lang="ts">
import { ref, computed } from 'vue';
import ListCard from './SessionCard.vue';
import type { Athlete, Session } from '../../utils/types';
import { generateRecurrentOccurrences } from '../../utils/composables/calandar/useRecurrence';

interface Props {
  athlete: Athlete;
  sessions: Session[];
}

const props = defineProps<Props>();

const expandedSessions = ref<Set<number>>(new Set());

const upcomingSessions = computed(() => {
  const now = new Date();
  
  const periodEnd = new Date(now);
  periodEnd.setDate(periodEnd.getDate() + 90);
  
  const allOccurrences: Session[] = [];
  
  props.sessions.forEach(session => {
    const occurrences = generateRecurrentOccurrences(session, now, periodEnd);
    allOccurrences.push(...occurrences);
  });
  
  return allOccurrences
    .filter(session => session.date_session >= now)
    .sort((a, b) => a.date_session.getTime() - b.date_session.getTime())
    .slice(0, 6);
});

const toggleActivities = (sessionId: number): void => {
  if (expandedSessions.value.has(sessionId)) {
    expandedSessions.value.delete(sessionId);
  } else {
    expandedSessions.value.add(sessionId);
  }
};
</script>

<template>
  <div class="w-full">
    <div v-if="upcomingSessions.length === 0" class="text-center py-12 sm:py-16 md:py-20">
      <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-800/50 mb-4">
        <svg class="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="text-gray-400 text-base sm:text-lg font-medium">Aucune session à venir</div>
      <div class="text-gray-600 text-sm sm:text-base mt-2">Vos prochaines sessions apparaîtront ici</div>
    </div>
    
    <div v-else class="space-y-3 sm:space-y-4 md:space-y-5">
      <TransitionGroup name="list">
        <ListCard
          v-for="(session, index) in upcomingSessions"
          :key="session.id"
          :session="session"
          :is-first="index === 0"
          :is-expanded="expandedSessions.has(session.id)"
          @toggle="toggleActivities(session.id)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>