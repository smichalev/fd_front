<template>
  <div>
    <div>
      <div v-if="!loaded">
        <v-card-text>
          <div class="d-flex" style="align-items: center">
            <v-progress-circular
              :size="25"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <span class="ml-4" style="color: darkgrey">Загрузка...</span>
          </div>
        </v-card-text>
      </div>
      <div class="my-4 mx-4" v-if="loaded">
        <div v-if="comments.length > 0">
          <template v-for="(comment, index) in comments">
            <comment :id="'comment-'+ index" class="my-2" :comment="comment" :list="comments" :index="index"></comment>
            <tree v-if="comment.reply > 0" :data="comment.child" :reply="comment.reply" :list="comments"
                  :parent="comment.id" :index="index"></tree>
          </template>
        </div>
        <div v-else>
          <div style="text-align: center">
            <div class="tumbleweed">
              <img src="https://image.flaticon.com/icons/svg/827/827301.svg">
            </div>
            <div style="font-size: 16px; font-weight: bold; color: #000">Комментариев нет</div>
            <div>Пока что никто ничего здесь не комментировал...</div>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="my-0" v-if="$store.state.profile"></v-divider>
    <div v-if="$store.state.profile && loaded" class="px-3 pt-1 pb-2" style="background: #fbfbfb">
      <div class="mt-2">
        <div class="d-flex" style="align-items: center">
          <v-avatar size="50">
            <v-img :src="$store.state.profile.avatar"></v-img>
          </v-avatar>
          <div class="d-flex" style="flex-direction: column; width: 100%;">
            <textarea class="input-reply ml-4" v-model="message"></textarea>
          </div>
        </div>
        <div class="d-flex mt-2" style="justify-content: flex-end;">
          <v-btn elevation="0" color="#0c42ae" dark small @click="send">Отправить</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import comment from './comment';
	import tree from './tree';

	export default {
		data() {
			return {
				hide: false,
				loaded: true,
				comments: [],
				message: '',
			};
		},
		components: {
			comment,
			tree,
		},
		methods: {
			send() {
				this.$axios.post('http://dev.fastdonate.local/api/comment/' + this.$route.params.id,
					{
						id: this.$route.params.id,
						text: this.message,
					}).then((data) => {
					data.data.comments.Creator = {
						id: this.$store.state.profile.id,
						login: this.$store.state.profile.login,
						role: this.$store.state.profile.role,
						avatar: this.$store.state.profile.avatar,
					};
					data.data.comments.child = [];
					this.comments.push(data.data.comments);
					this.message = '';
				});
			},
		},
		mounted() {
			this.$axios.get('http://dev.fastdonate.local/api/comment/' + this.$route.params.id).then((data) => {
				this.comments = data.data.comments;
				this.comments.forEach((item) => {
					item.child = [];
				});
			});
		},
	};
</script>

<style lang="scss" scoped>
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

  .input-reply {
    background: #fff;
    border: 1px solid #ccc;
    outline: none;
    padding: 3px 7px;
    border-radius: 5px;
    min-height: 80px;
    max-height: 200px;

    &:hover {
      border: 1px solid #999999;
    }
  }
</style>
