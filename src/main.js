import Vue from 'vue'
import App from './App.vue'
import Axios from './api/request'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.scss'
import SIdentify from './components/Identify/Identify.vue'

Vue.component('SIdentify',SIdentify)

Vue.use(ElementUI)

Vue.config.productionTip = false

// 挂载axios
Vue.prototype.$http = Axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
