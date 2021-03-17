import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import Vuelidate from 'vuelidate';

import BaseContainer from './components/Base/BaseContainer/BaseContainer.vue';
import AppSpinner from './components/App/AppSpinner/AppSpinner.vue';
import ServerErrorMessage from './components/UI/ServerErrorMessage/ServerErrorMessage.vue';

Vue.config.productionTip = false;

Vue.component('BaseContainer', BaseContainer);
Vue.component('AppSpinner', AppSpinner);
Vue.component('ServerErrorMessage', ServerErrorMessage);

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
