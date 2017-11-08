// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueD3 from 'vue-d3'
import FishUI from 'fish-ui'
import App from './App'

Vue.config.productionTip = false
Vue.use(FishUI)
Vue.use(VueD3)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
