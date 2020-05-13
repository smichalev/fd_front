<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="#fff"
          text
          dark
          v-on="on"
        >
          <v-img :src="flag__country"></v-img>
          <span class="desktop ml-2">{{ name__country }}</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="change(item.title.toLowerCase())"
        >
          <v-img :src="item.image" class="mr-2"></v-img>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
	export default {
		data: () => ({
			items: [
				{
					title: 'RU',
					image: '/api/images/flags/ru.png',
				},
				{
					title: 'EN',
					image: '/api/images/flags/en.png',
				},
			],
		}),
		computed: {
			flag__country() {
				return '/api/images/flags/' + this.$store.state.lang + '.png';
			},
			name__country() {
				return this.$store.state.lang.toUpperCase();
			},
		},
		methods: {
			change(lang) {
				if (this.$store.state.lang !== lang) {
					this.$axios.post('http://dev.fastdonate.local/api/lang', {
						lang,
					}).then(() => {
						this.$store.commit('changeLang', lang);
					});
				}
			},
		},
		mounted() {
			this.$axios.get('http://dev.fastdonate.local/api/lang').then((data) => {
				this.$store.commit('changeLang', data.data.lang);
			});
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
