/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { api } from '@/services/api';
import { nanoid } from 'nanoid';
import { i18n } from '@/i18n';
import instance from '@/main';
import { store } from '@/store';

const dispatchToast = (
  { intent, title, message }: {
    intent: string;
    title: string;
    message: string;
  },
) => {
  (instance as any).$toasts.toast({
    id: nanoid(),
    intent,
    title,
    message,
  });
};

export interface State extends ModuleState {
  isFetching: boolean;
  clients: [];
  cities: [];
  elites: [];
  promoCodes: [];
  selectedCity: any;
  selectedClient: any;
  selectedElite: any;
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    elites: [],
    clients: [],
    cities: [],
    promoCodes: [],
    selectedCity: {
      id: '',
    },
    selectedClient: {
      id: '',
    },
    selectedElite: {
      id: '',
    },
  }) as State,

  actions: {
    async fetchElites({ state }, params) {
      Vue.set(state, 'isFetching', true);
      let qs = Object.keys(params)
        .filter(key => params[key])
        .filter(key => key !== 'serviceIds')
        .map(key => `${key}=${params[key]}`)
        .join('&');
      if (params?.serviceIds?.length) {
        params.serviceIds.forEach((item: number) => {
          qs += `&service_id[]=${item}`;
        });
      }

      try {
        const { data } = await api.find(`/admin/elites?${qs}`);
        Vue.set(state, 'elites', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchClients({ state }, params) {
      Vue.set(state, 'isFetching', true);
      let qs = Object.keys(params)
        .filter(key => params[key])
        .filter(key => key !== 'serviceIds')
        .map(key => `${key}=${params[key]}`)
        .join('&');

      try {
        const { data } = await api.find(`/admin/users?${qs}`);
        Vue.set(state, 'clients', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchCities({ state }) {
      Vue.set(state, 'isFetching', true);

      try {
        const { data } = await api.find('/admin/cities');
        Vue.set(state, 'cities', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchPromoCodes({ state }) {
      Vue.set(state, 'isFetching', true);

      try {
        const { data } = await api.find('/admin/promo_codes');
        Vue.set(state, 'promoCodes', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchElite({ state }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/admin/elites/${id}`);
        Vue.set(state, 'selectedElite', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchCity({ state }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/admin/cities/${id}`);
        Vue.set(state, 'selectedCity', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async fetchUser({ state }, id) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find(`/admin/users/${id}`);
        Vue.set(state, 'selectedClient', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async updateProfilePicture({ state, commit }, formData) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        await api.update(
          `admin/elites/${state.selectedElite.id}/update_avatar`,
          { data: formData },
          {
            contentType: 'multipart/form-data'
          } as any,
        );
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      }  finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async updateElite({ state }, { elite }) {
      Vue.set(state, 'isFetching', true);
      const { id } = elite;
      try {
        const { data } = await api.update(`/admin/elites/${id}`, {
          elite: {
            ...state.selectedElite,
            ...elite,
          },
        });
        Vue.set(state, 'selectedElite', data);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async saveServices({ dispatch, state }, { serviceIds, cityId }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.update(`/admin/cities/${cityId}`, {
          service_ids: serviceIds,
        });
        dispatch('fetchCity', cityId);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async removeEliteReview({ dispatch, state }, { eliteId, reviewId }) {
      Vue.set(state, 'isFetching', true);
      try {
        await api.destroy(`/admin/elites/${eliteId}/delete_review/${reviewId}`);
        dispatch('fetchElite', eliteId);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async onReservationCancel({ dispatch, state }, { serviceId, clientId }) {
      Vue.set(state, 'isFetching', true);
      try {
        await api.create(`admin/reservations/${serviceId}/cancel`);
        dispatch('fetchUser', clientId);
        dispatchToast({
          intent: 'success',
          title: i18n.t('toast.congrats_title').toString(),
          message: i18n.t('toast.cancel_reservation').toString(),
        });
      } catch({ reason }) {
        dispatchToast({
          intent: 'error',
          title: i18n.t('toast.error_title').toString(),
          message: i18n.t('toast.cancel_reservation_failed').toString(),
        });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async onClientRefund({ dispatch, state }, { refund, serviceId, clientId }) {
      Vue.set(state, 'isFetching', true);
      try {
        await api.create(`admin/reservations/${serviceId}/refund`, {
          ...refund,
        });
        dispatch('fetchUser', clientId);
        dispatchToast({
          intent: 'success',
          title: i18n.t('toast.congrats_title').toString(),
          message: i18n.t('toast.refund.success').toString(),
        });
      } catch({ reason }) {
        dispatchToast({
          intent: 'error',
          title: 'Eroare',
          message: i18n.t('toast.refund.failed').toString(),
        });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
    async onAddCredit({ dispatch, state }, { credit, clientId }) {
      Vue.set(state, 'isFetching', true);
      try {
        await api.create(`admin/users/${clientId}/add_ease_credit`, {
          value: typeof credit === 'string' ? parseInt(credit, 10) : credit,
        });
        dispatch('fetchUser', clientId);
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    isFetching: state => state.isFetching,
    getClients: state => state.clients,
    getCities: state => state.cities,
    getElites: state => state.elites,
    getPromoCodes: state => state.promoCodes,
    getSelectedCity: state => state.selectedCity,
    getSelectedClient: state => state.selectedClient,
    getSelectedElite: state => state.selectedElite,
  } as GetterTree<State, RootState>,

  mutations: {} as MutationTree<State>,
};
