import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 可以访问所有角色
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/homepage/index'),
    meta: { title: '大屏', icon: 'dashboard' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/tree',
    component: () => import('@/views/tree'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/newdashboard'
  },
  {
    path: '/',
    name: '首页管理',
    component: Layout,
    meta: { title: '首页管理', icon: 'sysManage' },
    children: [
      {
        path: '/newdashboard',
        link: '/newdashboard',
        name: '首页',
        component: () => import('@/views/dashboard/newindex'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '展示页面',
    meta: { title: '展示页面', icon: 'sysManage' },
    hidden: true,
    children: [
      {
        path: '/primarywiringdiagram', // 一次接线图
        name: 'primarywiringdiagram',
        component: () => import('@/views/primarywiringdiagram/index'),
        hidden: true
      },
      {
        path: '/panoramic3Dview', // 全景3D视图
        name: 'panoramic3Dview',
        component: () => import('@/views/panoramic3Dview/index'),
        hidden: true
      },
      {
        path: '/coulometricanalysis', // 电量分析
        name: 'coulometricanalysis',
        component: () => import('@/views/coulometricanalysis/index'),
        hidden: true
      },
      {
        path: '/distribution', // 配变负载率
        name: 'distribution',
        component: () => import('@/views/distributionTransformerLoad/index'),
        hidden: true
      },
      {
        path: '/powerFactor', // 电能质量-功率因数
        name: 'powerFactor',
        component: () => import('@/views/powerQuality/powerFactor'),
        hidden: true
      },
      {
        path: '/voltageDeviation', // 电能质量-电压偏差
        name: 'voltageDeviation',
        component: () => import('@/views/powerQuality/voltageDeviation'),
        hidden: true
      },
      {
        path: '/threePhase', // 电能质量-三项电流不平衡
        name: 'threePhase',
        component: () => import('@/views/powerQuality/threePhase'),
        hidden: true
      },
      // {
      //   path: '/powerQualityWave', // 电能质量-三项电流不平衡
      //   name: 'powerQualityWave',
      //   component: () => import('@/views/powerQuality/powerQualityWave'),
      //   hidden: true
      // },
      {
        path: '/loadAnalysis', // 负荷分析
        name: 'loadAnalysis',
        component: () => import('@/views/loadAnalysis/index'),
        hidden: true
      }
    ]
  }
]
/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    name: 'SysManage',
    meta: { title: '系统管理', icon: 'sysManage' },
    children: [
      {
        path: '/userManage',
        name: 'UserManage',
        component: () => import('@/views/sysManage/userManage'),
        meta: { title: '用户管理', icon: 'userManage' }
      },
      {
        path: '/roleManage',
        name: 'RoleManage',
        component: () => import('@/views/sysManage/roleManage'),
        meta: { title: '角色管理', icon: 'roleManage' }
      },
      {
        path: '/menuManage',
        name: 'MenuManage',
        component: () => import('@/views/sysManage/menuManage'),
        meta: { title: '菜单管理', icon: 'menuManage' }
      },
      {
        path: '/exhibition/:id',
        name: 'Exhibition',
        component: () => import('@/views/filemanagement/Exhibition'),
        hidden: true
      },
      {
        path: '/alarmLog', // 告警记录
        name: 'alarmLog',
        component: () => import('@/views/alarmLog/index'),
        hidden: true
      },
      {
        path: '/transformerMonitoring', // 配变监测
        name: 'transformerMonitoring',
        component: () => import('@/views/transformerMonitoring/index'),
        hidden: true
      },
      {
        path: '/linemonitoring', // 线路监测
        name: 'linemonitoring',
        component: () => import('@/views/transformerMonitoring/index'),
        hidden: true
      },
      {
        path: '/switchMonitoring', // 开关监测
        name: 'switchMonitoring',
        component: () => import('@/views/transformerMonitoring/index'),
        hidden: true
      }

    ]
  },
  { path: '/',
    component: Layout,
    name: 'construction',
    meta: { title: '系统管理', icon: 'sysManage' },
    children: [
      {
        path: '/construction',
        name: 'Construction',
        component: () => import('@/views/construction/index'),
        meta: { title: '建设中...', icon: 'construction' }
      }
    ]
  },
  // 所有角色都可以访问404页必须放在末尾！！！
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
