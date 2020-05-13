<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <headerPage :breadcrumbs="breadcrumbs" :titlePage="titlePage"></headerPage>
      <v-card class="mt-3" outlined>
        <div style="background: #0c42ae; color: #fff; font-size: 20px" class="px-4 py-1">
          {{ $store.state.lang == 'ru' ? 'Добавить новый сервер' : 'Add new server' }}
        </div>
        <v-alert
          dense
          text
          type="error"
          v-if="listErrors.length"
          class="mb-0"
          style="border-bottom: 1px dashed #ccc"
        >
          <div class="title px-0">
            {{ listErrors.length }} {{ countError(listErrors.length, $store.state.lang) }}
          </div>
          <ul>
            <li v-for="(err, key) in listErrors"
                :key="key">
              {{ err }}
            </li>
          </ul>
        </v-alert>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="9"
          >
            <v-list-item two-line class="pb-0 pt-3">
              <v-list-item-content class="py-0">
                <v-list-item-title><span style="color: #ff5252">*</span> {{ $store.state.lang === 'ru' ? 'IP адрес сервера'
                  : 'IP address server'}}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  {{ $store.state.lang === 'ru' ? 'Пример' : 'Example' }}: 1.2.3.4
                </v-list-item-subtitle>
                <v-list-item-subtitle class="mt-2">
                  <div class="d-flex" style="max-width: 600px">
                    <v-text-field
                      v-model="ip1"
                      :error-messages="ipErrors"
                      required
                      dense
                      outlined
                      :rules="rulesIP"
                      @input="$v.ip1.$touch()"
                      @blur="$v.ip1.$touch()"
                      class="mr-4"
                    ></v-text-field>
                    <span style="font-weight: bold; font-size: 24px">.</span>
                    <v-text-field
                      v-model="ip2"
                      :error-messages="ipErrors2"
                      required
                      dense
                      outlined
                      :rules="rulesIP"
                      @input="$v.ip2.$touch()"
                      @blur="$v.ip2.$touch()"
                      class="mx-4"
                    ></v-text-field>
                    <span style="font-weight: bold; font-size: 24px">.</span>
                    <v-text-field
                      v-model="ip3"
                      :error-messages="ipErrors3"
                      required
                      outlined
                      dense
                      :rules="rulesIP"
                      @input="$v.ip3.$touch()"
                      @blur="$v.ip3.$touch()"
                      class="mx-4"
                    ></v-text-field>
                    <span style="font-weight: bold; font-size: 24px">.</span>
                    <v-text-field
                      v-model="ip4"
                      :error-messages="ipErrors4"
                      required
                      dense
                      outlined
                      :rules="rulesIP"
                      @input="$v.ip4.$touch()"
                      @blur="$v.ip4.$touch()"
                      class="mx-4"
                    ></v-text-field>
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line class="py-0">
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <span style="color: #ff5252">*</span> {{ $store.state.lang === 'ru' ? 'Порт сервера' : 'Port server'}}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  {{ $store.state.lang === 'ru' ? 'Пример' : 'Example' }}: 27015
                </v-list-item-subtitle>
                <v-list-item-subtitle class="mt-2">
                  <v-text-field
                    v-model="port"
                    :error-messages="portErrors"
                    required
                    dense
                    outlined
                    style="width: 120px"
                    :rules="rulesIP"
                    @input="$v.port.$touch()"
                    @blur="$v.port.$touch()"
                  ></v-text-field>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line class="py-0">
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <span style="color: #ff5252">*</span> {{ $store.state.lang === 'ru' ? 'Игра' : 'Game'}}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-2">
                  {{ $store.state.lang === 'ru' ? 'Выберите игру из выпадающего списка' : 'Select a game from the drop-down list'}}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="mt-2">
                  <v-select
                    v-model="game"
                    :error-messages="gameErrors"
                    @input="$v.game.$touch()"
                    @blur="$v.game.$touch()"
                    :items="items"
                    :item-text="items.text"
                    :item-value="items.value"
                    outlined
                    dense
                    required
                  ></v-select>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              <v-btn color="#0c42ae" dark block elevation="0" @click="testServer" :loading="loadBtn">
                {{ $store.state.lang === 'ru' ? 'Проверить сервер' : 'Test server'}}
              </v-btn>
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
            sm="3"
            class="line"
          >
            <v-card-text v-if="!result">
              <v-list-item two-line class="py-0">
                <v-list-item-content class="py-0">
                  <v-list-item-title class="py-0 my-0">
                    {{ $store.state.lang === 'ru' ? 'Название сервера' : 'Name server'}}
                  </v-list-item-title>
                  <v-list-item-subtitle class="py-0 my-0">
                    <v-sheet>
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="auto"
                        type="list-item"
                      ></v-skeleton-loader>
                    </v-sheet>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line class="py-0">
                <v-list-item-content class="py-0">
                  <v-list-item-title class="py-0 my-0">
                    {{ $store.state.lang === 'ru' ? 'IP' : 'IP'}}
                  </v-list-item-title>
                  <v-list-item-subtitle class="py-0 my-0">
                    <v-sheet>
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="auto"
                        type="list-item"
                      ></v-skeleton-loader>
                    </v-sheet>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line class="py-0">
                <v-list-item-content class="py-0">
                  <v-list-item-title class="py-0 my-0">
                    {{ $store.state.lang === 'ru' ? 'Игроки' : 'Players'}}
                  </v-list-item-title>
                  <v-list-item-subtitle class="py-0 my-0">
                    <v-sheet>
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="auto"
                        type="list-item"
                      ></v-skeleton-loader>
                    </v-sheet>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line class="py-0">
                <v-list-item-content class="py-0">
                  <v-list-item-title class="py-0 my-0">
                    {{ $store.state.lang === 'ru' ? 'Карта' : 'Map'}}
                  </v-list-item-title>
                  <v-list-item-subtitle class="py-0 my-0">
                    <v-sheet>
                      <v-skeleton-loader
                        class="mx-auto"
                        max-width="auto"
                        type="list-item"
                      ></v-skeleton-loader>
                    </v-sheet>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-card-text>
            <v-card-text v-if="result">
              <div>
                <v-list-item two-line class="py-0">
                  <v-list-item-content class="py-0">
                    <v-list-item-title>
                      {{ $store.state.lang === 'ru' ? 'Название сервера' : 'Name server'}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-2">
                      {{ result.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line class="py-0">
                  <v-list-item-content class="py-0">
                    <v-list-item-title>
                      {{ $store.state.lang === 'ru' ? 'IP' : 'IP'}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-2">
                      {{ result.query.host }}:{{ result.query.port }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line class="py-0">
                  <v-list-item-content class="py-0">
                    <v-list-item-title>
                      {{ $store.state.lang === 'ru' ? 'Игроки' : 'Players'}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-2">
                      {{ result.players.length + result.bots.length }}/{{ result.maxplayers }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line class="py-0">
                  <v-list-item-content class="py-0">
                    <v-list-item-title>
                      {{ $store.state.lang === 'ru' ? 'Карта' : 'Map'}}
                    </v-list-item-title>
                    <v-list-item-subtitle class="mt-2">
                      {{ result.map }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
              <v-btn elevation="0" color="success" block @click="postServer">Добавить сервер</v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	import headerPage from "../../components/headerPage";
	import {validationMixin} from 'vuelidate';
	import {required, maxLength, email} from 'vuelidate/lib/validators';

	let language = {
		ru: {
			add: 'Добавить',
			serverList: 'Список серверов',
			newServer: 'Добавить новый сервер',
			homePage: 'Главная страница',
		},
		en: {
			add: 'Add',
			serverList: 'Server list',
			newServer: 'Add new server',
			homePage: 'Home page',
		},
	};
	export default {
		mixins: [validationMixin],

		validations: {
			ip1: {required, maxLength: maxLength(3)},
			ip2: {required, maxLength: maxLength(3)},
			ip3: {required, maxLength: maxLength(3)},
			ip4: {required, maxLength: maxLength(3)},
			port: {required, maxLength: maxLength(7)},
			game: {required},
		},
		async asyncData({$axios, error, store}) {
			let result = await $axios.$get('http://dev.fastdonate.local/api/login');
			if (!result.result) {
				let lang = await $axios.$get('http://dev.fastdonate.local/api/lang');
				error({
					statusCode: 401,
					message: lang.lang === 'ru' ? 'Вы не авторизованны' : 'Your not authorized',
				});
			}
		},
		components: {
			headerPage,
		},
		data() {
			return {
				listErrors: [],
				loadBtn: false,
				titlePage: language[this.$store.state.lang].newServer,
				breadcrumbs: [
					{
						text: language[this.$store.state.lang].homePage,
						disabled: false,
						to: '/',
					},
					{
						text: language[this.$store.state.lang].serverList,
						to: '/servers',
					},
					{
						text: language[this.$store.state.lang].newServer,
						disabled: true,
					},
				],
				ip1: '',
				ip2: '',
				ip3: '',
				ip4: '',
				port: '',
				gameserver: null,
				result: null,
				game: null,
				items: [
					{
						text: 'Garry’s Mod',
						value: 'garrysmod',
					},
					{
						text: 'DayZ',
						value: 'dayz',
					},
				],
				rulesIP: [
					v => /^\d+$/.test(v) || (''),
				],
			};
		},
		watch: {
			profile(newVal) {
				if (newVal === null) {
					this.$router.push('/');
				}
			},
			ip1(newVal) {
				if (newVal.split('.').length === 4) {
					let ip = newVal.split('.');
					let obj = {
						ip1: ip[0],
						ip2: ip[1],
						ip3: ip[2],
						ip4: ip[3],
					};

					this.ip1 = obj.ip1;
					this.ip2 = obj.ip2;
					this.ip3 = obj.ip3;
					this.ip4 = obj.ip4;
				}
			},
			lang(selectedLang) {
				this.titlePage = language[selectedLang].newServer;
				this.breadcrumbs[0].text = language[selectedLang].homePage;
				this.breadcrumbs[1].text = language[selectedLang].serverList;
				this.breadcrumbs[2].text = language[selectedLang].newServer;
			},
		},
		methods: {
			countError: (number, lang) => {
				let cases = [2, 0, 1, 1, 1, 2];
				if (lang === 'ru') {
					return ['ошибка', 'ошибки', 'ошибок'][(number % 100 > 4 && number % 100 < 20)
					                                      ? 2
					                                      : cases[(number % 10 < 5)
					                                              ? number % 10
					                                              : 5]];
				}
				else {
					return ['error', 'errors', 'errors'][(number % 100 > 4 && number % 100 < 20)
					                                     ? 2
					                                     : cases[(number % 10 < 5)
					                                             ? number % 10
					                                             : 5]];
				}
			},
			postServer() {
				if (this.gameserver && this.game) {
					this.$axios.post('http://dev.fastdonate.local/api/server/new', {
							server: Object.assign(this.gameserver, {gamename: this.game}),
						})
						.then((data) => {
							this.$router.push('/servers/' + data.data.id);
						})
						.catch((err) => {
							this.$notify({
								title: 'Ошибка',
								message: err.response.data.message,
								type: 'error',
								position: 'bottom-right',
							});
						});
				}
			},
			testServer() {
				this.$v.$touch();
				this.result = null;
				this.listErrors = [];

				if (!this.ip1) {
					this.listErrors.push(this.$store.state.lang === 'ru'
					                     ? '1 значение поля IP адрес является обязательным'
					                     : '1 value of the IP address field is required');
				}
				else {
					if (/^\d+$/.test(this.ip1)) {
						if (this.ip1.length > 3) {
							this.listErrors.push(this.$store.state.lang === 'ru'
							                     ? '1 значение поля IP адрес не должно быть длинее чем 3 символа'
							                     : '1 the value of the IP address field should not be longer than 3 characters');
						}
					}
					else {
						this.listErrors.push(this.$store.state.lang === 'ru'
						                     ? '1 значение поля IP адрес должно быть числом'
						                     : '1 the value of the IP address field must be a number');
					}
				}

				if (!this.ip2) {
					this.listErrors.push(this.$store.state.lang === 'ru'
					                     ? '2 значение поля IP адрес является обязательным'
					                     : '2 value of the IP address field is required');
				}
				else {
					if (/^\d+$/.test(this.ip2)) {
						if (this.ip2.length > 3) {
							this.listErrors.push(this.$store.state.lang === 'ru'
							                     ? '2 значение поля IP адрес не должно быть длинее чем 3 символа'
							                     : '2 the value of the IP address field should not be longer than 3 characters');
						}
					}
					else {
						this.listErrors.push(this.$store.state.lang === 'ru'
						                     ? '2 значение поля IP адрес должно быть числом'
						                     : '2 the value of the IP address field must be a number');
					}
				}

				if (!this.ip3) {
					this.listErrors.push(this.$store.state.lang === 'ru'
					                     ? '3 значение поля IP адрес является обязательным'
					                     : '3 value of the IP address field is required');
				}
				else {
					if (/^\d+$/.test(this.ip3)) {
						if (this.ip3.length > 3) {
							this.listErrors.push(this.$store.state.lang === 'ru'
							                     ? '3 значение поля IP адрес не должно быть длинее чем 3 символа'
							                     : '3 the value of the IP address field should not be longer than 3 characters');
						}
					}
					else {
						this.listErrors.push(this.$store.state.lang === 'ru'
						                     ? '3 значение поля IP адрес должно быть числом'
						                     : '3 the value of the IP address field must be a number');
					}
				}

				if (!this.ip4) {
					this.listErrors.push(this.$store.state.lang === 'ru'
					                     ? '4 значение поля IP адрес является обязательным'
					                     : '4 value of the IP address field is required');
				}
				else {
					if (/^\d+$/.test(this.ip4)) {
						if (this.ip4.length > 3) {
							this.listErrors.push(this.$store.state.lang === 'ru'
							                     ? '4 значение поля IP адрес не должно быть длинее чем 3 символа'
							                     : '4 the value of the IP address field should not be longer than 3 characters');
						}
					}
					else {
						this.listErrors.push(this.$store.state.lang === 'ru'
						                     ? '4 значение поля IP адрес должно быть числом'
						                     : '4 the value of the IP address field must be a number');
					}
				}

				if (!this.port) {
					this.listErrors.push(this.$store.state.lang === 'ru'
					                     ? 'Значение поля порт является обязательным'
					                     : 'The port field value is required');
				}
				else {
					if (/^\d+$/.test(this.port)) {
						if (this.port.length > 7) {
							this.listErrors.push(this.$store.state.lang === 'ru'
							                     ? 'Значение поля порт не должно быть длинее чем 7 символов'
							                     : 'The port field value must not be longer than 7 characters');
						}
					}
					else {
						this.listErrors.push(this.$store.state.lang === 'ru'
						                     ? 'Значение порт должно быть числом'
						                     : 'Port value must be a number');
					}
				}

				if (!this.game) {
					this.listErrors.push(this.$store.state.lang === 'ru'
					                     ? 'Значение поля игра является обязательным'
					                     : 'Game field value is required');
				}

				if (!this.listErrors.length) {
					this.gameserver = null;
					this.loadBtn = true;
					this.result = null;
					this.$axios.post('http://dev.fastdonate.local/api/server', {
						ip: this.ip1 + '.' + this.ip2 + '.' + this.ip3 + '.' + this.ip4,
						port: this.port,
						game: this.game,
					}).then((data) => {
						this.result = data.data.server;
						this.gameserver = data.data.server;
						this.loadBtn = false;
					}).catch((err) => {
						this.listErrors.push(err.response.data.message);
						this.$notify({
							title: 'Ошибка',
							message: err.response.data.message,
							type: 'error',
							position: 'bottom-right',
						});
						this.loadBtn = false;
					});
				}
			},
		},
		computed: {
			profile() {
				return this.$store.state.profile;
			},
			lang() {
				return this.$store.state.lang;
			},
			selectErrors() {
				const errors = [];
				if (!this.$v.select.$dirty) {
					return errors;
				}
				!this.$v.select.required && errors.push('');
				return errors;
			},
			ipErrors() {
				const errors = [];
				if (!this.$v.ip1.$dirty) {
					return errors;
				}

				if (!this.$v.ip1.maxLength) {
					errors.push('');
				}

				if (!this.$v.ip1.required) {
					errors.push('');
				}
				return errors;
			},
			ipErrors2() {
				const errors = [];
				if (!this.$v.ip2.$dirty) {
					return errors;
				}

				if (!this.$v.ip2.maxLength) {
					errors.push('');
				}

				if (!this.$v.ip2.required) {
					errors.push('');
				}
				return errors;
			},
			ipErrors3() {
				const errors = [];
				if (!this.$v.ip3.$dirty) {
					return errors;
				}

				if (!this.$v.ip3.maxLength) {
					errors.push('');
				}

				if (!this.$v.ip3.required) {
					errors.push('');
				}
				return errors;
			},
			ipErrors4() {
				const errors = [];
				if (!this.$v.ip4.$dirty) {
					return errors;
				}

				if (!this.$v.ip3.maxLength) {
					errors.push('');
				}

				if (!this.$v.ip4.required) {
					errors.push('');
				}
				return errors;
			},
			portErrors() {
				const errors = [];
				if (!this.$v.port.$dirty) {
					return errors;
				}

				if (!this.$v.port.maxLength) {
					errors.push('');
				}


				if (!this.$v.port.required) {
					errors.push('');
				}

				return errors;
			},
			gameErrors() {
				const errors = [];
				if (!this.$v.game.$dirty) {
					return errors;
				}

				if (!this.$v.game.required) {
					errors.push('');
				}

				return errors;
			},
		},
	};
</script>

<style lang="scss" scoped>
  .border__input {
    box-shadow: none;
    border: 1px solid #ccc;
  }

  @media (max-width: 599px) {
    .line {
      border-top: 1px dashed #ccc
    }
  }

  @media (min-width: 600px) {
    .line {
      border-left: 1px dashed #ccc
    }
  }
</style>
