import Vue from 'vue'
import Vuex from 'vuex'
import currentPosition from './modules/currentPosition.js'
import listData from './modules/listData.js'

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
    currentPosition,
    listData
  }
})