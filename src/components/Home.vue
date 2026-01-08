<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const activeFeature = ref<number | null>(null)
const activeProfile = ref<number | null>(null)

const features = [
  {
    icon: '👥',
    title: 'Gestion des athlètes',
    description: 'Gérez les profils des joueurs, leurs informations sportives, niveaux et appartenance aux groupes d\'entraînement.',
    color: 'from-indigo-500 to-blue-200'
  },
  {
    icon: '📅',
    title: 'Planification des séances',
    description: 'Créez et planifiez vos entraînements et compétitions avec ou sans récurrence, assignez les coachs et les athlètes.',
    color: 'from-indigo-500 to-blue-200'
  },
  {
    icon: '🎯',
    title: 'Gestion des activités',
    description: 'Définissez les activités sportives par séance : renforcement, placement, compétition et collectez les données de performance.',
    color: 'from-indigo-500 to-blue-200'
  },
  {
    icon: '🔐',
    title: 'Authentification & rôles',
    description: 'Système de connexion sécurisé avec gestion des droits : administrateur, président, coach et athlète disposent d\'interfaces adaptées.',
    color: 'from-indigo-500 to-blue-200'
  }
]

const profiles = [
  {
    emoji: '🎯',
    title: 'Coach',
    description: 'Planifiez vos séances et les activiés proposées puis assignez les athlètes qui y participeront.',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    emoji: '🏃‍➡️',
    title: 'Athlète',
    description: 'Consultez votre calendrier et le détail des séances. Ayez une vision claire de vos performances.',
    gradient: 'from-purple-600 to-pink-600'
  },
    {
    emoji: '🧑‍💼',
    title: 'Président',
    description: 'Ajoutez les athlètes et les coachs présents dans votre club',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    emoji: '💻',
    title: 'Administrateur',
    description: 'Créez les clubs, les sports et les présidents pris en charge par l\'application.',
    gradient: 'from-purple-600 to-pink-600'
  }
]

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToWho = () => {
  document.getElementById('who')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">

    <section class="relative min-h-screen flex items-center justify-center px-6 py-10">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div 
        class="relative max-w-5xl mx-auto text-center transition-all duration-1000 transform"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-8 backdrop-blur-sm">
          <span class="text-sm font-medium">Plateforme de gestion sportive</span>
        </div>

        <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
          Ultimate Sports
        </h1>
        
        <p class="text-2xl md:text-3xl font-semibold text-slate-300 mb-4">
          Organisez. Performez. Évoluez.
        </p>

        <p class="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
          La plateforme complète pour gérer vos équipes, planifier vos entraînements 
          et suivre vos performances.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="scrollToFeatures"
            class="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-800 hover:border-slate-600 hover:scale-105 transition-all duration-300"
          >
            <span class="relative z-10">Découvrir les fonctionnalités</span>
          </button>

          <button 
            @click="scrollToWho"
            class="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-800 hover:border-slate-600 hover:scale-105 transition-all duration-300"
          >
            <span class="relative z-10">Pour qui ?</span>
          </button>
        </div>

        <div class="mt-20 animate-bounce">
          <svg class="w-6 h-6 mx-auto text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>

    <section id="features" class="py-10 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Fonctionnalités clés
          </h2>
          <p class="text-xl text-slate-400">
            Tout ce dont vous avez besoin pour gérer votre activité sportive
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            @mouseenter="activeFeature = index"
            @mouseleave="activeFeature = null"
            class="group relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-slate-600 transition-all duration-300 cursor-pointer"
            :class="activeFeature === index ? 'scale-105 shadow-2xl' : 'hover:scale-102'"
          >
            <div 
              class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
              :class="`bg-gradient-to-r ${feature.color}`"
            ></div>

            <div class="relative z-10">
              <div 
                class="text-6xl mb-4 transition-transform duration-300"
                :class="activeFeature === index ? 'scale-110' : ''"
              >
                {{ feature.icon }}
              </div>

              <h3 
                class="text-2xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 from-white to-slate-300"
              >
                {{ feature.title }}
              </h3>

              <p class="text-slate-400 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="who" class="py-15 px-6 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Pour qui ?
          </h2>
          <p class="text-xl text-slate-400">
            Une interface adaptée à chacun
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(profile, index) in profiles"
            :key="index"
            @mouseenter="activeProfile = index"
            @mouseleave="activeProfile = null"
            class="group relative p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-slate-600 transition-all duration-500 cursor-pointer overflow-hidden"
            :class="activeProfile === index ? 'scale-105 shadow-2xl' : ''"
          >
            <div 
              class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              :class="`bg-gradient-to-br ${profile.gradient}`"
            ></div>

            <div class="relative z-10 text-center">
              <div 
                class="text-7xl mb-6 transition-transform duration-500"
                :class="activeProfile === index ? 'scale-125 rotate-12' : ''"
              >
                {{ profile.emoji }}
              </div>
              <h3 
                class="text-2xl font-bold mb-4 transition-all duration-300"
                :class="activeProfile === index ? `bg-gradient-to-r ${profile.gradient} bg-clip-text text-transparent` : 'text-white'"
              >
                {{ profile.title }}
              </h3>
              <p class="text-slate-400 leading-relaxed">
                {{ profile.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-12 px-6 border-t border-slate-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="text-center md:text-left">
            <h3 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Ultimate Sports
            </h3>
            <p class="text-slate-500">
              Plateforme de gestion sportive
            </p>
          </div>

          <div class="flex flex-col items-center md:items-end gap-2">
            <div class="flex gap-3 text-sm text-slate-600">
              <span>Hoel Girard</span>
              <span>•</span>
              <span>Matheo Guinche</span>
            </div>
            <div class="flex gap-3 text-sm text-slate-600">
              <span>Malo Babinot</span>
              <span>•</span>
              <span>Ilona Leblanc</span>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-600">
          <p>2025 • By Pingouin Corp.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>