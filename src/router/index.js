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
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/dashboard'
  },

  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '例子', icon: 'example' },
    children: [
      // {
      //   path: '/table',
      //   name: 'Table',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: '表格', icon: 'table' }
      // },
      {
        path: '/tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '树', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: '/form',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' }
      }
    ]
  }

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: '菜单',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: '/menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: '菜单1' }
  //     },
  //     {
  //       path: '/menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: '菜单2' }
  //     }
  //   ]
  // },

]
/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  {
    path: '/sysManage',
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
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com',
        meta: { title: '外部链接', icon: 'link' }
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
