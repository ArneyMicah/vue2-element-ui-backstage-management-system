import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import moment from 'moment'
import Bread from '@/components/BreadCrumb.vue'
Vue.component('Bread', Bread)
Vue.config.productionTip = false
Vue.filter('year', function(time){
  let data = moment(time * 1000).format('YYYY-MM-DD  HH:mm:SS')
  return data
})
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts; 
import './assets/icon/iconfont.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
