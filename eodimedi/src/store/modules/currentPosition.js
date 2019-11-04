const state = {
    currentPosition : null
  }
  
  // getters
  const getters = {
  }
  
  // actions
  const actions = {
  }
  
  // mutations
  const mutations = {
      setCurrentPosition(state, payload) {
          state.currentPosition = payload.coords
      }
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }