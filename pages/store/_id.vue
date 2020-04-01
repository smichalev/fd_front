<template>
  <div>
    <v-container fluid style="width: 100%" class="mb-4">
      <div class="d-flex justify-space-between" style="align-items: center">
        <div class="d-flex" style="align-items: center">
          <div class="title" v-if="mod && mod.mod && mod.mod.title">{{ mod.mod.title }}</div>
        </div>
      </div>
      <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 py-2"></v-breadcrumbs>
      <v-card
        class="mx-auto"
        outlined
      >
        <v-img max-height="200" :src="mod.mod.cover" v-if="mod && mod.mod && mod.mod.cover"
               class="mobile"></v-img>
        <v-card-text class="py-0 px-0">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline" v-if="mod.mod.title">{{ mod.mod.title }}</v-list-item-title>
              <v-list-item class="mx-0 my-0 py-0 px-0" style="min-height: 0">
                <el-rate
                  v-model="mod.mod.rates"
                  text-color="#ff9900"
                >
                </el-rate>
              </v-list-item>
            </v-list-item-content>
            <div class="ml-2" style="display: flex; align-items: center">
              <v-btn color="success" elevation="0" class="ml-2" text>
                <v-icon class="mr-1">mdi-shopping</v-icon>
                <span>Купить за {{ mod.mod.price }} ₽</span>
              </v-btn>
            </div>
          </v-list-item>
        </v-card-text>
        <v-divider class="my-0"></v-divider>
        <v-card-text>
          <div class="row" v-if="mod && mod.mod && mod.mod.cover">
            <div class="col-md-9">
              <div style="display: flex;" v-if="mod.mod.version">
                <div style="color: rgba(0, 0, 0, 0.87); font-weight: bold">
                  Версия:
                </div>
                <div class="ml-1">
                  {{ mod.mod.version }}
                </div>
              </div>
              <div class="mt-2">{{ mod.mod.description }}</div>
              <div v-if="mod.mod.Tags.length" class="my-2">
                <v-chip v-for="(tag, id) in mod.mod.Tags" :key="id" label class="mx-1 my-1">#{{ tag.title }}</v-chip>
              </div>
            </div>
            <div class="col-md-3 desktop">
              <v-img :src="mod.mod.cover" v-if="mod && mod.mod && mod.mod.cover" style="border-radius: 5px"></v-img>
            </div>
          </div>
          <div v-else>
            <div>{{ mod.mod.description }}</div>
            <div v-if="mod.mod.Tags.length" class="mt-2">
              <v-chip v-for="(tag, id) in mod.mod.Tags" :key="id" label class="mx-1 my-1">#{{ tag.title }}</v-chip>
            </div>
          </div>
          <v-alert
            text
            dense
            color="teal"
            icon="mdi-clock-fast"
            border="left"
            v-if="mod.mod.updatedAt > mod.mod.createdAt"
          >
            Обновлено: {{ mod.mod.updatedAt }}
          </v-alert>
        </v-card-text>
        <v-divider class="my-0"></v-divider>
        <v-card-text style="background: #fbfbfb;">
          <div style="display: flex; justify-content: space-between; align-items: center">
            <div class="d-flex" style="align-items: center; cursor: pointer;"
                 @click="$router.push('/users/'+ mod.mod.Creator.id)">
              <v-avatar size="40" class="mr-1"><img :src="mod.mod.Creator.avatar"></v-avatar>
              <div>
                <div style="font-weight: bold; color: #000">{{ mod.mod.Creator.login }}</div>
                <div v-if="mod.mod.createdAt">{{ mod.mod.createdAt }}</div>
              </div>
            </div>
            <div>
              <v-btn text color="primary" small>
                <v-icon>mdi-pen</v-icon>
                <span class="ml-2 desktop">Редактировать</span>
              </v-btn>
              <v-btn text color="error" small>
                <v-icon>mdi-information-outline</v-icon>
                <span class="ml-2 desktop">Пожаловаться</span>
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    async asyncData({$axios, route, params, error}) {
      let mod, breadcrumbs;
      try {
        mod = await $axios.$get(`http://dev.fastdonate.local/api/mod/${ params.id }`);
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
          text: 'Магазин скриптов',
          disabled: false,
          to: './#'
        }
      ];
      if (mod && mod.mod && mod.mod.title) {
        breadcrumbs.push({
          text: mod.mod.title
        });
      }
      return {mod, breadcrumbs};
    },
    data: () => ({})
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
