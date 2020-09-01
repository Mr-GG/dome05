<template>
<div class="nav-item" @click='clickfn'>
    <div class="title"><slot></slot></div>
    <div class="content"><slot name="content"></slot></div>
    <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
        </div>
</div>
</template>

<script>
export default {
  methods: {
    clickfn () {
      if (this.to) {
        this.$router.push(this.to)
      }
      this.$emit('click')
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang='less' scoped>
.nav-item{

    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
.title{
    flex: 1;
    line-height: 50px;
    font-size: 18px;
    font-weight: 700;
}
.content{
    font-size: 16px;
    color: #aaa;
}
.awrro{
    padding-left: 10px;
}
}
</style>
