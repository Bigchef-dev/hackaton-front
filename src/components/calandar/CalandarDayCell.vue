<script setup lang="ts">
import type { CalendarEventType } from '../../utils/types';
import CalendarEvent from './CalandarEvent.vue';

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  events: {
    type: Array as () => CalendarEventType[],
    default: () => [],
  },
  isCurrentMonth: {
    type: Boolean,
    default: true,
  },
  isToday: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'event-click': [event: CalendarEventType]
}>();

// Mobile: afficher 2 événements, Tablette: 3
const visibleEventsMobile = props.events.slice(0, 2);
const visibleEventsTablet = props.events.slice(0, 3);
const hasMoreMobile = props.events.length > 2;
const hasMoreTablet = props.events.length > 3;
</script>

<template>
  <div
    :class="[
      'min-h-[50px] sm:min-h-[60px] lg:min-h-[70px] border-r border-b border-neutral-200 p-1 sm:p-2 transition-colors',
      isCurrentMonth ? 'bg-white hover:bg-neutral-50' : 'bg-neutral-50',
      isToday && 'bg-primary-50'
    ]"
  >
    <!-- Numéro du jour -->
    <div class="flex justify-between items-start mb-1 sm:mb-2">
      <span
        :class="[
          'inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm font-medium rounded-full',
          isToday 
            ? 'bg-primary-600 text-white' 
            : isCurrentMonth
            ? 'text-neutral-900'
            : 'text-neutral-400'
        ]"
      >
        {{ date.getDate() }}
      </span>
    </div>

    <!-- Liste des événements - Mobile (max 2) -->
    <div class="space-y-1 sm:hidden">
      <CalendarEvent
        v-for="event in visibleEventsMobile"
        :key="event.id"
        :event="event"
        size="xs"
        @click="emit('event-click', event)"
      />
      
      <button
        v-if="hasMoreMobile"
        class="text-[10px] text-neutral-500 hover:text-primary-600 font-medium transition-colors w-full text-left"
        @click.stop="emit('event-click', events[2])"
      >
        +{{ events.length - 2 }}
      </button>
    </div>

    <!-- Liste des événements - Tablette/Desktop (max 3) -->
    <div class="space-y-1 hidden sm:block">
      <CalendarEvent
        v-for="event in visibleEventsTablet"
        :key="event.id"
        :event="event"
        size="sm"
        @click="emit('event-click', event)"
      />
      
      <button
        v-if="hasMoreTablet"
        class="text-xs text-neutral-500 hover:text-primary-600 font-medium transition-colors"
        @click.stop="emit('event-click', events[3])"
      >
        +{{ events.length - 3 }} de plus
      </button>
    </div>
  </div>
</template>