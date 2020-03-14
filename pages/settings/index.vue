<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex" style="align-items: center">
          <div class="title">Настройки</div>
        </div>
      </div>
      <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
      <v-card class="mx-auto"
              outlined>
        <v-card-text>
          <v-card-title>Настройки аккаунта</v-card-title>
          <v-avatar size="40" class="mr-2 justify-center">
            <img
              :src="profile.avatar"
            >
          </v-avatar>
          <v-text-field
            label="Новый пароль"
            outlined
            required
            dense
          ></v-text-field>
          <v-btn color="success" small dark elevation="0" to="/settings">Сохранить</v-btn>
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
					text: 'Настройки',
				}
			],
			profile: {
				avatar: "https://flixcon.ru/media/no-poster.jpg",
			}
		})
	}
</script>
