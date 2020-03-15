const getInitialState = () => {
  return {
    selectedItems: [],
  }
}

// Getters state
export const state = getInitialState()

// Getters
export const getters = {}

// Mutations
export const mutations = {
  setSelectedItems(state, payload) {
    state.selectedItems = payload
  },
}

// Actions
export const actions = {
  // async getPortfolioTimeSeries({ commit, rootState }, payload) {
  //   try {
  //
  //   } catch {
  //
  //   }
  // },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
