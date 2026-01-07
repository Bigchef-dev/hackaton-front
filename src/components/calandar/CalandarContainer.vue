<script setup lang="ts">
import {computed } from 'vue';
import type { CalendarEventType } from '../../utils/types';
import { useCalendar } from '../../utils/composabes/calandar/useCalendar';
import { useModal } from '../../utils/composabes/calandar/useModal';
import CalendarHeader from './CalandarHeader.vue';
import CalendarWeekView from './CalandarWeekView.vue';
import CalendarMonthView from './CalandarMonthView.vue';
import EventDetailsModal from './EventDetailsModal.vue';

// Props
const props = defineProps({
  events: {
    type: Array as () => CalendarEventType[],
    default: () => [],
  },
});

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

const { isOpen: isModalOpen, modalData: selectedEvent, open: openModal, close: closeModal } = useModal();

// Filtrage des événements selon la période visible
const visibleEvents = computed(() => {
  const start = viewMode.value === 'week' ? weekStart.value : monthStart.value;
  const end = viewMode.value === 'week' ? weekEnd.value : monthEnd.value;
  
  return props.events.filter(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return eventStart <= end && eventEnd >= start;
  });
});

// Handlers
const handleViewChange = (mode: 'week' | 'month'): void => {
  setViewMode(mode);
};

const handleNavigate = (direction: 'today' | 'prev' | 'next'): void => {
  if (direction === 'today') goToToday();
  else if (direction === 'prev') goToPrevious();
  else if (direction === 'next') goToNext();
};

const handleEventClick = (event: CalendarEventType): void => {
  openModal(event);
};
</script>

<template>
  <div class="calendar-container">
    <div class="calendar-header">
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

    <!-- Contenu scrollable (grilles semaine/mois) -->
    <div class="calendar-content">
      <CalendarWeekView
        v-if="viewMode === 'week'"
        :events="visibleEvents"
        :week-days="weekDays"
        :is-today="isToday"
        @event-click="handleEventClick"
      />
    
      <CalendarMonthView
        v-else
        :events="visibleEvents"
        :month-grid="monthGrid"
        :current-month="monthStart"
        :is-same-month="isSameMonth"
        :is-today="isToday"
        @event-click="handleEventClick"
      />
    </div>

    <EventDetailsModal
      :is-open="isModalOpen"
      :event="selectedEvent"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.calendar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.5rem;
}

.calendar-header {
  position: sticky;
  top: 0;
  background: inherit;
  z-index: 10;
  margin-bottom: 1rem;
}

.calendar-content {
  /* Hauteur adaptative selon l'écran */
  max-height: calc(100vh - 200px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

/* Tablette */
@media (min-width: 640px) {
  .calendar-container {
    padding: 1rem;
  }
  
  .calendar-header {
    margin-bottom: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .calendar-content {
    max-height: calc(100vh - 180px);
  }
}
</style>