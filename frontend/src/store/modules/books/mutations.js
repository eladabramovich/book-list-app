export default {
  setBookDetails(state, payload) {
    state.selectedBook = payload;
  },
  setBookReviews(state, payload) {
    state.bookReviews = payload.data;
  },
};
