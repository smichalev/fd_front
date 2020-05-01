<template>
  <div>
    <v-card-text class="py-2">
      <div class="w-100 d-flex">
        <v-avatar v-if="comment && comment.Creator && comment.Creator.avatar">
          <v-img :src="comment.Creator.avatar"></v-img>
        </v-avatar>
        <div class="ml-2" style="width: 100%">
          <div class="d-flex" style="justify-content: space-between">
            <div style="color: #000">
              <span style="font-weight: bold"
                    v-if="comment && comment.Creator && comment.Creator.login && comment.createdAt">{{ comment.Creator.login }}</span>
              <formatDate :date="comment.createdAt"></formatDate>
            </div>
            <div v-if="$store.state.profile && $store.state.profile.id === comment.Creator.id">
              <v-btn x-small elevation="0" color="error" @click="removeComment" text>
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <blockquote class="blockquote mx-0 my-0 px-0 py-0" v-if="comment && comment.text">
            {{ comment.text }}
          </blockquote>
        </div>
      </div>
    </v-card-text>
  </div>
</template>

<script>
  import formatDate from './formatDate';

  export default {
    props: ['comment'],
    components: {
      formatDate
    },
    methods: {
      removeComment() {
        this.$axios.delete('http://dev.fastdonate.local/api/comment/' + this.comment.id)
          .then((data) => {
            this.$emit('removeComment', data);
          })
          .catch((err) => {
              this.$notify({
                title: 'Ошибка',
                message: err.response.data.message,
                type: 'error',
                position: 'bottom-right'
              });
            }
          );
      }
    }
  };
</script>

<style>
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
