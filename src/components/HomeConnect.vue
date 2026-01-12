<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)


const goToDashboard = () => {
  window.location.href = '/dashboard'
}

const goToProfil = () => {
  window.location.href = '/profil'
}

const Disconnect = () => {
  window.location.href = '/logout'
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

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

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            @click="goToDashboard"
            class="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl font-bold text-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative z-10 flex items-center gap-2">
              📊 Mon Tableau de Bord
            </span>
          </button>

          <button 
            @click="goToProfil"
            class="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-purple-500 rounded-2xl font-bold text-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative z-10 flex items-center gap-2">
              👤 Mon Profil
            </span>
          </button>

          <button 
            @click="Disconnect"
            class="group relative px-10 py-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl font-bold text-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-slate-500/20 hover:shadow-red-500/30 hover:from-red-600 hover:to-red-500"
          >
            <span class="relative z-10 flex items-center gap-2">
              🚪 Déconnexion
            </span>
          </button>
        </div>
      </div>
    </section>
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