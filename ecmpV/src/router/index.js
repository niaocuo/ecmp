import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import NotFoundComponent from '../components/NotFoundComponent.vue'
// 提交测试
Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    component: NotFoundComponent
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  }
  ]
})
