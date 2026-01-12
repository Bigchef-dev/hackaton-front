<script setup lang="ts">
import { computed } from 'vue';

interface WeekData {
  week: number;
  hours: number;
  sessions: number;
  label: string;
}

interface Thresholds {
  weeklyHoursWarning: number;
  weeklyHoursMax: number;
}

interface Props {
  weeklyData: WeekData[];
  thresholds: Thresholds;
  weeklyQuota?: number;
  variant: 'past' | 'future';
  title: string;
}

const props = defineProps<Props>();

const maxHours = computed(() => Math.max(...props.weeklyData.map(w => w.hours), 1));

const getBarHeight = (value: number, max: number): number => {
  return max > 0 ? (value / max) * 100 : 0;
};

const getBarClasses = (hours: number): string => {
  if (props.variant === 'past') {
    return 'bg-gradient-to-r from-slate-600 to-slate-500';
  }
  
  if (hours >= props.thresholds.weeklyHoursMax) {
    return 'bg-gradient-to-r from-red-600 to-red-500';
  } else if (hours >= props.thresholds.weeklyHoursWarning) {
    return 'bg-gradient-to-r from-yellow-600 to-yellow-500';
  }
  return 'bg-gradient-to-r from-blue-600 to-blue-500';
};
</script>

<template>
  <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
    <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
      <span>📈</span>
      {{ title }}
    </h3>
    
    <div class="space-y-4">
      <div v-for="week in weeklyData" :key="week.label" class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-400 font-medium">{{ week.label }}</span>
          <span class="text-white font-bold">{{ week.hours.toFixed(1) }}h • {{ week.sessions }} séances</span>
        </div>
        
        <div class="relative h-8 bg-gray-700/30 rounded-lg overflow-hidden">
          <div
            :style="{ width: `${getBarHeight(week.hours, maxHours)}%` }"
            :class="[
              'h-full transition-all duration-500 rounded-lg',
              getBarClasses(week.hours)
            ]"
          ></div>
          
          <!-- Lignes de seuil pour le futur uniquement -->
          <template v-if="variant === 'future' && maxHours > 0">
            <div
              :style="{ left: `${getBarHeight(thresholds.weeklyHoursWarning, maxHours)}%` }"
              class="absolute top-0 bottom-0 w-0.5 bg-yellow-400/50"
            ></div>
            <div
              :style="{ left: `${getBarHeight(thresholds.weeklyHoursMax, maxHours)}%` }"
              class="absolute top-0 bottom-0 w-0.5 bg-red-400/50"
            ></div>
          </template>
        </div>
      </div>
    </div>

    <div v-if="variant === 'future'" class="flex items-center gap-6 mt-6 pt-4 border-t border-gray-700/50 text-xs">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
        <span class="text-gray-400">Normal</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <span class="text-gray-400">Alerte (80% du quota)</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <span class="text-gray-400">Critique (quota: {{ weeklyQuota }}h)</span>
      </div>
    </div>
  </div>
</template>