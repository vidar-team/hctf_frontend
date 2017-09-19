export default {
  path: "/challenge",
  name: "Challenge-Layout",
  component: resolve => require(['@/components/Challenge/Layout.vue'], resolve),
  meta: {
    needLogin: true
  },
  children: [
    {
      path: "submit",
      name: "Challenge-Submit",
      component: resolve => require(['@/components/Challenge/SubmitFlag.vue'], resolve),
    },
    {
      path: "list",
      name: "Challenge-List",
      component: resolve => require(['@/components/Challenge/List.vue'], resolve)
    }
  ]
}
