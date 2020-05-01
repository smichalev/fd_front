<template>
  <div v-if="hide">
    <div class="d-flex mt-3 mb-4" style="align-items: center;" @click="loadMore">
      <v-btn elevation="0" x-small style="min-width: 25px; min-height: 30px">
        <v-icon size="14">mdi-plus</v-icon>
      </v-btn>
      <div class="comment-reply ml-2">{{ reply }} {{ countReply(reply) }}</div>
    </div>
  </div>
  <div v-else>
    <div class="mb-4 mt-1">
      <div class="d-flex">
        <div class="comment-history">
          <v-btn elevation="0" x-small style="min-width: 25px; min-height: 30px" @click="hide = !hide">
            <v-icon size="14">mdi-minus</v-icon>
          </v-btn>
          <div class="comment-line" @click="hide = !hide"></div>
        </div>
        <div style="width: 100%">
          <div class="comment-tree my-2" v-for="(item, index) in test">
            <comment :comment="item" :id="'comment-'+ ++index" :list="list" :index="index"></comment>
            <tree v-if="item.reply > 0" :data="item.child" :reply="item.reply" :list="list" :parent="item.id"></tree>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import comment from './comment';

	export default {
		name: 'tree',
		props: ['data', 'reply', 'list', 'parent', 'index'],
		data() {
			return {
				hide: true,
				test: [],
			};
		},
		components: {
			comment,
		},
		methods: {
			close() {
				this.hide = true;
			},
			loadMore() {
				this.$axios.get('http://dev.fastdonate.local/api/comment/' + this.$route.params.id + '/' + this.parent,
					{
						id: this.$route.params.id,
						text: this.message,
					}).then((data) => {
					this.hide = false;
					this.test = data.data.comments;
					data.data.comments.child = [];
					this.list[this.index].child = data.data.comments;
				});
			},
			countReply: (number) => {
				let cases = [2, 0, 1, 1, 1, 2];
				return ['ответ', 'ответа', 'ответов'][(number % 100 > 4 && number % 100 < 20)
				                                      ? 2
				                                      : cases[(number % 10 < 5) ? number % 10 : 5]];
			},
		},
	};
</script>

<style lang="scss" scoped>
  .comment-reply {
    cursor: pointer;
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

  .comment-history {

    margin-top: 5px;

    .comment-line {
      margin: 0 auto;
      margin-top: 5px;
      display: block;
      width: 2px;
      background: #f5f5f5;
      height: calc(100% - 30px);
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        background: #e4e4e4;
      }
    }
  }

  .comment-tree {
    margin-top: 5px;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>

