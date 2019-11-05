import api from './api.js'

const callListData = function (position, vars, opCode) {
    let result
    let url
    if (opCode == 1) { // 내 위치 병원 리스트
        url = vars.EndPoint + vars.Operation + "?" +
            "ServiceKey=" + vars.ServiceKey +
            "&WGS84_LON=" + position.longitude +
            "&WGS84_LAT=" + position.latitude +
            "&pageNo=" + vars.pageNo +
            "&numOfRows=" + vars.numOfRows
    } else if (opCode == 2) { // 내 위치 주변 약국

    } else if (opCode == 3) { // 내 위치 주변 달빛

    } else if (opCode == 4) { //내 위치 주변 내과치과
    }
    console.log('##', url)

    api.get(url)
    .then((res) => {
        result = res
    })

    return result
}

export default callListData