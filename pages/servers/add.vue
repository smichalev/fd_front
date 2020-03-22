<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex" style="align-items: center">
          <div class="title">Добавить новый сервер</div>
        </div>
      </div>
      <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
      <v-card class="mx-auto" outlined>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="host" :rules="hostRules" label="IP адрес сервера" outlined required dense></v-text-field>
            <v-text-field outlined v-model="port" :rules="portRules" @keypress="onlyNumber" dense label="Порт сервера"></v-text-field>
            <v-text-field v-model="game" :rules="gameRules" label="Игра" outlined required dense></v-text-field>
            <v-text-field v-model="mod" :rules="modRules" label="Игровой режим на сервере" outlined required dense></v-text-field>
            <v-btn color="rgb(12, 66, 174)" dark block elevation="0" @click="send">
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
			host: '',
			game: '',
			mod: '',
			port: '',
			breadcrumbs: [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/'
				},
				{
					text: 'Список серверов',
					disabled: false,
					to: './#'
				},
				{
					text: 'Добавить новый сервер',
				}
			],
			valid: true,
			hostRules: [
				v => !!v || requiredMsg
			],
			gameRules: [
				v => !!v || requiredMsg
			],
			modRules: [
				v => !!v || requiredMsg
			],
			portRules: [
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
				this.$axios.post('http://dev.fastdonate.local/api/servers', {
					game: this.game,
					host: this.host,
					mod: this.mod,
					port: this.port,
				}, {
					headers: {Authorization: `${ localStorage.getItem('token') }`}
				}).then((data) => {
					this.$notify({
						title: 'Успешно',
						message: 'Сервер успешно добавлен!',
						type: 'success',
						position: 'bottom-right'
					});
					this.$router.push('/servers/' + data.data.server.id);
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
		mounted() {}
	};
</script>
