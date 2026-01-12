<script setup lang="ts">
import { ref } from 'vue';
import type { Session } from '../../utils/types';
import SessionCardFirst from './SessionCardFirst.vue';
import SessionCardRegular from './SessionCardRegular.vue';

interface Props {
  session: Session;
  isFirst: boolean;
}

defineProps<Props>();

const isExpanded = ref(false);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div 
    :class="[
      'w-full rounded-xl sm:rounded-2xl border backdrop-blur-sm transition-all duration-300',
      'hover:scale-[1.01] active:scale-[0.99]',
      isFirst
        ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/50 p-4 sm:p-6 md:p-8 shadow-xl shadow-blue-900/20'
        : 'bg-gray-800/30 border-gray-700/50 p-3 sm:p-4 md:p-6'
    ]"
  >
    <SessionCardFirst
      v-if="isFirst"
      :session="session"
      :is-expanded="isExpanded"
      @toggle="toggleExpand"
    />
    
    <SessionCardRegular
      v-else
      :session="session"
      :is-expanded="isExpanded"
      @toggle="toggleExpand"
    />
  </div>
</template>