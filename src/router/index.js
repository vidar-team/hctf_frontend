import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/user',
      name: 'User-Index',
      component: resolve => require(['../components/User/UserLayout.vue'], resolve),
      children: [
        {
          path: 'register',
          name: 'User-Register',
          component: resolve => require(['../components/User/Register.vue'], resolve),
        },
        {
          path: 'login',
          name: 'User-Login',
          component: resolve => require(['@/components/User/Login.vue'], resolve)
        },
        {
          path: 'index',
          name: 'User-Info',
          component: resolve => require(['@/components/User/Index.vue'], resolve),
          meta: {
            needLogin: true
          }
        }
      ]
    },
    // 已经被封禁
    {
      path: '/banned',
      name: "Banned",
      component: resolve => require(['@/components/Common/Banned.vue'], resolve)
    },
    // 404
    {
      path: '*',
      name: "HTTP-404",
      component: resolve => require(['@/components/Common/404.vue'], resolve)
    }
  ]
})
