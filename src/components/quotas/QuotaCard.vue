<script setup lang="ts">
interface Props {
  weeklyQuota: number;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-5 border border-blue-700/50">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-3xl">📋</span>
        <div>
          <h3 class="text-white font-semibold">Quota hebdomadaire</h3>
          <p class="text-sm text-blue-300">Charge maximale recommandée</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-4xl font-bold text-white">{{ weeklyQuota }}h</p>
        <p class="text-xs text-blue-400 mt-1">par semaine</p>
      </div>
    </div>
  </div>
</template>