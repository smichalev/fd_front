<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex" style="align-items: center">
          <div class="title">Добавить новый скрипт</div>
        </div>
      </div>
      <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
      <v-card class="mx-auto"
              outlined>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="title"
              :rules="titleRules"
              label="Название модификации"
              outlined
              required
              dense
            ></v-text-field>
            <v-text-field
              v-model="version"
              :rules="versionRules"
              label="Версия модификации"
              outlined
              required
              dense
            ></v-text-field>

            <v-textarea
              v-model="description"
              :rules="descriptionRules"
              outlined
              label="Описание модификации"
            ></v-textarea>
            <v-text-field
              outlined
              v-model="price"
              :rules="priceRules"
              prefix="₽"
              @keypress="onlyNumber"
              dense
              label="Цена"
            ></v-text-field>
            <v-slider
              v-model="discount"
              thumb-label="always"
              label="Скидка"
            >
              <template v-slot:thumb-label="{ value }" color="warning">
                {{ value }}%
              </template>
            </v-slider>
            <v-btn
              color="rgb(12, 66, 174)"
              dark
              block
              elevation="0"
              @click="send"
            >
              <v-icon>mdi-plus</v-icon>
              Добавить
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	let requiredMsg = 'Это поле обязательно к заполнению';
	export default {
		data: () => ({
			loading: false,
			data: null,
			title: '',
			description: '',
			version: '',
			price: '',
			discount: null,
			breadcrumbs: [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/'
				},
				{
					text: 'Магазин скриптов',
					disabled: false,
					to: '/store/'
				},
				{
					text: 'Добавить новый скрипт',
					disabled: true,
					to: '/store/add'
				}
			],
			valid: true,
			titleRules: [
				v => !!v || requiredMsg
			],
			versionRules: [
				v => !!v || requiredMsg
			],
			descriptionRules: [
				v => !!v || requiredMsg
			],
			priceRules: [
				v => !!v || requiredMsg
			]
		}),
		methods: {
			onlyNumber($event) {
				let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
				if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && keyCode !== 191) {
					$event.preventDefault();
				}
			},
			send() {
				this.loading = true;
				this.$axios.post('http://dev.fastdonate.local/api/mod', {
					title: this.title,
					description: this.description,
					version: this.version,
					price: this.price,
					discount: this.discount
				}).then((data) => {
					this.$notify({
						title: 'Успешно',
						message: 'Модификация успешно добавлена',
						type: 'success',
						position: 'bottom-right'
					});
					this.$router.push('/store/' + data.data.mod.id);
				}).catch((err) => {
						this.$notify({
							title: 'Ошибка',
							message: err.response.data.msg,
							type: 'error',
							position: 'bottom-right'
						});
					})
					.finally(() => this.loading = false);
			}
		},
		mounted() {

		}
	};
</script>
