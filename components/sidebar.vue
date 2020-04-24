<template>
  <div>
    <languageSelect></languageSelect>
    <div style="text-transform: uppercase" class="mt-2 mx-2">
      <span v-if="$store.state.lang === 'ru'">Меню сайта</span>
      <span v-if="$store.state.lang === 'en'">Site menu</span>
    </div>
    <v-list v-if="$store.state.lang === 'en'">
      <v-list-item v-for="(item, i) in menuOne_en" :key="i" :to="item.to" dense>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-if="$store.state.lang === 'ru'">
      <v-list-item v-for="(item, i) in menuOne_ru" :key="i" :to="item.to" dense>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div style="text-transform: uppercase" class="mt-2 mx-2" v-if="isLogin">
      <span v-if="$store.state.lang === 'ru'">Для пользователя</span>
      <span v-if="$store.state.lang === 'en'">For users</span>
    </div>
    <v-list v-if="isLogin && $store.state.lang === 'en'">
      <v-list-item v-for="(item, i) in menuTwo_en" :key="i" :to="item.to" dense>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-if="isLogin && $store.state.lang === 'ru'">
      <v-list-item v-for="(item, i) in menuTwo_ru" :key="i" :to="item.to" dense>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div style="text-transform: uppercase" class="mt-2 mx-2" v-if="isLogin">
      <span v-if="$store.state.lang === 'ru'">Для продавца</span>
      <span v-if="$store.state.lang === 'en'">For seller</span>
    </div>
    <v-list v-if="isLogin && $store.state.lang === 'en'">
      <v-list-item v-for="(item, i) in menuThree_en" :key="i" :to="item.to" dense>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-if="isLogin && $store.state.lang === 'ru'">
      <v-list-item v-for="(item, i) in menuThree_ru" :key="i" :to="item.to" dense>
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
	import languageSelect from '../components/languageSelect';

	export default {
		props: ['isLogin'],
		components: {
			languageSelect,
		},
		data() {
			return {
				menuOne_ru: [
					{
						icon: 'mdi-server',
						title: 'Каталог серверов',
						to: '/servers',
					},
					{
						icon: 'mdi-store',
						title: 'Магазин скриптов',
						to: '/store',
					},
				],
				menuOne_en: [
					{
						icon: 'mdi-server',
						title: 'Servers list',
						to: '/servers',
					},
					{
						icon: 'mdi-store',
						title: 'Store',
						to: '/store',
					},
				],
				menuTwo_ru: [
					{
						icon: 'mdi-plus',
						title: 'Пополнить счет',
						to: '/donate',
					},
					{
						icon: 'mdi-history',
						title: 'История аккаунта',
						to: '/history',
					},
					{
						icon: 'mdi-account-settings',
						title: 'Настройки',
						to: '/settings',
					},
					{
						icon: 'mdi-help',
						title: 'Помощь',
						to: '/help',
					},
				],
				menuTwo_en: [
					{
						icon: 'mdi-plus',
						title: 'Replenish account',
						to: '/donate',
					},
					{
						icon: 'mdi-history',
						title: 'Account history',
						to: '/history',
					},
					{
						icon: 'mdi-account-settings',
						title: 'Settings',
						to: '/settings',
					},
					{
						icon: 'mdi-help',
						title: 'FAQ',
						to: '/help',
					},
				],
				menuThree_ru: [
					{
						icon: 'mdi-chart-areaspline',
						title: 'Статистика продаж',
						to: '/stats',
					},
					{
						icon: 'mdi-server-network',
						title: 'Мои сервера',
						to: '/myservers',
					},
					{
						icon: 'mdi-file',
						title: 'Мои скрипты',
						to: '/myscripts',
					},
					{
						icon: 'mdi-content-save',
						title: 'Для сервера',
						to: '/forserver',
					},
				],
				menuThree_en: [
					{
						icon: 'mdi-chart-areaspline',
						title: 'Sales statistics',
						to: '/stats',
					},
					{
						icon: 'mdi-server-network',
						title: 'My servers',
						to: '/myservers',
					},
					{
						icon: 'mdi-file',
						title: 'My scripts',
						to: '/myscripts',
					},
					{
						icon: 'mdi-content-save',
						title: 'For server',
						to: '/forserver',
					},
				],
			};
		},
	};
</script>
