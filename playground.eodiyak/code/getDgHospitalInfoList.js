var http = require('http')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"

//nearHospitalList ==> 근처병원 리스트
// dgidIdName ==> 찾으려는 병원 종류 // 내과, 외과....
//currentPosition ==> 현재 위치
module.exports.function = function getDgHospitalInfoList (nearHospitalList, dgidIdName, currentPosition) {

  const console = require("console")
  //우리가 리턴할것은 결국 커다란 structure == object 이다 (result)
  // 그 안에 들어간 속성 하나의 이름이 'HospitalInfo'이고, 그 속성이 배열의 형태를 가질 수 있는것이다
  // result['HospitalInfo'] <- 이것이 하나의 배열이라 생각하고, 보낼 값들을 push 하면 된다.
  var result = {}
  result['HospitalInfo'] = new Array();

  for (let i = 0; i<nearHospitalList.length; i++){
    var url = EndPoint + Operation 
      + "?ServiceKey=" + ServiceKey 
      + "&HPID=" + nearHospitalList[i].hpid
      var details = http.getUrl(url,{format: 'xmljs'})
      var item = details.response.body.items.item
      if ( item.dgidIdName != undefined && item.dgidIdName.includes(dgidIdName) ) {
        var obj = new Object();
        obj.wgs84Lat = item.wgs84Lat
        obj.wgs84Lon = item.wgs84Lon
        obj.dutyAddr = item.dutyAddr
        obj.dutyName = item.dutyName
        obj.dgidIdName = item.dgidIdName
        obj.dutyTel1 = item.dutyTel1
        obj.startTime = nearHospitalList[i].startTime[0]
        obj.endTime = nearHospitalList[i].endTime[0]
        obj.currentPosition = currentPosition
        result['HospitalInfo'].push(obj);
    }
  }

  return result
}
