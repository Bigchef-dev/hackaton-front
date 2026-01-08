<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import { useSidebar } from './utils/composables/useNavBar'
import { computed } from 'vue'

const { isSidebarOpen, mobileMenuHeight } = useSidebar()

const desktopMargin = computed(() => isSidebarOpen.value ? 'lg:ml-70' : 'lg:ml-20')

const mobilePaddingTop = computed(() => `${mobileMenuHeight.value}px`)
</script>

<template>
  <div>
    <NavigationBar />
    <main class="min-h-screen bg-slate-50">
      <div 
        :class="['lg:pt-0', desktopMargin]"
        :style="{ 
          paddingTop: mobilePaddingTop,
          transition: 'padding-top 500ms ease-in-out, margin-left 300ms ease-in-out'
        }"
        class="lg:!pt-0">
        <router-view />
      </div>
    </main>
  </div>
</template>