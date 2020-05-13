<template>
  <div>
    <div v-for="menuItem in menuBar">
      <div style="text-transform: uppercase" class="mt-2 mx-2">
        <span>{{ menuItem.title[$store.state.lang] }}</span>
      </div>
      <v-list>
        <v-list-item v-for="(item, i) in menuItem.item" :key="i" :to="item.to" dense>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title[$store.state.lang]"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				menuBar: [
					{
						title: {
							ru: 'Меню сайта',
							en: 'Menu site',
						},
						item: [
							{
								title: {
									ru: 'Каталог серверов',
									en: 'Servers list',
								},
								icon: 'mdi-server',
								to: '/servers',
							},
							{
								title: {
									ru: 'Магазин скриптов',
									en: 'Store',
								},
								icon: 'mdi-store',
								to: '/store',
							},
						],
					},
					{
						title: {
							ru: 'Для пользователя',
							en: 'For user',
						},
						item: [
							{
								title: {
									ru: 'Пополнить счет',
									en: 'Replenish account',
								},
								icon: 'mdi-plus',
								to: '/donate',
							},
							{
								title: {
									ru: 'История аккаунта',
									en: 'Account history',
								},
								icon: 'mdi-history',
								to: '/history',
							},
							{
								title: {
									ru: 'Настройки',
									en: 'Settings',
								},
								icon: 'mdi-account-settings',
								to: '/settings',
							},
							{
								title: {
									ru: 'FAQ',
									en: 'FAQ',
								},
								icon: 'mdi-help',
								to: '/faq',
							},
						],
					},
					{
						title: {
							ru: 'Для продавца',
							en: 'For saller',
						},
						item: [
							{
								title: {
									ru: 'Статистика продаж',
									en: 'Sales statistics',
								},
								icon: 'mdi-chart-areaspline',
								to: '/stats',
							},
							{
								title: {
									ru: 'Мои сервера',
									en: 'My servers',
								},
								icon: 'mdi-server-network',
								to: '/myservers',
							},
							{
								title: {
									ru: 'Мои скрипты',
									en: 'My scripts',
								},
								icon: 'mdi-file',
								to: '/myscripts',
							},
							{
								title: {
									ru: 'Для сервера',
									en: 'For server',
								},
								icon: 'mdi-content-save',
								to: '/forserver',
							},
						],
					},
				],
			};
		},
	};
</script>
