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
          <v-icon left>mdi-steam</v-icon>
          Steam login
        </v-btn>
        <div style="display: flex; align-items: center">
          <v-toolbar-items v-if="login" style="height: 48px;">
            <v-btn v-on="on" color="#0c42ae" dark elevation="0">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-toolbar-items>
          <v-toolbar-items v-if="login" style="height: 48px;">
            <v-menu offset-y bottom right transition="slide-y-transition" v-if="login">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" color="#0c42ae" dark elevation="0">
                  <v-avatar size="40" class="mr-2 justify-center">
                    <img :src="profile.avatar">
                  </v-avatar>
                  <div style="flex-direction: column" class="d-none d-sm-flex">
                    <div>{{ profile.login }}</div>
                    <div style="font-size: 12px">{{ profile.balance.toFixed(2) }} ₽</div>
                  </div>
                  <v-icon small>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item to="/donate">
                  <v-list-item-title>Пополнить</v-list-item-title>
                </v-list-item>
                <v-list-item :to="'/users/'+profile.id">
                  <v-list-item-title>Профиль</v-list-item-title>
                </v-list-item>
                <v-list-item to="/settings">
                  <v-list-item-title>Настройки</v-list-item-title>
                </v-list-item>
                <v-list-item @click="dialog = true">
                  <v-list-item-title>Выход</v-list-item-title>
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
        <v-card-title class="headline">Вы уверены что хотите выйти?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            text
            @click="logout"
          >
            Выйти
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Отмена
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
      logo, sidebar
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
        rightDrawer: false
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
          localStorage.removeItem('token');
          this.$store.commit('logout');
          this.profile = {};
          this.login = false;
          this.dialog = false;
        });
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.profile ? true : false;
      }
    },
    mounted() {
      if (localStorage.getItem('token')) {
        this.$axios.get('http://dev.fastdonate.local/api/profile', {
            headers: {Authorization: `${ localStorage.getItem('token') }`}
          })
          .then((data) => {
            this.loading = false;
            if (data.data.profile !== {}) {
              this.$store.commit('login', data.data.profile);
              this.profile = data.data.profile;
              this.login = true;
            }
          })
          .catch(() => {
            this.loading = false;
            this.login = false;
            this.logout();
          });
      }
      else {
        this.loading = false;
        this.login = false;
        this.logout();
      }
    }
  };
</script>

<style lang="scss" scoped>
  body {
    overflow-y: auto;
  }
</style>


