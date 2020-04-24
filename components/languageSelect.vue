<template>
  <div class="mt-2 d-flex justify-center">
    <div v-for="(lang, i) in language" :key="i">
      <div class="px-2 py-1 d-flex ml-2 lang-block lang-block-active" v-if="lang.active">
        <img
          :src="lang.images" alt="" style="max-height: 30px"><span
        class="ml-1">{{ lang.title }}</span>
      </div>
      <div class="px-2 py-1 d-flex ml-2 lang-block" v-if="!lang.active" @click="changeLang(lang.code)"><img
        :src="lang.images"
        alt="" style="max-height: 30px"><span
        class="ml-1">{{ lang.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				language: [
					{
						title: 'Русский',
						code: 'ru',
						images: '/api/images/flags/ru.png',
						active: false,
					},
					{
						title: 'English',
						code: 'en',
						images: '/api/images/flags/uk.png',
						active: false,
					},
				],
			};
		},
		methods: {
			changeLang(lang) {
				if (lang === 'ru') {
					this.$axios.post('http://dev.fastdonate.local/api/lang', {
						lang,
					}).then(() => {
						this.$store.commit('changeLang', 'ru');
						this.language[0].active = true;
						this.language[1].active = false;
					});
				}
				if (lang === 'en') {
					this.$axios.post('http://dev.fastdonate.local/api/lang', {
						lang,
					}).then(() => {
						this.$store.commit('changeLang', 'en');
						this.language[0].active = false;
						this.language[1].active = true;
					});
				}
			},
		},
		mounted() {
			this.$axios.get('http://dev.fastdonate.local/api/lang').then((data) => {
				this.$store.commit('changeLang', data.data.lang);

				if (data.data.lang === 'ru') {
					this.language[0].active = true;
				}
				if (data.data.lang === 'en') {
					this.language[1].active = true;
				}
			});
		},
	};
</script>

<style scoped lang="scss">
  .lang-block {
    user-select: none;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background: #f1f1f1;
    }
  }

  .lang-block-active {
    background: #0c42ae;

    &:hover {
      background: #0c42ae;
    }

    & > span {
      color: #fff
    }
  }
</style>
