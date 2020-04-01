export const state = () => ({
  profile: null
});

export const mutations = {
  login(state, profile) {
    state.profile = profile;
  },
  logout(state) {
    state.profile = null;
  }
};
