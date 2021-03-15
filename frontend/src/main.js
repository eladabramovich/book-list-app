import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import Vuelidate from 'vuelidate'

import BaseContainer from './components/Base/BaseContainer/BaseContainer.vue';

Vue.config.productionTip = false;

Vue.component('BaseContainer', BaseContainer);

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
