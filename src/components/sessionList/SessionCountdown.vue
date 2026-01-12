<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  date: Date;
}

const props = defineProps<Props>();

const countdown = ref('');

const getCountdown = (date: Date): string => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `Dans ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Dans ${hours}h${minutes > 0 ? minutes.toString().padStart(2, '0') : ''}`;
  } else if (minutes > 0) {
    return `Dans ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return "Maintenant";
  }
};

const updateCountdown = () => {
  countdown.value = getCountdown(props.date);
};

let intervalId: number;

onMounted(() => {
  updateCountdown();
  intervalId = window.setInterval(updateCountdown, 60000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="text-blue-400 text-base sm:text-lg font-semibold">
    {{ countdown }}
  </div>
</template>