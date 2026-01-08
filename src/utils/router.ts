import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';

import AdminDashboard from '../components/AdminDashboard.vue';
import AthleteDashboard from '../components/athlete/AthleteDashboard.vue';
import LoginView from '../components/login/LoginView.vue';
import { checkIsAuthenticated } from './composables/auth';
import LoginForm from '../components/LoginForm.vue';



const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  }, 
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/athlete',
    name: 'AthleteDashboard',
    component: AthleteDashboard,
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Guard de navigation : protège les routes nécessitant une authentification
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = checkIsAuthenticated();

    if (requiresAuth && !isAuthenticated) {
        // Redirection vers la page de login si non authentifié
        next({
            path: '/login',
            query: { redirect: to.fullPath } // Sauvegarde l'URL de destination
        });
    } else if (to.path === '/login' && isAuthenticated) {
        // Si déjà connecté et accès à /login, rediriger vers home
        next({ path: '/' });
    } else {
        next();
    }
});

export default router;
