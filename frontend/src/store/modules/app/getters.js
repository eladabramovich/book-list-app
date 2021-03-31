export default {
  isAppDrawerOpen(state) {
    return state.drawerOpen;
  },
  isUserLoggedin(state) {
    return state.token !== null;
  },
  token(state) {
    return state.token;
  },
};
