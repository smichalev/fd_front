<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex" style="align-items: center">
          <div class="title">Пополнить счет</div>
        </div>
      </div>
      <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
      <v-card class="mx-auto" outlined>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title>Укажите систему и сумму пополнения</v-card-title>
            <v-text-field label="Сумма пополнения" :rules="donateRules" prefix="₽" @keypress="onlyNumber" outlined required dense></v-text-field>
            <v-btn color="success" small dark elevation="0" to="/donate">Очко ставлю</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	export default {
		data: () => ({
      donateRules: [
        v => !!v || "Хуле не написал ничего"
      ],
			breadcrumbs: [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/'
				},
				{
					text: 'Пополнить счет',
				}
			]
		}),
    methods: {
      onlyNumber($event) {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && keyCode !== 191) {
          $event.preventDefault();
        }
      }
    }
	}
</script>
