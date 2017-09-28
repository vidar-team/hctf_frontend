const state = {
  teamName: "",
  teamId: undefined,
  isLogin: false
};

const getters = {};
const actions = {};
const mutations = {
  setTeamName: (state, payload) => {
    state.teamName = payload;
  },
  setTeamId: (state, payload) => {
    state.teamId = payload;
  },
  enterAdminMode: state => {
    state.isAdmin = true;
  },
  login: state => {
    state.isLogin = true;
  },
  logout: state => {
    state.isLogin = false;
    state.teamName = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
