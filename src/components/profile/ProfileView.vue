<script setup lang="ts">
import ProfilLayout from './ProfileLayout.vue'
import Card from './Card.vue'
import ProfileContent from './ProfileContent.vue'
import router from '../../utils/router'

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    default: 'Mon profil'
  },
  subtitle: {
    type: String,
    default: 'Informations personnelles'
  },
  showRole: {
    type: Boolean,
    default: true
  },
  footerText: {
    type: String,
    default: 'Sport App'
  }
})

const emit = defineEmits(['profile-updated'])

const handleProfileUpdated = (updatedUser: any) => {
  emit('profile-updated', updatedUser)
}

const goBack = () => {
  router.back();
};
</script>

<template>
  <ProfilLayout>
    <Card :title="title" :subtitle="subtitle">

      <ProfileContent
        :user="user"
        @profile-updated="handleProfileUpdated"
      />

      <template #footer>
        <!-- Back link -->
        <router-link
            to="/"
            class="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-4"
        >
            ← Retour à l’accueil
        </router-link>
        <br/>
        <button
          @click="goBack"
          class="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-4"
        >
          ← Retour
        </button>
      </template>
    </Card>
  </ProfilLayout>
</template>
