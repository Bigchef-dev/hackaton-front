<script setup lang="ts">
interface Props {
  type: string;
  isFirst?: boolean;
}

defineProps<Props>();
</script>

<template>
  <span
    :class="[
      'rounded-full text-xs font-semibold uppercase tracking-wide inline-flex items-center justify-center sm:justify-start w-fit',
      isFirst 
        ? 'px-2.5 py-1'
        : 'px-2 py-0.5 sm:py-1',
      type === 'ENTRAINEMENT'
        ? isFirst
          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          : 'bg-blue-500/20 text-blue-300'
        : isFirst
          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
          : 'bg-red-500/20 text-red-300'
    ]"
  >
    {{ type }}
  </span>
</template>