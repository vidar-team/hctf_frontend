const state = {
  startTime: undefined,
  endTime: undefined
};
const getters = {};
const actions = {};
const mutations = {
  setTime: (state, payload) => {
    state.startTime = payload.startTime;
    state.endTime = payload.endTime;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
