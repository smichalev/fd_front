<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <headerPage :breadcrumbs="breadcrumbs" :titlePage="titlePage"></headerPage>
      <div class="panel panel-primary mt-3">
        <v-card outlined>
          <div class="profile">
            <div class="avatar">
              <v-avatar size="100">
                <v-img :src="profile.profile.avatar"
                       v-if="profile && profile.profile && profile.profile.avatar"></v-img>
              </v-avatar>
            </div>
            <div class="profileinfo" style="font-size: 18px">
              <div class="d-flex my-1 pb-1" style="justify-content: space-between; border-bottom: 1px dashed #f1f1f1;"
                   v-if="profile && profile.profile &&  profile.profile.login">
                <div class="title">Логин</div>
                <div>{{ profile.profile.login }}</div>
              </div>
              <div class="d-flex my-1 pb-1" style="justify-content: space-between; border-bottom: 1px dashed #f1f1f1"
                   v-if="profile && profile.profile &&  profile.profile.steamid">
                <div class="title">STEAMID</div>
                <div>{{ profile.profile.steamid }}</div>
              </div>
              <div class="d-flex my-1 pb-1" style="justify-content: space-between; border-bottom: 1px dashed #f1f1f1"
                   v-if="profile && profile.profile">
                <div class="title">Баланс</div>
                <div>{{ profile.profile.balance }}</div>
              </div>
              <div class="d-flex my-1 pb-1" style="justify-content: space-between;"
                   v-if="profile && profile.profile &&  profile.profile.role">
                <div class="title">Роль</div>
                <v-chip label dark color="#d82323" small v-if="profile.profile.role === 'ADMIN'">Администратор</v-chip>
                <v-chip label dark color="#9e9e9e" small v-else>Пользователь</v-chip>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
	import headerPage from "../../components/headerPage";

	let language = {
		ru: {
			profile: 'Мой профиль',
			homePage: 'Главная страница',
		},
		en: {
			profile: 'My profile',
			homePage: 'Home page',
		},
	};
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
			else {
				let profile = await $axios.$get('http://dev.fastdonate.local/api/profile');
				return {profile};
			}
		},
		components: {
			headerPage,
		},
		data() {
			return {
				titlePage: language[this.$store.state.lang].profile,
				breadcrumbs: [
					{
						text: language[this.$store.state.lang].homePage,
						disabled: false,
						to: '/',
					},
					{
						text: language[this.$store.state.lang].profile,
						disabled: true,
					},
				],
			};
		},
		watch: {
			lang(selectedLang) {
				this.titlePage = language[selectedLang].profile;
				this.breadcrumbs[0].text = language[selectedLang].homePage;
				this.breadcrumbs[1].text = language[selectedLang].profile;
			},
			profile(value) {
				if (value === null) {
					this.$router.push('/');
				}
			},
		},
		computed: {
			lang() {
				return this.$store.state.lang;
			},
			profile() {
				return this.$store.state.profile;
			},
		},
	};
</script>

<style lang="scss" scoped>
  .name {
    font-weight: bold;
  }

  .avatar {
    display: flex;
    padding-left: 20px;
    align-items: center;

    @media (max-width: 1264px) {
      & {
        display: flex;
        justify-content: center;
        background: #f9f9f9;
        border-bottom: 1px solid #908e8e33;
        padding: 10px;
      }
    }
  }

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

  .profile {
    display: flex;

    @media (max-width: 1264px) {
      & {
        flex-direction: column;
      }
    }

    .profileinfo {
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      width: 100%;
      max-width: 500px;
      padding: 10px 30px;
      @media (max-width: 1264px) {
        & {
          margin-left: 0;
          max-width: none;
          text-align: center;
        }
      }
    }
  }
</style>
