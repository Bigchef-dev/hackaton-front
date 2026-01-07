<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentDate: {
    type: Date,
    required: true,
  },
  viewMode: {
    type: String,
    required: true,
  },
  weekStart: Date,
  weekEnd: Date,
  monthStart: Date,
});

const emit = defineEmits(['view-change', 'navigate']);

const title = computed(() => {
  if (props.viewMode === 'week') {
    const startMonth = props.weekStart.toLocaleDateString('fr-FR', { month: 'short' });
    const endMonth = props.weekEnd.toLocaleDateString('fr-FR', { month: 'short' });
    const year = props.weekStart.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} ${year}`;
    }
    return `${startMonth} - ${endMonth} ${year}`;
  } else {
    return props.monthStart.toLocaleDateString('fr-FR', { 
      month: 'long', 
      year: 'numeric' 
    }).replace(/^\w/, c => c.toUpperCase());
  }
});

// Version courte du titre pour mobile
const shortTitle = computed(() => {
  if (props.viewMode === 'week') {
    const month = props.weekStart.toLocaleDateString('fr-FR', { month: 'short' });
    return `${month.charAt(0).toUpperCase() + month.slice(1)}`;
  } else {
    return props.monthStart.toLocaleDateString('fr-FR', { month: 'short' })
      .replace(/^\w/, c => c.toUpperCase());
  }
});

const isWeekView = computed(() => props.viewMode === 'week');
const isMonthView = computed(() => props.viewMode === 'month');
</script>

<template>
  <div class="card p-3 sm:p-4">
    <!-- Mobile: Layout vertical compact -->
    <div class="flex flex-col gap-3 lg:hidden">
      <!-- Ligne 1: Titre + Navigation -->
      <div class="flex items-center justify-between">
        <h2 class="text-lg sm:text-xl font-semibold text-neutral-900">
          <span class="sm:hidden">{{ shortTitle }}</span>
          <span class="hidden sm:inline">{{ title }}</span>
        </h2>
        
        <div class="flex items-center gap-1">
          <button
            @click="emit('navigate', 'prev')"
            class="btn btn-secondary btn-sm p-2"
            aria-label="Période précédente"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            @click="emit('navigate', 'next')"
            class="btn btn-secondary btn-sm p-2"
            aria-label="Période suivante"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Ligne 2: Bouton Aujourd'hui + Sélecteur de vue -->
      <div class="flex items-center justify-between gap-2">
        <button
          @click="emit('navigate', 'today')"
          class="btn btn-secondary btn-sm flex-shrink-0"
        >
          Aujourd'hui
        </button>
        
        <!-- Sélecteur de vue compact -->
        <div class="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
          <button
            @click="emit('view-change', 'week')"
            :class="[
              'px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors',
              isWeekView 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-neutral-600 hover:text-neutral-900'
            ]"
          >
            Semaine
          </button>
          
          <button
            @click="emit('view-change', 'month')"
            :class="[
              'px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors',
              isMonthView 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-neutral-600 hover:text-neutral-900'
            ]"
          >
            Mois
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop: Layout horizontal -->
    <div class="hidden lg:flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-semibold text-neutral-900">
          {{ title }}
        </h2>
        
        <div class="flex items-center gap-1">
          <button
            @click="emit('navigate', 'prev')"
            class="btn btn-secondary btn-sm"
            aria-label="Période précédente"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            @click="emit('navigate', 'today')"
            class="btn btn-secondary btn-sm"
          >
            Aujourd'hui
          </button>
          
          <button
            @click="emit('navigate', 'next')"
            class="btn btn-secondary btn-sm"
            aria-label="Période suivante"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Sélecteur de vue -->
      <div class="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
        <button
          @click="emit('view-change', 'week')"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            isWeekView 
              ? 'bg-white text-primary-600 shadow-sm' 
              : 'text-neutral-600 hover:text-neutral-900'
          ]"
        >
          Semaine
        </button>
        
        <button
          @click="emit('view-change', 'month')"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            isMonthView 
              ? 'bg-white text-primary-600 shadow-sm' 
              : 'text-neutral-600 hover:text-neutral-900'
          ]"
        >
          Mois
        </button>
      </div>
    </div>
  </div>
</template>