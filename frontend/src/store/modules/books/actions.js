import axios from 'axios';

export default {
  async fetchBookDetails({ commit }, payload) {
    const { data } = await axios.get(`/api/books/${payload}`);
    commit('setBookDetails', data);
  },
};
