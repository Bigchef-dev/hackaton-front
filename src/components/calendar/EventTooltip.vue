<!--- EventTooltip --->
<script setup lang="ts">
import { computed } from 'vue';
import type { Session } from '../../utils/types';

const props = defineProps<{
  event: Session | null;
  x: number;
  y: number;
  visible: boolean;
}>();

const typeConfig: Record<string, { gradient: string; icon: string }> = {
  ENTRAINEMENT: { gradient: 'from-blue-500 to-blue-600', icon: '💪' },
  COMPETITION: { gradient: 'from-red-500 to-red-600', icon: '🏆' },
};

const config = computed(() => 
  props.event ? typeConfig[props.event.type] || typeConfig.ENTRAINEMENT : null
);

const getEndDate = (session: Session): Date => {
  const startDate = session.date_session;
  const durationInMs = session.duree * 60 * 60 * 1000; 
  
  return new Date(startDate.getTime() + durationInMs);
};

const formattedTime = computed(() => {
  if (!props.event) return '';
  const start = props.event.date_session
  const end = getEndDate(props.event)
  return `${start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
});

const duration = computed(() => {
  if (!props.event) return '';
  const start = props.event.date_session
  const end = getEndDate(props.event)
  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h${minutes}`;
});

</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200"
      leave-active-class="transition-all duration-150"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="visible && event"
        :style="{ 
          position: 'fixed', 
          left: `${x}px`, 
          top: `${y}px`,
          transform: 'translate(-50%, -100%) translateY(-8px)'
        }"
        class="z-50 pointer-events-none"
      >
        <div class="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden max-w-sm backdrop-blur-xl">
          <!-- Header avec gradient -->
          <div :class="['p-4 bg-gradient-to-br', config?.gradient]">
            <div class="flex items-start gap-2">
              <span class="text-2xl">{{ config?.icon }}</span>
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-bold text-sm mb-1 truncate">{{ event.type }}</h3>
                <div class="flex items-center gap-2 text-xs text-white/90">
                  <span>{{ formattedTime }}</span>
                  <span class="text-white/60">•</span>
                  <span>{{ duration }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Informations -->
          <div class="p-4 space-y-3">
            <!-- Instructeur -->
            <div v-if="event.coach" class="flex items-center gap-2 text-sm">
              <svg class="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-slate-300">{{ event.coach }}</span>
            </div>

            <!-- Liste des activités -->
            <div v-if="event.activities && event.activities.length > 0" class="space-y-2">
              <div class="flex items-center gap-2 text-xs font-medium text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>PROGRAMME ({{ event.activities.length }})</span>
              </div>
              
              <div class="space-y-1.5">
                <div 
                  v-for="(activity, index) in event.activities" 
                  :key="activity.id"
                  class="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg"
                >
                  <div class="flex items-center gap-2 flex-1 min-w-0">
                    <span class="text-xs font-bold text-slate-500 flex-shrink-0">{{ index + 1 }}.</span>
                    <span class="text-xs text-slate-300 truncate">{{ activity.theme }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Arrow pointer -->
          <div class="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
            <div class="w-3 h-3 bg-slate-800 border-r border-b border-slate-700 transform rotate-45 -translate-y-1.5"></div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>