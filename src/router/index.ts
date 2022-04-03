/* eslint-disable */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { store } from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '*',
    name: '404',
    component: () => import('@/views/not-found').then(
      ({ NotFound }) => NotFound,
    ),
  },

  {
    path: '/',
    name: 'admin-dashboard',
    component: () => import('@/views/admin-dashboard').then(({ AdminDashboard }) => AdminDashboard),
    children: [
      // *===============================================---*
      // *--------- Elite ---- ---------------------------------------*
      // *===============================================---*
      {
        path: 'profesionisti',
        name: 'admin-elite-list',
        component: () => import('@/views/admin-dashboard/elites/elites-list/EliteList.vue'),
      },
      {
        path: 'profesionisti/view/:id',
        name: 'admin-elite-view',
        component: () => import('@/views/admin-dashboard/elites/elites-view/EliteView.vue'),
      },
      {
        path: 'profesionisti/edit/:id',
        name: 'admin-elite-edit',
        component: () => import('@/views/admin-dashboard/elites/elites-edit/EliteEdit.vue'),
      },
      // *===============================================---*
      // *--------- Client ---- ---------------------------------------*
      // *===============================================---*
      {
        path: 'client',
        name: 'admin-client-list',
        component: () => import('@/views/admin-dashboard/clients/client-list/ClientList.vue'),
      },
      {
        path: 'client/view/:id',
        name: 'admin-client-view',
        component: () => import('@/views/admin-dashboard/clients/client-view/ClientView.vue'),
      },
      // *===============================================---*
      // *--------- Cities ---- ---------------------------------------*
      // *===============================================---*
      {
        path: 'city',
        name: 'admin-city-list',
        component: () => import('@/views/admin-dashboard/cities/city-list/CityList.vue'),
      },
      {
        path: 'city/view/:id',
        name: 'admin-city-view',
        component: () => import('@/views/admin-dashboard/cities/city-view/CityView.vue'),
      },
      // *===============================================---*
      // *--------- Promo Codes ---- ---------------------------------------*
      // *===============================================---*
      {
        path: 'promo-code',
        name: 'admin-promo-code-list',
        component: () => import('@/views/admin-dashboard/promo-codes/promo-code-list/PromoCodeList.vue'),
      },
    ],
  },
];

export const router = new VueRouter({
  linkActiveClass: 'is-current-route',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (to.path === from.path) {
      return;
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },
  mode: 'history'
});

router.beforeEach(async (to, from, next) => {
  let isAuthenticated = false;

  const { params, path, query, name } = to;
  const { type, id } = params;
  const isAuth = store.getters['session/isAuth'];
  const getUserToken = store.getters['session/getUserToken'];
  const getUserType = store.getters['session/getUserType'];
  const jwtToken = localStorage.getItem('jwt') && !localStorage.getItem('jwt')!.includes('undefined');
  const authToken = localStorage.getItem('auth') && !localStorage.getItem('auth')!.includes('undefined');

  store.dispatch('session/setUserType', 'admin');

  const getUser = store.getters['session/getUser'];

  if (!getUserToken && !authToken && jwtToken) {
    await store.dispatch('session/jwtLogin', localStorage.getItem('jwt'));
    isAuthenticated = true;
  }

  next();
});
