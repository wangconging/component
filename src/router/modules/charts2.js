/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts2',
  component: Layout,
  redirect: '/charts2/echartsNine',
  name: 'Charts2',
  meta: {
    title: 'Charts2',
    icon: 'chart2'
  },
  children: [{
    path: 'echartsOne',
    component: () => import('@/views/Echarts2/echartsOne/echartsOne.vue'),
    name: 'echartsOne',
    meta: { title: '图表1', noCache: true }
  },
  {
    path: 'echartsTwo',
    component: () => import('@/views/Echarts2/echartsTwo.vue'),
    name: 'echartsTwo',
    meta: { title: '图表2', noCache: true }
  },
  {
    path: 'echartsThree',
    component: () => import('@/views/Echarts2/echartsThree.vue'),
    name: 'echartsThree',
    meta: { title: '图表3', noCache: true }
  },
  {
    path: 'echartsFour',
    component: () => import('@/views/Echarts2/echartsFour.vue'),
    name: 'echartsFour',
    meta: { title: '图表4', noCache: true }
  },
  {
    path: 'echartsFive',
    component: () => import('@/views/Echarts2/echartsFive.vue'),
    name: 'echartsFive',
    meta: { title: '图表5', noCache: true }
  }, {
    path: 'echartsSix',
    component: () => import('@/views/Echarts2/echartsSix.vue'),
    name: 'echartsSix',
    meta: { title: '图表6', noCache: true }
  },
  {
    path: 'echartsSeven',
    component: () => import('@/views/Echarts2/echartsSeven.vue'),
    name: 'echartsSeven',
    meta: { title: '图表7', noCache: true }
  }, {
    path: 'echartsEight',
    component: () => import('@/views/Echarts2/echartsEight.vue'),
    name: 'echartsSeven',
    meta: { title: '图表8', noCache: true }
  }, {
    path: 'echartsNine',
    component: () => import('@/views/Echarts2/echartsNine.vue'),
    name: 'echartsNine',
    meta: { title: '图表9', noCache: true }
  }
  ]
}

export default chartsRouter
