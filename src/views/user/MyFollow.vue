<template>
  <div class="my-folow">
      <Hmhearder>我的关注</Hmhearder>
      <div class="list">
          <div class="item" v-for="item in list" :key="item.id">
              <div class="left">
                  <img :src="$base + item.head_img" alt="">
              </div>
              <div class="center">
          <p>{{item.nickname}}</p>
          <p>{{item.create_date | time}}</p>
      </div>
      <div class="right">
          <van-button round type="primary" size="small" @click="unfollow(item.id)">取消关注</van-button>
      </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getFollowList()
  },
  methods: {
    async getFollowList () {
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '你确定要取关吗'
        })
      } catch {
        return this.$toast('取消操作')
      }
      //   确定发送请求,取消关注
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消成功')
        this.getFollowList()
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .item{
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #ccc;
       .left{
            img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
       }
        .center{
            text-align: left;
            font-size: 16px;
            height: 50px;
            line-height: 0px;
            flex: 1;
            padding-left: 40px;
            p{
                height: 10px;
            }
        }
        .right{
            line-height: 50px;
        }
    }
</style>
