<script setup lang="ts">
import LoginIcon from './icons/LoginIcon.vue';
import LoadingSpinner from './LoadingSpinner.vue';

defineProps({
  loading: Boolean,
  disabled: Boolean,
  label: String,
  loadingLabel: String
});
</script>

<template>
  <button
    type="submit"
    class="btn btn-primary w-full py-3 text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
    :disabled="loading || disabled"
    :class="{
      'opacity-50 cursor-not-allowed': loading || disabled,
      'hover:scale-[1.02]': !loading && !disabled
    }"
  >
    <span v-if="!loading" class="flex items-center justify-center">
      <LoginIcon class="mr-2" />
      {{ label }}
    </span>
    <span v-else class="flex items-center justify-center">
      <LoadingSpinner class="mr-2" />
      {{ loadingLabel }}
    </span>
  </button>
</template>