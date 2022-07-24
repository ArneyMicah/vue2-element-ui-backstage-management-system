import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false
// 引入全局样式
import './style/global.css'
// 引入本地字体图标
import './assets/icon/iconfont.css'
// 引入富文本插件
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
// 引入echarts插件
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts; 
// 引入树状表格插件
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
