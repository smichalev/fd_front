<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <v-card class="mx-auto"
              outlined>
        <v-card-text>
          <div class="display-1" v-if="error.statusCode === 404">{{ pageNotFound }}</div>
          <div class="display-1" v-else>{{ otherError }}</div>
          <div class="text">Ничего не найдено</div>
          <NuxtLink to="/">
            Вернуться на главную страницу
          </NuxtLink>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
	export default {
		layout: 'empty',
		props: {
			error: {
				type: Object,
				default: null
			}
		},
		data() {
			return {
				pageNotFound: '404',
				otherError: 'An error occurred'
			};
		},
		head() {
			const title =
				this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
			return {
				title
			};
		}
	};
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
</style>
