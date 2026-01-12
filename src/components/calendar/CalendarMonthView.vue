<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Session } from '../../utils/types';
import { groupEventsByDay } from '../../utils/composables/calandar/useRecurrence';
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

// Organiser les événements par jour avec récurrence
const eventsByDay = computed(() => {
  // Trouver le début et la fin de la grille affichée
  const gridStart = props.monthGrid[0];
  const gridEnd = props.monthGrid[props.monthGrid.length - 1];
  
  // Normaliser les dates
  const normalizedStart = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate());
  const normalizedEnd = new Date(gridEnd.getFullYear(), gridEnd.getMonth(), gridEnd.getDate());
  
  const eventsMap = groupEventsByDay(props.events, normalizedStart, normalizedEnd);
  
  // Vérifier que chaque date de la grille a bien sa clé
  const result = new Map<string, Session[]>();
  props.monthGrid.forEach(date => {
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayKey = normalizedDate.toDateString();
    result.set(dayKey, eventsMap.get(dayKey) || []);
  });
  
  return result;
});

// Jours de la semaine
const weekDaysShort = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const weekDaysMedium = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
</script>

<template>
  <div class="bg-slate-900 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col h-full min-h-0">
    <div class="grid grid-cols-7 border-b border-slate-700/50 bg-slate-800/50 lg:hidden">
      <div
        v-for="(day, _) in weekDaysShort"
        :key="day"
        class="p-2 sm:p-3 text-center text-xs sm:text-sm font-bold text-slate-400"
      >
        {{ day }}
      </div>
    </div>

    <div class="hidden lg:grid grid-cols-7 border-b border-slate-700/50 bg-slate-800/50">
      <div
        v-for="day in weekDaysMedium"
        :key="day"
        class="p-3 text-center text-sm font-bold text-slate-300 uppercase tracking-wider"
      >
        {{ day }}
      </div>
    </div>

    <div class="grid grid-cols-7 flex-1 overflow-auto min-h-0">
      <CalendarDayCell
        v-for="(date, _) in monthGrid"
        :key="`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`"
        :date="date"
        :events="eventsByDay.get(date.toDateString()) || []"
        :is-current-month="isSameMonth(date, currentMonth)"
        :is-today="isToday(date)"
        @event-click="emit('event-click', $event)"
        @show-tooltip="showTooltip"
        @hide-tooltip="hideTooltip"
      />
    </div>

    <EventTooltip
      :event="tooltipEvent"
      :x="tooltipX"
      :y="tooltipY"
      :visible="tooltipVisible"
    />
  </div>
</template>