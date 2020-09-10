import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/user/Register.vue'
import Login from '../views/user/Login.vue'
import User from '../views/user/user.vue'
import userEdit from '../views/user/userEdit.vue'
import Dome from '../views/user/Dome.vue'
import MyFollow from '../views/user/MyFollow.vue'
import Mycomment from '../views/user/Mycomment.vue'
import MyStar from '../views/user/Mystar.vue'
import Index from '../views/news/Index.vue'
import manage from '../views/news/Manage.vue'
import HmPost from '../views/news/PostDetail.vue'
import Search from '../views/news/Search.vue'

// 全局的把push的异常给处理了
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = [
  { path: '/Login', component: Login, name: 'Login' },
  { path: '/Register', component: Register, name: 'Register' },
  { path: '/User', component: User, name: 'user' },
  { path: '/userEdit', component: userEdit, name: 'userEdit' },
  { path: '/Dome', component: Dome, name: 'Dome' },
  { path: '/MyFollow', component: MyFollow, name: 'MyFollow' },
  { path: '/Mycomment', component: Mycomment, name: 'Mycomment' },
  { path: '/MyStar', component: MyStar, name: 'MyStar' },
  { path: '/', component: Index, name: 'Index' },
  { path: '/manage', component: manage, name: 'manage' },
  { path: '/post-detail/:id', component: HmPost, name: 'post-detail' },
  { path: '/search', component: Search, name: 'search' }
]
const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  const authUrls = ['/user', '/userEdit', '/MyFollow', '/Mycomment', '/MyStar']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
