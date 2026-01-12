<template>
  <div class="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
    
    <!-- Bulles décoratives -->
    <div class="absolute w-72 h-72 bg-white/10 rounded-full -top-24 -left-24 animate-float"></div>
    <div class="absolute w-52 h-52 bg-white/10 rounded-full -bottom-16 -right-16 animate-float-reverse"></div>

    <div class="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 animate-slide-up">

      <!-- Sélecteur de rôle -->
      <div class="flex gap-2 bg-gray-100 p-2 rounded-xl mb-8">
        <button
          v-for="role in roles"
          :key="role.value"
          @click="formType = role.value as 'admin' | 'coach' | 'athlete'"
          class="flex-1 flex flex-col items-center gap-1 py-3 rounded-lg text-sm font-semibold transition-all"
          :class="formType === role.value
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white scale-105 shadow-lg'
            : 'text-gray-500 hover:bg-indigo-100'"
        >
          <span class="text-xl">{{ role.icon }}</span>
          {{ role.label }}
        </button>
      </div>

      <!-- Titre -->
      <h1 class="text-3xl font-bold text-center mb-8 bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        {{ formType === 'admin' ? 'Connexion Admin' : 'Connexion Utilisateur' }}
      </h1>

      <!-- Erreur -->
      <transition name="fade">
        <div
          v-if="error"
          class="flex items-center gap-3 mb-6 p-4 rounded-xl border-2 border-red-200 text-red-700 bg-gradient-to-br from-red-50 to-red-100 animate-shake"
        >
          <span class="text-lg">⚠️</span>
          {{ error }}
        </div>
      </transition>

      <!-- Formulaire -->
      <form @submit.prevent="handleLogin" class="space-y-5">

        <div v-if="formType !== 'admin'" class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-semibold text-gray-600">
            📧 Adresse email
          </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="exemple@email.com"
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition"
          />
        </div>

        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-semibold text-gray-600">
            🔒 Mot de passe
          </label>

          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 bg-gray-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-lg opacity-60 hover:opacity-100 transition"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="!isLoading">Se connecter</span>
          <span v-else class="flex justify-center items-center gap-2">⏳ Connexion…</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-6 pt-5 border-t text-center text-sm text-gray-500">
        {{ getCurrentRoleDescription() }}
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { login, useAuth } from '../utils/composables/auth';

const router = useRouter();
const { adminLogin } = useAuth();

// États du formulaire
const formType = ref<'admin' | 'coach' | 'athlete'>('coach');
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const showPassword = ref(false);

// Configuration des rôles
const roles = [
  { value: 'admin', label: 'Admin', icon: '👑' },
  { value: 'user', label: 'Utilisateur', icon: '⚡' }
];

// Gestion de la connexion
const handleLogin = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    if (formType.value === 'admin') {
      await adminLogin(password.value);
    } else {
      // Appel API pour coach/athlète avec email et password
      const role = formType.value.toUpperCase();
      const resp = await login({email: email.value, passwordHash: password.value});

      console.log('Login:', { email: email.value, password: password.value, role });
    }
    
    router.push('/');
  } catch (err) {
    error.value = err instanceof Error 
      ? err.message 
      : 'Échec de la connexion. Veuillez vérifier vos identifiants.';
  } finally {
    isLoading.value = false;
  }
};

// Description du rôle sélectionné
const getCurrentRoleDescription = () => {
  const descriptions = {
    admin: 'Accès complet à la plateforme',
    coach: 'Gérez vos athlètes et programmes',
    athlete: 'Suivez vos performances'
  };
  return descriptions[formType.value];
};
</script>


