
import { ref } from 'vue'

const isSidebarOpen = ref(false)
const isMobileMenuOpen = ref(false)
const mobileMenuHeight = ref(64)

export function useSidebar() {
  return {
    isSidebarOpen,
    isMobileMenuOpen,
    mobileMenuHeight
  }
}