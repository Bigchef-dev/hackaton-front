import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Profile from '../components/profile/Profile.vue';
import Coach from '../components/coach/CoachDashboard.vue';



const routes: Array<RouteRecordRaw> = [

    {
    path: '/',
    name: 'Home',
    component: HelloWorld,
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
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
