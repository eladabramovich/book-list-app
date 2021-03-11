import Vue from 'vue';
import Vuex from 'vuex';

import appModule from './modules/app/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appModule,
  },
  state: {},
  mutations: {},
  actions: {},
});
