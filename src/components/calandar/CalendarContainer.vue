<script setup lang="ts">
import { computed } from 'vue';
import type { Session, ViewMode, NavigationDirection } from '../../utils/types';
import { useCalendar } from '../../utils/composables/calandar/useCalendar';
import CalendarHeader from './CalendarHeader.vue';
import CalendarDayView from './CalendarDayView.vue';
import CalendarWeekView from './CalendarWeekView.vue';
import CalendarMonthView from './CalendarMonthView.vue';
import EventDetailsModal from './EventDetailsModal.vue';

const props = defineProps<{
  events: Session[];
}>();

// Composables
const {
  currentDate,
  viewMode,
  weekStart,
  weekEnd,
  monthStart,
  monthEnd,
  weekDays,
  monthGrid,
  goToToday,
  goToPrevious,
  goToNext,
  setViewMode,
  isSameMonth,
  isToday,
} = useCalendar();

// Modal state
import { ref } from 'vue';
const isModalOpen = ref(false);
const selectedEvent = ref<Session | null>(null);

const openModal = (event: Session) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedEvent.value = null;
  }, 300);
};

const getEndDate = (session: Session): Date => {
  const startDate = session.date_session;
  const durationInMs = session.duree * 60 * 60 * 1000; 
  
  return new Date(startDate.getTime() + durationInMs);
};

// Filtrage des événements selon la période visible
const visibleEvents = computed(() => {
  let start: Date;
  let end: Date;

  if (viewMode.value === 'day') {
    start = new Date(currentDate.value);
    start.setHours(0, 0, 0, 0);
    end = new Date(currentDate.value);
    end.setHours(23, 59, 59, 999);
  } else if (viewMode.value === 'week') {
    start = weekStart.value;
    end = weekEnd.value;
  } else {
    start = monthStart.value;
    end = monthEnd.value;
  }

  return props.events.filter(event => {
    const eventStart = event.date_session;
    const eventEnd = getEndDate(event);
    return eventStart <= end && eventEnd >= start;
  });
});

// Handlers
const handleViewChange = (mode: ViewMode): void => {
  setViewMode(mode);
};

const handleNavigate = (direction: NavigationDirection): void => {
  if (direction === 'today') goToToday();
  else if (direction === 'prev') goToPrevious();
  else if (direction === 'next') goToNext();
};

const handleEventClick = (event: Session): void => {
  openModal(event);
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-2 sm:p-4 lg:p-6">
    <div class="calendar-container max-w-[1600px] h-[800px] overflow-auto">
      <!-- Header sticky -->
      <div class="calendar-header sticky top-2 z-30 mb-4 sm:mb-6">
        <CalendarHeader 
          :current-date="currentDate" 
          :view-mode="viewMode" 
          :week-start="weekStart" 
          :week-end="weekEnd"
          :month-start="monthStart" 
          @view-change="handleViewChange" 
          @navigate="handleNavigate" 
        />
      </div>

      <!-- Contenu avec transitions -->
      <div class="calendar-content">
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 translate-x-4"
          leave-to-class="opacity-0 -translate-x-4"
        >
          <CalendarDayView 
            v-if="viewMode === 'day'"
            key="day-view"
            :events="visibleEvents" 
            :current-date="currentDate"
            :is-today="isToday"
            @event-click="handleEventClick" 
          />

          <CalendarWeekView 
            v-else-if="viewMode === 'week'" 
            key="week-view"
            :events="visibleEvents" 
            :week-days="weekDays" 
            :is-today="isToday"
            @event-click="handleEventClick" 
          />

          <CalendarMonthView 
            v-else 
            key="month-view"
            :events="visibleEvents" 
            :month-grid="monthGrid" 
            :current-month="monthStart"
            :is-same-month="isSameMonth" 
            :is-today="isToday" 
            @event-click="handleEventClick" 
          />
        </Transition>
      </div>

      <!-- Modal -->
      <EventDetailsModal 
        :is-open="isModalOpen" 
        :event="selectedEvent" 
        @close="closeModal" 
      />
    </div>
  </div>
</template>

<style scoped>
.calendar-content {
  max-height: calc(100vh - 180px);
  overflow: visible;
}

@media (min-width: 640px) {
  .calendar-content {
    max-height: calc(100vh - 200px);
  }
}

@media (min-width: 1024px) {
  .calendar-content {
    max-height: calc(100vh - 220px);
  }
}

/* Améliorer le scrolling sur mobile */
.calendar-content {
  -webkit-overflow-scrolling: touch;
}
</style>