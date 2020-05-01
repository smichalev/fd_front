<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <headerPage :breadcrumbs="breadcrumbs" :titlePage="titlePage"></headerPage>
      <v-card class="mx-auto my-3"
              outlined :loading="loading" :disabled="disabled">
        <v-card-text class="pb-2">
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="$moment(activity.timestamp).lang($store.state.lang).fromNow()">
                {{activity.content}}
                <div v-if="activity.link" class="d-flex" style="align-items: center">
                  <v-btn small elevation="0" @click="$router.push(activity.link.href)" dark
                         :color="activity.link.color">
                    {{ activity.link.title }}
                  </v-btn>
                </div>
              </el-timeline-item>
            </el-timeline>
            <div v-if="loading && $store.state.lang === 'ru'">Загрузка...</div>
            <div v-if="loading && $store.state.lang === 'en'">Loading...</div>
          </div>
        </v-card-text>
        <v-btn elevation="0" @click="loadMore" block v-if="!loading && !disabled && viewCount < count">
          <span v-if="$store.state.lang === 'ru'">Загрузить еще</span>
          <span v-if="$store.state.lang === 'en'">More</span>
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	import headerPage from "../../components/headerPage";

	export default {
		async asyncData({$axios, error, store}) {
			let result = await $axios.$get('http://dev.fastdonate.local/api/login');
			if (!result.result) {
				let lang = await $axios.$get('http://dev.fastdonate.local/api/lang');
				error({
					statusCode: 401,
					message: lang.lang === 'ru' ? 'Вы не авторизованны' : 'Your not authorized',
				});
			}
		},
		components: {
			headerPage,
		},
		watch: {
			lang(selectedLang) {
				this.titlePage = selectedLang === 'ru' ? 'Список событий' : 'Events list';
				this.breadcrumbs[0].text = selectedLang === 'ru' ? 'Главная страница' : 'Home page';
				this.breadcrumbs[1].text = selectedLang === 'ru' ? 'Список событий' : 'Events list';
				let newArray = [];
				this.activities.forEach((item) => {
					if (item.type === 'POST_MOD') {
						item.content = selectedLang === 'ru'
						               ? 'Вы добавили новую модификацию'
						               : 'You added new modification';
					}
					if (item.type === 'AUTHORIZATION') {
						item.content = selectedLang === 'ru'
						               ? 'Авторизация'
						               : 'Authorization';
					}
					if (item.type === 'LOGOUT') {
						item.content = selectedLang === 'ru'
						               ? 'Выход из аккаунта'
						               : 'Logout';
					}
					if (item.type === 'RECRUIT') {
						item.content = selectedLang === 'ru'
						               ? `Добро пожаловать! Вы впервые авторизовались на нашем ресурсе. Если у Вас будут какие то вопросы, то они доступны по ссылке снизу`
						               : `Welcome! You first logged in to our resource. If you have any questions, they are available at the link below`;
					}
					newArray.push(item);
				});
				this.activities = newArray;
			},
		},
		computed: {
			lang() {
				return this.$store.state.lang;
			},
		},
		methods: {
			load() {
				this.loading = true;
				this.disabled = true;
				this.$axios.get('http://dev.fastdonate.local/api/events?page=' + this.page).then((data) => {
					    if (data.data.events.length) {
						    data.data.events.forEach((item) => {
							    let content, color, timestamp, size, type, link;
							    timestamp = item.createdAt;
							    size = 'large';
							    if (item.type === "RECRUIT") {
								    type = "RECRUIT";
								    content = this.$store.state.lang === 'ru'
								              ? 'Добро пожаловать! Вы впервые авторизовались на нашем ресурсе. Если у Вас будут какие то вопросы, то они доступны по ссылке снизу'
								              : 'Welcome! You first logged in to our resource. If you have any questions, they are available at the link below';
								    color = '#0bbd87';
								    link = {
									    title: 'FAQ',
									    href: '/help',
									    color: '#0bbd87',
								    };
							    }
							    if (item.type === "AUTHORIZATION") {
								    type = "AUTHORIZATION";
								    content = this.$store.state.lang === 'ru' ? 'Авторизация' : 'Authorization';
								    color = '#0bbd87';
							    }
							    if (item.type === "LOGOUT") {
								    type = "LOGOUT";
								    content = this.$store.state.lang === 'ru' ? 'Выход из аккаунта' : 'Logout';
								    color = '#ffc624';
							    }
							    if (item.type === "POST_MOD") {
								    type = "POST_MOD";
								    content = this.$store.state.lang === 'ru'
								              ? 'Вы добавили новую модификацию'
								              : 'You added new modification';
								    color = '#8d0cde';
								    link = {
									    title: item.data.title,
									    href: '/store/' + item.data.id,
									    color: '#8d0cde',
								    };
							    }
							    let obj = {};
							    if (content) {
								    obj.content = content;
							    }
							    if (color) {
								    obj.color = color;
							    }
							    if (timestamp) {
								    obj.timestamp = timestamp;
							    }
							    if (size) {
								    obj.size = size;
							    }
							    if (type) {
								    obj.type = type;
							    }
							    if (link) {
								    obj.link = link;
							    }
							    this.activities.push(obj);
						    });
					    }
					    this.count = data.data.count;
					    this.loading = false;
					    this.disabled = false;
					    this.viewCount = this.viewCount + data.data.events.length;
				    })
				    .then(() => {
					    this.$axios.get('http://dev.fastdonate.local/api/events/count').then((count) => {
						    this.$store.commit('notification', +count.data.count);
					    });
				    })
				    .catch((err) => {
					    this.loading = false;
					    this.$notify({
						    title: 'Ошибка',
						    message: err.response.data.message,
						    type: 'error',
						    position: 'bottom-right',
					    });
				    });
			},
			loadMore() {
				this.page++;
				this.load();
			},
		},
		mounted() {
			this.load();
		},
		data() {
			return {
				loading: true,
				disabled: true,
				count: 0,
				viewCount: 0,
				page: 1,
				titlePage: this.$store.state.lang === 'ru' ? 'Список событий' : 'Events list',
				activities: [],
				breadcrumbs: [
					{
						text: this.$store.state.lang === 'ru' ? 'Главная страница' : 'Home page',
						disabled: false,
						to: '/',
					},
					{
						text: this.$store.state.lang === 'ru' ? 'Список событий' : 'Events list',
						disabled: true,
					},
				],
			};
		},
	};
</script>
