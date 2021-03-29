import axios from 'axios';

export default {
  async fetchBookDetails({ commit }, payload) {
    const { data } = await axios.get(`/api/books/${payload}`);
    commit('setBookDetails', data);
  },
  async fetchBookReviews({ commit }, payload) {
    const { data } = await axios.get(`/api/reviews/${payload}`);
    commit('setBookReviews', data);
  },
  async saveBookReview({ commit }, payload) {
    const user = JSON.parse(localStorage.getItem('user'));
    const reviewData = {
      ...payload,
      userId: user._id,
      username: user.username,
    };
    const { data } = await axios.post(
      `/api/reviews/${payload.bookId}`,
      reviewData
    );

    commit('addBookReview', data);
  },
};
