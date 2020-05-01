<template>
  <div>
    <v-card outlined>
      <div style="background: #0c42ae; color: #fff; font-size: 20px" class="px-4 py-2">
        Комментарии
      </div>
      <div id="comments">
        <v-card-text v-if="loading">
          <div style="text-align: center">
            <v-progress-circular
              :size="40"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-card-text>
        <v-card-text v-if="!loading && !comments.length">
          <div style="text-align: center">
            <div class="tumbleweed">
              <img src="http://dev.fastdonate.local/api/images/tumbleweed.png">
            </div>
            <div style="font-size: 16px; font-weight: bold; color: #000">Комментариев нет</div>
            <div>Пока что никто ничего здесь не комментировал...</div>
          </div>
        </v-card-text>
        <div v-if="!loading && comments.length">
          <div v-for="(comment, key) in comments">
            <comment :comment="comment" v-on:removeComment="removeComment" v-if="key !== comments.length-1"
                     style="border-bottom: 1px dashed #ccc"></comment>
            <comment :comment="comment" v-on:removeComment="removeComment" v-else></comment>
          </div>
        </div>
      </div>
      <v-divider class="my-0" v-if="isLogin"></v-divider>
      <v-card-text v-if="isLogin">
        <div style="display: flex;">
          <v-avatar>
            <v-img :src="$store.state.profile.avatar"></v-img>
          </v-avatar>
          <div class="d-flex ml-4" style="flex-direction: column; width: 100%">
            <v-textarea
              outlined
              v-model="textComment"
              label="Комментарий"
              counter
              :rules="rules"
            ></v-textarea>
            <div style="text-align: right;" v-if="loadingbtn === false">
              <v-btn elevation="0" color="success" class="sendcommentbtn" @click="postComment"
                     v-if="textComment.replace(/\s+/g, '').length > 0">Отправить
              </v-btn>
              <v-btn elevation="0" color="success" class="sendcommentbtn" @click="postComment" v-else disabled>
                Отправить
              </v-btn>
            </div>
            <div style="text-align: right;" v-else>
              <v-btn elevation="0" color="success" class="sendcommentbtn" :loading="true">Отправить</v-btn>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import comment from './comment';

  export default {
    props: ['idmod'],
    data: () => ({
      rules: [v => v.length <= 180 || 'Максимальное количество символов 180'],
      textComment: '',
      loading: true,
      loadingbtn: false,
      comments: null,
      show: false
    }),
    components: {
      comment
    },
    mounted() {
      this.loadingComments();
    },
    computed: {
      isLogin() {
        return this.$store.state.profile ? true : false;
      }
    },
    methods: {
      removeComment(data) {
        let newArr = [];
        for (let i = 0; i < this.comments.length; i++) {
          if (this.comments[i].id !== data.data.comment.id) {
            newArr.push(this.comments[i]);
          }
        }
        this.comments = newArr;
        this.$notify({
          title: 'Успешно',
          message: 'Комментарий успешно удален',
          type: 'success',
          position: 'bottom-right'
        });
      },
      loadingComments() {
        this.$axios.get('http://dev.fastdonate.local/api/comment/' + this.idmod).then((data) => {
          this.comments = data.data.comments;
          this.loading = false;
        }).catch((err) => {
          this.$notify({
            title: 'Ошибка',
            message: err.message,
            type: 'error',
            position: 'bottom-right'
          });
          this.loading = false;
        });
      },
      postComment() {
        this.loadingbtn = true;
        this.$axios.post('http://dev.fastdonate.local/api/comment/' + this.idmod, {
          text: this.textComment
        }).then((data) => {
          this.textComment = '';
          let newComment = data.data.comments;
          newComment.Creator = {
            id: this.$store.state.profile.id,
            avatar: this.$store.state.profile.avatar,
            login: this.$store.state.profile.login
          };
          this.comments.push(newComment);
          this.loadingbtn = false;
        }).catch((err) => {
          this.$notify({
            title: 'Ошибка',
            message: err.response.data.message,
            type: 'error',
            position: 'bottom-right'
          });
          this.loadingbtn = false;
        });
      }
    }
  };
</script>

<style scoped>
  .tumbleweed {
    animation-name: tumbleweedBounce;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transform-origin: bottom;
  }

  .tumbleweed img {
    height: 50px;
    animation-name: tumbleweedRotation;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }


  @keyframes tumbleweedRotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  @keyframes tumbleweedBounce {
    0%, 100% {
      transform: translateX(40px);
    }
    50% {
      transform: translateX(-40px);
    }
  }

  @keyframes tumbleweedBG {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 500px 0;
    }
  }

  @media (max-width: 1264px) {
    .sendcommentbtn {
      width: 100%;
    }

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
