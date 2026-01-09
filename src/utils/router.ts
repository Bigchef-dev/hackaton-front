import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import HomeConnect from '../components/HomeConnect.vue';

import AdminDashboard from '../components/AdminDashboard.vue';
import Profile from '../components/profile/Profile.vue';
import Coach from '../components/coach/CoachDashboard.vue';
import President from '../components/president/PresidentDashboard.vue';
import AthleteDashboard from '../components/athlete/AthleteDashboard.vue';
import LoginView from '../components/login/LoginView.vue';
import { checkIsAuthenticated } from './composables/auth';
import LoginForm from '../components/LoginForm.vue';
import LoginStuff from '../components/LoginStuff.vue';
import Logout from '../components/Logout.vue';

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/',
    name: 'homeconnect',
    component: HomeConnect,
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  }, 
  {
    path: '/login',
    name: 'Login',
    component: LoginStuff,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: route => ({
      user: route.query.user
    }),
  },
  {
    path: '/coach',
    name: 'Coach',
    component: Coach,
  },
  {
    path: '/president',
    name: 'President',
    component: President,
  },
  {
    path: '/athlete',
    name: 'AthleteDashboard',
    component: AthleteDashboard,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
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
