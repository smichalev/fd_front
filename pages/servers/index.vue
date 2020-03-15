<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex flex-column">
          <div class="title">Список серверов</div>
          <v-breadcrumbs :items="items" small class="mx-0 my-0 px-0 pt-2 pb-0"></v-breadcrumbs>
        </div>
        <div>
          <v-btn elevation="0" color="success" @click="$router.push({path: '/servers/add'})">
            <v-icon>mdi-plus</v-icon>
            Добавить
          </v-btn>
        </div>
      </div>
      <div class="panel panel-primary" v-if="servers.status === 'success' && servers.servers.length">
        <div class="list-group row">
          <div class="list-group-item col-sm-6 col-xs-12" v-for="mod in servers.servers">
            <serverCardBlock :data="mod"></serverCardBlock>
          </div>
        </div>
      </div>
      <div v-if="servers.status === 'success'">
        <v-card v-if="servers.pages === 0 && !servers.servers.length" class="mx-auto" outlined>
          <v-card-title>
            Пока еще нет записей
          </v-card-title>
          <v-card-text>
            Вы можете стать первым в истории и выложить запись сюда!
          </v-card-text>
        </v-card>

        <v-card v-if="servers.page > servers.pages && !servers.servers.length">
          <v-card-title>
            Страница не найдена
          </v-card-title>
          <v-card-text>
            Такой страницы пока нет, но в будущем, возможно, она появится.
          </v-card-text>
        </v-card>
        <div v-if="servers.pages >1 && servers.servers.length" class="text-center">
          <div v-if="!$router.history.current.query.page">
            <v-pagination @input="onPageChange" v-model="page" :length="servers.pages"></v-pagination>
          </div>
          <div v-else>
            <v-pagination @input="onPageChange" v-model="servers.page" :length="servers.pages"></v-pagination>
          </div>
        </div>
      </div>
      <v-card v-if="servers.status === 'error'">
        <v-card-title>
          Ошибка
        </v-card-title>
        <v-card-text>
          Значением номера страницы может быть только число.
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	import serverCardBlock from '~/components/servers/serverCard';

	export default {
		async asyncData({$axios, route}) {
			let servers, page;
			try {
				page = route.query.page ? route.query.page : 0;
				let url = 'http://dev.fastdonate.local/api/servers';
				if (page) {
					url += '?page=' + page;
				}
				servers = await $axios.$get(url);
			}
			catch (e) {
				servers = {status: 'error', e};
        console.log(servers);
			}

			if (page === 0) {
				page = 1;
			}
			return {status: 'success', servers, page};
		},
		components: {
			serverCardBlock
		},
		data: () => ({
			page: 1,
			servers: {
				status: 'wait',
				servers: []
			},
			items: [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/'
				},
				{
					text: 'Список серверов',
				}
			]
		}),
		methods: {
			onPageChange(page) {
				this.$axios.get('http://dev.fastdonate.local/api/servers?page=' + page).then((data) => {
					this.servers = data.data;
					window.history.pushState('', '', 'servers?page=' + page);
				});
			}
		}
	};
</script>
