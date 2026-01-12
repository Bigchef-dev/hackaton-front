<script setup lang="ts">
interface TrainingLoad {
  totalHours: number;
  totalSessions: number;
  avgHoursPerWeek: number;
  avgSessionsPerWeek: number;
}

interface Props {
  trainingLoad: TrainingLoad;
  variant: 'past' | 'future';
}

const props = defineProps<Props>();

const cardClasses = props.variant === 'future' 
  ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl p-5 border border-blue-700/50'
  : 'bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50';

const textClasses = props.variant === 'future'
  ? { title: 'text-blue-300', subtitle: 'text-blue-400' }
  : { title: 'text-gray-400', subtitle: 'text-gray-500' };

const periodText = props.variant === 'future' ? '4 prochaines semaines' : '4 dernières semaines';
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div :class="cardClasses">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">⏱️</span>
        <h3 :class="textClasses.title" class="text-sm font-medium">
          {{ variant === 'future' ? 'Heures prévues' : 'Heures totales' }}
        </h3>
      </div>
      <p class="text-3xl font-bold text-white">{{ trainingLoad.totalHours.toFixed(1) }}h</p>
      <p :class="textClasses.subtitle" class="text-xs mt-1">{{ periodText }}</p>
    </div>

    <div :class="cardClasses">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📊</span>
        <h3 :class="textClasses.title" class="text-sm font-medium">Moyenne/semaine</h3>
      </div>
      <p class="text-3xl font-bold text-white">{{ trainingLoad.avgHoursPerWeek.toFixed(1) }}h</p>
      <p :class="textClasses.subtitle" class="text-xs mt-1">Heures d'entraînement</p>
    </div>

    <div :class="cardClasses">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">🏋️</span>
        <h3 :class="textClasses.title" class="text-sm font-medium">
          {{ variant === 'future' ? 'Séances prévues' : 'Séances totales' }}
        </h3>
      </div>
      <p class="text-3xl font-bold text-white">{{ trainingLoad.totalSessions }}</p>
      <p :class="textClasses.subtitle" class="text-xs mt-1">{{ periodText }}</p>
    </div>

    <div :class="cardClasses">
      <div class="flex items-center gap-3 mb-2">
        <span class="text-3xl">📅</span>
        <h3 :class="textClasses.title" class="text-sm font-medium">Moyenne/semaine</h3>
      </div>
      <p class="text-3xl font-bold text-white">{{ trainingLoad.avgSessionsPerWeek.toFixed(1) }}</p>
      <p :class="textClasses.subtitle" class="text-xs mt-1">Séances d'entraînement</p>
    </div>
  </div>
</template>