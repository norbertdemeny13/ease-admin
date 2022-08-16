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
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
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
 
  const savedCredentials = localStorage.getItem('savedCredentials');
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  
  if (!!savedCredentials && email && password) {
    store.dispatch('session/login', {
      credentials: {
        email,
        password,
      },
    });
    isAuthenticated = true;
    next();
  }

  if (!isAuthenticated) {
    next();
  }
});
