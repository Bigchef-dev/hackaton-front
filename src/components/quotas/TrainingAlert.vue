<script setup lang="ts">
interface Alert {
  type: 'warning' | 'danger';
  message: string;
}

interface Props {
  alerts: Alert[];
}

defineProps<Props>();
</script>

<template>
  <div v-if="alerts.length > 0" class="space-y-3">
    <div
      v-for="(alert, index) in alerts"
      :key="index"
      :class="[
        'p-4 rounded-xl border backdrop-blur-sm',
        alert.type === 'danger'
          ? 'bg-red-900/20 border-red-500/50 text-red-200'
          : 'bg-yellow-900/20 border-yellow-500/50 text-yellow-200'
      ]"
    >
      <div class="flex items-start gap-3">
        <span class="text-2xl">{{ alert.type === 'danger' ? '⚠️' : '⚡' }}</span>
        <p class="text-sm font-medium flex-1">{{ alert.message }}</p>
      </div>
    </div>
  </div>
</template>