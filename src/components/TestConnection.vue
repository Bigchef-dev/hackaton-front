<template>
  <div class="card">
    <h2>Tester la connexion</h2>

    <label>Base URL de l'API</label>
    <input v-model="baseUrl" type="text" placeholder="http://localhost:5000" />

    <label>Endpoint (optionnel)</label>
    <input v-model="endpoint" type="text" placeholder="health" />

    <div class="actions">
      <button @click="testConnection" :disabled="loading">Tester la connexion</button>
      <button @click="reset">Réinitialiser</button>
    </div>

    <div v-if="loading">Test en cours...</div>
    <div v-if="result" :class="{ success: ok, error: !ok }">{{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiInstance } from '../utils/api'

const baseUrl = ref(apiInstance.baseuri || '')
const endpoint = ref('')
const loading = ref(false)
const result = ref('')
const ok = ref(false)

async function testConnection() {
  loading.value = true
  result.value = ''
  ok.value = false

  // update base URL in instance temporarily
  const previous = apiInstance.baseuri
  if (baseUrl.value) apiInstance.baseuri = baseUrl.value

  try {
    // use endpoint if provided, otherwise try root
    const ep = endpoint.value?.trim() || ''
    await apiInstance.get(ep)
    result.value = 'Connexion réussie ✅'
    ok.value = true
  } catch (err: any) {
    result.value = 'Échec de la connexion: ' + (err.message || String(err))
    ok.value = false
  } finally {
    // restore previous base if user didn't save
    apiInstance.baseuri = previous
    loading.value = false
  }
}

function reset() {
  baseUrl.value = apiInstance.baseuri || ''
  endpoint.value = ''
  result.value = ''
  ok.value = false
}
</script>

<style scoped>
.card { padding: 1rem; border: 1px solid #ddd; border-radius: 6px; max-width: 480px }
input { display: block; width: 100%; margin: .4rem 0 1rem; padding: .5rem }
.actions { display:flex; gap:.5rem }
.success { color: green; margin-top: .75rem }
.error { color: red; margin-top: .75rem }
button { padding: .4rem .8rem }
</style>
