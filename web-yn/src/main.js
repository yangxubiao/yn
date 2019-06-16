import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
Vue.use(ElementUI, { locale })
locale.use(lang)
axios.defaults.baseURL="http://127.0.0.1:3000"
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
