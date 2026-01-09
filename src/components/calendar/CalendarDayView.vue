<script setup lang="ts">
import { computed } from 'vue';
import type { Session } from '../../utils/types';
import { generateRecurrentOccurrences } from '../../utils/composables/calandar/useRecurrence';
import CalendarEvent from './CalendarEvent.vue';

const props = defineProps<{
  events: Session[];
  currentDate: Date;
  isToday: (date: Date) => boolean;
}>();

const emit = defineEmits<{
  'event-click': [event: Session];
}>();

// Heures d'affichage (6h - 22h)
const hours = Array.from({ length: 17 }, (_, i) => i + 6);

// Filtrer les événements du jour avec récurrence
const dayEvents = computed(() => {
  const dayStart = new Date(props.currentDate);
  dayStart.setHours(0, 0, 0, 0);
  
  const dayEnd = new Date(props.currentDate);
  dayEnd.setHours(23, 59, 59, 999);
  
  const allOccurrences: Session[] = [];
  
  props.events.forEach(event => {
    const occurrences = generateRecurrentOccurrences(event, dayStart, dayEnd);
    allOccurrences.push(...occurrences);
  });
  
  // Trier par heure
  return allOccurrences.sort((a, b) => 
    new Date(a.date_session).getTime() - new Date(b.date_session).getTime()
  );
});

// Calculer la position et hauteur de chaque événement
const positionedEvents = computed(() => {
  return dayEvents.value.map((event: Session) => {
    const startDate = new Date(event.date_session);
    const startHour = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    
    // Position en pixels depuis 6h (1 heure = 100px)
    const top = (startHour - 6) * 100 + (startMinutes / 60) * 100;
    
    // Hauteur basée sur la durée
    let height;
    const duree = event.duree || 1;
    
    // Détecter si c'est en heures (valeur <= 24) ou en minutes (valeur > 24)
    if (duree <= 24) {
      height = duree * 100;
    } else {
      height = (duree / 60) * 100;
    }
    
    return {
      event,
      top,
      height,
      startHour,
      startMinutes
    };
  });
});

const formattedDate = computed(() => {
  return props.currentDate.toLocaleDateString('fr-FR', { 
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(/^\w/, c => c.toUpperCase());
});
</script>

<template>
  <div class="bg-slate-900 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col h-full min-h-0">
    <div class="p-4 border-b border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400 mb-1">{{ formattedDate }}</p>
          <p class="text-2xl font-bold text-white">
            {{ dayEvents.length }} séance{{ dayEvents.length > 1 ? 's' : '' }}
          </p>
        </div>
        <div v-if="isToday(currentDate)" 
             class="px-3 py-1.5 bg-blue-600 rounded-lg text-xs font-medium text-white shadow-lg shadow-blue-600/20">
          Aujourd'hui
        </div>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden min-h-0">
      <div class="flex flex-col border-r border-slate-700/50 bg-slate-900 flex-shrink-0">
        <template v-for="hour in hours" :key="hour">
          <div class="p-3 text-sm font-medium text-slate-400 border-b border-slate-700/50 h-[100px] flex items-start justify-center min-w-[70px]">
            {{ hour }}:00
          </div>
        </template>
      </div>
      
      <div class="flex-1 overflow-y-auto bg-slate-800/30 relative">
        <div class="absolute inset-0 pointer-events-none">
          <template v-for="hour in hours" :key="`grid-${hour}`">
            <div 
              class="absolute w-full border-b border-slate-700/50"
              :style="{ top: `${(hour - 6) * 100}px`, height: '100px' }"
            ></div>
          </template>
        </div>
        <div 
          class="relative" 
          :style="{ height: `${hours.length * 100}px` }"
        >
          <div
            v-for="positioned in positionedEvents"
            :key="positioned.event.id"
            class="absolute left-0 right-0 px-3"
            :style="{ 
              top: `${positioned.top}px`, 
              height: `${positioned.height}px`,
              minHeight: '40px'
            }"
          >
            <div class="h-full">
              <CalendarEvent
                :event="positioned.event"
                :size="'md'"
                @click="emit('event-click', positioned.event)"
                class="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>