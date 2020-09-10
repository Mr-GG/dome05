<template>
  <div class="index">
      <div class="header">
          <div class="logo">
              <span class="iconfont iconnew"></span>
          </div>
          <div class="search">
              <div class="search-box" @click="$router.push('/search')">
                  <span class="iconfont iconsearch"></span>
                  <span>搜索新闻</span>
              </div>
          </div>
          <div class="user" @click="$router.push('/user')">
              <span class="iconfont iconwode"></span>
          </div>
      </div>
                <div>

                  <van-sticky class="more-sticky">
                  <div class="more" @click="$router.push('/manage')">
                    <span class="iconfont iconlianjie"></span>
                  </div>
                    </van-sticky>
              <van-tabs v-model="active" sticky animated swipeable>
                <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
                  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                  <van-list
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                  :immediate-check='false'
                >
                   <HmPost :post='item' v-for="item in newsList" :key="item.id"></HmPost>
                </van-list>
                </van-pull-refresh>
                </van-tab>
                </van-tabs>
          </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 5,
      isLoading: false,
      // 加载状态
      loading: false,
      // 是否加载完成
      finished: false,
      refreshing: false
    }
  },
  created () {
    this.getTabList()
  },
  methods: {
    async getTabList () {
      // 先判断缓存中是否存在
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        this.getNewList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        this.getNewList(this.tabList[0].id)
        // console.log(data)
      }
    },
    // 获取新闻列表
    async getNewList (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)
        this.loading = false
        this.finished = false
        // 判断是否还有更多数据
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        console.log('需要加载更多')
        // 页面加载更多数据
        this.pageIndex++
        // 在不同的导航下面加载不同的数据
        this.getNewList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh () {
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.isLoading = false
      setTimeout(() => {
        this.getNewList(this.tabList[this.value])
      }, 1000)
    }
  },
  watch: {
    active (value) {
      console.log(value)
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewList(this.tabList[value].id)
        console.log(value.id + 'aa')
      }, 1000)
    }
  }
}
</script>

<style lang = 'less' scoped>
.header {
  display: flex;
  height: 50px;
  background-color: #ff0000;
  line-height: 50px;
  text-align: center;
  color: #fff;
  .logo,
  .user {
    width: 70px;
  }
  .logo {
    span {
      font-size: 50px;
    }
  }
  .user {
    span {
      font-size: 24px;
    }
  }
  .search {
    flex: 1;
    .search-box {
      height: 34px;
      line-height: 34px;
      background-color: rgba(255, 255, 255, .5);
      margin-top: 8px;
      border-radius: 17px;
      font-size: 14px;
      span:first-child {
        margin-right: 5px;
      }
    }
  }
}
/deep/.van-tabs__wrap{
  width: 85%;
}
.more {
  width: 15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
.more-sticky{
  /deep/ .van-sticky--fixed {
    z-index: 1000;
  }
}
</style>
