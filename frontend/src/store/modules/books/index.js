import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: true,
  state: () => {
    return {
      books: [],
      selectedBook: null,
      bookReviews: null,
    };
  },
  actions,
  mutations,
  getters,
};
