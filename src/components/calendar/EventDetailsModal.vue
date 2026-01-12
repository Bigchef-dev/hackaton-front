<!--- EventDetailsModal --->
<script setup lang="ts">
import { computed } from 'vue';
import type { Session } from '../../utils/types';

interface TypeConfig {
  gradient: string;
  label: string;
  icon: string;
}

const props = defineProps<{
  isOpen: boolean;
  event: Session | null;
}>();

const emit = defineEmits<{
  'close': [];
}>();

const typeConfig: Record<string, TypeConfig> = {
  ENTRAINEMENT: { gradient: 'from-blue-500 to-blue-600', label: 'Entraînement', icon: '💪' },
  COMPETITION: { gradient: 'from-red-500 to-red-600', label: 'Competition', icon: '🏆' },
};

const getEndDate = (session: Session): Date => {
  const startDate = session.date_session;
  const durationInMs = session.duree * 60 * 60 * 1000; 
  
  return new Date(startDate.getTime() + durationInMs);
};

const config = computed(() => 
  props.event ? typeConfig[props.event.type] || typeConfig.ENTRAINEMENT : null
);

const formattedDate = computed(() => {
  if (!props.event) return '';
  const date = props.event.date_session;
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).replace(/^\w/, c => c.toUpperCase());
});

const formattedTime = computed(() => {
  if (!props.event) return '';
  const start = props.event.date_session;
  const end = getEndDate(props.event);
  const format = (date: Date): string => date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return `${format(start)} - ${format(end)}`;
});

const duration = computed(() => {
  if (!props.event) return '';
  const start = props.event.date_session;
  const end = getEndDate(props.event);
  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h${minutes}`;
});

const handleOverlayClick = (e: MouseEvent): void => {
  if (e.target === e.currentTarget) {
    emit('close');
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && event"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-md"
        @click="handleOverlayClick"
      >
        <Transition
          enter-active-class="transition-all duration-300"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
          leave-to-class="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="isOpen"
            class="bg-slate-900 w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto sm:rounded-2xl rounded-t-2xl rounded-b-none shadow-2xl border border-slate-700"
          >
            <!-- Header avec gradient -->
            <div :class="['p-6 sm:p-8 bg-gradient-to-br', config?.gradient]">
              <div class="flex items-start justify-between">
                <div class="flex items-start gap-3 sm:gap-4 flex-1">
                  <span class="text-3xl sm:text-4xl">{{ config?.icon }}</span>
                  <div class="flex-1 min-w-0">
                    <div class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                      {{ config?.label }}
                    </div>
                    <h3 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {{ event.type }}
                    </h3>
                  </div>
                </div>
                
                <button
                  @click="emit('close')"
                  class="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 flex-shrink-0 backdrop-blur-sm ml-2"
                  aria-label="Fermer"
                >
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Body -->
            <div class="p-6 sm:p-8 space-y-6">
              <!-- Informations principales -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Date & Heure -->
                <div class="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Date & Horaires</p>
                    <p class="text-sm font-semibold text-white capitalize truncate">
                      {{ formattedDate }}
                    </p>
                    <p class="text-sm text-slate-300 mt-1">
                      {{ formattedTime }} <span class="text-slate-500">({{ duration }})</span>
                    </p>
                  </div>
                </div>

                <!-- Intervenant -->
                <div v-if="event.coach" class="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Intervenant</p>
                    <p class="text-sm font-semibold text-white truncate">
                      {{ event.coach }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Programme d'activités -->
              <div v-if="event.activities && event.activities.length > 0" class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center">
                    <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-white">PROGRAMME</h4>
                    <p class="text-sm text-slate-400">{{ event.activities.length }} activité{{ event.activities.length > 1 ? 's' : '' }} prévue{{ event.activities.length > 1 ? 's' : '' }}</p>
                  </div>
                </div>

                <div class="space-y-3">
                  <div 
                    v-for="(activity, index) in event.activities" 
                    :key="activity.id"
                    class="group p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/70 transition-all duration-200"
                  >
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                        <span class="text-sm font-bold text-slate-300">{{ index + 1 }}</span>
                      </div>
                      
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-3 mb-2">
                          <h5 class="text-base font-semibold text-white">{{ activity.theme }}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-6 sm:p-8 border-t border-slate-700/50 bg-slate-800/30 flex justify-end gap-3 sticky bottom-0 backdrop-blur-sm">
              <button
                @click="emit('close')"
                class="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Fermer
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>