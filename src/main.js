import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
import './style/global.css'
import './assets/icon/iconfont.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts; 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
