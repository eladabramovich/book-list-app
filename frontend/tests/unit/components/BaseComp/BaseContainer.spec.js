import { mount } from '@vue/test-utils';
import BaseContainer from '@/components/Base/BaseContainer/BaseContainer.vue';

describe('BaseContainer.vue', () => {
  it('Should render the content', () => {
    const wrapper = mount(BaseContainer, {
      slots: {
        default: 'Hello World',
      },
    });

    expect(wrapper.text()).toBe('Hello World');
  });
});
