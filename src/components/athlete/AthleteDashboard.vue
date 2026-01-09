<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Session, Athlete } from '../../utils/types';
import ListSeanceView from '../sessionList/ListSessionView.vue';
import Calendar from '../calendar/CalendarContainer.vue';

interface Props {
  //sessions: Session[];
  //athlete: Athlete;
}

const sessions: Session[] = [
  {
    id: 1,
    date_session: new Date('2026-01-09T19:00:00'),
    recurrence: 7,
    duree: 1.5,
    coach: 'Jean Entraineur',
    type: 'ENTRAINEMENT',
    id_sport: 1,
    activities: [{ id: 101, theme: 'Échauffement cardio' }, { id: 102, theme: 'Exercices de passes' }]
  },
  {
    id: 2,
    date_session: new Date('2026-01-14T18:30:00'),
    recurrence: 0,
    duree: 2,
    coach: 'Marc Arbitre',
    type: 'COMPETITION',
    id_sport: 1,
    activities: [{ id: 103, theme: 'Match amical contre l\'équipe B' }]
  },
  {
    id: 3,
    date_session: new Date('2026-01-15T10:00:00'),
    recurrence: 7,
    duree: 1,
    coach: 'Lucie Coach',
    type: 'ENTRAINEMENT',
    id_sport: 2,
    activities: [{ id: 104, theme: 'Renforcement musculaire' }]
  },
  {
    id: 4,
    date_session: new Date('2026-01-16T14:00:00'),
    recurrence: 0,
    duree: 3, 
    coach: 'Jean Entraineur',
    type: 'ENTRAINEMENT',
    id_sport: 1,
    activities: [{ id: 105, theme: 'Tactique et stratégie' }, { id: 106, theme: 'Analyse vidéo' }]
  },
  {
    id: 5,
    date_session: new Date('2026-01-18T15:00:00'),
    recurrence: 0,
    duree: 2,
    type: 'COMPETITION',
    id_sport: 1,
    activities: [{ id: 107, theme: 'Finale régionale' }]
  },
  {
    id: 6,
    date_session: new Date('2026-03-17T09:00:00'),
    recurrence: 0,
    duree: 2,
    type: 'COMPETITION',
    id_sport: 1,
    activities: [{ id: 107, theme: 'Finale régionale' }]
  }
];

const athlete: Athlete = {
    id: 42,
    name: "Alexandre",
    lastName: "Dubois",
    birthDate: "1998-05-15",
    phoneNumber: "0612345678",
    email: "a.dubois@exemple.fr",
    gender: "M",
    type: "ATHLETE",
    id_league: 12
};

const props = defineProps<Props>();

type ViewType = 'calendar' | 'list' | 'perf';

interface ViewOption {
  id: ViewType;
  label: string;
  labelShort?: string;
  icon: string;
}
const viewOptions: ViewOption[] = [
  {
    id: 'calendar',
    label: 'Calendrier',
    labelShort: 'Calendrier',
    icon: '📅'
  },
  {
    id: 'list',
    label: 'Prochaines Seances',
    labelShort: 'Seances',
    icon: '📋'
  },
  {
    id: 'perf',
    label: 'Analyse de charge',
    labelShort: 'Charge',
    icon: '📊'
  }
];

const currentView = ref<ViewType>('list');
const athleteInitials = computed((): string => {
  return `${athlete.name[0]}${athlete.lastName[0]}`;
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full">
    <div class="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
      <header class="w-full mb-4 sm:mb-6 md:mb-8">
        <div class="flex items-center gap-3 sm:gap-4 bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-700/50 shadow-xl">
          <div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg sm:text-2xl md:text-3xl font-bold shadow-lg flex-shrink-0">
            {{ athleteInitials }}
          </div>
          
          <div class="flex-1 min-w-0">
            <h1 class="text-lg sm:text-2xl md:text-3xl font-bold text-white truncate">
              {{ athlete.name }} {{ athlete.lastName }}
            </h1>
            <p class="text-gray-400 text-xs sm:text-sm md:text-base">Athlète</p>
          </div>
        </div>
      </header>

      <div class="w-full mb-4 sm:mb-6">
        <div class="hidden sm:block">
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 inline-flex border border-gray-700/50 shadow-lg">
            <button
              v-for="view in viewOptions"
              :key="view.id"
              @click="currentView = view.id"
              :class="[
                'px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base whitespace-nowrap',
                currentView === view.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              ]"
            >
              {{ view.icon }} {{ view.label }}
            </button>
          </div>
        </div>

        <div class="sm:hidden w-full">
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1.5 flex border border-gray-700/50 shadow-lg w-full">
            <button
              v-for="view in viewOptions"
              :key="view.id"
              @click="currentView = view.id"
              :class="[
                'flex-1 px-2 py-2.5 rounded-md font-medium transition-all duration-300 text-xs flex flex-col items-center justify-center gap-1',
                currentView === view.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-gray-400 active:bg-gray-700/50'
              ]"
            >
              <span class="text-base">{{ view.icon }}</span>
              <span class="leading-tight">{{ view.labelShort || view.label }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full">
        <Transition name="slide-fade" mode="out-in">
          <Calendar
            v-if="currentView === 'calendar'"
            :events="sessions"
            :athlete="athlete"
            class="w-full"
          />
          <ListSeanceView
            v-else-if="currentView === 'list'"
            :sessions="sessions"
            :athlete="athlete"
            class="w-full"
          />

          <div
            v-else
            class="w-full bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-gray-700/50 text-center"
          >
            <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-700/50 mb-4">
              <span class="text-3xl sm:text-4xl">📊</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-white mb-2">Analyse de charge</h2>
            <p class="text-gray-400 text-sm sm:text-base">Cette fonctionnalité sera bientôt disponible</p>
          </div>
        </Transition>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

@media (max-width: 640px) {
  button:active {
    transform: scale(0.95);
  }
}
</style>