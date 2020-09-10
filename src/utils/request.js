import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'

// 请求拦截和响应拦截
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(function (response) {
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Toast.fail('登录信息失效')
  }
  return response
})
const URL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL
Vue.prototype.$axios = axios
Vue.prototype.$url = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return URL + url
  }
}
