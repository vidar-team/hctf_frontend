// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue Family
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// Element
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'

// NProgress
import NProgress from 'nprogress/nprogress';
import NProgressCss from 'nprogress/nprogress.css';

// global css
import '@/assets/css/global.css';

// global error handler
import GlobalErrorHandler from './plugins/GlobalErrorHandler';

// utils
import Auth from './utils/auth';

// development mode
Vue.config.productionTip = false;
// enable plugins
Vue.use(Element);
Vue.use(GlobalErrorHandler, {
  router: router,
  store: store
});


router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(record => record.meta.needLogin)){
    // 需要登录的操作。
    if (Auth.isLogin()){
      next();
    }
    else{
      store.commit("logout");
      next({
        name: 'User-Login',
        query: {
          'return': to.name
        }
      })
    }
  }
  else{
    next();
  }
});

router.afterEach((options)=>{
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
