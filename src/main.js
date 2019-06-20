import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import VueStringFilter from 'vue-string-filter'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueStringFilter,
  render: h => h(App)
}).$mount('#app')
