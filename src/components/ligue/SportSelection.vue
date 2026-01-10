<script setup lang="ts">
import type { League, Athlete, Sport } from '../../utils/types';


interface Props {
  sports: Sport[];
  leagues: League[];
  athletes: Athlete[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  selectSport: [sportId: number]
}>();

const getLeagueCount = (sportId: number): number => {
  return props.leagues.filter(l => l.id_sport === sportId).length;
};

const getAthleteCountBySport = (sportId: number): number => {
  const targetLeagueIds = props.leagues
    .filter(league => league.id_sport === sportId)
    .map(league => league.id);

  return props.athletes.filter(athlete => 
    targetLeagueIds.includes(athlete.id_league)
  ).length;
};

const handleSelectSport = (sportId: number) => {
  emit('selectSport', sportId);
};
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="mb-6">
      <h2 class="text-2xl font-semibold mb-4 flex items-center gap-2">
        <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        Sélectionnez un sport
      </h2>
    </div>
    
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      <div class="divide-y divide-slate-700">
        <button
          v-for="sport in sports"
          :key="sport.id"
          @click="handleSelectSport(sport.id)"
          class="w-full group hover:bg-slate-800/70 transition-all duration-200 p-5 flex items-center justify-between"
        >
          <div class="flex items-center gap-4">
            <div class="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
              <h2>🏆</h2>
            </div>
            <div class="text-left">
              <h3 class="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                {{ sport.name }}
              </h3>
              <p class="text-sm text-gray-400 mt-1">
                {{ getLeagueCount(sport.id) }} ligues • {{ getAthleteCountBySport(sport.id) }} athlètes
              </p>
            </div>
          </div>
          <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>