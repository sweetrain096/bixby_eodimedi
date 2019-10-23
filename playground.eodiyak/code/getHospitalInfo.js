var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
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

module.exports.function = function getHospitalInfo (hospitalSummaryInfo,currentPosition) {
  const console = require("console")
  var url = EndPoint + Operation 
  + "?ServiceKey=" + ServiceKey 
  + "&HPID=" + hospitalSummaryInfo.hpId
  var details = http.getUrl(url,{format: 'xmljs'})

  var item = details.response.body.items.item

  var dgidldList = new Array();
  var originDNList = item.dgidIdName.split(",");

  for(var i=0; i<treatmentList.length; i++){

    if(item.dutyName.includes(treatmentList[i])){
      dgidldList[i] = true;
    }else{
      for(var j=0; j<originDNList.length; j++){
        if(treatmentList[i] == originDNList[j]){
          dgidldList[i] = true;
        }else{
          dgidldList[i] = false;
        }
      }
    }
  }
  let info = {}
  info['point'] = {
    latitude : item.wgs84Lat,
    longitude : item.wgs84Lon,
    $id : null,
    $type : "viv.geo.GeoPoint"
  }
  info['dutyAddr'] = item.dutyAddr
  info['dutyName'] = item.dutyName
  info['dgidIdName'] = dgidldList
  info['dutyTel1'] = item.dutyTel1
  info['startTime'] = hospitalSummaryInfo.startTime
  info['endTime'] = hospitalSummaryInfo.endTime
  info['currentPosition'] = currentPosition
  info['url'] = 'https://search.naver.com/search.naver?query=' + info['dutyName']

  return info
}

