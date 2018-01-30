export default [{
  path: "/ranking/index",
  name: "Ranking-Index",
  component: resolve => require(['@/components/Ranking/Index.vue'], resolve),
}, {
  path: "/ranking/weekly",
  name: "Ranking-Weekly",
  component: resolve => require(['@/components/Ranking/Weekly.vue'], resolve),
}]
