<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <headerPage :breadcrumbs="breadcrumbs" :titlePage="titlePage" :button="button"></headerPage>
    </v-container>
  </div>
</template>

<script>
	import headerPage from "../../components/headerPage";

	export default {
		components: {
			headerPage,
		},
		data() {
			return {
				button: {
					title: 'Добавить',
					icon: 'mdi-plus',
					link: '/servers/add',
				},
				titlePage: 'Список серверов',
				breadcrumbs: [
					{
						text: 'Главная страница',
						disabled: false,
						to: '/',
					},
					{
						text: 'Список серверов',
						disabled: true,
					},
				],
			};
		},
	};
</script>
