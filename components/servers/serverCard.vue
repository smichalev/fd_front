<template>
  <div>
    <v-card
      class="mx-auto"
      outlined
    >
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
            {{ data }}
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
