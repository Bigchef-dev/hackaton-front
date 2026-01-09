<script setup lang="ts">
interface Activity {
  id: string | number;
  theme: string;
}

interface Props {
  activities: Activity[];
  isExpanded: boolean;
  isFirst?: boolean;
}

defineProps<Props>();
</script>

<template>
  <Transition name="expand">
    <div v-if="isExpanded" :class="['w-full', isFirst ? 'mt-3 sm:mt-4 space-y-2' : 'mt-2 sm:mt-3 space-y-1.5 sm:space-y-2']">
      <div v-if="isFirst" class="text-gray-300 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
        Programme détaillé :
      </div>
      
      <div
        v-for="(activity, actIndex) in activities"
        :key="activity.id"
        :class="[
          'w-full rounded-lg flex items-center',
          isFirst 
            ? 'bg-gray-900/50 p-3 sm:p-4 border border-gray-700/50 gap-2 sm:gap-3'
            : 'bg-gray-900/30 p-2.5 sm:p-3 border border-gray-700/30 gap-2 text-xs sm:text-sm'
        ]"
      >
        <div 
          :class="[
            'rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold flex-shrink-0',
            isFirst 
              ? 'w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm'
              : 'w-5 h-5 sm:w-6 sm:h-6 text-xs'
          ]"
        >
          {{ actIndex + 1 }}
        </div>
        <div 
          :class="[
            'flex-1 break-words min-w-0',
            isFirst ? 'text-gray-200 text-sm sm:text-base' : 'text-gray-300'
          ]"
        >
          {{ activity.theme }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 800px;
}
</style>