<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Session } from '../../utils/types';
import CalendarDayCell from './CalendarDayCell.vue';
import EventTooltip from './EventTooltip.vue';

const props = defineProps<{
  events: Session[];
  monthGrid: Date[];
  currentMonth: Date;
  isSameMonth: (date1: Date, date2: Date) => boolean;
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
  
  props.monthGrid.forEach(date => {
    const dayKey = date.toDateString();
    const dayOccurrences: Session[] = [];
    
    props.events.forEach(event => {
      const occurrences = generateRecurrentEvents(event, date);
      dayOccurrences.push(...occurrences);
    });
    
    map.set(dayKey, dayOccurrences);
  });
  
  return map;
});

// Jours de la semaine
const weekDaysShort = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const weekDaysMedium = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
</script>

<template>
  <div class="bg-slate-900 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col h-full min-h-0">
    <!-- En-tête jours de la semaine - Mobile (1 lettre) -->
    <div class="grid grid-cols-7 border-b border-slate-700/50 bg-slate-800/50 lg:hidden">
      <div
        v-for="(day, _) in weekDaysShort"
        :key="day"
        class="p-2 sm:p-3 text-center text-xs sm:text-sm font-bold text-slate-400"
      >
        {{ day }}
      </div>
    </div>

    <!-- En-tête jours de la semaine - Desktop (3 lettres) -->
    <div class="hidden lg:grid grid-cols-7 border-b border-slate-700/50 bg-slate-800/50">
      <div
        v-for="day in weekDaysMedium"
        :key="day"
        class="p-3 text-center text-sm font-bold text-slate-300 uppercase tracking-wider"
      >
        {{ day }}
      </div>
    </div>

    <!-- Grille du mois -->
    <div class="grid grid-cols-7 flex-1 overflow-auto min-h-0">
      <CalendarDayCell
        v-for="(date, index) in monthGrid"
        :key="index"
        :date="date"
        :events="eventsByDay.get(date.toDateString()) || []"
        :is-current-month="isSameMonth(date, currentMonth)"
        :is-today="isToday(date)"
        @event-click="emit('event-click', $event)"
        @show-tooltip="showTooltip"
        @hide-tooltip="hideTooltip"
      />
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