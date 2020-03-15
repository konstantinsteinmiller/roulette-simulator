import Vue from 'vue'
import Vuex from 'vuex'
import simulator from '@/store/simulator/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    simulator,
  },
  state: {},
  mutations: {},
  actions: {},
})
