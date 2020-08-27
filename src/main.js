import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import Hmhearder from './components/Hmhearder.vue'
import HmLogo from './components/HmLogo.vue'

Vue.component('HmLogo', HmLogo)
Vue.component('Hmhearder', Hmhearder)
Vue.use(Vant)
// import { Button } from 'vant'
// Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
