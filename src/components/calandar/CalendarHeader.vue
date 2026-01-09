<script setup lang="ts">
import { computed } from 'vue';
import type { ViewMode, NavigationDirection } from '../../utils/types';

const props = defineProps<{
  currentDate: Date;
  viewMode: ViewMode;
  weekStart: Date;
  weekEnd: Date;
  monthStart: Date;
}>();

const emit = defineEmits<{
  'view-change': [mode: ViewMode];
  'navigate': [direction: NavigationDirection];
}>();

const title = computed(() => {
  if (props.viewMode === 'day') {
    return props.currentDate.toLocaleDateString('fr-FR', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long', 
      year: 'numeric' 
    }).replace(/^\w/, c => c.toUpperCase());
  } else if (props.viewMode === 'week') {
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

const shortTitle = computed(() => {
  if (props.viewMode === 'day') {
    return props.currentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  } else if (props.viewMode === 'week') {
    const month = props.weekStart.toLocaleDateString('fr-FR', { month: 'short' });
    return `${month.charAt(0).toUpperCase() + month.slice(1)}`;
  } else {
    return props.monthStart.toLocaleDateString('fr-FR', { month: 'short' })
      .replace(/^\w/, c => c.toUpperCase());
  }
});

const isDayView = computed(() => props.viewMode === 'day');
const isWeekView = computed(() => props.viewMode === 'week');
const isMonthView = computed(() => props.viewMode === 'month');
</script>

<template>
  <div class="bg-slate-900 rounded-xl p-3 sm:p-5 shadow-2xl border border-slate-700/50">
    <!-- Mobile: Layout vertical compact -->
    <div class="flex flex-col gap-5 lg:hidden">
      <!-- Ligne 1: Titre + Navigation -->
      <div class="flex items-center justify-between">
        <h2 class="text-lg sm:text-xl font-bold text-white">
          <span class="sm:hidden">{{ shortTitle }}</span>
          <span class="hidden sm:inline">{{ title }}</span>
        </h2>
      </div>
        
        <div class="flex items-center gap-1.5">
          <button
            @click="emit('navigate', 'prev')"
            class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200"
            aria-label="Période précédente"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            @click="emit('navigate', 'next')"
            class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200"
            aria-label="Période suivante"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      <!-- Ligne 2: Bouton Aujourd'hui + Sélecteur de vue -->
      <div class="flex items-center justify-between gap-2">
        <button
          @click="emit('navigate', 'today')"
          class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-600/20"
        >
          Aujourd'hui
        </button>
        
        <!-- Sélecteur de vue compact - Mobile: seulement Jour -->
        <div class="flex items-center gap-1 bg-slate-800 rounded-lg p-1 sm:hidden">
          <button
            @click="emit('view-change', 'day')"
            class="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 bg-slate-700 text-white shadow-sm"
          >
            Jour
          </button>
        </div>

        <!-- Sélecteur de vue - Tablette: Jour + Semaine + Mois -->
        <div class="hidden sm:flex items-center gap-1 bg-slate-800 rounded-lg p-1 lg:hidden">
          <button
            @click="emit('view-change', 'day')"
            :class="[
              'px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200',
              isDayView 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            ]"
          >
            Jour
          </button>
          
          <button
            @click="emit('view-change', 'week')"
            :class="[
              'px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200',
              isWeekView 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            ]"
          >
            Semaine
          </button>

          <button
            @click="emit('view-change', 'month')"
            :class="[
              'px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200',
              isMonthView 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            ]"
          >
            Mois
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop: Layout horizontal -->
  <div class="hidden lg:grid grid-cols-3 items-center w-full">
    <div class="flex justify-start">
      <h2 class="text-2xl font-bold text-white whitespace-nowrap">
        {{ title }}
      </h2>
    </div>

    <div class="flex items-center justify-center gap-2">
      <button
        @click="emit('navigate', 'prev')"
        class="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200"
        aria-label="Période précédente"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        @click="emit('navigate', 'today')"
        class="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all duration-200 shadow-lg shadow-blue-600/20"
      >
        Aujourd'hui
      </button>
      
      <button
        @click="emit('navigate', 'next')"
        class="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200"
        aria-label="Période suivante"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div class="flex justify-end">
      <div class="flex items-center gap-1.5 bg-slate-800 rounded-lg p-1">
        <button
          @click="emit('view-change', 'day')"
          :class="[
            'px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200',
            isDayView ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'
          ]"
        >
          Jour
        </button>

        <button
          @click="emit('view-change', 'week')"
          :class="[
            'px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200',
            isWeekView ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'
          ]"
        >
          Semaine
        </button>
        
        <button
          @click="emit('view-change', 'month')"
          :class="[
            'px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200',
            isMonthView ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'
          ]"
        >
          Mois
        </button>
      </div>
    </div>
  </div>
</div>
</template>