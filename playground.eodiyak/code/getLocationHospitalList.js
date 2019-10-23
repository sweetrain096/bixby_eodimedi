var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlMdcncListInfoInqire"
var ServiceKey = "K6sYWvqebVyngpczytPk5eOtSHyZapagbhcTDE31E6hsk57L5V8cJdQKn033Fvj4QU7m6jfDg7evWZLIgCHPBw%3D%3D"

var treatmentList = new Array(
  "내과", "소아청소년", "이비인후과",
  "안과", "치과", "피부과",
  "가정의학과", "산부인과", "비뇨기과",
  "외과", "정형외과", "성형외과",
  "흉부외과", "재활의학과", "응급의학과",
  "정신건강의학과", "신경과", "신경외과",
  "영상의학과", "치료방사선과", "핵의학과",
  "해부병리과", "임상병리과",
  "마취통증의학과", "구강안면외과"
)


module.exports.function = function getLocationHospitalList (position, locationName1, locationName2) {
  const console = require("console")

  var enlocation1 = encodeURI(locationName1)
  var enlocation2 = encodeURI(locationName2)

  var url = EndPoint + Operation 
  + "?ServiceKey=" + ServiceKey 
  + "&Q0=" + enlocation1
  + "&Q1=" + enlocation2
  + "&pageNo=1"
  + "&numOfRows=10"

  var details = http.getUrl(url,{format: 'xmljs'})
  var item = details.response.body.items.item
  console.log("thisistest : ",item)
  var result = new Array() 

  for(var i =0; i<item.length; i++){
    var obj = new Object();
    let info = {}
    let url = ""
    info = {
      latitude : item[i].wgs84Lat,
      longitude : item[i].wgs84Lon,
      $id : null,
      $type : "viv.geo.GeoPoint"
    }
    obj.point = info
    obj.dutyAddr = item[i].dutyAddr
    obj.dutyName = item[i].dutyName
    obj.dgidIdName = item[i].dgidIdName
    obj.dutyTel1 = item[i].dutyTel1
    obj.startTime = "tmpdata"
    obj.endTime = "tmpdata"
    obj.currentPosition = position
    obj.distance = "tmpdata"
    obj.dutyDivName = "tmpdata"
    obj.mapUrl = item.dutyName
    url = 'https://search.naver.com/search.naver?query=' + item.dutyName
    obj.url = url
    result.push(obj);
  }
  console.log(result)

  
  return result
  //getDgHospitalInfoList와 똑같은 형식으로 출력해주세요!!!!!
}
