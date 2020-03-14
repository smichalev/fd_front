<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div v-if="mod.status === 'success'">
        <div class="d-flex justify-space-between" style="align-items: center">
          <div class="d-flex" style="align-items: center">
            <div class="title">Скрипт {{ mod.mod.title }}</div>
          </div>
        </div>
        <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
        <v-card class="mx-auto"
                outlined>
			<v-card-text>
	            <div v-if="mod.mod.active">
	            	<v-card-title>{{ mod.mod.title }}</v-card-title>
					<v-card-text>Version {{ mod.mod.version }}</v-card-text>
					<v-card-text>Price: {{ mod.mod.price/100*(100-mod.mod.discount) }} ({{ mod.mod.price }} -{{ mod.mod.discount }}%)</v-card-text>
					<v-card-text>Desc: {{ mod.mod.description }}</v-card-text>
					<v-card-text>Updated: {{ new Date(mod.mod.updatedAt).toString() }}</v-card-text>


					<v-card-text>Author: {{ mod.mod.Creator.login }}
						<v-avatar size="40" class="mr-2 justify-center">
	            <img
	              :src="mod.mod.Creator.avatar"
	            >
	          </v-avatar>
          </v-card-text>
		        </div>

	            <div v-if="!mod.mod.active">
					Мод неактивен
	            </div>
				{{ mod }}
			</v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
	export default {
		async asyncData({$axios, route, params}) {
			let mod, breadcrumbs;
			try {
				mod = await $axios.$get(`http://dev.fastdonate.local/api/mod/${ params.id }`);
			}
			catch (e) {
				mod = {status: 'error'};
			}
			breadcrumbs = [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/'
				},
				{
					text: 'Магазин скриптов',
					disabled: false,
					to: './#'
				},
				{
					text: mod.mod.title,
				}
			];
			return {status: 'success', mod, breadcrumbs};
		},
		data: () => ({
			mod: {
				status: 'wait',
				mod: [],
				breadcrumbs: []
			}
		})
	};
</script>
