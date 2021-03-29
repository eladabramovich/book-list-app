export default {
  setBookDetails(state, payload) {
    state.selectedBook = payload;
  },
  setBookReviews(state, payload) {
    state.bookReviews = payload.data;
  },
  addBookReview(state, payload) {
    state.bookReviews = [...state.bookReviews, payload];
  },
};
