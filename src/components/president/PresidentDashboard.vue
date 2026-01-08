<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToProfile = () => {
  router.push({
    name: 'Profile',
    query: {
      user: JSON.stringify(president.value)
    }
  });
};

interface President {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  gender: string;
  club: string;
}

const president = ref<President>({
  name: 'George',
  lastName: 'Washintown',
  email: 'georgewash@example.com',
  phone: '06 60 00 06 66',
  address: '9 place des Maisons blanches, 50000 Neige',
  birthdate: '06/02/1980',
  gender: 'M',
  club: 'FC Pingouin',
});
</script>

<template>
  <div class="president-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">
        Tableau de bord – Président
      </h1>

      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            Informations personnelles
          </h2>

          <button
            @click="goToProfile"
            class="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Voir le profil
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-gray-600">Nom</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ president.name }} {{ president.lastName }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-600">Club</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ president.club }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-600">Contact</p>
            <p class="text-lg font-semibold text-gray-800">
              {{ president.email }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions Président -->
    <div class="mb-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Gestion du club
    </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <!-- Gérer les coachs -->
            <button class="bg-white hover:bg-blue-50 rounded-lg shadow-md p-6 text-left transition-colors">
            <div class="flex items-center gap-3">
                <div class="bg-blue-100 rounded-full p-3">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"/>
                </svg>
                </div>
                <span class="font-semibold text-gray-800">
                Gérer les coachs
                </span>
            </div>
            </button>

            <!-- Gérer les athlètes -->
            <button class="bg-white hover:bg-green-50 rounded-lg shadow-md p-6 text-left transition-colors">
            <div class="flex items-center gap-3">
                <div class="bg-green-100 rounded-full p-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1M12 7a4 4 0 110-8 4 4 0 010 8z"/>
                </svg>
                </div>
                <span class="font-semibold text-gray-800">
                Gérer les athlètes
                </span>
            </div>
            </button>

            <!-- Statistiques du club -->
            <button class="bg-white hover:bg-purple-50 rounded-lg shadow-md p-6 text-left transition-colors">
            <div class="flex items-center gap-3">
                <div class="bg-purple-100 rounded-full p-3">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 3v18m4-14v14m4-10v10"/>
                </svg>
                </div>
                <span class="font-semibold text-gray-800">
                Statistiques du club
                </span>
            </div>
            </button>
        </div>
    </div>

  </div>
</template>

<style scoped>
.president-dashboard {
  min-height: 100vh;
}
</style>
