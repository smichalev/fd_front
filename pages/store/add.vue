<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex" style="align-items: center">
          <div class="title">Добавить новый скрипт</div>
        </div>
      </div>
      <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
      <v-card class="mx-auto" outlined>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="title" :rules="titleRules" label="Название модификации" outlined required
                          dense></v-text-field>
            <v-text-field v-model="version" :rules="versionRules" label="Версия модификации" outlined required
                          dense></v-text-field>
            <v-textarea v-model="description" :rules="descriptionRules" label="Описание модификации"
                        outlined></v-textarea>
            <div v-if="hashtags.length">
              <div class="block mb-4"
                   style="background: #f6f6f6; border-radius: 5px;">
                <v-chip
                  label
                  color="default"
                  close
                  v-for="tag in hashtags"
                  :key="tag"
                  class="mx-1 my-1"
                  @click:close="removetag(tag)"
                >
                  #{{ tag }}
                </v-chip>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between">
              <v-text-field label="Hashtag" v-model="hashtag" outlined required v-if="6 > hashtags.length > 0"
                            dense></v-text-field>
              <v-text-field label="Hashtag" v-model="hashtag" outlined required v-else disabled
                            dense></v-text-field>
              <v-btn elevation="0" color="success" class="ml-3" v-if="hashtag.length && 6 > hashtags.length > 0"
                     @click="addhashtag">
                <v-icon>mdi-plus</v-icon>
                <span class="desktop">Добавить хештег</span>
              </v-btn>
              <v-btn elevation="0" color="success" class="ml-3" v-else disabled>
                <v-icon>mdi-plus</v-icon>
                <span class="desktop">Добавить хештег</span>
              </v-btn>
            </div>

            <v-text-field v-model="price" :rules="priceRules" label="Цена" prefix="₽" @keypress="onlyNumber" outlined
                          dense></v-text-field>
            <v-slider v-model="discount" thumb-label="always" label="Скидка" class="mt-4">
              <template v-slot:thumb-label="{ value }" color="warning">
                {{ value }}%
              </template>
            </v-slider>
            <div style="display: flex; align-items: center" v-if="pic">
              <v-img :src="pic" aspect-ratio="1.7" :max-width="200" :max-height="116"
                     style="border-radius: 5px; border: 1px solid #adbdca;">
              </v-img>
              <v-btn elevation="0" color="error" class="ml-2" @click="fileImage = null">Удалить</v-btn>
            </div>
            <div v-else
                 style="display: flex; justify-content: center; align-items: center; width: 200px; height: 116px; background: #e4e9ed; border-radius: 5px; border: 1px solid #adbdca; font-weight: bold; font-size: 15px; text-transform: uppercase; color:#adbdca">
              no poster
            </div>

            <v-file-input label="Обложка" outlined v-model="fileImage" dense class="mt-4"></v-file-input>
            <v-file-input label="Архив с модификацией" outlined v-model="fileMod" dense></v-file-input>

            <div class="mobile">
              <v-btn color="rgb(12, 66, 174)" dark block elevation="0" @click="send">
                <v-icon>mdi-plus</v-icon>
                Добавить
              </v-btn>
            </div>
            <div class="desktop" style="text-align: right">
              <v-btn color="rgb(12, 66, 174)" dark elevation="0" @click="send">
                <v-icon>mdi-plus</v-icon>
                Добавить
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
    <v-dialog
      v-model="dialog"
      max-width="320"
    >
      <v-card>
        <v-card-title class="headline">Вы уверены что хотите выйти?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error darken-1"
            text
          >
            Выйти
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
	let requiredMsg = 'Это поле обязательно к заполнению';
	let hashtagMsg = 'Такой хештег уже есть';
	export default {
		middleware: 'login',
		data: () => ({
			dialog: false,
			loading: false,
			data: null,
			title: '',
			pic: null,
			fileImage: null,
			fileMod: null,
			description: '',
			version: '',
			price: '',
			hashtag: '',
			hashtags: [],
			discount: null,
			breadcrumbs: [
				{
					text: 'Главная страница',
					disabled: false,
					to: '/',
				},
				{
					text: 'Магазин скриптов',
					disabled: false,
					to: './#',
				},
				{
					text: 'Добавить новый скрипт',
				},
			],
			valid: true,
			titleRules: [
				v => !!v || requiredMsg,
			],
			versionRules: [
				v => !!v || requiredMsg,
			],
			descriptionRules: [
				v => !!v || requiredMsg,
			],
			priceRules: [
				v => !!v || requiredMsg,
			],
		}),
		watch: {
			fileImage: function(data) {
				if (data && (data.type === 'image/png' || data.type === 'image/jpeg')) {
					this.pic = URL.createObjectURL(data);
				}
				else {
					this.pic = null;
				}
			},
		},
		methods: {
			removetag(tag) {
				this.hashtags = this.hashtags.filter((item) => item !== tag);
			},
			addhashtag() {
				this.hashtag = this.hashtag.replace(/[^0-9-a-zA-ZА-Яа-яЁё]/gi, '').replace(/\s+/gi, ', ');
				if (this.hashtag.length > 60) {
					return this.$notify({
						title: 'Ошибка',
						message: 'Длина хештега не может быть больше 60 символов!',
						type: 'error',
						position: 'bottom-right',
					});
				}
				if (this.hashtag.length) {
					if (!!~this.hashtags.indexOf(this.hashtag)) {
						this.$notify({
							title: 'Ошибка',
							message: hashtagMsg,
							type: 'error',
							position: 'bottom-right',
						});
					}
					else {
						this.hashtags.push(this.hashtag);
					}
					this.hashtag = '';
				}
				else {
					this.$notify({
						title: 'Ошибка',
						message: 'Хештег может состоять только из букв и цифр',
						type: 'error',
						position: 'bottom-right',
					});
				}
			},
			onlyNumber($event) {
				let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
				if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && keyCode !== 191) {
					$event.preventDefault();
				}
			},
			send() {
				this.loading = true;

				let formData = new FormData();
				if (this.fileMod) {
					formData.append('mod', this.fileMod);
				}
				if (this.fileImage) {
					formData.append('image', this.fileImage);
				}
				formData.set('title', this.title);
				formData.set('description', this.description);
				formData.set('version', this.version);
				formData.set('price', this.price);
				formData.set('discount', this.discount);
				formData.set('hash', this.hashtags);

				this.$axios.post('http://dev.fastdonate.local/api/mod', formData, {
					    headers: {'Content-Type': 'multipart/form-data'},
				    })
				    .then((data) => {
					    let idmod = data.data.mod.id;
					    this.$notify({
						    title: 'Успешно',
						    message: 'Модификация успешно добавлена',
						    type: 'success',
						    position: 'bottom-right',
					    });
					    this.$router.push('/store/' + idmod);
				    }).catch((err) => {
					    this.$notify({
						    title: 'Ошибка',
						    message: err.response.data.message,
						    type: 'error',
						    position: 'bottom-right',
					    });
				    })
				    .finally(() => this.loading = false);
			},
		},
	};
</script>

<style scoped>
  @media (max-width: 1264px) {
    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }
  }

  @media (min-width: 1264px) {
    .desktop {
      display: block;
    }

    .mobile {
      display: none;
    }
  }
</style>
