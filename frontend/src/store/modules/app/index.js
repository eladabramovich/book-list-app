import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state: () => {
    return {
      drawerOpen: false,
    };
  },
  actions,
  mutations,
  getters,
};
