<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import { useSidebar } from './utils/composables/useNavBar'
import { computed } from 'vue'

const { isSidebarOpen, mobileMenuHeight } = useSidebar()

const desktopMargin = computed(() => isSidebarOpen.value ? 'lg:ml-64' : 'lg:ml-20')

const mobilePaddingTop = computed(() => `${mobileMenuHeight.value}px`)
</script>

<template>
  <div>
    <NavigationBar />
    <main class="min-h-screen bg-slate-50">
      <div 
        :class="['transition-all duration-300 lg:pt-0', desktopMargin]"
        :style="{ paddingTop: mobilePaddingTop }"
        class="lg:!pt-0">
        <router-view />
      </div>
    </main>
  </div>
</template>