import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

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
