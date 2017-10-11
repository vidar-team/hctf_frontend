import Vue from 'vue'
import Vuex from 'vuex'

// load modules

import user from './modules/user';
import meta from './modules/meta'

Vue.use(Vuex);

const getters = {};
const actions = {};

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    meta
  }
})
