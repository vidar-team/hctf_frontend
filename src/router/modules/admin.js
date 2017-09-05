export default {
  path: "/admin",
  name: "Admin-Layout",
  component: resolve => require(['@/components/Admin/Layout.vue'], resolve),
  children: [
    {
      path: "index",
      name: "Admin-Index",
      component: resolve => require(['@/components/Admin/Index.vue'], resolve)
    },
    {
      path: "team/list",
      name: "Admin-Team-List",
      component: resolve => require(['@/components/Admin/Team.List.vue'], resolve)
    }
  ]
}
