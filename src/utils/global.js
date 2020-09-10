// 全局注册组件
import Vue from 'vue'
import Hmhearder from '../components/Hmhearder.vue'
import HmLogo from '../components/HmLogo.vue'
import HmNavItem from '../components/HmNavItem.vue'
import HmPost from '../components/HmPost.vue'
import HmComment from '../components/HmComment.vue'
import Hmfloor from '../components/Hmfloor.vue'

Vue.component('HmLogo', HmLogo)
Vue.component('Hmhearder', Hmhearder)
Vue.component('HmNavItem', HmNavItem)
Vue.component('HmPost', HmPost)
Vue.component('hm-comment', HmComment)
Vue.component('hm-floor', Hmfloor)
