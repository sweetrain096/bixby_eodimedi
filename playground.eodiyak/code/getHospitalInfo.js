var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"

var treatmentList = new Array(
  "내과", "소아청소년과", "이비인후과",
  "안과", "치과", "피부과",
  "가정의학과", "산부인과", "비뇨기과",
  "외과", "정형외과", "성형외과",
  "흉부외과", "재활의학과", "응급의학과",
  "정신건강의학과", "신경과", "신경외과",
  "영상의학과", "치료방사선과", "핵의학과",
  "해부병리과", "임상병리과", "요양병원",
  "마취통증의학과", "구강악안면외과", "한의원"
)

module.exports.function = function getHospitalInfo (hospitalSummaryInfo,currentPosition) {
  const console = require("console")
  
  let info = {}
  if ( hospitalSummaryInfo.hpId == "null" && hospitalSummaryInfo.startTime == "null" && hospitalSummaryInfo.endTime == "null" ) {
    info['point'] = {
      latitude : null,
      longitude : null,
      $id : null,
      $type : "viv.geo.GeoPoint"
    }
    info['dutyAddr'] = null
    info['dutyName'] = null
    info['dgidIdName'] = null
    info['dutyTel1'] = null
    info['startTime'] = null
    info['endTime'] = null
    info['currentPosition'] = null
    info['url'] = null
    return info
  } else {
    var url = EndPoint + Operation 
    + "?ServiceKey=" + ServiceKey 
    + "&HPID=" + hospitalSummaryInfo.hpId
    var details = http.getUrl(url,{format: 'xmljs'})

    var item = details.response.body.items.item

    var dgidldList = new Array();
    console.log(details.response)
    var originDNList = item.dgidIdName.split(",");

    for(var i=0; i<treatmentList.length; i++){

      if(item.dutyName.includes(treatmentList[i])){
        dgidldList[i] = true;
      }else{
        for(var j=0; j<originDNList.length; j++){
          if(treatmentList[i] == originDNList[j]){
            dgidldList[i] = true;
            break
          }else{
            dgidldList[i] = false;
          }
        }
      }
    }
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
    info['mapUrl'] = item.dutyName
  }
    return info

    
  // let Apointlat = '36.355064'
  // let Apointlong = '127.298356'

  // let Bpointlat = '37.492711'
  // let Bpointlong = '127.046315'


  // var tmapkey = secret.get('tmapkey')
  // var tmapurl = 'https://apis.openapi.sk.com/tmap/routes'

  // let params = { version: 1 }

  // let options = {
  //   format: 'json',
  //   headers: {
  //     appKey: tmapkey
  //   },
  //   query: {
  //     totalValue: 2,
  //     endX: Apointlong, // 128
  //     endY: Apointlat, // 36
  //     startX: Bpointlong,
  //     startY: Bpointlat,
  //   }
  // }


  // let tmapreq = http.postUrl(tmapurl, params, options).features[0].properties

  // totalDistance:154959
  // totalTime:7688
  // totalFare:10100
  // taxiFare:144100


}

