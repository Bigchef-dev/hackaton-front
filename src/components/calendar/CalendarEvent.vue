<script setup lang="ts">
import { computed } from 'vue';
import type { Session } from '../../utils/types';

interface TypeConfig {
  gradient: string;
  label: string;
  short: string;
  icon: string;
}

type Size = 'xs' | 'sm' | 'md';

const props = defineProps<{
  event: Session;
  size?: Size;
}>();

// Mapping des types avec gradients modernes
const typeConfig: Record<string, TypeConfig> = {
  ENTRAINEMENT: { 
    gradient: 'from-blue-500 to-blue-600', 
    label: 'Entraînement', 
    short: 'ENT',
    icon: '💪'
  },
  COMPETITION: { 
    gradient: 'from-red-500 to-red-600', 
    label: 'COMPETITION', 
    short: 'MAT',
    icon: '🏆'
  },
};

const getEndDate = (session: Session): Date => {
  const startDate = new Date(session.date_session);
  const durationInMs = session.duree * 60 * 60 * 1000; 
  
  return new Date(startDate.getTime() + durationInMs);
};

const config = computed(() => typeConfig[props.event.type] || typeConfig.ENTRAINEMENT);

// Formatage de l'heure
const timeRange = computed(() => {
  const start = props.event.date_session;
  const end = getEndDate(props.event);
  const format = (date: Date): string => date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return `${format(start)} - ${format(end)}`;
});

const timeShort = computed(() => {
  const start = props.event.date_session;
  return start.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
});

const sizeValue = computed(() => props.size || 'md');
</script>

<template>
  <button
    :class="[
      'w-full text-left rounded-lg border border-slate-700 bg-gradient-to-br hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden',
      `bg-gradient-to-br ${config.gradient}`,
      sizeValue === 'xs' ? 'p-1.5' : sizeValue === 'sm' ? 'p-2' : 'p-3'
    ]"
  >
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-500 -translate-x-full"></div>
    
    <div v-if="sizeValue === 'xs'" class="flex items-center gap-1.5 relative z-10">
      <span class="text-xs">{{ config.icon }}</span>
      
      <div class="flex-1 min-w-0">
        <p class="text-[10px] font-semibold text-white truncate leading-tight">
          {{ event.type }}
        </p>
        <p class="text-[9px] text-white/70">{{ timeShort }}</p>
      </div>

      <div v-if="event.activities && event.activities.length > 0" 
           class="w-1 h-1 rounded-full bg-white/60"></div>
    </div>

    <div v-else-if="sizeValue === 'sm'" class="relative z-10">
      <div class="flex items-start gap-2 mb-1">
        <span class="text-sm">{{ config.icon }}</span>
        <div class="flex-1 min-w-0">
          <p class="text-xs sm:text-sm font-semibold text-white truncate">
            {{ event.type }}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-[10px] sm:text-xs text-white/80">
          <span class="sm:hidden">{{ timeShort }}</span>
          <span class="hidden sm:inline">{{ timeRange }}</span>
        </p>
        <div v-if="event.activities && event.activities.length > 0" 
             class="flex items-center gap-0.5">
          <div v-for="n in Math.min(event.activities.length, 3)" 
               :key="n"
               class="w-1 h-1 rounded-full bg-white/60"></div>
        </div>
      </div>
    </div>

    <div v-else class="relative z-10">
      <div class="flex items-start gap-2 mb-2">
        <span class="text-lg">{{ config.icon }}</span>
        <div class="flex-1 min-w-0">
          <span class="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-[10px] font-medium text-white mb-1">
            {{ config.label }}
          </span>
          <p class="text-sm font-semibold text-white truncate">
            {{ event.type }}
          </p>
        </div>
      </div>
      
      <div class="flex items-center justify-between text-xs text-white/90">
        <span>{{ timeRange }}</span>
        <div v-if="event.activities && event.activities.length > 0" 
             class="flex items-center gap-1">
          <span class="text-[10px]">{{ event.activities.length }} activités</span>
        </div>
      </div>
    </div>
  </button>
</template>