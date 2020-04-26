<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <v-card class="mx-auto"
              outlined>
        <v-card-text>
          <div class="display-1" v-if="error.statusCode === 301">Moved Permanently</div>
          <div class="display-1" v-if="error.statusCode === 302">Found</div>
          <div class="display-1" v-if="error.statusCode === 303">See Other</div>
          <div class="display-1" v-if="error.statusCode === 304">Not Modified</div>
          <div class="display-1" v-if="error.statusCode === 307">Temporary Redirect</div>
          <div class="display-1" v-if="error.statusCode === 400">Bad Request</div>
          <div class="display-1" v-if="error.statusCode === 401">Unauthorized</div>
          <div class="display-1" v-if="error.statusCode === 403">Forbidden</div>
          <div class="display-1" v-if="error.statusCode === 404">Not Found</div>
          <div class="display-1" v-if="error.statusCode === 405">Method Not Allowed</div>
          <div class="display-1" v-if="error.statusCode === 406">Not Acceptable</div>
          <div class="display-1" v-if="error.statusCode === 412">Precondition Failed</div>
          <div class="display-1" v-if="error.statusCode === 415">Unsupported Media Type</div>
          <div class="display-1" v-if="error.statusCode === 500">Internal Server Error</div>
          <div class="display-1" v-if="error.statusCode === 501">Not Implemented</div>
          <div class="text">{{ error.message }}</div>
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
      let title = this.otherError;
      if (this.error.statusCode === 400) {
        title = 400;
      }
      if (this.error.statusCode === 401) {
        title = 401;
      }
      if (this.error.statusCode === 402) {
        title = 402;
      }
      if (this.error.statusCode === 403) {
        title = 403;
      }
      if (this.error.statusCode === 404) {
        title = 404;
      }
      if (this.error.statusCode === 405) {
        title = 405;
      }
      if (this.error.statusCode === 406) {
        title = 406;
      }
      if (this.error.statusCode === 407) {
        title = 407;
      }
      if (this.error.statusCode === 408) {
        title = 408;
      }
      if (this.error.statusCode === 409) {
        title = 409;
      }
      if (this.error.statusCode === 410) {
        title = 410;
      }
      if (this.error.statusCode === 500) {
        title = 500;
      }
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
