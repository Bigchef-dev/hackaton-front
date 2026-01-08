<script setup lang="ts">
import { ref } from 'vue';
import PasswordInput from './PasswordInput.vue';
import ErrorMessage from './ErrorMessage.vue';
import SubmitButton from './SubmitButton.vue';

const props = defineProps({
  role: String,
  passwordLabel: String,
  passwordPlaceholder: String,
  submitLabel: String,
  loadingLabel: String,
  apiEndpoint: String
});

const emit = defineEmits(['login-success', 'login-error']);

const password = ref('');
const loading = ref(false);
const error = ref('');
const focused = ref(false);

const handleSubmit = async () => {
  if (!password.value || loading.value) return;
  //TODO
};

</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <PasswordInput
      v-model="password"
      :label="passwordLabel"
      :placeholder="passwordPlaceholder"
      :disabled="loading"
      :error="!!error"
      @focus="focused = true"
      @blur="focused = false"
    />

    <ErrorMessage v-if="error" :message="error" />

    <SubmitButton
      :loading="loading"
      :disabled="!password"
      :label="submitLabel"
      :loading-label="loadingLabel"
    />
  </form>
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>