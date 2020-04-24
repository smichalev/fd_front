<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex flex-column">
          <div class="title">Магазин скриптов</div>
          <v-breadcrumbs :items="items" small class="mx-0 my-0 px-0 pt-2 pb-0"></v-breadcrumbs>
        </div>
        <div v-if="isLogin">
          <v-btn elevation="0" color="success" @click="$router.push({path: '/store/add'})">
            <v-icon>mdi-plus</v-icon>
            <span class="desktop">Добавить</span>
          </v-btn>
        </div>
      </div>
      <div>
        <div v-if="!mods.pages && !mods.mods.length" class="mt-3">
          <v-card outlined>
            <v-card-title>Ничего нет</v-card-title>
            <v-card-text>Вы можете добавить запись первым и войти в историю!</v-card-text>
          </v-card>
        </div>
        <div class="panel panel-primary" v-if="mods.mods.length">
          <div class="list-group row">
            <div class="list-group-item col-sm-6 col-xs-12" v-for="mod in mods.mods ">
              <modificationBlock :data="mod"></modificationBlock>
            </div>
          </div>
        </div>

        <div v-if="mods.pages >1 && mods.mods.length" class="text-center">
          <div v-if="!$router.history.current.query.page">
            <v-pagination @input="onPageChange" v-model="mods.page" :length="mods.pages"></v-pagination>
          </div>
          <div v-else>
            <v-pagination @input="onPageChange" v-model="mods.page" :length="mods.pages"></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
	import modificationBlock from '~/components/modification/modification';

	export default {
		async asyncData({$axios, route, error}) {
			let mods, page;
			try {
				page = route.query.page ? route.query.page : 0;
				let url = 'http://dev.fastdonate.local/api/mod';
				if (page) {
					url += '?page=' + page;
				}
				mods = await $axios.$get(url);
			}
			catch (e) {
				error({statusCode: e.response.status, message: e.response.data});
			}

			if (page === 0) {
				page = 1;
			}
			return {mods, page};
		},
		components: {
			modificationBlock,
		},
		data: () => ({
			page: 1,
			mods: [],
			items: [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/',
				},
				{
					text: 'Магазин скриптов',
				},
			],
		}),
		computed: {
			isLogin() {
				return this.$store.state.profile ? true : false;
			},
		},
		methods: {
			onPageChange(page) {
				this.$axios.get('http://dev.fastdonate.local/api/mod?page=' + page).then((data) => {
					this.mods = data.data;
					window.history.pushState('', '', 'store?page=' + page);
				});
			},
		},
	};
</script>

<style scoped>
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
