/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { Service, ComplementaryService } from '@/interfaces/Services';
import { api } from '@/services/api';
import instance from '@/main';
import { nanoid } from 'nanoid';

export interface State extends ModuleState {
  isFetching: boolean;
  services: Service[];
  selectedServices: Service[];
}

export default {
  namespaced: true,

  state: () => ({
    isFetching: false,
    services: [],
    selectedServices: [],
  }) as State,

  actions: {
    async fetchServices({ state, commit }) {
      Vue.set(state, 'isFetching', true);
      try {
        const { data } = await api.find('/services_pro');
        commit('setServices', data);
      } catch ({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetching', false);
      }
    },
  } as ActionTree<State, RootState>,

  getters: {
    getSelectedServices: state => state.selectedServices,
    getServices: state => state.services,
    isFetching: state => state.isFetching,
  } as GetterTree<State, RootState>,

  mutations: {
    setServices(state: State, data: any) {
      Vue.set(state, 'services', data);
    },
  } as MutationTree<State>,
};
