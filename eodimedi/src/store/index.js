import Vue from 'vue'
import Vuex from 'vuex'
import currentPosition from './modules/currentPosition.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infoDetail : []
  },
  mutations: {
    setInfoDetail(state, info) {
      state.infoDetail = info
    }
  },
  actions: {},
  modules: {
    currentPosition
  }
})