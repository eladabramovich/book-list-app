import { mount, RouterLinkStub } from '@vue/test-utils';
import BooksList from '@/components/Books/BooksList/BooksList.vue';
import BooksListItem from '@/components/Books/BooksListItem/BooksListItem.vue';

describe('BooksList.vue', () => {
  it('Should render book list item', () => {
    const wrapper = mount(BooksList, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        books: [
          {
            _id: '1',
            title: 'Moby Dick',
            images: {
              small: 'http://localhost:5000/images/Moby_Dick_96x132.jpg',
              large: 'http://localhost:5000/images/Moby_Dick_255x387.jpg',
            },
            score: 0.0,
          },
        ],
      },
    });
    const booksListItem = wrapper.findComponent(BooksListItem);
    expect(booksListItem.exists()).toBe(true);
  });
});
