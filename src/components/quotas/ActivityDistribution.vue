<script setup lang="ts">
interface ActivityDistributionItem {
  type: string;
  count: number;
  percentage: number;
}

interface Props {
  distribution: ActivityDistributionItem[];
  totalSessions: number;
  variant: 'past' | 'future';
}

defineProps<Props>();

const getActivityColor = (index: number): string => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500'
  ];
  return colors[index % colors.length];
};
</script>

<template>
  <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
    <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
      <span>🎯</span>
      {{ variant === 'future' ? 'Distribution prévue des activités sportives' : 'Distribution des activités sportives (passé)' }}
    </h3>
    
    <div v-if="distribution.length > 0" class="space-y-4">
      <div
        v-for="(activity, index) in distribution"
        :key="activity.type"
        class="space-y-2"
      >
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-300 font-medium">{{ activity.type }}</span>
          <span class="text-white font-bold">{{ activity.count }} ({{ activity.percentage.toFixed(1) }}%)</span>
        </div>
        
        <div class="relative h-6 bg-gray-700/30 rounded-lg overflow-hidden">
          <div
            :style="{ width: `${activity.percentage}%` }"
            :class="[
              'h-full transition-all duration-500 rounded-lg',
              getActivityColor(index)
            ]"
          ></div>
        </div>
      </div>
      
      <div class="mt-6 pt-4 border-t border-gray-700/50">
        <p class="text-sm text-gray-400">
          {{ variant === 'future' ? 'Total prévu : ' : 'Total : ' }}
          {{ distribution.reduce((sum, a) => sum + a.count, 0) }} activités réparties sur {{ totalSessions }} séances
        </p>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      {{ variant === 'future' ? 'Aucune activité prévue sur cette période' : 'Aucune activité enregistrée sur cette période' }}
    </div>
  </div>
</template>