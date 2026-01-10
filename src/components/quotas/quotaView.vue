<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Session, Athlete } from '../../utils/types';
import { generateRecurrentOccurrences } from '../../utils/composables/calandar/useRecurrence';

interface Props {
  athlete: Athlete;
  sessions: Session[];
}

const props = defineProps<Props>();

// Seuils basés sur le quota de l'athlète
const weeklyQuota = computed(() => props.athlete.quota || 10);
const thresholds = computed(() => ({
  weeklyHoursWarning: weeklyQuota.value * 0.8, // 80% du quota
  weeklyHoursMax: weeklyQuota.value // 100% du quota
}));

const analysisWeeks = ref(4);

// Fonction générique pour calculer la charge
const calculateTrainingLoad = (periodStart: Date, periodEnd: Date, isPast: boolean = false) => {
  // Générer toutes les occurrences avec récurrence
  const allOccurrences: Session[] = [];
  props.sessions.forEach(session => {
    const occurrences = generateRecurrentOccurrences(session, periodStart, periodEnd);
    allOccurrences.push(...occurrences);
  });
  
  const filteredSessions = allOccurrences;
  const totalHours = filteredSessions.reduce((sum, s) => sum + s.duree, 0);
  const totalSessions = filteredSessions.length;
  
  const weeklyData: { week: number; hours: number; sessions: number; label: string }[] = [];
  
  if (isPast) {
    // Pour le passé, on part du plus ancien au plus récent
    for (let i = analysisWeeks.value - 1; i >= 0; i--) {
      const weekStart = new Date(periodEnd);
      weekStart.setDate(weekStart.getDate() - ((i + 1) * 7));
      const weekEnd = new Date(periodEnd);
      weekEnd.setDate(weekEnd.getDate() - (i * 7));
      
      const weekSessions = filteredSessions.filter(s => {
        const sessionDate = new Date(s.date_session);
        return sessionDate >= weekStart && sessionDate < weekEnd;
      });
      
      weeklyData.push({
        week: analysisWeeks.value - i,
        hours: weekSessions.reduce((sum, s) => sum + s.duree, 0),
        sessions: weekSessions.length,
        label: `S-${i + 1}`
      });
    }
  } else {
    // Pour le futur, on part d'aujourd'hui vers le futur
    for (let i = 0; i < analysisWeeks.value; i++) {
      const weekStart = new Date(periodStart);
      weekStart.setDate(weekStart.getDate() + (i * 7));
      const weekEnd = new Date(periodStart);
      weekEnd.setDate(weekEnd.getDate() + ((i + 1) * 7));
      
      const weekSessions = filteredSessions.filter(s => {
        const sessionDate = new Date(s.date_session);
        return sessionDate >= weekStart && sessionDate < weekEnd;
      });
      
      weeklyData.push({
        week: i + 1,
        hours: weekSessions.reduce((sum, s) => sum + s.duree, 0),
        sessions: weekSessions.length,
        label: `S+${i + 1}`
      });
    }
  }
  
  const avgHoursPerWeek = totalHours / analysisWeeks.value;
  const avgSessionsPerWeek = totalSessions / analysisWeeks.value;
  
  return {
    totalHours,
    totalSessions,
    avgHoursPerWeek,
    avgSessionsPerWeek,
    weeklyData,
    allOccurrences
  };
};

// Charge des 4 dernières semaines
const pastTrainingLoad = computed(() => {
  const now = new Date();
  const weeksAgo = new Date(now);
  weeksAgo.setDate(weeksAgo.getDate() - (analysisWeeks.value * 7));
  return calculateTrainingLoad(weeksAgo, now, true);
});

// Charge des 4 prochaines semaines
const futureTrainingLoad = computed(() => {
  const now = new Date();
  const weeksFromNow = new Date(now);
  weeksFromNow.setDate(weeksFromNow.getDate() + (analysisWeeks.value * 7));
  return calculateTrainingLoad(now, weeksFromNow, false);
});

