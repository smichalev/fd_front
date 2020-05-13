<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <headerPage :breadcrumbs="breadcrumbs" :titlePage="titlePage" :button="button"></headerPage>
      <v-card outlined class="mt-3">
        <v-simple-table v-if="servers.servers.length">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">{{ $store.state.lang === 'ru' ? 'Название сервера' : 'Name server'}}</th>
              <th class="text-left">{{ $store.state.lang === 'ru' ? 'Игроки' : 'Players'}}</th>
              <th class="text-left">{{ $store.state.lang === 'ru' ? 'Карта' : 'Map'}}</th>
              <th class="text-left">{{ $store.state.lang === 'ru' ? 'Игра' : 'Game'}}</th>
              <th class="text-left"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(server,key) in servers.servers" :key="server.id">
              <td>
                <v-chip label x-small v-if="server.running" color="success">
                  <span class="desktop">Online</span>
                </v-chip>
                <v-chip label x-small v-else color="error">
                  <span class="desktop">Offline</span>
                </v-chip>
              </td>
              <td>{{ server.name }}</td>
              <td>{{server.player}} / {{server.maxplayers}}</td>
              <td>{{server.map}}</td>
              <td>{{server.gamename}}</td>
              <td>
                <v-btn elevation="0" color="success" @click="$router.push(`/servers/${server.id}`)">Перейти</v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div v-else>
          <v-card-title>Ничего нет</v-card-title>
          <v-card-text>Вы можете добавить сервер первым и войти в историю!</v-card-text>
        </div>
      </v-card>
      <div v-if="servers.pages >1 && servers.servers.length" class="text-center">
        <div v-if="!$router.history.current.query.page">
          <v-pagination @input="onPageChange" v-model="servers.page" :length="servers.pages"></v-pagination>
        </div>
        <div v-else>
          <v-pagination @input="onPageChange" v-model="servers.page" :length="servers.pages"></v-pagination>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
	import headerPage from "../../components/headerPage";

	let language = {
		ru: {
			add: 'Добавить',
			serverList: 'Список серверов',
			homePage: 'Главная страница',
		},
		en: {
			add: 'Add',
			serverList: 'Server list',
			homePage: 'Home page',
		},
	};
	export default {
		async asyncData({$axios, route, error}) {
			let servers, page;
			try {
				page = route.query.page ? route.query.page : 0;
				let url = 'http://dev.fastdonate.local/api/server';
				if (page) {
					url += '?page=' + page;
				}
				servers = await $axios.$get(url);
			}
			catch (e) {
				error({statusCode: e.response.status, message: e.response.data});
			}

			if (page === 0) {
				page = 1;
			}
			return {servers, page};
		},
		components: {
			headerPage,
		},
		data() {
			return {
				button: {
					title: language[this.$store.state.lang].add,
					icon: 'mdi-plus',
					link: '/servers/add',
				},
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
		methods: {
			onPageChange(page) {
				this.$axios.get('http://dev.fastdonate.local/api/server?page=' + page).then((data) => {
					this.servers = data.data;
					window.history.pushState('', '', 'servers?page=' + page);
				});
			},
		},
		watch: {
			lang(selectedLang) {
				this.button.title = language[selectedLang].add;
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

<style lang="scss" scoped>
  @media (max-width: 1264px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }

  @media (min-width: 1264px) {
    .desktop {
      display: block;
    }

    .mobile {
      display: none;
    }
  }
</style>
