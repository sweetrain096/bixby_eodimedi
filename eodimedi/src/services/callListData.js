import api from './api.js'

const callListData = function (position, vars, opCode) {
    let result
    let url
    if (opCode == 1) { // 내 위치 병원 리스트
        url = vars.EndPoint + vars.Operation + "?" +
            "key=" + vars.ServiceKey +
            "&lon=" + position.longitude +
            "&lat=" + position.latitude +
            "&page=" + vars.pageNo +
            "&row=" + vars.numOfRows
    } else if (opCode == 2) { // 내 위치 주변 약국

    } else if (opCode == 3) { // 내 위치 주변 달빛

    } else if (opCode == 4) { //내 위치 주변 내과치과
    }

    api.get(url)
    .then((res) => {
        return res
    })
}

export default callListData