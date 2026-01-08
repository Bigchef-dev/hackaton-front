<template>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import router from '../utils/router';
import { useAuthStore } from '../utils/store/authStore';
const store = useAuthStore();

const handleLogout = () => {
    store.clearUser();
    router.push('/');
};
onMounted(() => {
    handleLogout();
});
</script>