import Vue from 'vue'
import Vuex from 'vuex'
import currentPosition from './modules/currentPosition.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    currentPosition
  }
})