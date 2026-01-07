<script setup lang="ts">
import AuthLayout from './AuthLayout.vue';
import AuthCard from './Card.vue';
import LoginForm from './LoginForm.vue';
import RoleBadge from './RoleBadge.vue';
import LockIcon from './icons/LockIcon.vue';

const props = defineProps({
  role: {
    type: String,
    default: 'admin'
  },
  title: {
    type: String,
    default: 'Connexion'
  },
  subtitle: {
    type: String,
    default: 'Accédez à votre espace'
  },
  passwordLabel: {
    type: String,
    default: 'Mot de passe'
  },
  passwordPlaceholder: {
    type: String,
    default: 'Entrez votre mot de passe'
  },
  submitLabel: {
    type: String,
    default: 'Se connecter'
  },
  loadingLabel: {
    type: String,
    default: 'Connexion en cours...'
  },
  roleLabel: {
    type: String,
    default: 'Administrateur'
  },
  showRole: {
    type: Boolean,
    default: true
  },
  footerText: {
    type: String,
    default: 'Sport App'
  },
  apiEndpoint: {
    type: String,
    default: '/api/auth/login'
  }
});

const emit = defineEmits(['login-success', 'login-error']);

const handleLoginSuccess = (data: any) => {
  emit('login-success', data);
};

const handleLoginError = (error: any) => {
  emit('login-error', error);
};
</script>

<template>
  <AuthLayout>
    <AuthCard :title="title" :subtitle="subtitle">
      <template #icon>
        <LockIcon />
      </template>

      <template #badge v-if="showRole">
        <RoleBadge :label="roleLabel" />
      </template>

      <LoginForm
        :role="role"
        :api-endpoint="apiEndpoint"
        :password-label="passwordLabel"
        :password-placeholder="passwordPlaceholder"
        :submit-label="submitLabel"
        :loading-label="loadingLabel"
        @login-success="handleLoginSuccess"
        @login-error="handleLoginError"
      />

      <template #footer>
        <p class="text-center text-sm text-gray-500 mt-6">
          {{ footerText }}
        </p>
      </template>
    </AuthCard>
  </AuthLayout>
</template>