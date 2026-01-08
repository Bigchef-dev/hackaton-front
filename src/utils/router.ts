import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import ClubForm from '../components/ClubForm.vue';
import AdminDashboard from '../components/AdminDashboard.vue';


import Profile from '../components/profile/Profile.vue';
import Coach from '../components/coach/CoachDashboard.vue';
import President from '../components/president/PresidentDashboard.vue';

const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'dashboard',
    component: HelloWorld,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
