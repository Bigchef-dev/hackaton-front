<script setup lang="ts">
import { ref, computed } from 'vue';
import type { League, Athlete, Sport } from '../../utils/types';

interface Props {
  sport: Sport;
  leagues: League[];
  athletes: Athlete[];
  searchTerm?: string;
}

const props = withDefaults(defineProps<Props>(), {
  searchTerm: ''
});

const emit = defineEmits<{
  back: []
}>();

const expandedLeagues = ref<Set<number>>(new Set());

const filteredLeagues = computed(() => {
  const sportLeagues = props.leagues.filter(l => l.id_sport === props.sport.id);
  
  if (!props.searchTerm) return sportLeagues;
  
  return sportLeagues.filter(league => {
    const leagueAthletes = getAthletesByLeague(league.id);
    return leagueAthletes.length > 0;
  });
});

const totalAthletes = computed(() => {
  const sportLeagueIds = props.leagues
    .filter(l => l.id_sport === props.sport.id)
    .map(l => l.id);
  return props.athletes.filter(a => 
    sportLeagueIds.includes(a.id_league) &&
    matchesSearch(a)
  ).length;
});

const getAthletesByLeague = (leagueId: number): Athlete[] => {
  return props.athletes.filter(a => 
    a.id_league === leagueId && matchesSearch(a)
  );
};

const matchesSearch = (athlete: Athlete): boolean => {
  if (!props.searchTerm) return true;
  const search = props.searchTerm.toLowerCase();
  return (
    athlete.name.toLowerCase().includes(search) ||
    athlete.lastName.toLowerCase().includes(search) ||
    athlete.email.toLowerCase().includes(search)
  );
};

const toggleLeague = (leagueId: number) => {
  if (expandedLeagues.value.has(leagueId)) {
    expandedLeagues.value.delete(leagueId);
  } else {
    expandedLeagues.value.add(leagueId);
  }
  expandedLeagues.value = new Set(expandedLeagues.value);
};

</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <button
        @click="emit('back')"
        class="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-600 hover:border-slate-500 transition-all"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Retour aux sports
      </button>
    </div>

    <div class="mb-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-800/50">
      <h2 class="text-2xl font-semibold flex items-center gap-2">
        <h2>🏆</h2>
        {{ sport.name }}
        <span class="text-sm font-normal text-gray-400 ml-2">
          ({{ totalAthletes }} athlètes)
        </span>
      </h2>
    </div>

    <div class="space-y-4">
      <div
        v-for="league in filteredLeagues"
        :key="league.id"
        class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden transition-all duration-300 hover:border-slate-600"
      >
        <button
          @click="toggleLeague(league.id)"
          class="w-full p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-500/20 rounded-lg">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div class="text-left">
              <h3 class="text-lg font-semibold text-white">{{ league.nom }}</h3>
              <p class="text-sm text-gray-400">
                {{ league.niveau }} • {{ getAthletesByLeague(league.id).length }} athlètes
              </p>
            </div>
          </div>
          <svg 
            class="w-5 h-5 text-gray-400 transition-transform"
            :class="{ 'rotate-180': expandedLeagues.has(league.id) }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-[3000px]"
          leave-from-class="opacity-100 max-h-[3000px]"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="expandedLeagues.has(league.id)" class="border-t border-slate-700">
            <div class="divide-y divide-slate-700">
              <div
                v-for="athlete in getAthletesByLeague(league.id)"
                :key="athlete.id"
                class="group hover:bg-slate-800/70 transition-all duration-200 p-4"
              >
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                    {{ athlete.name.charAt(0) }}{{ athlete.lastName.charAt(0) }}
                  </div>
                  
                  <div class="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <h4 class="font-semibold text-white text-base">
                        {{ athlete.name }} {{ athlete.lastName }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>