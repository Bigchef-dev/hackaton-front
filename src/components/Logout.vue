<template>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import router from '../utils/router';
import { logout } from '../utils/composables/auth';

const handleLogout = () => {
    logout();
    router.push('/');
};
onMounted(() => {
    handleLogout();
});
</script>