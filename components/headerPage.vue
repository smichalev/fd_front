<template>
  <div class="d-flex justify-space-between" style="align-items: center">
    <div class="d-flex flex-column">
      <div class="title">{{ titlePage }}</div>
      <div class="d-flex mx-0 my-0 px-0 pt-2 pb-0">
        <div v-for="(crumb, index) in breadcrumbs" class="d-flex">
          <div v-if="!crumb.disabled">
            <router-link :to="crumb.to">{{ crumb.text }}</router-link>
          </div>
          <div v-else style="color: rgba(0, 0, 0, 0.38);">{{ crumb.text }}</div>
          <div v-if="0 <= index && index < breadcrumbs.length - 1" class="mx-2" style="color: rgba(0, 0, 0, 0.38);">/</div>
        </div>
      </div>
    </div>
    <div v-if="button && Object.keys(button).length && $store.state.profile">
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
