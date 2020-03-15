<template>
  <div>
    <v-card
      class="mx-auto"
      outlined
    >
      <div style="position: absolute; top: -5px; right: -5px; z-index: 3" v-if="data.discount">
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
              show-score
              text-color="#ff9900"
              score-template="{value} points">
            </el-rate>
          </v-card-subtitle>

          <v-card-text style="line-height: 27px">
            <v-chip small outlined style="border-radius: 4px">разхештег</v-chip>
            <v-chip small outlined style="border-radius: 4px">1</v-chip>
            <v-chip small outlined style="border-radius: 4px">трихештег</v-chip>
            <v-chip small outlined style="border-radius: 4px">2</v-chip>
            <v-chip small outlined style="border-radius: 4px">трихештег</v-chip>
            <v-chip small outlined style="border-radius: 4px">трихештег</v-chip>
          </v-card-text>
        </div>
        <div>
          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
            <v-img src="https://flixcon.ru/media/no-poster.jpg" style="border-radius: 5px"></v-img>

          </v-avatar>
        </div>
      </div>
      <v-card-actions>
        <div class="d-flex" style="align-items: center">
          <v-avatar size="25" class="mr-1"><img
            :src="data.Creator.avatar"
          ></v-avatar>
          <div class="font-weight-medium">{{ data.Creator.login }}</div>
        </div>
        <v-spacer></v-spacer>
        <div v-if="data.price > 0">
          <div class="d-flex mr-2" v-if="data.discount" style="align-items: center; font-size: 17px">
            <div style="text-decoration: line-through;">{{
              data.price }} ₽
            </div>
            <div style="text-decoration: none; color: #4caf50" class="ml-1 font-weight-bold">{{ ((data.price / 100) *
              (100 - data.discount)).toFixed(2) }} ₽
            </div>
          </div>
          <div v-if="!data.discount" class="font-weight-bold mr-2" style="color: #4caf50; font-size: 17px">{{ data.price }}
            ₽
          </div>
        </div>
        <div v-else>
          <div class="font-weight-bold mr-2" style="color: #4caf50; font-size: 17px; text-transform: uppercase">
            Бесплатно
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
