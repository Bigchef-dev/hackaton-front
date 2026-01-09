<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRouter} from 'vue-router'
import { useSidebar } from '../utils/composables/useNavBar'
import { UserRole } from '../utils/types'
import { useAuthStore } from '../utils/stores/login'
const { isSidebarOpen, isMobileMenuOpen, mobileMenuHeight } = useSidebar()

const activeRoute = ref('dashboard')
const mobileMenuRef = ref<HTMLElement | null>(null)

const router = useRouter()
const store = useAuthStore()
const currentUser = computed(() => store.currentUser)




const nomApp = 'Ultimate Sports'

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
}

const HomeIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`

const UsersIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`

const ConnectionIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>`

const SettingsIcon = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`

const menuItems = [
  { id: 'home', label: 'Accueil', icon: HomeIcon, roles: [UserRole.invite] },
  { id: 'homeconnect', label: 'Accueil', icon: HomeIcon, roles: [UserRole.admin, UserRole.coach, UserRole.athlete, UserRole.president] },
  { id: 'AthleteDashboard', label: 'Athlète', icon: UsersIcon, roles: [UserRole.athlete] },
  { id: 'Coach', label: 'Coach', icon: UsersIcon, roles: [UserRole.coach] },
  { id: 'presidence', label: 'Présidence', icon: UsersIcon, roles: [UserRole.president] },
  { id: 'AdminDashboard', label: 'Administration', icon: UsersIcon, roles: [UserRole.admin] },
  { id: 'Login', label: 'Connexion', icon: ConnectionIcon, roles: [UserRole.invite] },
  { id: 'settings', label: 'Paramètres', icon: SettingsIcon, roles: [UserRole.admin, UserRole.coach, UserRole.athlete, UserRole.president, UserRole.invite] },
  { id: 'Logout', label: 'Déconnexion', icon: ConnectionIcon, roles: [UserRole.admin, UserRole.coach, UserRole.athlete, UserRole.president] }
]

const filteredMenuItems = computed(() => 
  menuItems.filter(item => item.roles.includes(currentUser.value.role))
)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const updateMobileMenuHeight = () => {
  nextTick(() => {
    if (mobileMenuRef.value && isMobileMenuOpen.value) {
      // Ouverture : mise à jour immédiate
      mobileMenuHeight.value = 64 + mobileMenuRef.value.scrollHeight
    } else {
      // Fermeture : mise à jour immédiate, la transition CSS gère l'animation
      mobileMenuHeight.value = 64
    }
  })
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  updateMobileMenuHeight()
}

const navigateTo = (id:string) => {
  activeRoute.value = id
  isMobileMenuOpen.value = true
  updateMobileMenuHeight()
  router.push({ name: id })
  
  console.log(`Navigation vers: ${id}`)
}

onMounted(() => {
  updateMobileMenuHeight()
})

watch(isMobileMenuOpen, () => {
  updateMobileMenuHeight()
})
</script>

<template>
  <div>
    <!-- Desktop Sidebar -->
    <aside
      :class="[
        'hidden lg:flex flex-col fixed left-0 top-0 bottom-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl overflow-x-hidden',
        isSidebarOpen ? 'w-70' : 'w-20'
      ]"
      style="z-index: 40; transition: width 300ms ease-in-out;"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
        <div 
          :class="[
            'flex items-center space-x-3 overflow-hidden transition-all duration-300',
            isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
          ]"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">
            {{ getInitials(nomApp) }}
          </div>
          <span class="font-bold text-xl whitespace-nowrap">{{ nomApp }}</span>
        </div>
        <button
          @click="toggleSidebar"
          class="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200 ml-auto flex-shrink-0"
          :aria-label="isSidebarOpen ? 'Réduire la sidebar' : 'Étendre la sidebar'"
        >
          <svg v-if="isSidebarOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <nav class="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
        <button
          v-for="item in filteredMenuItems"
          :key="item.id"
          @click="navigateTo(item.id)"
          :class="[
            'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group',
            activeRoute === item.id
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg scale-105'
              : 'hover:bg-slate-700/50 hover:translate-x-1'
          ]"
          :aria-current="activeRoute === item.id ? 'page' : undefined"
        >
          <div v-html="item.icon" class="w-5 h-5 flex-shrink-0 transition-transform duration-200 flex items-center" :class="{ 'group-hover:scale-110': activeRoute !== item.id }" />
          <span
            :class="[
              'whitespace-nowrap transition-all duration-300 font-medium',
              isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            ]"
          >
            {{ item.label }}
          </span>
        </button>
      </nav>

      <div :class="['p-4 border-t border-slate-700 flex-shrink-0', isSidebarOpen ? '' : 'flex justify-center']">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
            {{ currentUser.avatar }}
          </div>
          <div :class="['overflow-hidden transition-all duration-300', isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0']">
            <p class="font-medium text-sm whitespace-nowrap">{{ currentUser.name }}</p>
            <p class="text-xs text-slate-400 capitalize">{{ currentUser.role }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Top Navigation -->
    <header class="lg:hidden fixed top-0 left-0 right-0 text-white shadow-lg z-50">
      <!-- Background avec couleur unie pour éviter l'espace blanc -->
      <div class="absolute inset-0 bg-slate-800 -z-10"></div>
      
      <div class="relative flex items-center justify-between p-4 bg-slate-900">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold">
            {{ getInitials(nomApp) }}
          </div>
          <span class="font-bold text-lg">{{ nomApp }}</span>
        </div>
        
        <button
          @click="toggleMobileMenu"
          class="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
          :aria-label="isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          :aria-expanded="isMobileMenuOpen"
        >
          <svg v-if="isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Dropdown -->
      <nav 
        ref="mobileMenuRef"
        :class="[
          'relative border-t border-slate-700 bg-slate-800 overflow-hidden transition-all duration-500 ease-in-out',
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        ]"
        :style="{ 
          maxHeight: isMobileMenuOpen ? mobileMenuRef?.scrollHeight + 'px' : '0px',
          transition: 'max-height 500ms ease-in-out, opacity 500ms ease-in-out'
        }"
      >
        <button
          v-for="item in filteredMenuItems"
          :key="item.id"
          @click="navigateTo(item.id)"
          :class="[
            'w-full flex items-center space-x-4 px-6 py-4 transition-all duration-200',
            activeRoute === item.id
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-l-4 border-white'
              : 'hover:bg-slate-700 active:bg-slate-600'
          ]"
        >
          <div v-html="item.icon" class="w-5 h-5 flex-shrink-0 flex items-center" />
          <span class="font-medium">{{ item.label }}</span>
        </button>
        
        <!-- Mobile User Profile -->
        <div class="border-t border-slate-700 p-4 bg-slate-900">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center font-semibold">
              {{ currentUser.avatar }}
            </div>
            <div>
              <p class="font-medium text-sm">{{ currentUser.name }}</p>
              <p class="text-xs text-slate-400 capitalize">{{ currentUser.role }}</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>