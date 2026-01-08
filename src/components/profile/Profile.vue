<script setup lang="ts">
import { computed } from 'vue';
import ProfileView from './ProfileView.vue';

interface BaseUser {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  gender: string;
  [key: string]: any;
}

const props = defineProps<{
  user?: string;
}>();

const defaultUser: BaseUser = {
  name: 'Amélie',
  lastName: 'Dupond',
  email: 'dupond@jsp.com',
  phone: '06 12 34 56 78',
  address: '12 rue des Fleurs, 75000 Paris',
  birthdate: '15/08/1990',
  gender: 'F',
};

const user = computed<BaseUser>(() => {
  console.log('push get :', props.user);
  return props.user ? JSON.parse(props.user) : defaultUser;
});
</script>

<template>
  <ProfileView :user="user" />
</template>
