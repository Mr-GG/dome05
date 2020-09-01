<template>
  <div>
      <div class="user-edit">
          <Hmhearder>编辑资料</Hmhearder>
          <!-- 头像 -->
          <div class="avatar">
              <img :src="$axios.defaults.baseURL + user.head_img" alt="">
              <van-uploader :after-read="afterRead" class="van-uploader" />
          </div>
          <!-- 导航 -->
          <HmNavItem @click="showNickname">
              <template >昵称</template>
              <template #content>{{user.nickname}}</template>
          </HmNavItem>
       <HmNavItem @click="showPassword">
              <template>密码</template>
              <template #content>******</template>
          </HmNavItem>
          <HmNavItem @click="showGender">
              <template>性别</template>
              <template #content>{{user.gender ===1? '男':'女'}}</template>
          </HmNavItem>
          <van-dialog v-model="show" title="编辑昵称" show-cancel-button @confirm='updateNickname'>
            <van-field v-model="nickname" ref='nickname' placeholder="请输入用户名" />
            </van-dialog>
            <van-dialog v-model="isshowPassword" title="修改密码" show-cancel-button @confirm='updatepassword'>
            <van-field v-model="Password" ref='ppassword' placeholder="请输入密码" />
            </van-dialog>
            <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm="updateGender">
      <!-- <van-radio-group v-model="gender">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group> -->
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
      </div>
      <div class="mask" v-show="isShowMask">
        <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
        <van-button type="danger" class="cancel" @click="isShowMask=false">取消</van-button>
        <VueCropper
        ref="cropper"
        :img='img'
        autoCrop
        autoCropWidth = '100'
        autoCropHeight = '100'
        ></VueCropper>
      </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

// const {statusCode,data}
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      user: '',
      show: false,
      nickname: '',
      isshowPassword: false,
      Password: '',
      isShowGender: false,
      gender: 1,
      isShowMask: false,
      img: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async showNickname () {
      this.show = true
      this.nickname = this.user.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    async updateUser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      console.log(res)
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    updateNickname () {
      // const userId = localStorage.getItem('userId')
      // const res = this.$axios.post(`/user_update/${userId}`, {
      //   nickname: this.nickname
      // })
      // console.log(res)
      // if (res.data.statusCode === 200) {
      //   // 重新渲染
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        nickname: this.nickname
      })
    },
    async updatepassword () {
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   nickname: this.nickname
      // })
      // console.log(res)
      // if (res.data.statusCode === 200) {
      //   // 重新渲染
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateUser({
        Password: this.Password
      })
    },
    async showPassword () {
      this.isshowPassword = true
      this.Password = this.user.Password
      await this.$nextTick()
      this.$refs.ppassword.focus()
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    updateGender () {
      this.updateUser({
        gender: this.gender
      })
    },
    isImg (name) {
      if (name.endsWith('.gif') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.jpeg')) {
        return true
      } else {
        return false
      }
    },
    afterRead (file) {
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请检查格式是否正确')
      }
      if (file.file.size >= 2000 * 1024) {
        return this.$toast.fail('上传图片太大了')
      }
      this.isShowMask = true
      // console.log(file.content)
      this.img = file.content
    },
    crop () {
      this.$refs.cropper.getCropBlob(async (blob) => {
      // do something
        // console.log(data)
        // 此时可以自行将文件上传至服务器
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          console.log(data.url)
          this.updateUser({
            head_img: data.url
          })
        }
      })
      this.isShowMask = false
    }
  }
}
</script>

<style lang='less' scoped>
    .avatar{
        padding: 40px 0;
        text-align: center;
        img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        .van-uploader{
          position: absolute;
          left: 50%;
          top: 100px;
          transform: translate(-50%);
          width: 100px;
          height: 100px;
          opacity: 0;
        }
    }
    /deep/ .van-dialog__content {
  padding: 15px !important;
  .van-field {
    border: 1px solid #ccc;
  }
}
.mask{
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  .crop,
  .cancel{
    position:fixed;
    top: 0;
    z-index: 1;
  }
   .cancel{
    right: 0;
   }

}
</style>
