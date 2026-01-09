<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Session } from '../../utils/types';
import CalendarEvent from './CalendarEvent.vue';
import EventTooltip from './EventTooltip.vue';

const props = defineProps<{
  events: Session[];
  weekDays: Date[];
  isToday: (date: Date) => boolean;
}>();

const emit = defineEmits<{
  'event-click': [event: Session];
}>();

// Gestion du tooltip
const tooltipVisible = ref(false);
const tooltipEvent = ref<Session | null>(null);
const tooltipX = ref(0);
const tooltipY = ref(0);

const showTooltip = (event: Session, x: number, y: number) => {
  tooltipEvent.value = event;
  tooltipX.value = x;
  tooltipY.value = y;
  tooltipVisible.value = true;
};

const hideTooltip = () => {
  tooltipVisible.value = false;
  tooltipEvent.value = null;
};

let hoverTimeout: number | null = null;

const handleMouseEnter = (event: Session, e: MouseEvent) => {
  hoverTimeout = window.setTimeout(() => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    showTooltip(event, x, y);
  }, 500);
};

const handleMouseLeave = () => {
  if (hoverTimeout !== null) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
  hideTooltip();
};

// Heures d'affichage (6h - 22h)
const hours = Array.from({ length: 17 }, (_, i) => i + 6);

// Générer les occurrences d'événements récurrents
const generateRecurrentEvents = (event: Session, targetDate: Date): Session[] => {
  const startDate = new Date(event.date_session);
  const targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  
  // Si la date cible est avant la date de début, pas d'occurrence
  if (targetDateOnly < startDateOnly) {
    return [];
  }
  
  // Calculer le nombre de jours entre la date de début et la date cible
  const daysDiff = Math.floor((targetDateOnly.getTime() - startDateOnly.getTime()) / (1000 * 60 * 60 * 24));
  
  // Si pas de récurrence, afficher uniquement le jour de début
  if (!event.recurrence || event.recurrence <= 0) {
    if (daysDiff === 0) {
      return [event];
    }
    return [];
  }
  
  // Vérifier si la date cible correspond à une occurrence (multiple de la récurrence)
  if (daysDiff % event.recurrence === 0) {
    const occurrenceDate = new Date(targetDate);
    occurrenceDate.setHours(startDate.getHours(), startDate.getMinutes(), 0, 0);
    
    return [{
      ...event,
      date_session: occurrenceDate,
      id: event.id + (daysDiff / event.recurrence) * 1000000
    }];
  }
  
  return [];
};

// Organiser les événements par jour avec récurrence
const eventsByDay = computed(() => {
  const map = new Map<string, Session[]>();
  
  props.weekDays.forEach((day: Date) => {
    const dayKey = day.toDateString();
    const dayOccurrences: Session[] = [];
    
    props.events.forEach((event: Session) => {
      const occurrences = generateRecurrentEvents(event, day);
      dayOccurrences.push(...occurrences);
    });
    
    map.set(dayKey, dayOccurrences);
  });
  
  return map;
});

// Formatage des jours
const formatDayShort = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', { weekday: 'short' })[0].toUpperCase();
};

const formatDayMedium = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase();
};

const formatDate = (date: Date): number => {
  return date.getDate();
};
</script>

<template>
  <div class="bg-slate-900 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col h-full min-h-0">
    <!-- Grille horaire -->
    <div class="flex flex-1 overflow-hidden min-h-0">
      <!-- Colonne heure fixe -->
      <div class="flex flex-col border-r border-slate-700/50 bg-slate-800/50 overflow-y-auto">
        <div class="flex-shrink-0 h-16 sm:h-20 border-b border-slate-700/50"></div>
        <template v-for="hour in hours" :key="hour">
          <div class="p-2 sm:p-3 text-xs sm:text-sm font-bold text-slate-400 border-b border-slate-700/50 min-h-[80px] sm:min-h-[100px] flex items-center justify-center min-w-[60px] sm:min-w-[70px]">
            <span class="sm:hidden">{{ hour }}h</span>
            <span class="hidden sm:inline">{{ hour }}:00</span>
          </div>
        </template>
      </div>
      
      <!-- Grille des jours scrollable -->
      <div class="flex-1 overflow-y-auto w-full bg-slate-800/20">
        <div class="grid w-full" :style="{ gridTemplateColumns: `repeat(${props.weekDays.length}, minmax(100px, 1fr))` }">
          <!-- En-tête des jours sticky -->
          <template v-for="day in props.weekDays" :key="`header-${day.toISOString()}`">
            <div
              :class="[
                'border-l border-b border-slate-700/50 sticky top-0 z-20 h-16 sm:h-20 flex flex-col items-center justify-center backdrop-blur-sm',
                props.isToday(day) ? 'bg-blue-900/40' : 'bg-slate-800/80'
              ]"
            >
              <div class="text-xs font-medium text-slate-400 uppercase tracking-wider">
                <span class="sm:hidden">{{ formatDayShort(day) }}</span>
                <span class="hidden sm:inline">{{ formatDayMedium(day) }}</span>
              </div>
              <div
                :class="[
                  'text-lg sm:text-2xl font-bold mt-1',
                  props.isToday(day) ? 'text-blue-400' : 'text-slate-200'
                ]"
              >
                {{ formatDate(day) }}
              </div>
            </div>
          </template>
          
          <!-- Cellules horaires -->
          <template v-for="hour in hours" :key="`cells-${hour}`">
            <template v-for="day in props.weekDays" :key="`${day.toISOString()}-${hour}`">
              <div
                class="relative border-l border-b border-slate-700/50 p-1.5 sm:p-2 min-h-[80px] sm:min-h-[100px] hover:bg-slate-800/60 transition-colors"
              >
                <!-- Événements dans cette plage horaire -->
                <div class="space-y-1.5">
                  <div
                    v-for="event in eventsByDay.get(day.toDateString())?.filter(e => {
                      const eventHour = new Date(e.date_session).getHours();
                      return eventHour === hour;
                    })"
                    :key="event.id"
                    @mouseenter="handleMouseEnter(event, $event)"
                    @mouseleave="handleMouseLeave"
                  >
                    <CalendarEvent
                      :event="event"
                      :size="'sm'"
                      @click="emit('event-click', event)"
                    />
                  </div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <EventTooltip
      :event="tooltipEvent"
      :x="tooltipX"
      :y="tooltipY"
      :visible="tooltipVisible"
    />
  </div>
</template>