<template>
  <v-app style="background: #f1f1f1">
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <sidebar :isLogin="isLogin"></sidebar>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clippedleft" fixed app dense color="#0c42ae" elevation="0">
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" color="#fff" class="d-lg-none d-xl-none">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <logo></logo>
      <v-spacer/>
      <div v-if="loading">
        <v-progress-circular
          :size="30"
          color="#fff"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else>
        <v-btn v-if="!login" color="#171a21" dark elevation="0" @click="authorization">
          <v-icon>mdi-steam</v-icon>
          <span class="desktop ml-1">Steam login</span>
        </v-btn>
        <div style="display: flex; align-items: center">
          <v-toolbar-items v-if="login" style="height: 48px;">
            <v-btn color="#0c42ae" dark elevation="0" @click="$router.push({path: '/events'})">
              {{ $store.state.notification }}
            </v-btn>
          </v-toolbar-items>

          <v-toolbar-items v-if="login" style="height: 48px;">
            <v-menu offset-y bottom right transition="slide-y-transition">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="#0c42ae" dark elevation="0">
                  <v-avatar size="40" class="justify-center">
                    <img :src="profile.avatar">
                  </v-avatar>
                  <div style="flex-direction: column" class="d-none d-sm-flex ml-1">
                    <div>{{ profile.login }}</div>
                    <div style="font-size: 12px">{{ profile.balance.toFixed(2) }} ₽</div>
                  </div>
                  <v-icon small class="desktop">mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-list>
                <div class="mobile">
                  <v-list-item style="background: #f1f1f1; display: flex; align-items: center">
                    <v-list-item-title style="width: 100%">
                      {{ $store.state.lang === 'ru' ? 'Баланс' : 'Balance' }}:
                      {{ profile.balance.toFixed(2) }} ₽
                    </v-list-item-title>
                  </v-list-item>
                </div>
                <v-divider class="my-0 mobile"></v-divider>
                <v-list-item to="/donate">
                  <v-list-item-title>
                    {{ $store.state.lang === 'ru' ? 'Пополнить' : 'Replenish' }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="'/profile'">
                  <v-list-item-title>
                    {{ $store.state.lang === 'ru' ? 'Профиль' : 'Profile' }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item to="/settings">
                  <v-list-item-title>
                    {{ $store.state.lang === 'ru' ? 'Настройки' : 'Settings' }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="dialog = true">
                  <v-list-item-title>
                    {{ $store.state.lang === 'ru' ? 'Выход' : 'Logout' }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </div>
      </div>
    </v-app-bar>
    <v-content fluid style="width: 100%">
      <nuxt/>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <sidebar :isLogin="isLogin"></sidebar>
    </v-navigation-drawer>
    <v-dialog
      v-model="dialog"
      max-width="410"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $store.state.lang === 'ru' ? 'Вы уверены что хотите выйти?' : 'Are you sure want logout?' }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            text
            @click="logout"
          >
            <span>{{ $store.state.lang === 'ru' ? 'Выйти' : 'Logout' }}</span>
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            <span>{{ $store.state.lang === 'ru' ? 'Отмена' : 'Cancel' }}</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
	import logo from './../components/logo';
	import sidebar from './../components/sidebar';

	export default {
		components: {
			logo, sidebar,
		},
		data() {
			return {
				loading: true,
				login: false,
				profile: {},
				dialog: false,
				drawer: true,
				fixed: true,
				clipped: true,
				clippedleft: true,
				right: false,
				rightDrawer: false,
			};
		},
		methods: {
			authorization() {
				window.location.href = 'http://dev.fastdonate.local/api/auth/steam';
			},
			logout() {
				this.loading = true;
				this.$axios.post('http://dev.fastdonate.local/api/auth/logout').then(() => {
					this.loading = false;
					this.$store.commit('logout');
					this.profile = {};
					this.login = false;
					this.dialog = false;
				});
			},
		},
		computed: {
			isLogin() {
				return this.$store.state.profile ? true : false;
			},
		},
		mounted() {
			Promise.all([
				       this.$axios.get('http://dev.fastdonate.local/api/profile'),
				       this.$axios.get('http://dev.fastdonate.local/api/events/count'),
			       ])
			       .then(([data, count]) => {
				       this.loading = false;
				       if (data.data.profile !== {}) {
					       this.$store.commit('login', data.data.profile);
					       this.profile = data.data.profile;
					       this.login = true;
					       this.$store.commit('notification', +count.data.count);
				       }
			       })
			       .catch(() => {
				       this.loading = false;
				       this.login = false;
				       this.logout();
			       });
		},
	};
</script>

<style lang="scss" scoped>
  body {
    overflow-y: auto;
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
</style>