// Distribution des activités pour le passé
const pastActivityDistribution = computed(() => {
  const allActivities = pastTrainingLoad.value.allOccurrences.flatMap(s => s.activities || []);
  const distribution: { [key: string]: number } = {};
  
  allActivities.forEach(activity => {
    const theme = activity.theme;
    distribution[theme] = (distribution[theme] || 0) + 1;
  });
  
  const total = allActivities.length;
  
  return Object.entries(distribution)
    .map(([theme, count]) => ({
      theme,
      count,
      percentage: (count / total) * 100
    }))
    .sort((a, b) => b.count - a.count);
});

// Distribution des activités pour le futur
const futureActivityDistribution = computed(() => {
  const allActivities = futureTrainingLoad.value.allOccurrences.flatMap(s => s.activities || []);
  const distribution: { [key: string]: number } = {};
  
  allActivities.forEach(activity => {
    const theme = activity.theme;
    distribution[theme] = (distribution[theme] || 0) + 1;
  });
  
  const total = allActivities.length;
  
  return Object.entries(distribution)
    .map(([theme, count]) => ({
      theme,
      count,
      percentage: (count / total) * 100
    }))
    .sort((a, b) => b.count - a.count);
});

// Alertes (basées sur le futur uniquement)
const alerts = computed(() => {
  const currentWeekData = futureTrainingLoad.value.weeklyData[0];
  const alertsList: { type: 'warning' | 'danger'; message: string }[] = [];
  
  if (currentWeekData) {
    if (currentWeekData.hours >= thresholds.value.weeklyHoursMax) {
      alertsList.push({
        type: 'danger',
        message: `Volume critique prévu : ${currentWeekData.hours.toFixed(1)}h cette semaine (quota: ${weeklyQuota.value}h)`
      });
    } else if (currentWeekData.hours >= thresholds.value.weeklyHoursWarning) {
      alertsList.push({
        type: 'warning',
        message: `Volume élevé prévu : ${currentWeekData.hours.toFixed(1)}h cette semaine (80% du quota atteint)`
      });
    }
  }
  
  return alertsList;
});

const getActivityColor = (index: number): string => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500'
  ];
  return colors[index % colors.length];
};

