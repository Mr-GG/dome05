import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/', component: Login },
  { path: '/Register', component: Register }
]
const router = new VueRouter({
  routes
})
export default router
