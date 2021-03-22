import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import AuthPage from '@/pages/AuthPage/AuthPage.vue';
import BaseContainer from '@/components/Base/BaseContainer/BaseContainer.vue';
import AppSpinner from '@/components/App/AppSpinner/AppSpinner.vue';
import ServerErrorMessage from '@/components/UI/ServerErrorMessage/ServerErrorMessage.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

localVue.use(Vuex);
localVue.use(Vuelidate);

describe('AuthPage.vue', () => {
  let wrapper;
  let store;
  let actions;
  beforeEach(() => {
    actions = {
      authUser: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });
    wrapper = mount(AuthPage, {
      localVue,
      router,
      stubs: {
        BaseContainer,
      },
    });
  });

  it('Should send data to backend', async () => {
    wrapper = mount(AuthPage, {
      localVue,
      router,
      store,
      stubs: {
        BaseContainer,
        AppSpinner,
        ServerErrorMessage,
      },

      data() {
        return {
          username: 'test55@test.com',
          email: 'test55@test.com',
          password: '123456',
          confirm_password: '123456',
        };
      },
    });

    const el = wrapper.find('form');
    await el.trigger('submit.prevent');
    expect(actions.authUser).toHaveBeenCalled();
  });

  it('Should submit the form when btn is clicked', async () => {
    const mockMethod = jest.spyOn(AuthPage.methods, 'submitForm');
    wrapper = mount(AuthPage, {
      localVue,
      router,
      stubs: {
        BaseContainer,
      },
    });

    const el = wrapper.find('form');
    await el.trigger('submit.prevent');
    expect(mockMethod).toHaveBeenCalled();
  });

  it('Should set required error message to all fields', async () => {
    wrapper.vm.setErrorMessages();
    expect(wrapper.vm.$data.errors.username).toBe('This field is required');
    expect(wrapper.vm.$data.errors.email).toBe('This field is required');
    expect(wrapper.vm.$data.errors.password).toBe('This field is required');
    expect(wrapper.vm.$data.errors.confirm_password).toBe(
      'This field is required'
    );
  });

  it('Should toggle login QS param', () => {
    wrapper.vm.switchMode();
    expect(wrapper.vm.$route.query).toHaveProperty('login');
    wrapper.vm.switchMode();
    expect(wrapper.vm.$route.query).not.toHaveProperty('login');
  });
});
