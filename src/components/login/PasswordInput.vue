<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        class="input pr-10 transition-all duration-200"
        :class="{
          'ring-2 ring-error-500 border-error-500': error,
          'ring-2 ring-primary-500': focused && !error
        }"
        :disabled="disabled"
        autocomplete="current-password"
        required
      />
      <button
        type="button"
        @click="togglePassword"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        :disabled="disabled"
        tabindex="-1"
      >
        <EyeIcon v-if="!showPassword" />
        <EyeOffIcon v-else />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EyeIcon from './icons/EyeIcon.vue';
import EyeOffIcon from './icons/EyeOffIcon.vue';

defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  disabled: Boolean,
  error: Boolean,
  focused: Boolean,
  id: {
    type: String,
    default: 'password'
  }
});

defineEmits(['update:modelValue', 'focus', 'blur']);

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>