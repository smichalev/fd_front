<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
		<div class="d-flex flex-column">
		  <div class="title">Мои сервера</div>
			<v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
		</div>
		<div>
		  <v-btn elevation="0" color="success" @click="$router.push({path: '/servers/add'})">
		    <v-icon>mdi-plus</v-icon>
		    Добавить
		  </v-btn>
		</div>
      </div>
      <v-card class="mx-auto" outlined>
        <v-card-text>
          Мои сервера
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	export default {
		data: () => ({
			breadcrumbs: [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/'
				},
				{
					text: 'Мои сервера',
				}
			]
		})
	}
</script>
