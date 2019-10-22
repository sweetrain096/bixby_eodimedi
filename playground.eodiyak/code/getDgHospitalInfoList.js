var http = require('http')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"

//nearHospitalList ==> 근처병원 리스트
// dgidIdName ==> 찾으려는 병원 종류 // 내과, 외과....
//currentPosition ==> 현재 위치
module.exports.function = function getDgHospitalInfoList (nearHospitalList, dgidIdName, currentPosition) {
  const console = require("console")
  var result = new Array
  console.log("====this is show time! ====")
  console.log(nearHospitalList)
  console.log(dgidIdName)
  console.log(currentPosition)
  console.log("===========")

  for (let i = 0; i<nearHospitalList.length; i++){
    var url = EndPoint + Operation 
      + "?ServiceKey=" + ServiceKey 
      + "&HPID=" + nearHospitalList[i].hpid
      var details = http.getUrl(url,{format: 'xmljs'})
      var item = details.response.body.items.item
      if ( item.dgidIdName != undefined && item.dgidIdName.includes(dgidIdName) ) {
        var obj = new Object();
        let info = {}
        info = {
          latitude : item.wgs84Lat,
          longitude : item.wgs84Lon,
          $id : null,
          $type : "viv.geo.GeoPoint"
        }
        obj.point = info
        obj.dutyAddr = item.dutyAddr
        obj.dutyName = item.dutyName
        obj.dgidIdName = item.dgidIdName
        obj.dutyTel1 = item.dutyTel1
        obj.startTime = nearHospitalList[i].startTime[0]
        obj.endTime = nearHospitalList[i].endTime[0]
        obj.currentPosition = currentPosition
        result.push(obj);
    }
  }

  return result
}
