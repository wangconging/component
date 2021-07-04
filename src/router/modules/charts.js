/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: '/charts/echartsNine',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [{
    path: 'echartsOne',
    component: () => import('@/views/systemManage/echarts/echartsOne/echartsOne.vue'),
    name: 'echartsOne',
    meta: { title: '图表1', noCache: true }
  },
  {
    path: 'echartsTwo',
    component: () => import('@/views/systemManage/echarts/echartsTwo/echartsTwo.vue'),
    name: 'echartsTwo',
    meta: { title: '图表2', noCache: true }
  },
  {
    path: 'echartsThree',
    component: () => import('@/views/systemManage/echarts/echartsThree/echartsThree.vue'),
    name: 'echartsThree',
    meta: { title: '图表3', noCache: true }
  },
  {
    path: 'echartsFour',
    component: () => import('@/views/systemManage/echarts/echartsFour/echartsFour.vue'),
    name: 'echartsFour',
    meta: { title: '图表4', noCache: true }
  },
  {
    path: 'echartsFive',
    component: () => import('@/views/systemManage/echarts/echartsFive/echartsFive.vue'),
    name: 'echartsFive',
    meta: { title: '图表5', noCache: true }
  }, {
    path: 'echartsSix',
    component: () => import('@/views/systemManage/echarts/echartsSix/echartsSix.vue'),
    name: 'echartsSix',
    meta: { title: '图表6', noCache: true }
  },
  {
    path: 'echartsSeven',
    component: () => import('@/views/systemManage/echarts/echartsSeven/echartsSeven.vue'),
    name: 'echartsSeven',
    meta: { title: '图表7', noCache: true }
  }, {
    path: 'echartsEight',
    component: () => import('@/views/systemManage/echarts/echartsEight/echartsEight.vue'),
    name: 'echartsEight',
    meta: { title: '图表8', noCache: true }
  }, {
    path: 'echartsNine',
    component: () => import('@/views/systemManage/echarts/echartsNine/echartsNine.vue'),
    name: 'echartsNine',
    meta: { title: '图表9', noCache: true }
  }
  ]
}

export default chartsRouter