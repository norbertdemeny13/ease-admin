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
    name: 'Home',
    component: () => import('@/views/home').then(({ Home }) => Home),
  },
  {
    path: '/easepro',
    name: 'ProHome',
    component: () => import('@/views/pro-home').then(({ ProHome }) => ProHome),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/contact').then(({ Contact }) => Contact),
  },
  {
    path: '/client',
    component: () => import('@/views/client-dashboard').then(({ ClientDashboard }) => ClientDashboard),
    children: [
      {
        path: 'cont',
        name: 'Cont Client',
        component: () => import('@/views/client-dashboard').then(({ ClientAccount }) => ClientAccount),
      },
      {
        path: 'parola',
        name: 'Parola Client',
        component: () => import('@/views/client-dashboard').then(({ ClientPassword }) => ClientPassword),
      },
      {
        path: 'telefon',
        name: 'Telefon Client',
        component: () => import('@/views/client-dashboard').then(({ ClientPhone }) => ClientPhone),
      },
      {
        path: 'recomandare',
        name: 'Recomandare Client',
        component: () => import('@/views/client-dashboard').then(({ ClientRecommendations }) => ClientRecommendations),
      },
      {
        path: 'adrese',
        name: 'Adrese Client',
        component: () => import('@/views/client-dashboard').then(({ ClientAddresses }) => ClientAddresses),
      },
      {
        path: 'metode-de-plata',
        name: 'Plata Client',
        component: () => import('@/views/client-dashboard').then(({ ClientPayments }) => ClientPayments),
      },
      {
        path: 'rezervarile-mele',
        name: 'Rezervari Client',
        component: () => import('@/views/client-dashboard').then(({ ClientReservations }) => ClientReservations),
      },
      {
        path: 'comenzile-mele',
        name: 'Comenzi Client',
        component: () => import('@/views/client-dashboard').then(({ ClientOrders }) => ClientOrders),
      },
      {
        path: 'profesionisti-salvati',
        name: 'Profesionisti Salvati',
        component: () => import('@/views/client-dashboard').then(({ ClientFavourite }) => ClientFavourite),
      },
      {
        path: 'abonamente',
        name: 'Abonamente Client',
        component: () => import('@/views/client-dashboard').then(({ ClientSubscriptions }) => ClientSubscriptions),
      },
      {
        path: 'credit-ease',
        name: 'Credit Client',
        component: () => import('@/views/client-dashboard').then(({ ClientCredits }) => ClientCredits),
      },
      {
        path: 'preferinte',
        name: 'Preferinte Client',
        component: () => import('@/views/client-dashboard').then(({ ClientPreferences }) => ClientPreferences),
      },
    ],
  },
  {
    path: '/easepro/',
    component: () => import('@/views/pro-dashboard').then(({ ProDashboard }) => ProDashboard),
    children: [
      {
        path: 'cont',
        name: 'Cont Pro',
        component: () => import('@/views/pro-dashboard').then(({ ProAccount }) => ProAccount),
      },
      {
        path: 'parola',
        name: 'Parola Pro',
        component: () => import('@/views/pro-dashboard').then(({ ProPassword }) => ProPassword),
      },
      {
        path: 'servicii',
        name: 'Servicii Pro',
        component: () => import('@/views/pro-dashboard').then(({ ProServices }) => ProServices),
      },
      {
        path: 'documente',
        name: 'Documents',
        component: () => import('@/views/pro-dashboard').then(({ ProDocuments }) => ProDocuments),
      },
      {
        path: 'telefon',
        name: 'Telefon Pro',
        component: () => import('@/views/pro-dashboard').then(({ ProPhone }) => ProPhone),
      },
      {
        path: 'promoveaza',
        name: 'Promoveaza Pro',
        component: () => import('@/views/pro-dashboard').then(({ ProRecommendations }) => ProRecommendations),
      },
      {
        path: 'adrese',
        name: 'Adrese Pro',
        component: () => import('@/views/pro-dashboard').then(({ ProAddresses }) => ProAddresses),
      },
    ],
  },
  {
    path: '/servicii',
    name: 'Servicii',
    component: () => import('@/views/services').then(({ Services }) => Services),
  },
  {
    path: '/elite/reset-password',
    name: 'Reset Password',
    component: () => import('@/views/reset-password').then(({ ResetPassword }) => ResetPassword),
  },
  {
    path: '/user/reset-password',
    name: 'Reset Password',
    component: () => import('@/views/reset-password').then(({ ResetPassword }) => ResetPassword),
  },
  {
    path: '/abonamente',
    name: 'Abonamente',
    component: () => import('@/views/subscriptions').then(({ Subscriptions }) => Subscriptions),
  },
  {
    path: '/abonamente/rezerva',
    name: 'Rezerva Abonamente',
    component: () => import('@/views/subscription-payment').then(({ SubscriptionPayment }) => SubscriptionPayment),
  },
  {
    path: '/abonamente/:type',
    name: 'Detalii Abonament',
    component: () => import('@/views/subscription-details').then(({ SubscriptionDetails }) => SubscriptionDetails),
  },
  {
    path: '/pro/:id',
    name: 'Detalii Elite',
    component: () => import('@/views/elite-details').then(({ EliteDetails }) => EliteDetails),
  },
  {
    path: '/carduri-cadou',
    name: 'Carduri Cadou',
    component: () => import('@/views/gift-cards').then(({ GiftCards }) => GiftCards),
  },
  {
    path: '/carduri-cadou/:id',
    name: 'Detalii Card Cadou',
    component: () => import('@/views/gift-card-details').then(({ GiftCardDetails }) => GiftCardDetails),
  },
  {
    path: '/carduri-cadou/:id/plata',
    name: 'Plata Card Cadou',
    component: () => import('@/views/gift-card-summary').then(({ GiftCardSummary }) => GiftCardSummary),
  },
  {
    path: '/companii',
    name: 'Companii',
    component: () => import('@/views/companies').then(({ Companies }) => Companies),
  },
  {
    path: '/servicii/masaj',
    name: 'Detalii Servicii Masaj',
    component: () => import('@/views/reserve-massage').then(({ ReserveMassage }) => ReserveMassage),
  },
  {
    path: '/new/servicii/masaj',
    name: 'Detalii Servicii Masaj Cuplu',
    component: () => import('@/views/reserve-massage').then(({ NewReserveMassage }) => NewReserveMassage),
  },
  {
    path: '/servicii/:type',
    name: 'Detalii Servicii',
    component: () => import('@/views/services-details').then(({ ServicesDetails }) => ServicesDetails),
  },
  {
    path: '/servicii/:type/:id',
    name: 'Detalii Serviciu',
    component: () => import('@/views/service-details').then(({ ServiceDetails }) => ServiceDetails),
  },
  {
    path: '/new/servicii/:type',
    name: 'Detalii Servicii Aditional',
    component: () => import('@/views/services-details').then(({ ServicesDetails }) => ServicesDetails),
  },
  {
    path: '/new/servicii/:type/:id',
    name: 'Detalii Serviciu Aditional',
    component: () => import('@/views/additional-service-details').then(({ AdditionalServiceDetails }) => AdditionalServiceDetails),
  },
  {
    path: '/servicii/:type/:id/rezerva',
    name: 'Rezerva',
    component: () => import('@/views/reserve-service').then(({ ReserveService }) => ReserveService),
  },
  {
    path: '/servicii/:type/:id/rezerva/plata',
    name: 'Plata rezervare',
    component: () => import('@/views/reserve-service-payment').then(({ ReserveServicePayment }) => ReserveServicePayment),
  },
  {
    path: '/intrebari-frecvente',
    name: 'Intrebari frecvente',
    component: () => import('@/views/faq').then(({ Faq }) => Faq),
  },
  {
    path: '/easepro/intrebari-frecvente',
    name: 'Intrebari frecvente pro',
    component: () => import('@/views/pro-faq').then(({ ProFaq }) => ProFaq),
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: () => import('@/views/admin-dashboard').then(({ AdminDashboard }) => AdminDashboard),
    children: [
      // *===============================================---*
      // *--------- USER ---- ---------------------------------------*
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
  const getSelectedSubscription = store.getters['subscriptions/getSelectedSubscription'];
  const getSelectedServices = store.getters['services/getSelectedServices'];
  const getGiftCard = store.getters['giftCards/getGiftCard'];
  const getLocation = store.getters['address/getLocation'];
  const getToken = store.getters['session/getToken'];
  const getAdmin = store.getters['session/getAdmin'];
  const getAdminToken = store.getters['session/getAdminToken'];
  const getUserType = store.getters['session/getUserType'];
  const hasLocation = getLocation || sessionStorage.getItem('city_id');
  const isNew = path.includes('new');
  const jwtToken = localStorage.getItem('jwt') && !localStorage.getItem('jwt')!.includes('undefined');
  const authToken = localStorage.getItem('auth') && !localStorage.getItem('auth')!.includes('undefined');
  const adminJwtToken = localStorage.getItem('adminJwt') && !localStorage.getItem('adminJwt')!.includes('undefined');
  const adminAuthToken = localStorage.getItem('adminAuth') && !localStorage.getItem('adminAuth')!.includes('undefined');

  if (name?.includes('admin-elite') && !getAdmin?.email) {
    next();
  }

  if (name?.includes('admin')) {
    store.dispatch('session/setUserType', 'admin');
  }

  if (to.fullPath.includes('register')) {
    const { refferal_code } = to.query;
    if (refferal_code) {
      await store.commit('session/setRefferalCode', refferal_code);
    }
    next('/');
  }

  if (!getToken && authToken && !to.fullPath.includes('admin')) {
    await store.dispatch('session/getUser');
    isAuthenticated = true;
  }

  const getUser = store.getters['session/getUser'];

  if (!getToken && !authToken && jwtToken) {
    await store.dispatch('session/jwtLogin', localStorage.getItem('jwt'));
    isAuthenticated = true;
  }

  if (!getAdminToken && !adminAuthToken && adminJwtToken) {
    await store.dispatch('session/adminJwtLogin', localStorage.getItem('jwt'));
    isAuthenticated = true;
  }

  if ((getToken || isAuthenticated) && name === 'Home' && getUser.user_type === 'user') {
    next('/servicii');
  }

  if ((getToken || isAuthenticated) && name === 'ProHome' && getUser.user_type === 'elite') {
    next('/easepro/cont');
  }

  if (path.includes('/carduri-cadou/') && !getGiftCard.id) {
    next('/carduri-cadou');
  }

  if (path.includes('/rezerva/plata') && !getSelectedServices.length) {
    next(`/servicii/${params.type}/${params.id}`);
  }

  if (path.includes('/servicii/') && hasLocation === 'null') {
    next('/servicii');
  }

  if (path.includes('abonamente/rezerva') && !getSelectedSubscription) {
   next('/abonamente');
  }

  if (path.includes('/abonamente/rezerva') && !getToken && !jwtToken) {
    next('/abonamente');
  }


  if (path.includes('/client') && !getToken && !jwtToken) {
    next('/');
  }

  if (path.includes('/easepro/cont') && !getToken && !jwtToken) {
    next('/');
  }

  if (isNew && !getSelectedServices.length) {
    const { type, pro_id } = query;
    const newRoute = path.replace('/new', '');
    next(`${newRoute}?type=${type ? type : 'couple'}${pro_id ? '&pro_id=' : ''}${pro_id ? pro_id : ''}`);
  }

  if (to.name === 'Rezerva' && !getSelectedServices.length) {
    if (type === 'single' || type === 'couple') {
      next(`/servicii/masaj?type=${type}`);
    } else {
      next(`/servicii/${type}/${id}`);
    }
  }

  if (to.name === 'Detalii Serviciu' || to.name === 'Detalii Serviciu Aditional') {
    const { pro_id } = query;
    await store.dispatch('services/fetchServiceById', { type, id, pro_id });
    next();
  }

  if (!isAuth) {
    next();
  }
});
