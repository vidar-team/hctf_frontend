import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

// load modules
import user from './modules/user'
import admin from './modules/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    user,
    admin,
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
