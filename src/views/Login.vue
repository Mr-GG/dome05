<template>
  <div>
    <Hmhearder>登录</Hmhearder>
    <HmLogo></HmLogo>
     <van-form @submit="login">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules='rules.username'
  />
  <van-field
    v-model="password"
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
       没有账号?去
       <router-link to='./Register'>注册</router-link>
     </div>
  </div>
</template>

<script>
export default {
  created () {
    const { username, password } = this.$route.query
    this.username = username
    this.password = password
  },
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名/手机号', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '用户名长度是3-9位数字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async login () {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        this.$toast.success(message)
        this.$router.push('/user')
      } else {
        this.$toast.fail('登陆失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
body{
  background-color: rgb(245, 245, 245);
}

.tishi{
  font-size: 15px;
  text-align: right;
  a{
    color: orange;
  }
}
</style>
