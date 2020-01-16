import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import('../pages/login/login.vue')
  },
  {
    path: "/home",
    name: "home",
    component: () => import('../pages/home/home.vue')
  }
]

const router = new Router({
  routes
})

export default router