import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/Home.vue';
import ClubForm from '../components/ClubForm.vue';
import AdminDashboard from '../components/AdminDashboard.vue';



const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'dashboard',
    component: HelloWorld,
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin/newclub',
    name: 'NewClub',
    component: ClubForm,
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
