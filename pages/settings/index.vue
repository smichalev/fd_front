<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <headerPage :breadcrumbs="breadcrumbs" :titlePage="titlePage"></headerPage>
      <v-card outlined class="mt-3">
        <div style="background: #0c42ae; color: #fff; font-size: 20px" class="px-4 py-2">
          {{ textSettingsNotify }}
        </div>
        <div>
          <div class="d-flex px-4" style="max-width: 500px; align-items: center; justify-content: space-between">
            <div class="label">{{ textAUTHORIZATION }}</div>
            <v-switch
              color="warning"
              v-model="AUTHORIZATION"
            ></v-switch>
          </div>
          <v-divider class="my-0"></v-divider>
          <div class="d-flex px-4" style="max-width: 500px; align-items: center; justify-content: space-between">
            <div class="label">{{ textLOGOUT }}</div>
            <v-switch
              color="warning"
              v-model="LOGOUT"
            ></v-switch>
          </div>
          <v-divider class="my-0"></v-divider>
          <div class="d-flex px-4" style="max-width: 500px; align-items: center; justify-content: space-between">
            <div class="label">{{ textPOST_MOD }}</div>
            <v-switch
              color="warning"
              v-model="POST_MOD"
            ></v-switch>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	import headerPage from "../../components/headerPage";

	let language = {
		ru: {
			AUTHORIZATION: 'Оповещения о входе в аккаунт',
			POST_MOD: 'Оповещения о создании новой модификации',
			LOGOUT: 'Оповещения о выходе из аккаунта',
			serverList: 'Настройки',
			homePage: 'Главная страница',
			settingsNotify: 'Настройки оповещений',
		},
		en: {
			AUTHORIZATION: 'Notifications of an authorization',
			POST_MOD: 'Notifications of a new modification',
			LOGOUT: 'Notifications of a logout',
			serverList: 'Settings',
			homePage: 'Home page',
			settingsNotify: 'Settings notify',
		},
	};
	export default {
		components: {
			headerPage,
		},
		async asyncData({$axios, error, store}) {
			let result = await $axios.$get('http://dev.fastdonate.local/api/login');
			if (!result.result) {
				error({
					statusCode: 401,
					message: store.state.lang === 'ru' ? 'Вы не авторизованны' : 'Your not authorized',
				});
			}
		},
		data() {
			return {
				AUTHORIZATION: true,
				POST_MOD: true,
				LOGOUT: true,
				textAUTHORIZATION: language[this.$store.state.lang].AUTHORIZATION,
				textPOST_MOD: language[this.$store.state.lang].POST_MOD,
				textLOGOUT: language[this.$store.state.lang].LOGOUT,
				titlePage: language[this.$store.state.lang].serverList,
				textSettingsNotify: language[this.$store.state.lang].settingsNotify,
				breadcrumbs: [
					{
						text: language[this.$store.state.lang].homePage,
						disabled: false,
						to: '/',
					},
					{
						text: language[this.$store.state.lang].serverList,
						disabled: true,
					},
				],
			};
		},
		watch: {
			profile(newValue) {
				if (newValue === null) {
					this.$router.push('/');
				}
			},
			lang(selectedLang) {
				this.titlePage = language[selectedLang].serverList;
				this.textAUTHORIZATION = language[selectedLang].AUTHORIZATION;
				this.textLOGOUT = language[selectedLang].LOGOUT;
				this.textPOST_MOD = language[selectedLang].POST_MOD;
				this.breadcrumbs[0].text = language[selectedLang].homePage;
				this.breadcrumbs[1].text = language[selectedLang].serverList;
				this.textSettingsNotify = language[selectedLang].settingsNotify;
			},
			AUTHORIZATION(newValue) {
				console.log('AUTHORIZATION' + newValue);
			},
			POST_MOD(newValue) {
				console.log('POST_MOD' + newValue);
			},
			LOGOUT(newValue) {
				console.log('LOGOUT' + newValue);
			},
		},
		computed: {

			profile() {
				return this.$store.state.profile;
			},
			lang() {
				return this.$store.state.lang;
			},
		},
	};
</script>

<style scoped>
  .label {
    font-size: 17px;
  }
</style>
