<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Session, Athlete } from '../../utils/types';
import { generateRecurrentOccurrences } from '../../utils/composables/calandar/useRecurrence';
import QuotaCard from './QuotaCard.vue';
import TrainingAlerts from './TrainingAlert.vue';
import TrainingStats from './TrainingStats.vue';
import WeeklyLoadChart from './WeeklyLoadChart.vue';
import ActivityDistribution from './ActivityDistribution.vue';

interface Props {
  athlete: Athlete;
  sessions: Session[];
}

const props = defineProps<Props>();

const weeklyQuota = computed(() => props.athlete.quota || 8);
const thresholds = computed(() => ({
  weeklyHoursWarning: weeklyQuota.value * 0.8,
  weeklyHoursMax: weeklyQuota.value
}));

const analysisWeeks = ref(4);

const calculateTrainingLoad = (periodStart: Date, periodEnd: Date, isPast: boolean = false) => {
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

const pastTrainingLoad = computed(() => {
  const now = new Date();
  const weeksAgo = new Date(now);
  weeksAgo.setDate(weeksAgo.getDate() - (analysisWeeks.value * 7));
  return calculateTrainingLoad(weeksAgo, now, true);
});

const futureTrainingLoad = computed(() => {
  const now = new Date();
  const weeksFromNow = new Date(now);
  weeksFromNow.setDate(weeksFromNow.getDate() + (analysisWeeks.value * 7));
  return calculateTrainingLoad(now, weeksFromNow, false);
});

const pastActivityDistribution = computed(() => {
  const allActivities = pastTrainingLoad.value.allOccurrences.flatMap(s => s.activities || []);
  const distribution: { [key: string]: number } = {};
  
  allActivities.forEach(activity => {
    const theme = activity.type;
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

const futureActivityDistribution = computed(() => {
  const allActivities = futureTrainingLoad.value.allOccurrences.flatMap(s => s.activities || []);
  const distribution: { [key: string]: number } = {};
  
  allActivities.forEach(activity => {
    const theme = activity.type;
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
</script>

<template>
  <div class="w-full space-y-6">
    <TrainingAlerts :alerts="alerts" />
    <QuotaCard :weekly-quota="weeklyQuota" />
    <div class="flex items-center gap-3 pt-4">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <span>📊</span>
        4 dernières semaines
      </h2>
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>
    <TrainingStats 
      :training-load="pastTrainingLoad"
      variant="past"
    />
    <WeeklyLoadChart 
      :weekly-data="pastTrainingLoad.weeklyData"
      :thresholds="thresholds"
      variant="past"
      title="Évolution de la charge (4 dernières semaines)"
    />
    <ActivityDistribution 
      :distribution="pastActivityDistribution"
      :total-sessions="pastTrainingLoad.totalSessions"
      variant="past"
    />

    <div class="flex items-center gap-3 pt-8">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <span>🔮</span>
        4 prochaines semaines
      </h2>
      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
    </div>

    <TrainingStats 
      :training-load="futureTrainingLoad"
      variant="future"
    />

    <WeeklyLoadChart 
      :weekly-data="futureTrainingLoad.weeklyData"
      :thresholds="thresholds"
      :weekly-quota="weeklyQuota"
      variant="future"
      title="Charge prévue (4 prochaines semaines)"
    />
    <ActivityDistribution 
      :distribution="futureActivityDistribution"
      :total-sessions="futureTrainingLoad.totalSessions"
      variant="future"
    />
  </div>
</template>