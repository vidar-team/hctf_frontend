export default {
  path: '/user',
  name: 'User-Layout',
  component: resolve => require(['@/components/User/UserLayout.vue'], resolve),
  children: [
    {
      path: 'register',
      name: 'User-Register',
      component: resolve => require(['@/components/User/Register.vue'], resolve),
    },
    {
      path: 'login',
      name: 'User-Login',
      component: resolve => require(['@/components/User/Login.vue'], resolve)
    },
    {
      path: "logout",
      name: "User-Logout",
      component: resolve => require(['@/components/User/Logout.vue'], resolve),
      meta: {
        needLogin: true
      }
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
}
