import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/iconfont.css'
import 'amfe-flexible'
import 'jquery'
// 全局注册axios请求
import './utils/request'
// 全局注册组件
import './utils/global'
// 全局注册过滤器
import './utils/filter'
// 全局导入vant
import './utils/vant'
// import { Button } from 'vant'
// Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
