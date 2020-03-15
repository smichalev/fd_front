<template>
  <div class="d-2">
    <v-card class="mx-auto" outlined>
      <div class="d-flex flex-no-wrap justify-space-between" >
        <div @click="$router.push('/servers/'+ data.id)" style="cursor: pointer">
          <v-card-title>
            Название сервера
          </v-card-title>
          <v-card-text>
            <v-chip small outlined style="border-radius: 4px"><el-rate v-model="data.rates" disabled show-scoretext-color="#ff9900" score-template="{value} points"></el-rate></v-chip>
            <v-chip small outlined style="border-radius: 4px">GAME: {{data.game}}</v-chip>
            <v-chip small outlined>MOD: {{data.mod}}</v-chip>
            <v-chip small outlined>IP: {{ data.host }}:{{ data.port }}</v-chip>
          </v-card-text>
        </div>
        <div>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-avatar class="ma-3" size="75" tile>
            <v-img src="https://flixcon.ru/media/no-poster.jpg" style="border-radius: 5px"></v-img>
          </v-avatar>
        </div>
      </div>

      <v-expand-transition>
        <div v-show="show">
          <v-card-text>
            Владелец: 
            <div class="d-flex" style="align-items: center; cursor: pointer;" @click="$router.push('/users/'+ data.Creator.id)">
              <v-avatar size="25" class="mr-1"><img :src="data.Creator.avatar"></v-avatar>
              <div class="font-weight-medium">{{ data.Creator.login }}</div>
            </div>
            <v-card-text style="line-height: 27px">
              Тэги:
              <v-chip small outlined style="border-radius: 4px">трихештег</v-chip>
              <v-chip small outlined style="border-radius: 4px">трихештег</v-chip>
              <v-chip small outlined style="border-radius: 4px">трихештег</v-chip>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-divider></v-divider>
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
