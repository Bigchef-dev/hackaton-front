<script setup lang="ts">
import { ref } from 'vue';
import type { Session } from '../../utils/types';
import CalendarEvent from './CalendarEvent.vue';

const props = defineProps<{
  date: Date;
  events: Session[];
  isCurrentMonth: boolean;
  isToday: boolean;
}>();

const emit = defineEmits<{
  'event-click': [event: Session];
  'show-tooltip': [event: Session, x: number, y: number];
  'hide-tooltip': [];
}>();

const cellRef = ref<HTMLElement | null>(null);
let hoverTimeout: number | null = null;

const visibleEventsMobile = props.events.slice(0, 2);
const visibleEventsDesktop = props.events.slice(0, 3);
const hasMoreMobile = props.events.length > 2;
const hasMoreDesktop = props.events.length > 3;

const eventTypes = new Set(props.events.map(e => e.type));
const hasENTRAINEMENT = eventTypes.has('ENTRAINEMENT');
const hasCOMPETITION = eventTypes.has('COMPETITION');

const handleMouseEnter = (event: Session, e: MouseEvent) => {
  if (!cellRef.value) return;
  
  hoverTimeout = window.setTimeout(() => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    emit('show-tooltip', event, x, y);
  }, 500); 
};

const handleMouseLeave = () => {
  if (hoverTimeout !== null) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
  emit('hide-tooltip');
};

const handleTouchStart = (event: Session, e: TouchEvent) => {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;
  
  hoverTimeout = window.setTimeout(() => {
    emit('show-tooltip', event, x, y);
  }, 700);
};

const handleTouchEnd = () => {
  if (hoverTimeout !== null) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
};
</script>

<template>
  <div
    ref="cellRef"
    :class="[
      'min-h-[60px] sm:min-h-[80px] lg:min-h-[100px] border-r border-b border-slate-700/50 p-1.5 sm:p-2.5 transition-all duration-200',
      isCurrentMonth ? 'bg-slate-800/40 hover:bg-slate-800/60' : 'bg-slate-900/60',
      isToday && 'bg-blue-900/30 ring-2 ring-blue-500/50'
    ]"
  >
    <div class="flex justify-between items-start mb-1.5 sm:mb-2">
      <span
        :class="[
          'inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm font-bold rounded-full transition-all',
          isToday 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/30' 
            : isCurrentMonth
            ? 'text-slate-200 hover:bg-slate-700'
            : 'text-slate-600'
        ]"
      >
        {{ date.getDate() }}
      </span>

      <div v-if="events.length > 0" class="flex items-center gap-1">
        <div v-if="hasENTRAINEMENT" class="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></div>
        <div v-if="hasCOMPETITION" class="w-1.5 h-1.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50"></div>
      </div>
    </div>
    <div class="space-y-1.5 lg:hidden">
      <div
        v-for="event in visibleEventsMobile"
        :key="event.id"
        @mouseenter="handleMouseEnter(event, $event)"
        @mouseleave="handleMouseLeave"
        @touchstart="handleTouchStart(event, $event)"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchEnd"
      >
        <CalendarEvent
          :event="event"
          size="xs"
          @click="emit('event-click', event)"
        />
      </div>
      
      <button
        v-if="hasMoreMobile"
        class="text-[10px] text-slate-400 hover:text-blue-400 font-medium transition-colors w-full text-left px-1.5 py-1 rounded hover:bg-slate-700/50"
        @click.stop="emit('event-click', events[2])"
      >
        +{{ events.length - 2 }} autres
      </button>
    </div>

    <div class="space-y-1.5 hidden lg:block">
      <div
        v-for="event in visibleEventsDesktop"
        :key="event.id"
        @mouseenter="handleMouseEnter(event, $event)"
        @mouseleave="handleMouseLeave"
      >
        <CalendarEvent
          :event="event"
          size="sm"
          @click="emit('event-click', event)"
        />
      </div>
      
      <button
        v-if="hasMoreDesktop"
        class="text-xs text-slate-400 hover:text-blue-400 font-medium transition-colors w-full text-left px-2 py-1 rounded hover:bg-slate-700/50"
        @click.stop="emit('event-click', events[3])"
      >
        +{{ events.length - 3 }} autres
      </button>
    </div>
  </div>
</template>