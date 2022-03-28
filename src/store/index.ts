/* eslint-disable */
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './interfaces';
import instance from '@/main';
import admin from './modules/admin';
import common from './modules/common';
import services from './modules/services';
import session from './modules/session';
import app from './modules/app';
import appConfig from './modules/app-config';
import verticalMenu from './modules/vertical-menu';
import { nanoid } from 'nanoid';

const dispatchToast = (
  { title, message }: {
    title: string;
    message: string;
  },
) => {
  (instance as any).$toasts.toast({
    id: nanoid(),
    intent: 'error',
    title,
    message,
  });
};

Vue.use(Vuex);

const options: StoreOptions<RootState> = {
  state: {},
  modules: {
    app,
    appConfig,
    admin,
    common,
    services,
    session,
    verticalMenu,
  },
};

export const store = new Vuex.Store<RootState>(options);
