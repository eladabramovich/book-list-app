import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import AppNavBar from '@/components/App/AppNavBar/AppNavBar.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('AppNavBar.vue', () => {
  it('Should emit the openDrawer event when drawer is close and btn is clicked', async () => {
    const wrapper = mount(AppNavBar, {
      localVue,
      router,
    });

    const el = wrapper.find('div.hamburgerIcon');
    await el.trigger('click');
    expect(wrapper.emitted().openDrawer.length).toBe(1);
  });

  it('Should emit the closeDrawer event when drawer is open and btn is clicked', async () => {
    const wrapper = mount(AppNavBar, {
      localVue,
      router,
      propsData: {
        isDrawerOpen: true,
      },
    });

    const el = wrapper.find('div.hamburgerIcon');
    await el.trigger('click');
    expect(wrapper.emitted().closeDrawer.length).toBe(1);
  });
});
