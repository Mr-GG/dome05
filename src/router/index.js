import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import User from '../views/user.vue'
import userEdit from '../views/userEdit.vue'
import Dome from '../views/Dome.vue'

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
  { path: '/Dome', component: Dome, name: 'Dome' }
]
const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (to.name !== '/user' || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
