<template>
  <div>
    <div style="text-transform: uppercase" class="mt-2 mx-2">Меню сайта</div>
    <v-list>
      <v-list-item v-for="(item, i) in menuOne" :key="i" :to="item.to" exact dense>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div style="text-transform: uppercase" class="mt-2 mx-2" v-if="isLogin">Для пользователя</div>
    <v-list v-if="isLogin">
      <v-list-item v-for="(item, i) in menuTwo" :key="i" :to="item.to" exact dense>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div style="text-transform: uppercase" class="mt-2 mx-2" v-if="isLogin">Для продавца</div>
    <v-list v-if="isLogin">
      <v-list-item v-for="(item, i) in menuThree" :key="i" :to="item.to" exact dense>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  export default {
    props: ['isLogin'],
    data() {
      return {
        menuOne: [
          {
            icon: 'mdi-server',
            title: 'Каталог серверов',
            to: '/servers'
          },
          {
            icon: 'mdi-store',
            title: 'Магазин скриптов',
            to: '/store'
          }
        ],
        menuTwo: [
          {
            icon: 'mdi-plus',
            title: 'Пополнить счет',
            to: '/donate'
          },
          {
            icon: 'mdi-history',
            title: 'История аккаунта',
            to: '/history'
          },
          {
            icon: 'mdi-account-settings',
            title: 'Настройки',
            to: '/settings'
          },
          {
            icon: 'mdi-help',
            title: 'Помощь',
            to: '/help'
          }
        ],
        menuThree: [
          {
            icon: 'mdi-chart-areaspline',
            title: 'Статистика продаж',
            to: '/stats'
          },
          {
            icon: 'mdi-server-network',
            title: 'Мои сервера',
            to: '/myservers'
          },
          {
            icon: 'mdi-file',
            title: 'Мои скрипты',
            to: '/myscripts'
          },
          {
            icon: 'mdi-content-save',
            title: 'Для сервера',
            to: '/forserver'
          }
        ]
      };
    }
  };
</script>
