export default {
  setAppDrawer(state, payload) {
    state.drawerOpen = payload;
  },
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.username = payload.username;
  },
};
