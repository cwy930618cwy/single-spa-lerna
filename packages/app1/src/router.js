import Router from 'vue-router'
import Home from './views/Home.vue'
import Guide from './views/Guide.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/app1',
    name: 'Home',
    component: Home
  },
  {
    path: '/app1/guide',
    name: 'Guide',
    component: Guide
  }
]

const router = new VueRouter({
  // mode: 'history',
  // 通过环境变量来配置路由的 base url
  // base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router