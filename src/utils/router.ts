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
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/admin/newclub',
    name: 'NewClub',
    component: ClubForm,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
