import Vue from 'vue';
import Vuex from 'vuex';

import appModule from './modules/app/index';
import booksModule from './modules/books/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appModule,
    books: booksModule,
  },
  state: {},
  mutations: {},
  actions: {},
});
