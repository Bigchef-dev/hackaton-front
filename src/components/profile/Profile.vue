<script setup lang="ts">
import ProfileView from './ProfileView.vue';

const user = {
  name: 'Amélie',
  lastName: 'Dupond',
  email: 'dupond@jsp.com',
  phone: '06 12 34 56 78',
  address: '12 rue des Fleurs, 75000 Paris',
  birthdate: '15/08/1990',
  gender: 'F'
}
</script>

<template>
  <ProfileView :user="user" />
</template>