<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div v-if="mod.status === 'success'">
        <div class="d-flex justify-space-between" style="align-items: center">
          <div class="d-flex" style="align-items: center">
            <div class="title">{{ mod.mod.title }}</div>
          </div>
        </div>
        <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
        <v-card class="mx-auto"
                outlined>
          <v-card-text>
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
					to: '/store/'
				},
				{
					text: mod.mod.title,
					disabled: true,
					to: `/store/${ params.id }`
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
