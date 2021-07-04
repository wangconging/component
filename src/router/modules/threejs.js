/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/threejs',
  component: Layout,
  redirect: '/ThreeJs/threejsOne',
  name: 'threejs',
  meta: {
    title: 'threejs',
    icon: 'threejs'
  },
  children: [{
    path: 'threejsOne',
    component: () => import('@/views/ThreeJs/three1/three1.vue'),
    name: 'threejsOne',
    meta: { title: '图表1', noCache: true }
  },
  {
    path: 'threejsTwo',
    component: () => import('@/views/ThreeJs/three2/three2.vue'),
    name: 'threejsTwo',
    meta: { title: '图表2', noCache: true }
  },
  {
    path: 'threejsThree',
    component: () => import('@/views/ThreeJs/three3/three3.vue'),
    name: 'threejsThree',
    meta: { title: '图表3', noCache: true }
  },
  {
    path: 'threejsFour',
    component: () => import('@/views/ThreeJs/three4/three4.vue'),
    name: 'threejsFour',
    meta: { title: '图表4', noCache: true }
  },
  {
    path: 'threejsFive',
    component: () => import('@/views/ThreeJs/three5/three5.vue'),
    name: 'threejsFive',
    meta: { title: '图表5', noCache: true }
  }, {
    path: 'threejsSix',
    component: () => import('@/views/ThreeJs/three6/three6.vue'),
    name: 'threejsSix',
    meta: { title: '图表6', noCache: true }
  },
  {
    path: 'threejsSeven',
    component: () => import('@/views/ThreeJs/three7/three7.vue'),
    name: 'threejsSeven',
    meta: { title: '图表7', noCache: true }
  }, {
    path: 'threejsEight',
    component: () => import('@/views/ThreeJs/three8/three8.vue'),
    name: 'threejsEight',
    meta: { title: '图表8', noCache: true }
  }, {
    path: 'threejsNine',
    component: () => import('@/views/ThreeJs/three9/three9.vue'),
    name: 'threejsNine',
    meta: { title: '图表9', noCache: true }
  }, {
    path: 'threejsTen',
    component: () => import('@/views/ThreeJs/three10/three10.vue'),
    name: 'threejsTen',
    meta: { title: '图表9', noCache: true }
  }
  ]
}

export default chartsRouter
