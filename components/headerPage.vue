<template>
  <div class="d-flex justify-space-between" style="align-items: center">
    <div class="d-flex flex-column">
      <div class="title">{{ titlePage }}</div>
      <v-breadcrumbs :items="breadcrumbs" small class="mx-0 my-0 px-0 pt-2 pb-0"></v-breadcrumbs>
    </div>
    <div v-if="button && Object.keys(button).length">
      <v-btn elevation="0" color="success" @click="$router.push({path: button.link})" v-if="button.link">
        <v-icon v-if="button.icon">{{ button.icon }}</v-icon>
        <span class="desktop" v-if="button.title">{{ button.title }}</span>
      </v-btn>
      <v-btn elevation="0" color="success" v-if="!button.link">
        <v-icon v-if="button.icon">{{ button.icon }}</v-icon>
        <span class="desktop" v-if="button.title">{{ button.title }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
	export default {
		props: ['breadcrumbs', 'titlePage', 'button'],
		data() {
			return {
				data: '321',
			};
		},
	};
</script>
