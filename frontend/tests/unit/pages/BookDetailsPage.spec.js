import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import BookDetailsPage from '@/pages/BookDetailsPage/BookDetailsPage.vue';
import BaseContainer from '@/components/Base/BaseContainer/BaseContainer.vue';
import AppSpinner from '@/components/App/AppSpinner/AppSpinner.vue';
import ServerErrorMessage from '@/components/UI/ServerErrorMessage/ServerErrorMessage.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.use(VueRouter);
const router = new VueRouter();

describe('BookDetailsPage.vue', () => {
  let store;
  let actions;
  beforeEach(() => {
    actions = {
      'books/fetchBookDetails': jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });
  });

  it('Should fetch data when created', async () => {
    const wrapper = mount(BookDetailsPage, {
      localVue,
      router,
      store,
      stubs: {
        BaseContainer,
        AppSpinner,
        ServerErrorMessage,
      },
    });

    expect(actions['books/fetchBookDetails']).toHaveBeenCalled();
  });
});
