<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <headerPage :breadcrumbs="breadcrumbs" :titlePage="titlePage" :button="button"></headerPage>
      <div class="d-flex" style="justify-content: flex-end">
        <v-checkbox v-model="filters__show" label="Показывать фильтры" class="my-0" dense></v-checkbox>
      </div>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="2"
          class="line"
          v-if="filters__show"
        >
          <v-card outlined class="mr-2">
            <div style="background: #0c42ae; color: #fff; font-size: 20px" class="px-4 py-1">
              {{ $store.state.lang == 'ru' ? 'Фильтр поиска' : 'Search filter' }}
            </div>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $store.state.lang === 'ru' ? 'Статус сервера' : 'Status server'}}
                </v-list-item-title>
                <v-list-item-subtitle style="padding-left: 5px;">
                  <v-radio-group dense>
                    <v-radio
                      v-for="n in selects.online"
                      :key="n.value"
                      :label="n.text"
                      :value="n.value"
                    ></v-radio>
                  </v-radio-group>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-0 py-0"></v-divider>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $store.state.lang === 'ru' ? 'Игра' : 'Game'}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-select
                    v-model="game"
                    :items="selects.game"
                    :item-text="selects.game.text"
                    :item-value="selects.game.value"
                    outlined
                    dense
                    class="mt-2"
                  ></v-select>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="my-0 py-0"></v-divider>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $store.state.lang === 'ru' ? 'Свободные слоты' : 'Free slots'}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-list-item-subtitle style="padding-left: 5px;">
                    <v-radio-group dense class="my-0">
                      <v-radio
                        v-for="n in selects.free__slots"
                        :key="n.value"
                        :label="n.text"
                        :value="n.value"
                      ></v-radio>
                    </v-radio-group>
                  </v-list-item-subtitle>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-0 mb-2"></v-divider>
            <div class="mx-2 mb-2">
              <v-btn elevation="0" block color="success">Поиск</v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          :sm="widthblock"
        >
          <v-card outlined class="ml-2">
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
          <div v-if="servers.pages >1 && servers.servers.length" class="text-center mt-1">
            <div v-if="!$router.history.current.query.page">
              <v-pagination @input="onPageChange" v-model="servers.page" :length="servers.pages"></v-pagination>
            </div>
            <div v-else>
              <v-pagination @input="onPageChange" v-model="servers.page" :length="servers.pages"></v-pagination>
            </div>
          </div>
        </v-col>
      </v-row>
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
				filters__show: true,
				game: null,
				selects: {
					online: [
						{
							text: 'Не имеет значения',
							value: 0,
						},
						{
							text: 'Да',
							value: 1,
						},
						{
							text: 'Нет',
							value: 2,
						},
					],
					free__slots: [
						{
							text: 'Не имеет значения',
							value: 0,
						},
						{
							text: 'Да',
							value: 1,
						},
						{
							text: 'Нет',
							value: 2,
						},
					],
					game: [
						{
							text: 'Garry’s Mod',
							value: 'garrysmod',
						},
						{
							text: 'DayZ',
							value: 'dayz',
						},
					],
				},
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
			widthblock() {
				return this.filters__show ? 10 : 12;
			},
		},
	};
</script>

<style lang="scss" scoped>
  .v-messages.theme--light {
    display: none;
  }

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
