<template>
<div>
 <Hmhearder>注册</Hmhearder>
<HmLogo></HmLogo>
 <van-form @submit="register">
  <van-field
    v-model="user.username"
    name="用户名"
    label="用户名"
    placeholder="请输入用户名/手机号"
    :rules='rules.username'
  />
  <van-field
    v-model="user.nickname"
    name="昵称"
    label="昵称"
    placeholder="昵称"
    :rules='rules.nickname'
  />
  <van-field
    v-model="user.password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="rules.password"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
     <div class="tishi">
       已有账号?去
       <router-link to='./'>登陆</router-link>
     </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名/手机号', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '用户名长度是3-9位数字', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{1,5}$/, message: '昵称长度是1-5位汉子', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // this.$router.push({
        //   path: '/login',
        //   query: {
        //     username: this.user.username,
        //     password: this.user.password
        //   }
        // })
        this.$router.push({
          name: '/login',
          params: {
            username: this.user.username,
            password: this.user.password
          }
        })
      } else {
        this.$toast.fail('注册失败')
      }
    }
  }
}
</script>

<style lang='less'>
.tishi{
  font-size: 16px;
  text-align: right;
  a{
    color: tomato;
  }
}
</style>
