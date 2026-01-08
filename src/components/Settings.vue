<template>
  <div class="card">
    <h2>Paramètres</h2>

    <label>Base URL de l'API</label>
    <input v-model="apiUrl" type="text" placeholder="http://localhost:5000" />

    <label>
      <input type="checkbox" v-model="darkMode" /> Mode sombre
    </label>

    <div class="actions">
      <button @click="save">Enregistrer</button>
      <button @click="loadDefaults">Réinitialiser</button>
    </div>

    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiInstance } from '../utils/api'

const apiUrl = ref('')
const darkMode = ref(false)
const message = ref('')

function save() {
  // persist settings
  localStorage.setItem('apiBaseUrl', apiUrl.value)
  localStorage.setItem('darkMode', JSON.stringify(darkMode.value))

  // apply to runtime API instance
  if (apiUrl.value) apiInstance.baseuri = apiUrl.value

  message.value = 'Paramètres enregistrés.'
  setTimeout(() => (message.value = ''), 2500)
}

function loadDefaults() {
  localStorage.removeItem('apiBaseUrl')
  localStorage.removeItem('darkMode')
  apiUrl.value = apiInstance.baseuri || ''
  darkMode.value = false
  message.value = 'Paramètres réinitialisés.'
  setTimeout(() => (message.value = ''), 2000)
}

onMounted(() => {
  const saved = localStorage.getItem('apiBaseUrl')
  if (saved) apiUrl.value = saved
  else apiUrl.value = apiInstance.baseuri || ''

  const dm = localStorage.getItem('darkMode')
  if (dm !== null) darkMode.value = JSON.parse(dm)
})
</script>

<style scoped>
.card { padding: 1rem; border: 1px solid #ddd; border-radius: 6px; max-width: 480px }
input[type="text"] { display:block; width:100%; margin:.4rem 0 1rem; padding:.5rem }
.actions { display:flex; gap:.5rem }
.message { margin-top:.75rem; color: #2c7 }
</style>
