export default {
  isAppDrawerOpen(state) {
    return state.drawerOpen;
  },
  isUserLoggedin(state) {
    return state.token !== null;
  },
};
