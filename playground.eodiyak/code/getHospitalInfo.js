var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"

var treatmentList = new Array(
  "내과","소아청소년과","신경과","정신건강의학과","피부과",
  "외과","흉부외과","정형외과","신경외과","성형외과",
  "산부인과","안과","이비인후과","비뇨기과","재활의학과",
  "마취통증의학과","영상의학과","치료방사선과","임상병리과","해부병리과",
  "가정의학과","핵의학과","응급의학과","치과","구강악안면외과"
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
    dgidldList[i] = new Object();
    dgidldList[i].dgIdName = treatmentList[i];

    if(item.dutyName.includes(treatmentList[i])){
      dgidldList[i].isInclude = true;
    }else{
      for(var j=0; j<originDNList.length; j++){
        if(treatmentList[i] == originDNList[j]){
          dgidldList[i].isInclude = true;
        }else{
          dgidldList[i].isInclude = false;
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

