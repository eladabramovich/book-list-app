import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import BaseContainer from './components/Base/BaseContainer/BaseContainer.vue';

Vue.config.productionTip = false;

Vue.component('BaseContainer', BaseContainer);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
