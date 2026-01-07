import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import AthleteDashboard from '../components/athlete/AthleteDashboard.vue';



const routes: Array<RouteRecordRaw> = [

    {
    path: '/',
    name: 'Home',
    component: HelloWorld,
  },
      {
    path: '/athlete',
    name: 'AthleteDashboard',
    component: AthleteDashboard,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
