import './set-public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'
import store from './store'
// const VUE_APP_NAME = process.env.VUE_APP_NAME

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import './icons' // icon
import './permission' // permission control

import "./plugins";

import { startListen } from './eventListener'

Vue.config.productionTip = false

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#root', // 没有挂载点默认挂载到body下
    render: (h) => h(App),
    router,
    store: store,
    beforeCreate() {
      startListen()
    }
  }
})

export const bootstrap = [
  vueLifecycles.bootstrap
]
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
