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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-white" >
        <div>
        <p class="text-sm ">Nom</p>
        <p class="text-lg font-semibold ">
            {{ president.name }} {{ president.lastName }}
        </p>
        </div>

        <div>
        <p class="text-sm ">Club</p>
        <p class="text-lg font-semibold ">
            {{ president.club.name }}
        </p>
        </div>

        <div>
        <p class="text-sm ">Contact</p>
        <p class="text-lg font-semibold ">
            {{ president.email }}
        </p>
        </div>
    </div>
</template>