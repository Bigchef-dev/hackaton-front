import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import ClubForm from '../components/ClubForm.vue';



const routes: Array<RouteRecordRaw> = [

    {
    path: '/',
    name: 'Home',
    component: HelloWorld,
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
