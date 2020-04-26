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
    if (lang === 'ru' || lang === 'en') {
      state.lang = lang;
    }
  },
  notification(state, count) {
    state.notification = count;
  },
};
