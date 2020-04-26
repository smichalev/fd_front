<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <headerPage :breadcrumbs="breadcrumbs" :titlePage="titlePage"></headerPage>
      <v-card outlined class="mt-3">
        <v-card-text>
          For server
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	import headerPage from "../../components/headerPage";

	let language = {
		ru: {
			serverList: 'Для сервера',
			homePage: 'Главная страница',
		},
		en: {
			serverList: 'For server',
			homePage: 'Home page',
		},
	};
	export default {
		components: {
			headerPage,
		},
		data() {
			return {
				titlePage: language[this.$store.state.lang].serverList,
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
			lang(selectedLang) {
				this.titlePage = language[selectedLang].serverList;
				this.breadcrumbs[0].text = language[selectedLang].homePage;
				this.breadcrumbs[1].text = language[selectedLang].serverList;
			},
		},
		computed: {
			lang() {
				return this.$store.state.lang;
			},
		},
	};
</script>
