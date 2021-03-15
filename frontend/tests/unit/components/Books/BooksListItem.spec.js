import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import BooksListItem from '@/components/Books/BooksListItem/BooksListItem.vue';

describe('BooksListItem.vue', () => {
  it('Should render', () => {
    const wrapper = shallowMount(BooksListItem, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        id: '1',
        title: 'Moby Dick',
        images: {
          small: 'http://localhost:5000/images/Moby_Dick_96x132.jpg',
          large: 'http://localhost:5000/images/Moby_Dick_255x387.jpg',
        },
        score: 0.0,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
