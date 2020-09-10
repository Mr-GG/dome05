// 全局过滤器
import Vue from 'vue'
import moment from 'moment'
// Vue.filter('time', input => {
//   return moment(input).format('YYYY-MM-DD')
// })
moment.locale('zh-CN')
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.filter('now', input => {
  return moment(input).fromNow()
})
