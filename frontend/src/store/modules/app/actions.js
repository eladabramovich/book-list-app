import axios from 'axios';

const checkTokenExpiry = (expiryDate) => {
  const now = Math.floor(Date.now());
  if (expiryDate - now <= 0) {
    return true;
  } else {
    return false;
  }
};

export default {
  toggleAppDrawer({ commit }, payload) {
    commit('setAppDrawer', payload);
  },
  async authUser({ commit }, payload) {
    const reqUrl =
      payload.action === 'login' ? '/api/users/login' : '/api/users/';

    try {
      const { data } = await axios.post(reqUrl, payload.userData);

      commit('setUser', {
        userId: data._id,
        token: data.token,
        username: data.username,
      });

      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async logout({ commit }) {
    localStorage.removeItem('user');
    commit('setUser', {
      userId: null,
      token: null,
      username: null,
    });
  },
  shouldLogout({ commit, dispatch }) {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      if (checkTokenExpiry(userData.tokenExpiry * 1000)) {
        dispatch('logout');
      } else {
        commit('setUser', {
          userId: userData._id,
          token: userData.token,
          username: userData.username,
        });
      }
    }
  },
};
