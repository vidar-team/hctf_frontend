export default {
  path: "/admin",
  name: "Admin-Layout",
  component: resolve => require(['@/components/Admin/Layout.vue'], resolve),
  meta: {
    needLogin: true,
    needAdmin: true
  },
  children: [
    {
      path: "index",
      name: "Admin-Index",
      component: resolve => require(['@/components/Admin/Index.vue'], resolve)
    },
    {
      path: "team/list",
      name: "Admin-Team-List",
      component: resolve => require(['@/components/Admin/Team/List.vue'], resolve)
    },
    {
      path: "challenge/add",
      name: "Admin-Challenge-Add",
      component: resolve => require(['@/components/Admin/Challenge/Create.vue'], resolve)
    },
    {
      path: "challenge/edit",
      name: "Admin-Challenge-Edit",
      component: resolve => require(['@/components/Admin/Challenge/Edit.vue'], resolve)
    },
    {
      path: "challenge/category",
      name: "Admin-Challenge-Category",
      component: resolve => require(['@/components/Admin/Challenge/Category.vue'], resolve)
    },
    {
      path: "challenge/level",
      name: "Admin-Challenge-Level",
      component: resolve => require(['@/components/Admin/Challenge/Level.vue'], resolve)
    }
  ]
}
