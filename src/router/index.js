import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routers = [
  {
    path: '/',
    redirect: '/testpage'
  },
  {
    path: '/testbtn',
    name: 'testbtn',
    component: resolve => require(['@/views/testbtn'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  {
    path: '/testpage',
    name: 'testpage',
    component: resolve => require(['@/views/testpage'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
];

export default new Router({
  mode: 'history',  // 默认hash
  routes: routers,    //统一管理路由
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
})
