<script setup lang="ts">
import { computed } from 'vue';
import type { CalendarEventType } from '../../utils/types';

interface TypeConfig {
  color: string;
  label: string;
  short: string;
}

type Size = 'xs' | 'sm' | 'md';

const props = defineProps({
  event: {
    type: Object as () => CalendarEventType,
    required: true,
  },
  size: {
    type: String as () => Size,
    default: 'md', // 'xs' | 'sm' | 'md'
  },
});

// Mapping des types vers classes de badge
const typeConfig: Record<string, TypeConfig> = {
  cours: { color: 'primary', label: 'Cours', short: 'C' },
  td: { color: 'secondary', label: 'TD', short: 'TD' },
  tp: { color: 'warning', label: 'TP', short: 'TP' },
  examen: { color: 'error', label: 'Examen', short: 'E' },
  projet: { color: 'success', label: 'Projet', short: 'P' },
  conference: { color: 'purple', label: 'Conf', short: 'C' },
  reunion: { color: 'neutral', label: 'Réunion', short: 'R' },
  training: { color: 'primary', label: 'Entraînement', short: 'T' },
  match: { color: 'error', label: 'Match', short: 'M' },
  recovery: { color: 'success', label: 'Récupération', short: 'Rec' },
};

const config = computed(() => typeConfig[props.event.type] || typeConfig.cours);

const badgeClass = computed(() => {
  const base = 'badge';
  const color = `badge-${config.value.color}`;
  const sizeClass = props.size === 'xs' ? 'badge-xs' : props.size === 'sm' ? 'badge-sm' : '';
  return [base, color, sizeClass].filter(Boolean).join(' ');
});

// Formatage de l'heure
const timeRange = computed(() => {
  const start = new Date(props.event.start);
  const end = new Date(props.event.end);
  const format = (date: Date): string => date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return `${format(start)} - ${format(end)}`;
});

// Version courte de l'heure (juste l'heure de début)
const timeShort = computed(() => {
  const start = new Date(props.event.start);
  return start.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
});
</script>

<template>
  <button
    :class="[
      'w-full text-left rounded-md border border-neutral-200 bg-white hover:shadow-md hover:border-neutral-300 transition-all duration-200 cursor-pointer group',
      size === 'xs' ? 'p-1' : 'p-2'
    ]"
  >
    <!-- Version extra small (mobile) -->
    <div v-if="size === 'xs'" class="flex items-center gap-1">
      <span :class="badgeClass">
        {{ config.short }}
      </span>
      
      <div class="flex-1 min-w-0">
        <p class="text-[10px] font-medium text-neutral-900 truncate group-hover:text-primary-600 transition-colors leading-tight">
          {{ event.title }}
        </p>
      </div>
    </div>

    <!-- Version small et medium -->
    <div v-else class="flex items-start gap-2">
      <span :class="badgeClass">
        <span class="sm:hidden">{{ config.short }}</span>
        <span class="hidden sm:inline">{{ config.label }}</span>
      </span>
      
      <div class="flex-1 min-w-0">
        <p :class="[
          'font-medium text-neutral-900 truncate group-hover:text-primary-600 transition-colors',
          size === 'sm' ? 'text-xs sm:text-sm' : 'text-sm'
        ]">
          {{ event.title }}
        </p>
        <p :class="[
          'text-neutral-500 mt-0.5',
          size === 'sm' ? 'text-[10px] sm:text-xs' : 'text-xs'
        ]">
          <span class="sm:hidden">{{ timeShort }}</span>
          <span class="hidden sm:inline">{{ timeRange }}</span>
        </p>
      </div>
    </div>
  </button>
</template>