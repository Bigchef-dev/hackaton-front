<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Admin Login</h1>

      <!-- Message d'erreur -->
      <div v-if="adminError" class="error-message">
        {{ adminError }}
      </div>

      <!-- Formulaire admin -->
      <form @submit.prevent="handleAdminLogin" class="login-form">
        <div class="form-group">
          <label for="adminPassword">Mot de passe Admin</label>
          <input
            id="adminPassword"
            v-model="adminPassword"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div class="button-group">
          <button
            type="submit"
            class="login-button"
            :disabled="isAdminLoading"
          >
            {{ isAdminLoading ? 'Connexion...' : 'Confirmer' }}
          </button>

          <button
            type="button"
            class="cancel-button"
            @click="closeAdminModal"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { routerKey, useRouter } from 'vue-router';
import { useAuth } from '../utils/composables/auth';
import { useAuthStore } from '../utils/stores/login';

const router = useRouter();
const store = useAuthStore();
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
    router.push('/');
    closeAdminModal();
  } catch (error) {
    adminError.value =
      error instanceof Error
        ? error.message
        : "Échec de l'authentification admin.";
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

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-title {
  font-size: 26px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 25px;
}

.error-message {
  background-color: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.login-button {
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-button {
  flex: 1;
  padding: 14px;
  background: #f1f1f1;
  color: #555;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-button:hover {
  background: #e0e0e0;
}
</style>
