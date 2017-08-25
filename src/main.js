// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue Family
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

// Element
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'

// NProgress
import NProgress from 'nprogress/nprogress';
import NProgressCss from 'nprogress/nprogress.css';

// global css
import '@/assets/css/global.css';

// development mode
Vue.config.productionTip = false;

// enable plugins
Vue.use(Element);
Vue.use(Vuex);

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((options)=>{
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
