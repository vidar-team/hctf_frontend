// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue Family
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n';

// Element
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import Element from 'element-ui'

// NProgress
import NProgress from 'nprogress/nprogress';
import NProgressCss from 'nprogress/nprogress.css';

// global css & js
import '@/assets/css/global.css';

// global error handler
import GlobalErrorHandler from './plugins/GlobalErrorHandler';

// utils
import Auth from './utils/auth';

// development mode
Vue.config.productionTip = false;
// enable plugins
Vue.use(Element, {locale});
Vue.use(GlobalErrorHandler, {
  router: router,
  store: store
});

router.beforeEach(async (to, from, next) => {
  if (from.path !== to.path){
    NProgress.start();
  }
  if (to.matched.some(record => record.meta.needLogin)) {
    if (to.matched.some(record => record.meta.needAdmin)) {
      // 需要管理员
      if (await Auth.isAdmin()) {
        next();
      }
      else {
        NProgress.done();
        next({
          name: 'Index'
        })
      }
    }
    else {
      // 需要登录的操作。
      if (Auth.isLogin()) {
        next();
      }
      else {
        store.commit("logout");
        NProgress.done();
        next({
          name: 'User-Login',
          query: {
            'return': to.name
          }
        })
      }
    }
  }
  else {
    next();
  }
});

router.afterEach((options) => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: {App}
});

console.log(`
  _    _  _____          __  __ ______ 
 | |  | |/ ____|   /\\   |  \\/  |  ____|
 | |__| | |  __   /  \\  | \\  / | |__   
 |  __  | | |_ | / /\\ \\ | |\\/| |  __|  
 | |  | | |__| |/ ____ \\| |  | | |____ 
 |_|  |_|\\_____/_/    \\_\\_|  |_|______|
                                       
                                       
      `);
console.log(`
        Vidar Team © 2018
      `);
