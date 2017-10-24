const state = {
  startTime: undefined,
  endTime: undefined,
  flagPrefix: undefined,
  flagSuffix: undefined
};
const getters = {};
const actions = {};
const mutations = {
  setTime: (state, payload) => {
    state.startTime = payload.startTime;
    state.endTime = payload.endTime;
  },
  setFlagFormat: (state, payload) => {
    state.flagPrefix = payload.prefix;
    state.flagSuffix = payload.suffix;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
