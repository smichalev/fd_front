<template>
  <div>
    <v-container
      class="text-center"
      fill-height
      style="height: calc(100vh - 58px); display: flex; justify-content: center"
    >
      <div>
        <v-row align="center">
          <v-col>
            <h1 class="display-2" style="font-weight: bold; color: #505050">{{ $store.state.lang === 'ru' ? 'Упс' : 'Whoops' }}, {{ error.statusCode }}</h1>
            <div class="my-2" style="font-weight: bold; color: #505050; font-size: 21px">
              <p v-if="error.statusCode === 301">
                {{ $store.state.lang === 'ru' ? 'Перемещено навсегда' : 'Moved Permanently' }}
              </p>
              <p v-if="error.statusCode === 302">
                {{ $store.state.lang === 'ru' ? 'Найдено' : 'Found' }}
              </p>
              <p v-if="error.statusCode === 303">
                {{ $store.state.lang === 'ru' ? 'Смотрите другое' : 'See Other' }}
              </p>
              <p v-if="error.statusCode === 304">
                {{ $store.state.lang === 'ru' ? 'Не изменен' : 'Not Modified' }}
              </p>
              <p v-if="error.statusCode === 307">
                {{ $store.state.lang === 'ru' ? 'Временный редирект' : 'Temporary Redirect' }}
              </p>
              <p v-if="error.statusCode === 400">
                {{ $store.state.lang === 'ru' ? 'Плохой запрос' : 'Bad Request' }}
              </p>
              <p v-if="error.statusCode === 401">
                {{ $store.state.lang === 'ru' ? 'Неавторизован' : 'Unauthorized' }}
              </p>
              <p v-if="error.statusCode === 403">
                {{ $store.state.lang === 'ru' ? 'Запрещено' : 'Forbidden' }}
              </p>
              <p v-if="error.statusCode === 404">
                {{ $store.state.lang === 'ru' ? 'Не найдено' : 'Not Found' }}
              </p>
              <p v-if="error.statusCode === 405">
                {{ $store.state.lang === 'ru' ? 'Метод не разрешен' : 'Method Not Allowed' }}
              </p>
              <p v-if="error.statusCode === 406">
                {{ $store.state.lang === 'ru' ? 'Неприемлемый' : 'Not Acceptable' }}
              </p>
              <p v-if="error.statusCode === 412">
                {{ $store.state.lang === 'ru' ? 'Предварительное условие не выполнено' : 'Precondition Failed' }}
              </p>
              <p v-if="error.statusCode === 415">
                {{ $store.state.lang === 'ru' ? 'Неподдерживаемый тип носителя' : 'Unsupported Media Type' }}
              </p>
              <p v-if="error.statusCode === 500">
                {{ $store.state.lang === 'ru' ? 'Внутренняя ошибка сервера' : 'Internal Server Error' }}
              </p>
              <p v-if="error.statusCode === 501">
                {{ $store.state.lang === 'ru' ? 'Не реализован' : 'Not Implemented' }}
              </p>
            </div>

            <v-btn
              to="/"
              elevation="0"
              color="#0c42ae"
              dark
            >
              {{ $store.state.lang === 'ru' ? 'На главную страницу' : 'Back to index page' }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
	export default {
		layout: 'empty',
		props: {
			error: {
				type: Object,
				default: null,
			},
		}
	};
</script>

