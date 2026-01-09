<script setup lang="ts">
import type { President } from '../../utils/types';


const props = defineProps({
  president: {
    type: Object as () => President,
    required: true
  },
});

</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
        <p class="text-sm text-gray-600">Nom</p>
        <p class="text-lg font-semibold text-gray-800">
            {{ president.name }} {{ president.lastName }}
        </p>
        </div>

        <div>
        <p class="text-sm text-gray-600">Club</p>
        <p class="text-lg font-semibold text-gray-800">
            {{ president.club.name }}
        </p>
        </div>

        <div>
        <p class="text-sm text-gray-600">Contact</p>
        <p class="text-lg font-semibold text-gray-800">
            {{ president.email }}
        </p>
        </div>
    </div>
</template>