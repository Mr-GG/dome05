<template>
  <div class="my-comment">
      <Hmhearder>我的跟帖</Hmhearder>
      <div class="list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check= 'false'
            offset=200
            @load="onLoad"
          >
          <div class="item" v-for="item in list" :key="item.id">
              <div class="time">{{item.create_date | time('YYY-MM-DD HH:mm')}}</div>
          <div class="comment" v-if="item.parent">
              <div class="name">回复:{{item.parent.user.nickname}}</div>
              <div class="comment_content">{{item.parent.conent}}</div>
          </div>
          <div class="content">{{item.comment}}</div>
          <div class="origin">
              <span class="one-txt-cut" @click="$router.push(`/post-detail/${item.post.id}`)">原文:{{item.post.title}}</span>
              <span class="iconfont iconjiantou1"></span>
          </div>
          </div>
          </van-list>
          </van-pull-refresh>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      // 代表正在下拉刷新,数据加载完了改成false代表加载完成
      refreshing: false
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments', {
        // git请求的参数必须放在params或拼接道URL地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.list = data
        this.list = [...this.list, ...data]
        console.log(this.list)
        this.loading = false
        this.refreshing = false

        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    },
    onRefresh () {
      console.log('刷新')
      setTimeout(() => {
        this.pageIndex = 1
        this.loading = true
        this.finished = false
        this.list = []
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang='less'>
.item {
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    .time {
        color: #666;
        padding: 10px 0;
    }
    .comment{
        background-color: #ddd;
        padding:   10px;
        .name{
            color: #666;
            font-size: 14px;
        }
        .comment_content {
            color: #999;
            line-height: 30px;
            margin-top: 10px;
        }
    }
    .content{
        margin: 10px 0 ;
    }
    .origin{
        font-size: 14px;
        color: #999;
        display: flex;
        justify-content: space-between;
    }
    .one-txt-cut{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .text-cut{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
}
</style>
