import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: () => {
    return {
      drawerOpen: false,
      userId: null,
      token: null,
      username: null,
    };
  },
  actions,
  mutations,
  getters,
};
