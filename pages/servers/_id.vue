<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div v-if="server.status === 'success'">
        <div class="d-flex justify-space-between" style="align-items: center">
          <div class="d-flex" style="align-items: center">
            <div class="title">Сервер {{ server.server.host }}:{{ server.server.port }}</div>
          </div>
        </div>
        <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
        <v-card class="mx-auto" outlined>
			<v-card-text>
	            <div v-if="server.server.active">
			        <div class="d-flex" style="align-items: center; cursor: pointer;" @click="$router.push('/users/'+ server.server.Creator.id)">
			          <v-avatar size="25" class="mr-1"><img :src="server.server.Creator.avatar"></v-avatar>
			          <div class="font-weight-medium">{{ server.server.Creator.login }}</div>
			        </div>
					<v-card-text>GAME: {{ server.server.game }}</v-card-text>
					<v-card-text>MODE: {{ server.server.mod }}</v-card-text>
					<v-card-text>Updated: {{ new Date(server.server.updatedAt).toString() }}</v-card-text>

		          <v-btn elevation="0" color="default" @click="$router.push({path: '/myservers/'+server.server.id})">
		            <v-icon>mdi-wrench</v-icon>
		            Редактировать
		          </v-btn>
		        </div>
	            <div v-if="!server.server.active">
					Сервер неактивен
	            </div>
				{{ server }}
			</v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
	export default {
		async asyncData({$axios, route, params}) {
			let server, breadcrumbs;
			try {
				server = await $axios.$get(`http://dev.fastdonate.local/api/servers/${ params.id }`);
			}
			catch (e) {
				server = {status: 'error'};
			}
			breadcrumbs = [
				{
					text: 'Главная страница',
					to: '/'
				},
				{
					text: 'Список серверов',
					to: './#'
				},
				{
					text: server.server.host,
				}
			];
			return {status: 'success', server, breadcrumbs};
		},
		data: () => ({
			server: {
				status: 'wait',
				server: [],
				breadcrumbs: []
			}
		})
	};
</script>