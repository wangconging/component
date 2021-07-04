import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import chartsRouter from './modules/charts.js'
import chartsRouter2 from './modules/charts2.js'
import vue2Router from './modules/vue2.js'
import threejs from './modules/threejs.js'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/homePage',
    children: [
      {
        path: 'homePage',
        component: () => import('@/views/homePage/homePage.vue'),
        name: 'HomePage',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]
export const asyncRoutes = [

  {
    path: '/systemManage',
    component: Layout,
    redirect: '/systemManage/userManage',
    name: 'SystemManage',
    meta: {
      title: '系统管理',
      icon: 'guide'
    },
    children: [
      {
        path: 'userManage',
        component: () => import('@/views/systemManage/userManage/userManage.vue'),
        name: 'UserManage',
        meta: { title: '用户管理', noCache: true }
      },
      {
        path: 'roleManage',
        component: () => import('@/views/systemManage/roleManage/roleManage/roleManage.vue'),
        name: 'RoleManage',
        meta: { title: '角色管理', noCache: true }
      },
      {
        path: 'menuManage',
        component: () => import('@/views/systemManage/menuManage/menuManage.vue'),
        name: 'MenuManage',
        meta: { title: '菜单管理', noCache: true }
      },
      {
        path: 'allotRole',
        component: () => import('@/views/systemManage/roleManage/allotRole/allotRole.vue'),
        name: 'AllotRole',
        meta: { title: '分配用户', noCache: true }
      },
      {
        path: 'testPage',
        component: () => import('@/views/systemManage/testPage/testPage.vue'),
        name: 'testPage',
        meta: { title: '测试', noCache: true }
      }, {
        path: 'ceshi2',
        component: () => import('@/views/systemManage/testPage/testTwo.vue'),
        name: 'ceshi2',
        meta: { title: '测试', noCache: true }
      },
      {
        path: 'ceshi',
        component: () => import('@/views/pageComponents/ceshi/ceshi.vue'),
        name: 'ceshi',
        meta: { title: '测试页', noCache: true }
      },
      {
        path: 'table',
        component: () => import('@/views/pageComponents/table/table.vue'),
        name: 'table',
        meta: { title: '测试页', noCache: true }
      },
      {
        path: 'VueChuanzhi',
        component: () => import('@/views/VUE/Vue-chuanzhi/parentPage.vue'),
        name: 'VueChuanzhi',
        meta: { title: '传值', noCache: true }
      },
      {
        path: 'directivesDemo',
        component: () => import('@/views/VUE/directivesDemo/directivesDemo.vue'),
        name: 'directivesDemo',
        meta: { title: '自定义指令', noCache: true }
      },
      {
        path: 'VueX',
        component: () => import('@/views/VUE/VueX/VueX.vue'),
        name: 'VueX',
        meta: { title: 'VueX', noCache: true }
      }, {
        path: 'Vue-i18n',
        component: () => import('@/views/VUE/Vue-i18n/Vue-i18n.vue'),
        name: 'Vue-i18n',
        meta: { title: 'Vue-i18n', noCache: true }
      },
      {
        path: 'less',
        component: () => import('@/views/studyCss/useLess/useLess'),
        name: 'less',
        meta: { title: 'less', noCache: true }
      },
      {
        path: 'es601',
        component: () => import('@/views/VUE/ES6Study/es601'),
        name: 'es601',
        meta: { title: 'es601', noCache: true }
      },
      {
        path: 'es602',
        component: () => import('@/views/VUE/ES6Study/es602'),
        name: 'es602',
        meta: { title: 'es602', noCache: true }
      },
      {
        path: 'es603',
        component: () => import('@/views/VUE/ES6Study/es603'),
        name: 'es603',
        meta: { title: 'es603', noCache: true }
      },
      {
        path: 'animation1',
        component: () => import('@/views/VUE/animation/animation1'),
        name: 'animation1',
        meta: { title: '动画1', noCache: true }
      },
      {
        path: 'animation2',
        component: () => import('@/views/VUE/animation/animation2'),
        name: 'animation2',
        meta: { title: '动画2', noCache: true }
      },
      {
        path: 'mock1',
        component: () => import('@/views/mock/mock1'),
        name: 'mock1',
        meta: { title: 'mock1', noCache: true }
      },
      {
        path: 'mock2',
        component: () => import('@/views/mock/mock2'),
        name: 'mock2',
        meta: { title: 'mock2', noCache: true }
      },
      {
        path: 'table1',
        component: () => import('@/views/VUE/table/table1'),
        name: 'Table1',
        meta: { title: 'table1', noCache: true }
      },
      {
        path: 'table2',
        component: () => import('@/views/VUE/table/table2'),
        name: 'table2',
        meta: { title: 'table2', noCache: true }
      },
      {
        path: 'table3',
        component: () => import('@/views/VUE/table/table3'),
        name: 'table3',
        meta: { title: 'table3', noCache: true }
      },
      {
        path: 'table4',
        component: () => import('@/views/VUE/table/table4'),
        name: 'table4',
        meta: { title: 'table4', noCache: true }
      },
      {
        path: 'table5',
        component: () => import('@/views/VUE/table/table5'),
        name: 'table5',
        meta: { title: 'table5', noCache: true }
      }
    ]
  },
  chartsRouter,
  chartsRouter2,
  vue2Router,
  threejs,
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
