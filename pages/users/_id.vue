<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div v-if="user.status === 'success'">
        <div class="d-flex justify-space-between" style="align-items: center">
          <div class="d-flex" style="align-items: center">
            <div class="title">Пользователь {{ user.user.login }}</div>
          </div>
        </div>
        <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
        <v-card class="mx-auto" outlined>
			<v-card-text>
	            <div v-if="user.user.active">
	            	<v-avatar size="25" class="mr-1"><img :src="user.user.avatar"></v-avatar>
	            	<v-card-title>STEAM ID 64: {{ user.user.steamid }}</v-card-title>
					<v-card-text>Registered at: {{ new Date(user.user.updatedAt).toString() }}</v-card-text>
					<v-card-text>Country: {{ user.user.country }}</v-card-text>
					<v-card-text>Role: {{ user.user.role }}</v-card-text>
					<v-card-text>Steam Profile: <a :href="'https://steamcommunity.com/profiles/'+user.user.steamid" target="_blank">https://steamcommunity.com/profiles/{{ user.user.steamid }}</a></v-card-text>
		        </div>

	            <div v-if="!user.user.active">
					Пользователь неактивен
	            </div>
				{{ user }}
			</v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
	export default {
		async asyncData({$axios, route, params}) {
			let user, breadcrumbs;
			try {
				user = await $axios.$get(`http://dev.fastdonate.local/api/users/${ params.id }`);
			}
			catch (e) {
				user = {status: 'error'};
			}
			breadcrumbs = [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/'
				},
				{
					text: 'Пользователи',
					disabled: true,
					to: './#'
				},
				{
					text: user.user.login,
				}
			];
			return {status: 'success', user, breadcrumbs};
		},
		data: () => ({
			user: {
				status: 'wait',
				user: [],
				breadcrumbs: []
			}
		})
	};
</script>