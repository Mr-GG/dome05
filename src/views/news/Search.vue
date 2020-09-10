<template>
  <div class="search">
    <div class="header">
      <div class="left">
        <span class="iconfont iconjiantou2" @click="goBack"></span>
      </div>
      <div class="center">
        <input type="text" placeholder="请输入搜索关键字" v-model="key" @keyup.enter="search" @input='recommend'>
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
      <div class="recomend-list" v-if="recommendList.length">
      <div class="item one-txt-cut"
       v-for="item in recommendList"
       :key="item.id"
       @click="gosearch(item.title)"
       >{{item.title}}
       </div>
    </div>
     <div class="list" v-else-if="list.length">
      <hm-post v-for="item in list" :key="item.id" :post='item'></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="list ">
          <div class="item" v-for="item in history" :key="item" @click="gosearch(item)">{{item}}</div>
        </div>
      </div>
      <hr>
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list">
          <div class="item" v-for="item in hot" :key="item" @click="gosearch(item)">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../utils/tool'
export default {
  data () {
    return {
      key: '',
      // 存放搜索结果
      list: [],
      history: [],
      hot: ['关晓彤', '华为', '小米'],
      // 推荐列表
      recommendList: []
    }
  },
  created () {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    async search () {
      if (!this.key) return this.$toast('请输入内容')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
      //  把key添加到缓存中
      //  如果原来有这个历史记录就删除
      //  添加到数组的前面
      this.history = this.history.filter(item => item !== this.key)
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))
      this.recommendList = []
      if (this.list.length === 0) {
        return this.$toast('没有相关内容')
      }
    },
    gosearch (item) {
      console.log('123')
      this.key = item
      this.search()
    },
    goBack () {
      if (this.key) {
        this.key = ''
      } else {
        this.$router.back()
      }
    },
    recommend: debounce(async function () {
      if (this.key === '') return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
      }
    }, 1000)
  },
  watch: {
    key (value) {
      if (value === '') {
        this.list = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .center {
    flex: 1;
    padding: 0 10px;
    position: relative;
    input {
      width: 100%;
      height: 34px;
      border-radius: 17px;
      border: 1px solid #ccc;
      font-size: 14px;
      // padding-left: 30px;
      text-indent: 2em;
    }
    .iconfont {
      position: absolute;
      left: 22px;
      top: 23px;
    }
  }
  .right {
    font-size: 14px;
  }
}
.content {
  padding: 10px;
  .history {
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    margin: 10px 0;
  }
  .list {
    overflow: hidden;
  }
  .item {
    float: left;
    width: 60px;
    height: 30px;
    border: 1px solid #ccc;
    background-color: #ddd;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    margin: 5px;
     overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
  }
}
.recomend-list{
  padding: 0 10px;
  .item{
     border-bottom: 1px solid #ccc;
     height: 30px;
     line-height: 30px;
     font-size: 14px;
  }
}
</style>
