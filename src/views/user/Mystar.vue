<template>
  <div class="mystar">
      <Hmhearder>我的收藏</Hmhearder>
      <div class="list">
        <HmPost v-for="item in list" :key="item.id" :post='item'></HmPost>
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
    this.getStarList()
  },
  methods: {
    async getStarList () {
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        this.list.forEach(item => {
          item.comment_length = item.comments.length
        })
        console.log(this.list)
      }
    }
  }

}
</script>

<style lang='less' scoped>
</style>
