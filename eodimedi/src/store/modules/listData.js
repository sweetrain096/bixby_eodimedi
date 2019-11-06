
const state = {
  listData: null
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}



// setListData(state) {
//   let pos = state.currentPosition
//   let opCode = 1

//   if (opCode == 1) { // 내 위치 병원 리스트
//     var url = EndPoint + Operation + "?" +
//       "ServiceKey=" + ServiceKey +
//       "&WGS84_LON=" + pos.longitude +
//       "&WGS84_LAT=" + pos.latitude +
//       "&pageNo=" + pageNo +
//       "&numOfRows=" + numOfRows
//   } else if (opCode == 2) { // 내 위치 주변 약국

//   } else if (opCode == 3) { // 내 위치 주변 달빛

//   } else if (opCode == 4) { //내 위치 주변 내과치과
//   }
//   api.request(url, {method:'get'})
//   .then((res) => {
//     state.listData = res
//   })
// }