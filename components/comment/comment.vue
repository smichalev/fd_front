<template>
  <div class="my-2">
    <div class="comment-header">
      <v-avatar size="30" v-if="comment.Creator.avatar">
        <v-img :src="comment.Creator.avatar"></v-img>
      </v-avatar>
      <span class="comment-author mx-1" v-if="comment.Creator.login">{{ comment.Creator.login }}</span>
      <el-tooltip class="item" effect="dark" content="Администрация" placement="top">
        <v-icon class="mr-1" size="14" color="#fd6c6c" v-if="comment.Creator.role === 'ADMIN'">mdi-shield</v-icon>
      </el-tooltip>
      <span class="comment-time mx-1">{{ $moment(comment.createdAt).lang($store.state.lang).fromNow() }}</span>
    </div>
    <div class="comment-content my-1" v-if="comment.text && comment.active">{{ comment.text }}</div>
    <div class="comment-content my-3" v-if="comment.text && !comment.active">
      <v-alert
        text
        dense
        color="default"
        icon="mdi-rocket"
        border="left"
      >
        НЛО прилетело и удалило этот топик здесь
      </v-alert>
    </div>
    <div class="comment-option">
      <v-btn elevation="0" x-small @click="reply" :color="message ? 'error' : ''">
        <v-icon v-if="!message" class="mr-1" size="14">mdi-reply</v-icon>
        <v-icon v-if="message" class="mr-1" size="14">mdi-close</v-icon>
        {{ message ? 'Отмена' : 'Ответить' }}
      </v-btn>
    </div>
    <div v-if="message" class="mt-3">
      <div class="d-flex" style="align-items: center">
        <v-avatar size="50" v-if="$store.state.profile && $store.state.profile.avatar">
          <v-img
            :src="$store.state.profile.avatar"></v-img>
        </v-avatar>
        <div class="d-flex" style="flex-direction: column; width: 100%;">
          <textarea class="input-reply ml-4" v-model="msg"></textarea>
        </div>
      </div>
      <div class="d-flex mt-2" style="justify-content: flex-end;">
        <v-btn elevation="0" color="#0c42ae" dark small @click="send">Отправить</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: ['comment', 'list', 'index'],
		data() {
			return {
				msg: '',
				message: false,
			};
		},
		methods: {
			reply() {
				this.message = !this.message;
				if (!this.message && this.msg.length) {
					this.msg = '';
				}
			},
			send() {
				this.$axios.post('http://dev.fastdonate.local/api/comment/' + this.$route.params.id,
					{
						id: this.$route.params.id,
						text: this.msg,
						parent: this.comment.id,
					}).then((data) => {
					data.data.comments.Creator = {
						id: this.$store.state.profile.id,
						login: this.$store.state.profile.login,
						role: this.$store.state.profile.role,
						avatar: this.$store.state.profile.avatar,
					};
					data.data.comments.child = [];

					this.list[this.index].reply = this.list[this.index].reply + 1;
					this.msg = '';
					this.message = !this.message;
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
  .comment-header {
    display: flex;
    align-items: center;

    .comment-author {
      transform-origin: center center 0;
      transition: all .25s cubic-bezier(.23, 1, .32, 1) 0s;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      color: #222;
      order: 0;
      flex: 0 1 auto;
      align-self: auto;
      margin-right: 6px;
    }

    .comment-time {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: #999;
      letter-spacing: 0;
      line-height: 18px;
    }
  }


  .comment-option {
    display: flex;
    margin-top: 3px;
    margin-bottom: 3px;

    div {
      font-size: 13px;
    }

    .comment-content {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      color: #212121;
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
