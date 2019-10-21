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

module.exports.function = function getHospitalInfo (hpId) {
  const console = require("console")
  
  var url = EndPoint + Operation 
  + "?ServiceKey=" + ServiceKey 
  + "&HPID=" + hpId
  var details = http.getUrl(url,{format: 'xmljs'})

  var item = details.response.body.items.item

  var res = "true,false,true,false"
  var dgidldList = new Array();
  for(var i=0; i<treatmentList.length; i++){
    if(item.dgidIdName.includes(treatmentList[i])){
        dgidldList[i] = true
    }else{
        dgidldList[i] = false
    }
  }
  

  let info = {}
  info['wgs84Lat'] = item.wgs84Lat
  info['wgs84Lon'] = item.wgs84Lon
  info['dutyAddr'] = item.dutyAddr
  info['dutyName'] = item.dutyName
  info['dgidIdName'] = dgidldList
  info['dutyTel1'] = item.dutyTel1
  // info['startTime'] = startTime
  // info['endTime'] = endTime


  return info
}