import Vue from 'vue'
import VueBus from 'vue-bus'

import Cookies from 'js-cookie'
import i18n from './locales'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import './utils/register'
import '@/styles/index.scss' // global css
import 'echarts-liquidfill'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
// import marked from 'marked'
import * as filters from './filters' // global filters
import * as echarts from 'echarts'
import less from 'less'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
if(process.env.NDDE_ENV !== 'production' ) {
  require('./mock')
}
Vue.use(VXETable)
Vue.use(less)
// Vue.use(marked)
// highlight.js代码高亮插件
import Highlight from './utils/highlight.js' // 这里是你项目highlight.js所在路径
Vue.use(Highlight)
Vue.use(VueBus)
Vue.prototype.$echarts = echarts
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(iView)
Vue.config.productionTip = false
Vue.directive('loadmore', {
  bind(el, binding) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', () => {
      const sign = 10
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
})
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
