const state = {
  teamName: "",
  isLogin: false
};

const getters = {};
const actions = {};
const mutations = {
  setTeamName: (state, payload) => {
    state.teamName = payload;
  },
  login: state => {
    state.isLogin = true;
  },
  logout: state => {
    state.isLogin = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
