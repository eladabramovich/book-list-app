import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import AppDrawer from '@/components/App/AppDrawer/AppDrawer.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

localVue.use(Vuex);

describe('AppDrawer.vue', () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      isUserLoggedin: () => true,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('Should emit close event when link is clicked', async () => {
    const wrapper = mount(AppDrawer, {
      localVue,
      router,
      store,
    });

    const el = wrapper.find('span');
    await el.trigger('click');
    expect(wrapper.emitted().close.length).toBe(1);
  });
});
