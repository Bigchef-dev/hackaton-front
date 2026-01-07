<script setup>
import { computed } from 'vue';
import CalendarEvent from './CalandarEvent.vue';

const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
  weekDays: {
    type: Array,
    required: true,
  },
  isToday: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['event-click']);

// Heures d'affichage (8h - 20h)
const hours = Array.from({ length: 13 }, (_, i) => i + 8);

// Organiser les événements par jour et par heure
const eventsByDay = computed(() => {
  const map = new Map();
  
  props.weekDays.forEach(day => {
    const dayKey = day.toDateString();
    const dayEvents = props.events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === dayKey;
    });
    map.set(dayKey, dayEvents);
  });
  
  return map;
});

// Formatage des jours
const formatDayShort = (date) => {
  return date.toLocaleDateString('fr-FR', { weekday: 'short' })[0].toUpperCase();
};

const formatDayMedium = (date) => {
  return date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase();
};

const formatDate = (date) => {
  return date.getDate();
};
</script>

<template>
  <div class="card overflow-hidden flex flex-col h-full min-h-0">

    <!-- Grille horaire - Layout avec colonne heure fixe -->
    <div class="flex flex-1 overflow-hidden min-h-0">
      <!-- Colonne heure fixe -->
      <div class="flex flex-col border-r border-neutral-200 bg-neutral-50 overflow-y-auto">
        <div class="flex-shrink-0 h-16 sm:h-20 border-b border-neutral-200"></div>
        <template v-for="hour in hours" :key="hour">
          <div class="p-2 sm:p-3 text-xs sm:text-sm font-medium text-neutral-500 border-b border-neutral-200 bg-neutral-50 min-h-[60px] sm:min-h-[80px] flex items-center justify-center min-w-[50px] sm:min-w-[70px]">
            <span class="sm:hidden">{{ hour }}h</span>
            <span class="hidden sm:inline">{{ hour }}:00</span>
          </div>
        </template>
      </div>
      
      <!-- Grille des jours scrollable -->
      <div class="flex-1 overflow-y-auto w-full">
        <div class="grid w-full week-grid" :style="{ gridTemplateColumns: `repeat(${weekDays.length}, 1fr)` }">
          <!-- En-tête des jours sticky en haut -->
          <template v-for="day in weekDays" :key="`header-${day.toISOString()}`">
            <div
              :class="[
                'border-l border-b border-neutral-200 sticky top-0 z-20 bg-neutral-50 h-16 sm:h-20 flex flex-col items-center justify-center',
                isToday(day) && 'bg-primary-50'
              ]"
            >
              <div class="text-xs sm:text-xs font-medium text-neutral-500">
                <span class="sm:hidden">{{ formatDayShort(day) }}</span>
                <span class="hidden sm:inline">{{ formatDayMedium(day) }}</span>
              </div>
              <div
                :class="[
                  'text-sm sm:text-lg font-semibold',
                  isToday(day) ? 'text-primary-600' : 'text-neutral-900'
                ]"
              >
                {{ formatDate(day) }}
              </div>
            </div>
          </template>
          
          <!-- Cellules horaires -->
          <template v-for="hour in hours" :key="`cells-${hour}`">
            <template v-for="day in weekDays" :key="`${day.toISOString()}-${hour}`">
              <div
                class="relative border-l border-b border-neutral-200 p-1 sm:p-2 min-h-[60px] sm:min-h-[80px] hover:bg-neutral-50 transition-colors"
              >
                <!-- Événements dans cette plage horaire -->
                <div class="space-y-1">
                  <CalendarEvent
                    v-for="event in eventsByDay.get(day.toDateString())?.filter(e => {
                      const eventHour = new Date(e.start).getHours();
                      return eventHour === hour;
                    })"
                    :key="event.id"
                    :event="event"
                    :size="'sm'"
                    @click="emit('event-click', event)"
                  />
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.week-grid {
  display: grid;
  width: 100%;
  table-layout: fixed;
}
</style>