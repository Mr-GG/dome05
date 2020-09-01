<template>
  <div class="user">
    <div class="header" @click="tiaozhuan">
      <div class="avatar">
        <img :src="base + user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">
          <span v-if='user.gender === 1' class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">
         {{user.create_date | time}}
        </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
        <HmNavItem to="/userEdit">我的关注<template #content>关注的用户</template></HmNavItem>
        <HmNavItem>我的跟帖<template #content>跟帖/回复</template></HmNavItem>
         <HmNavItem>我的收藏<template #content>文章/视频</template></HmNavItem>
         <HmNavItem @click="tiaozhuan" to="./userEdit">设置</HmNavItem>
         <div class="bt">
            <van-button type="primary" size="large" >退出</van-button>
         </div>

  </div>
</template>

<script>
export default {
  async created () {
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    console.log(res)

    const { data, statusCode } = res.data
    if (statusCode === 200) {
      this.user = data
    } // else if (statusCode === 401) {
    //   this.$toast('用户验证失败')
    //   this.$router('/login')
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('userId')
    // }
  },
  computed: {
    base () {
      return this.$axios.defaults.baseURL
    }
  },
  data () {
    return {
      user: ''
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '熏心提示',
          message: '你确定敢退出本系统吗???'
        })
      } catch {
        return this.$toast('我就知道你多舍不得我')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push('/login')
      this.$toast.success('终究还是一个人扛下了所有')
    },
    tiaozhuan () {
      this.$router.push('./userEdit')
    }
  }
}
</script>

<style lang='less' scoped>
.user {
  .bt{
    padding: 20px;
  }
  .header {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 3px solid #ddd;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      padding-left: 20px;
      font-size: 14px;
      .time {
        margin-top: 10px;
        color: #666;
      }
      .iconxingbienan {
        color: #7bbcec;
      }
    }
  }
}
</style>
