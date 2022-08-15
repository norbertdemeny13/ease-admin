/* eslint-disable */
import Vue from 'vue';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { ModuleState, RootState } from '@/store/interfaces';
import { USER } from '@/interfaces/User';
import { api } from '@/services/api';

export interface State extends ModuleState {
  isAuth: boolean;
  isFetchingUser: boolean;
  user: USER;
  userType: string;
}

export default {
  namespaced: true,

  state: () => ({
    user: {},
    isAuth: false,
    isFetchingUser: false,
    userType: '',
  }) as State,

  actions: {
    setToken({ state }, pass) {
      if (pass === 'qazwsx') {
        Vue.set(state, 'isAuth', true);
      }
    },
    setUserType({ state }, type) {
      Vue.set(state, 'userType', type);
      localStorage.setItem('userType', type);
    },
    async jwtLogin({ state, commit }, jwt) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.update(`/admin/sessions`, {
          refresh_token: jwt.slice(2),
        });
        commit('setUser', data);
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      }  finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async login({ state, commit }, { credentials }) {
      Vue.set(state, 'isFetchingUser', true);
      try {
        const { data } = await api.create('admin/sessions', {
          ...credentials,
        });
        localStorage.setItem('savedCredentials', 'true');
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('password', credentials.password);
        commit('setUser', data);
      } catch({ response: reason }) {
        commit('common/setErrors', reason, { root: true });
      } finally {
        Vue.set(state, 'isFetchingUser', false);
      }
    },
    async logout({ state, rootState, commit }) {
      commit('setUser', null);
      localStorage.removeItem('jwt');
      localStorage.removeItem('auth');
      localStorage.removeItem('userType');
      localStorage.removeItem('savedCredentials');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    },
  } as ActionTree<State, RootState>,

  getters: {
    isAuth: state => state.isAuth,
    isFetchingUser: state => state.isFetchingUser,
    getUser: state => state.user,
    getUserToken: state => state.user && state.user.access_token,
    getUserType: state => state.userType || state.user?.user_type || localStorage.getItem('userType'),
    isAuthenticated: ({ user }) => user && (user as any)?.id,
  } as GetterTree<State, RootState>,

  mutations: {
    setUser(state: State, data: any) {
      const refreshToken = data?.refresh_token;
      const authToken = data?.access_token;
      if (data && refreshToken) {
        localStorage.setItem('jwt', `Jh${data.refresh_token}`);
        localStorage.setItem('auth', `Kn${data.access_token}`);
      }
      localStorage.setItem('userType', 'admin');
      Vue.set(state, 'user', data);
    },
    setStatistics(state: State, data: any) {
      Vue.set(state, 'statistics', data);
    },
    setRefferalCode(state: State, code: any) {
      Vue.set(state, 'refferalCode', code);
    },
  } as MutationTree<State>,
};
