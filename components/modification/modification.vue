<template>
  <div>
    <v-card
      class="mx-auto"
      outlined
    >
      <div style="position: absolute; top: -5px; right: -5px; z-index: 3" v-if="data.discount && data.discount < 100">
        <v-chip label color="success" small>-{{ data.discount }}%</v-chip>
      </div>
      <div class="d-flex flex-no-wrap justify-space-between" @click="$router.push('/store/'+ data.id)"
           style="cursor: pointer">
        <div>
          <v-card-title>
            {{ data.title }}
          </v-card-title>
          <v-card-subtitle>
            <el-rate
              v-model="data.rates"
              disabled
              text-color="#ff9900"
            >
            </el-rate>
          </v-card-subtitle>
          <v-card-text style="line-height: 27px" v-if="data.Tags.length">
            <v-chip label v-for="(tag, id) in data.Tags" :key="id" class="my-1 mx-1">#{{ tag.title }}
            </v-chip>
          </v-card-text>
        </div>
        <div>
          <v-avatar class="ma-3" size="125" tile v-if="data.cover">
            <v-img :src="data.cover" style="border-radius: 5px"></v-img>
          </v-avatar>
          <v-avatar class="ma-3" size="125" tile v-if="!data.cover">
            <div
              style="background: #e4e9ed; border-radius: 5px; width: 125px; height: 125px; display: flex; justify-content: center; align-items: center; text-transform: uppercase; color: #afafaf; font-weight: 600">
              no poster
            </div>
          </v-avatar>
        </div>
      </div>
      <div class="mx-2">
        <v-btn elevation="0" small @click="$router.push('/store/'+ data.id+'/#comments')">
          <v-icon class="mr-2">mdi-comment-outline</v-icon>
          {{ data.comments }}
        </v-btn>
      </div>
      <v-card-actions>
        <div class="d-flex" style="align-items: center; cursor: pointer;"
             @click="$router.push('/users/'+ data.Creator.id)">
          <v-avatar size="25" class="mr-1"><img :src="data.Creator.avatar"></v-avatar>
          <div style="font-weight: bold">{{ data.Creator.login }}</div>
        </div>
        <v-spacer></v-spacer>
        <div v-if="((data.price / 100) *
        (100 - data.discount)).toFixed(2) === '0.00'" class="font-weight-bold mr-2"
             style="color: #4caf50; font-size: 17px; text-transform: uppercase">БЕСПЛАТНО
        </div>
        <div v-else class="mr-2">
          <div v-if="data.discount" class="d-flex" style="font-size: 17px">
            <div style="text-decoration: line-through;">{{
              data.price }} ₽
            </div>
            <div style="text-decoration: none; color: #4caf50" class="ml-1 font-weight-bold">{{
              ((data.price / 100) *
              (100 - data.discount)) }} ₽
            </div>
          </div>
          <div v-if="!data.discount" style="font-size: 17px">
            <div style="text-decoration: none; color: #4caf50" class="ml-1 font-weight-bold">{{ data.price }}
              ₽
            </div>
          </div>
        </div>
        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ data.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data: () => ({
      show: false
    })
  };
</script>
