import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Profile from '../components/profile/Profile.vue';



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
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