const getBarHeight = (value: number, max: number): number => {
  return max > 0 ? (value / max) * 100 : 0;
};
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Alertes -->
    <div v-if="alerts.length > 0" class="space-y-3">
      <div
        v-for="(alert, index) in alerts"
        :key="index"
        :class="[
          'p-4 rounded-xl border backdrop-blur-sm',
          alert.type === 'danger'
            ? 'bg-red-900/20 border-red-500/50 text-red-200'
            : 'bg-yellow-900/20 border-yellow-500/50 text-yellow-200'
        ]"
      >
        <div class="flex items-start gap-3">
          <span class="text-2xl">{{ alert.type === 'danger' ? '⚠️' : '⚡' }}</span>
          <p class="text-sm font-medium flex-1">{{ alert.message }}</p>
        </div>
      </div>
    </div>
    
    <!-- Info quota -->
    <div class="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-5 border border-blue-700/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-3xl">📋</span>
          <div>
            <h3 class="text-white font-semibold">Quota hebdomadaire</h3>
            <p class="text-sm text-blue-300">Charge maximale recommandée</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-4xl font-bold text-white">{{ weeklyQuota }}h</p>
          <p class="text-xs text-blue-400 mt-1">par semaine</p>
        </div>
      </div>
    </div>

    <!-- Titre de section : 4 dernières semaines -->
    <div class="flex items-center gap-3 pt-4">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <span>📊</span>
        4 dernières semaines
      </h2>
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>

    <!-- Statistiques principales - Passé -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">⏱️</span>
          <h3 class="text-gray-400 text-sm font-medium">Heures totales</h3>
        </div>
        <p class="text-3xl font-bold text-white">{{ pastTrainingLoad.totalHours.toFixed(1) }}h</p>
        <p class="text-xs text-gray-500 mt-1">4 dernières semaines</p>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">📊</span>
          <h3 class="text-gray-400 text-sm font-medium">Moyenne/semaine</h3>
        </div>
        <p class="text-3xl font-bold text-white">{{ pastTrainingLoad.avgHoursPerWeek.toFixed(1) }}h</p>
        <p class="text-xs text-gray-500 mt-1">Heures d'entraînement</p>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">🏋️</span>
          <h3 class="text-gray-400 text-sm font-medium">Séances totales</h3>
        </div>
        <p class="text-3xl font-bold text-white">{{ pastTrainingLoad.totalSessions }}</p>
        <p class="text-xs text-gray-500 mt-1">4 dernières semaines</p>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">📅</span>
          <h3 class="text-gray-400 text-sm font-medium">Moyenne/semaine</h3>
        </div>
        <p class="text-3xl font-bold text-white">{{ pastTrainingLoad.avgSessionsPerWeek.toFixed(1) }}</p>
        <p class="text-xs text-gray-500 mt-1">Séances d'entraînement</p>
      </div>
    </div>

    <!-- Graphique de charge hebdomadaire - Passé -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>📈</span>
        Évolution de la charge (4 dernières semaines)
      </h3>
      
      <div class="space-y-4">
        <div v-for="week in pastTrainingLoad.weeklyData" :key="week.label" class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-400 font-medium">{{ week.label }}</span>
            <span class="text-white font-bold">{{ week.hours.toFixed(1) }}h • {{ week.sessions }} séances</span>
          </div>
          
          <div class="relative h-8 bg-gray-700/30 rounded-lg overflow-hidden">
            <div
              :style="{ width: `${getBarHeight(week.hours, Math.max(...pastTrainingLoad.weeklyData.map(w => w.hours), 1))}%` }"
              class="h-full transition-all duration-500 rounded-lg bg-gradient-to-r from-slate-600 to-slate-500"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Distribution des activités - Passé -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🎯</span>
        Distribution des activités sportives (passé)
      </h3>
      
      <div v-if="pastActivityDistribution.length > 0" class="space-y-4">
        <div
          v-for="(activity, index) in pastActivityDistribution"
          :key="activity.theme"
          class="space-y-2"
        >
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-300 font-medium">{{ activity.theme }}</span>
            <span class="text-white font-bold">{{ activity.count }} ({{ activity.percentage.toFixed(1) }}%)</span>
          </div>
          
          <div class="relative h-6 bg-gray-700/30 rounded-lg overflow-hidden">
            <div
              :style="{ width: `${activity.percentage}%` }"
              :class="[
                'h-full transition-all duration-500 rounded-lg',
                getActivityColor(index)
              ]"
            ></div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-700/50">
          <p class="text-sm text-gray-400">
            Total : {{ pastActivityDistribution.reduce((sum, a) => sum + a.count, 0) }} activités réparties sur {{ pastTrainingLoad.totalSessions }} séances
          </p>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        Aucune activité enregistrée sur cette période
      </div>
    </div>

    <!-- Titre de section : 4 prochaines semaines -->
    <div class="flex items-center gap-3 pt-8">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <span>🔮</span>
        4 prochaines semaines
      </h2>
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
    </div>

    <!-- Statistiques principales - Futur -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl p-5 border border-blue-700/50">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">⏱️</span>
          <h3 class="text-blue-300 text-sm font-medium">Heures prévues</h3>
        </div>
        <p class="text-3xl font-bold text-white">{{ futureTrainingLoad.totalHours.toFixed(1) }}h</p>
        <p class="text-xs text-blue-400 mt-1">4 prochaines semaines</p>
      </div>

      <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl p-5 border border-blue-700/50">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">📊</span>
          <h3 class="text-blue-300 text-sm font-medium">Moyenne/semaine</h3>
        </div>
        <p class="text-3xl font-bold text-white">{{ futureTrainingLoad.avgHoursPerWeek.toFixed(1) }}h</p>
        <p class="text-xs text-blue-400 mt-1">Heures d'entraînement</p>
      </div>

      <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl p-5 border border-blue-700/50">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">🏋️</span>
          <h3 class="text-blue-300 text-sm font-medium">Séances prévues</h3>
        </div>
        <p class="text-3xl font-bold text-white">{{ futureTrainingLoad.totalSessions }}</p>
        <p class="text-xs text-blue-400 mt-1">4 prochaines semaines</p>
      </div>

      <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-xl p-5 border border-blue-700/50">
        <div class="flex items-center gap-3 mb-2">
          <span class="text-3xl">📅</span>
          <h3 class="text-blue-300 text-sm font-medium">Moyenne/semaine</h3>
        </div>
        <p class="text-3xl font-bold text-white">{{ futureTrainingLoad.avgSessionsPerWeek.toFixed(1) }}</p>
        <p class="text-xs text-blue-400 mt-1">Séances d'entraînement</p>
      </div>
    </div>

    <!-- Graphique de charge hebdomadaire - Futur -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>📈</span>
        Charge prévue (4 prochaines semaines)
      </h3>
      
      <div class="space-y-4">
        <div v-for="week in futureTrainingLoad.weeklyData" :key="week.label" class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-400 font-medium">{{ week.label }}</span>
            <span class="text-white font-bold">{{ week.hours.toFixed(1) }}h • {{ week.sessions }} séances</span>
          </div>
          
          <div class="relative h-8 bg-gray-700/30 rounded-lg overflow-hidden">
            <div
              :style="{ width: `${getBarHeight(week.hours, Math.max(...futureTrainingLoad.weeklyData.map(w => w.hours), 1))}%` }"
              :class="[
                'h-full transition-all duration-500 rounded-lg',
                week.hours >= thresholds.weeklyHoursMax
                  ? 'bg-gradient-to-r from-red-600 to-red-500'
                  : week.hours >= thresholds.weeklyHoursWarning
                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-500'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500'
              ]"
            ></div>
            
            <div
              v-if="Math.max(...futureTrainingLoad.weeklyData.map(w => w.hours)) > 0"
              :style="{ left: `${getBarHeight(thresholds.weeklyHoursWarning, Math.max(...futureTrainingLoad.weeklyData.map(w => w.hours)))}%` }"
              class="absolute top-0 bottom-0 w-0.5 bg-yellow-400/50"
            ></div>
            <div
              v-if="Math.max(...futureTrainingLoad.weeklyData.map(w => w.hours)) > 0"
              :style="{ left: `${getBarHeight(thresholds.weeklyHoursMax, Math.max(...futureTrainingLoad.weeklyData.map(w => w.hours)))}%` }"
              class="absolute top-0 bottom-0 w-0.5 bg-red-400/50"
            ></div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-6 mt-6 pt-4 border-t border-gray-700/50 text-xs">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-blue-500"></div>
          <span class="text-gray-400">Normal</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span class="text-gray-400">Alerte (80% du quota)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <span class="text-gray-400">Critique (quota: {{ weeklyQuota }}h)</span>
        </div>
      </div>
    </div>

    <!-- Distribution des activités - Futur -->
    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🎯</span>
        Distribution prévue des activités sportives
      </h3>
      
      <div v-if="futureActivityDistribution.length > 0" class="space-y-4">
        <div
          v-for="(activity, index) in futureActivityDistribution"
          :key="activity.theme"
          class="space-y-2"
        >
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-300 font-medium">{{ activity.theme }}</span>
            <span class="text-white font-bold">{{ activity.count }} ({{ activity.percentage.toFixed(1) }}%)</span>
          </div>
          
          <div class="relative h-6 bg-gray-700/30 rounded-lg overflow-hidden">
            <div
              :style="{ width: `${activity.percentage}%` }"
              :class="[
                'h-full transition-all duration-500 rounded-lg',
                getActivityColor(index)
              ]"
            ></div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-gray-700/50">
          <p class="text-sm text-gray-400">
            Total prévu : {{ futureActivityDistribution.reduce((sum, a) => sum + a.count, 0) }} activités réparties sur {{ futureTrainingLoad.totalSessions }} séances
          </p>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        Aucune activité prévue sur cette période
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>