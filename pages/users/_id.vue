<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <v-card class="mx-auto" outlined>
        <v-card-text v-if="user">
          {{ user.data.user.id }}
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    async asyncData({$axios, params, error}) {
      let user, breadcrumbs;
      try {
        user = await $axios.get(`http://dev.fastdonate.local/api/users/${ params.id }`);
      }
      catch (e) {
        error({statusCode: e.response.status, message: e.response.data});
      }
      breadcrumbs = [
        {
          text: 'Главная страница',
          disabled: false,
          to: '/'
        },
        {
          text: 'Пользователи',
          disabled: true,
          to: './#'
        }
      ];
      return {user, breadcrumbs};
    },
    data: () => ({
      user: {
        status: 'wait',
        user: [],
        breadcrumbs: []
      }
    })
  };
</script>
