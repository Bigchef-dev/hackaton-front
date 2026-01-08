import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Coach from '../components/coach.vue';
import Athlete from '../components/athlete.vue';
import TestConnection from '../components/TestConnection.vue';
import Settings from '../components/Settings.vue';


const routes: Array<RouteRecordRaw> = [

  {
    path: '/',
    name: 'dashboard',
    component: HelloWorld,
  },
    {
    path: '/coach',
    name: 'coach',
    component: Coach,
  },
  {
  path: '/athlete',
  name: 'athlete',
  component: Athlete,
  },
  {
  path: '/test-connection',
  name: 'connection',
  component: TestConnection,
  },
  {
  path: '/settings',
  name: 'settings',
  component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
