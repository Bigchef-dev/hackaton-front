import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import ClubForm from '../components/ClubForm.vue';
import { checkIsAuthenticated } from './composables/auth';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorld,
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/LoginForm.vue'),
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminDashboard,
        meta: { requiresAuth: true },
    },
    {
        path: '/admin/newclub',
        name: 'NewClub',
        component: ClubForm,
        meta: { requiresAuth: true },
    }
];

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
