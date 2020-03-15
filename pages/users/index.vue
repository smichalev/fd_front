<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex flex-column">
          <div class="title">Юзеры</div>
          <v-breadcrumbs :items="items" small class="mx-0 my-0 px-0 pt-2 pb-0"></v-breadcrumbs>
        </div>
        <div>
          <v-btn elevation="0" color="success" @click="$router.push({path: '/store/add'})">
            <v-icon>mdi-plus</v-icon>
            Добавить
          </v-btn>
        </div>
      </div>
      <div class="panel panel-primary" v-if="mods.status === 'success' && mods.mods.length">
        <div class="list-group row">
          <div class="list-group-item col-sm-6 col-xs-12" v-for="mod in mods.mods">
            <modificationBlock :data="mod"></modificationBlock>
          </div>
        </div>
      </div>
      <div v-if="mods.status === 'success'">
        <v-card v-if="mods.pages === 0 && !mods.mods.length" class="mx-auto" outlined>
          <v-card-title>
            Пока еще нет записей
          </v-card-title>
          <v-card-text>
            Вы можете стать первым в истории и выложить запись сюда!
          </v-card-text>
        </v-card>

        <v-card v-if="mods.page > mods.pages && !mods.mods.length">
          <v-card-title>
            Страница не найдена
          </v-card-title>
          <v-card-text>
            Такой страницы пока нет, но в будущем, возможно, она появится.
          </v-card-text>
        </v-card>
        <div v-if="mods.pages >1 && mods.mods.length" class="text-center">
          <div v-if="!$router.history.current.query.page">
            <v-pagination @input="onPageChange"
                          v-model="page"
                          :length="mods.pages"></v-pagination>
          </div>
          <div v-else>
            <v-pagination @input="onPageChange"
                          v-model="mods.page"
                          :length="mods.pages"></v-pagination>
          </div>
        </div>
      </div>
      <v-card v-if="mods.status === 'error'">
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
	import modificationBlock from '~/components/modification/modification';

	export default {
		async asyncData({$axios, route}) {
			let mods, page;
			try {
				page = route.query.page ? route.query.page : 0;
				let url = 'http://dev.fastdonate.local/api/users';
				if (page) {
					url += '?page=' + page;
				}
				mods = await $axios.$get(url);
			}
			catch (e) {
				mods = {status: 'error'};
			}

			if (page === 0) {
				page = 1;
			}
			return {status: 'success', mods, page};
		},
		components: {
			modificationBlock
		},
		data: () => ({
			page: 1,
			mods: {
				status: 'wait',
				mods: []
			},
			items: [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/'
				},
				{
					text: 'Магазин скриптов',
				}
			]
		}),
		methods: {
			onPageChange(page) {
				this.$axios.get('http://dev.fastdonate.local/api/mod?page=' + page).then((data) => {
					this.mods = data.data;
					window.history.pushState('', '', 'store?page=' + page);
				});
			}
		}
	};
</script>
