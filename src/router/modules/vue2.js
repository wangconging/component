/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/vue2',
  component: Layout,
  redirect: '/vue2/render',
  name: 'render',
  meta: {
    title: 'render',
    icon: 'render'
  },
  children: [{
    path: 'render',
    component: () => import('@/views/VUE2/render/render.vue'),
    name: 'render',
    meta: { title: 'render', noCache: true }
  }
  ]
}

export default chartsRouter
