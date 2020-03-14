<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex" style="align-items: center">
          <div class="title">Отчёт о продажах </div>
        </div>
      </div>
      <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
      <v-card class="mx-auto"
              outlined>
        <v-card-text>
          Отчёт о продажах
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
					text: 'Отчёт о продажах ',
					disabled: true,
					to: '/stats'
				}
			]
		})
	}
</script>
