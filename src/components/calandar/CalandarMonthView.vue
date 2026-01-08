<script setup lang="ts">
import { computed } from 'vue';
import type { CalendarEvent } from '../../utils/types';
import CalendarDayCell from './CalandarDayCell.vue';

const props = defineProps({
  events: {
    type: Array as () => CalendarEvent[],
    required: true,
  },
  monthGrid: {
    type: Array as () => Date[],
    required: true,
  },
  currentMonth: {
    type: Date,
    required: true,
  },
  isSameMonth: {
    type: Function as (date1: Date, date2: Date) => boolean,
    required: true,
  },
  isToday: {
    type: Function as (date: Date) => boolean,
    required: true,
  },
});

const emit = defineEmits<{
  'event-click': [event: CalendarEvent]
}>();

// Organiser les événements par jour
const eventsByDay = computed(() => {
  const map = new Map<string, CalendarEvent[]>();
  
  props.events.forEach(event => {
    const eventDate = new Date(event.start);
    const dayKey = eventDate.toDateString();
    
    if (!map.has(dayKey)) {
      map.set(dayKey, []);
    }
    map.get(dayKey)!.push(event);
  });
  
  return map;
});

// Jours de la semaine - versions courtes et longues
const weekDaysShort = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const weekDaysMedium = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
</script>

<template>
  <div class="card overflow-hidden flex flex-col h-full min-h-0">
    <!-- En-tête jours de la semaine - Mobile (1 lettre) -->
    <div class="grid grid-cols-7 border-b border-neutral-200 bg-neutral-50 sm:hidden">
      <div
        v-for="(day, index) in weekDaysShort"
        :key="day"
        class="p-2 text-center text-xs font-medium text-neutral-600"
      >
        {{ day }}
      </div>
    </div>

    <!-- En-tête jours de la semaine - Tablette/Desktop (3 lettres) -->
    <div class="hidden sm:grid grid-cols-7 border-b border-neutral-200 bg-neutral-50">
      <div
        v-for="day in weekDaysMedium"
        :key="day"
        class="p-3 text-center text-sm font-medium text-neutral-600"
      >
        {{ day }}
      </div>
    </div>

    <!-- Grille du mois -->
    <div class="grid grid-cols-7 flex-1 overflow-auto min-h-0" style="table-layout: fixed;">
      <CalendarDayCell
        v-for="(date, index) in monthGrid"
        :key="index"
        :date="date"
        :events="eventsByDay.get(date.toDateString()) || []"
        :is-current-month="isSameMonth(date, currentMonth)"
        :is-today="isToday(date)"
        @event-click="emit('event-click', $event)"
      />
    </div>
  </div>
</template>