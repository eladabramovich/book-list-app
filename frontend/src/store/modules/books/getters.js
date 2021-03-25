export default {
  selectedBook(state) {
    return state.selectedBook;
  },
  bookReviews(state) {
    return state.bookReviews.sort((a, b) => {
      let timeA = new Date(a.createdAt).getTime();
      let timeB = new Date(b.createdAt).getTime();

      return timeB - timeA;
    });
  },
};
