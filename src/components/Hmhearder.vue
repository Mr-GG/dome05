<template>
    <div class="Hmhearder">
        <div class="back" @click='back'>
            <span class="iconfont iconjiantou2" ></span>
        </div>
        <div class="title"><slot></slot></div>
        <div class="extra"></div>
    </div>
</template>

<script>
export default {
  methods: {
    back () {
      console.log(11)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less'>
.Hmhearder{
  display: flex;
  text-align: center;
  border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  .title{
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
  .back,
  .extra{
    width: 50px;
  }
  .iconfont{
    font-size: 16px;
  }
}
</style>
