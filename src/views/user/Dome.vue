<template>
<div class="demo">
    <van-button class="primary" @click="crop">裁剪</van-button>
    <vue-cropper
    ref="cropper"
    autoCrop
    autoCropWidth = '150'
    autoCropHeight = '150'
    fixed
     img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6CNSaDXLbE-rY4jIEPvI2lLMkstCHw4MzxQ&usqp=CAU"></vue-cropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods: {
    crop () {
      this.$refs.cropper.getCropData(data => {
        console.log(data)
      })
      this.$refs.cropper.getCropBlob((data) => {
      // do something
        console.log(data)
      })
    }
  }
}
</script>

<style lang='less'>
.demo{
    width: 100%;
    height: 100%;
    position: fixed;
}

</style>
