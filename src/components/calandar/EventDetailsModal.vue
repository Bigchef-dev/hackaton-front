<script setup>
import { computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  event: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close']);

// Mapping des types
const typeConfig = {
  cours: { color: 'primary', label: 'Cours', icon: '📚' },
  td: { color: 'secondary', label: 'TD', icon: '✍️' },
  tp: { color: 'warning', label: 'TP', icon: '💻' },
  examen: { color: 'error', label: 'Examen', icon: '📝' },
  projet: { color: 'success', label: 'Projet', icon: '🎯' },
  conference: { color: 'purple', label: 'Conférence', icon: '🎤' },
  reunion: { color: 'neutral', label: 'Réunion', icon: '👥' },
};

const config = computed(() => 
  props.event ? typeConfig[props.event.type] || typeConfig.cours : null
);

// Formatage des dates
const formattedDate = computed(() => {
  if (!props.event) return '';
  const date = new Date(props.event.start);
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
});

const formattedTime = computed(() => {
  if (!props.event) return '';
  const start = new Date(props.event.start);
  const end = new Date(props.event.end);
  const format = (date) => date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  return `${format(start)} - ${format(end)}`;
});

// Durée
const duration = computed(() => {
  if (!props.event) return '';
  const start = new Date(props.event.start);
  const end = new Date(props.event.end);
  const diff = end - start;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h${minutes}`;
});

// Fermeture au clic sur overlay
const handleOverlayClick = (e) => {
  if (e.target === e.currentTarget) {
    emit('close');
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && event"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm"
        @click="handleOverlayClick"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
          leave-to-class="opacity-0 translate-y-full sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="isOpen"
            class="card w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto sm:rounded-lg rounded-t-2xl rounded-b-none"
          >
            <!-- Header -->
            <div class="flex items-start justify-between p-4 sm:p-6 border-b border-neutral-200">
              <div class="flex items-start gap-2 sm:gap-3 flex-1">
                <span class="text-2xl sm:text-3xl">{{ config.icon }}</span>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-2">
                    <span :class="`badge badge-${config.color}`">
                      {{ config.label }}
                    </span>
                  </div>
                  <h3 class="text-xl sm:text-2xl font-semibold text-neutral-900">
                    {{ event.title }}
                  </h3>
                </div>
              </div>
              
              <button
                @click="emit('close')"
                class="p-2 rounded-lg hover:bg-neutral-100 transition-colors flex-shrink-0"
                aria-label="Fermer"
              >
                <svg class="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <!-- Date & Heure -->
              <div class="flex items-start gap-2 sm:gap-3">
                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs sm:text-sm font-medium text-neutral-500">Date et horaires</p>
                  <p class="text-sm sm:text-base font-medium text-neutral-900 capitalize">
                    {{ formattedDate }}
                  </p>
                  <p class="text-sm sm:text-base text-neutral-700">
                    {{ formattedTime }} <span class="text-neutral-500">({{ duration }})</span>
                  </p>
                </div>
              </div>

              <!-- Intervenant -->
              <div v-if="event.instructor" class="flex items-start gap-2 sm:gap-3">
                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs sm:text-sm font-medium text-neutral-500">Intervenant</p>
                  <p class="text-sm sm:text-base font-medium text-neutral-900">
                    {{ event.instructor }}
                  </p>
                </div>
              </div>

              <!-- Lieu -->
              <div v-if="event.location" class="flex items-start gap-2 sm:gap-3">
                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-success-100 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs sm:text-sm font-medium text-neutral-500">Lieu</p>
                  <p class="text-sm sm:text-base font-medium text-neutral-900">
                    {{ event.location }}
                  </p>
                </div>
              </div>

              <!-- Description -->
              <div v-if="event.description" class="flex items-start gap-2 sm:gap-3">
                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-warning-100 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-xs sm:text-sm font-medium text-neutral-500 mb-2">Description</p>
                  <p class="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {{ event.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-4 sm:p-6 border-t border-neutral-200 bg-neutral-50 flex justify-end gap-3 sticky bottom-0">
              <button
                @click="emit('close')"
                class="btn btn-secondary w-full sm:w-auto"
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