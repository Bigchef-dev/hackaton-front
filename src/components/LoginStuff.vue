

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="flex items-center justify-between mb-12">
                
                <div class="flex gap-4">
                    <button @click="showAdminModal = true"
                        class="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-yellow-500/50 transition-all duration-300 hover:scale-105">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Admin Login
                    </button>
                    <button @click="handleLogout"
                        class="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-red-500/50 transition-all duration-300 hover:scale-105">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Déconnexion
                    </button>
                    
                </div>
            </div>
        </div>

        <!-- Admin Login Modal -->
        <div  class=" flex items-center justify-center z-50">
            <div class="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                <h2 class="text-2xl font-bold text-white mb-4">Admin Login</h2>
                
                <div v-if="adminError" class="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
                    {{ adminError }}
                </div>
                
                <form @submit.prevent="handleAdminLogin" class="space-y-4">
                    <div>
                        <label for="adminPassword" class="block text-gray-300 mb-2 font-semibold">Mot de passe Admin</label>
                        <input
                            id="adminPassword"
                            v-model="adminPassword"
                            type="password"
                            placeholder="••••••••"
                            class="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                            required
                        />
                    </div>
                    
                    <div class="flex gap-3">
                        <button
                            type="submit"
                            :disabled="isAdminLoading"
                            class="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                        >
                            {{ isAdminLoading ? 'Connexion...' : 'Confirmer' }}
                        </button>
                        <button
                            type="button"
                            @click="closeAdminModal"
                            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth } from '../utils/composables/auth';

const router = useRouter();
const { currentUser, logout, adminLogin } = useAuth();

// Admin login modal state
const showAdminModal = ref(false);
const adminPassword = ref('');
const adminError = ref('');
const isAdminLoading = ref(false);

const handleLogout = () => {
    logout();
    router.push('/login');
};

const handleAdminLogin = async () => {
    adminError.value = '';
    isAdminLoading.value = true;
    
    try {
        await adminLogin(adminPassword.value);
        closeAdminModal();
    } catch (error) {
        adminError.value = error instanceof Error ? error.message : 'Échec de l\'authentification admin.';
    } finally {
        isAdminLoading.value = false;
    }
};

const closeAdminModal = () => {
    showAdminModal.value = false;
    adminPassword.value = '';
    adminError.value = '';
};






</script>
