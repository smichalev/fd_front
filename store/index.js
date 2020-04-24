export const state = () => ({
  profile: null,
  lang: 'en',
});

export const mutations = {
  login(state, profile) {
    state.profile = profile;
  },
  logout(state, router) {
    state.profile = null;
  },
  changeLang(state, lang) {
    state.lang = lang;
  },
};
