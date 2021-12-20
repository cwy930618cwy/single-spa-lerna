// import 'components/dist/components.css'
import * as components from 'components'
import Vue from 'vue';

Object.keys(components).forEach((k) => {
  if (k === 'DialogPlugin') Vue.use((components)[k])
  else Vue.component(k, (components)[k])
})