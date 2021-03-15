import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import VueRouter from 'vue-router';
// import moduleName from 'vue-router/dist/vue-router'

import AppDrawer from '@/components/App/AppDrawer/AppDrawer.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe.skip('AppDrawer.vue', () => {
  it('Should emit close event when link is clicked', async () => {
    const wrapper = mount(AppDrawer, {
      localVue,
      router,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    const mockMethod = jest.spyOn(AppDrawer.methods, 'closeDrawer');
    console.log(AppDrawer.methods);

    const el = wrapper.findComponent(RouterLinkStub);
    await el.trigger('click');
    await wrapper.vm.$nextTick();
    console.log(el);
    console.log(wrapper.emitted());
    expect(mockMethod).toHaveBeenCalled();
  });
});
