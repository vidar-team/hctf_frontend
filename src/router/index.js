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
        }
      ]
    }
  ]
})
