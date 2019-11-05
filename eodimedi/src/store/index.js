import Vue from 'vue'
import Vuex from 'vuex'
import currentPosition from './modules/currentPosition.js'
import listData from './modules/listData.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    currentPosition,
    listData
  }
})