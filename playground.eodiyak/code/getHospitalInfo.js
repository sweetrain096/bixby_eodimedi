 var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var PharmacyOperation = "getParmacyBassInfoInqire"
var ServiceKey = secret.get('servicekey')


var tmapkey = secret.get('tmapkey')
var tmapurl = 'https://apis.openapi.sk.com/tmap/routes'

let params = { version: 1 }

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

function makeDgididNameList(originData, hosName){ //원본DgidIdName, 병원이름
  var dgList = new Array();

  if(originData != undefined){
    var spl = originData.split(",")
    for(var i=0; i<treatmentList.length; i++){
      if(hosName.includes(treatmentList[i])){
        dgList[i] = true;
      }else{
        dgList[i]= false;
        for(var j=0; j<spl.length; j++){
          if(treatmentList[i] == spl[j]){
            dgList[i] = true;
            break
          }
        }
      }
    }
  }else{
    for(var i=0; i<treatmentList.length; i++){
      if(hosName.includes(treatmentList[i])){
        dgList[i] = true;
      }else{
        dgList[i] = false;
      }
    }
  }
  return dgList
}

module.exports.function = function getHospitalInfo (hospitalSummaryInfo,currentPosition) {
  let info = {}
  if (hospitalSummaryInfo.isPharmacy != true){ // 병원
      var url = EndPoint + Operation 
      + "?ServiceKey=" + ServiceKey 
      + "&HPID=" + hospitalSummaryInfo.hpId

      var details = http.getUrl(url,{format: 'xmljs'})
      var item = details.response.body.items.item

      info['point'] = {
        latitude : item.wgs84Lat,
        longitude : item.wgs84Lon,
        $id : null,
        $type : "viv.geo.GeoPoint"
      }
      info['dutyAddr'] = item.dutyAddr
      info['dutyName'] = item.dutyName
      info['dgidIdName'] = makeDgididNameList(item.dgidIdName, item.dutyName)
      info['dutyTel1'] = item.dutyTel1
      info['startTime'] = hospitalSummaryInfo.startTime
      info['endTime'] = hospitalSummaryInfo.endTime
      info['currentPosition'] = currentPosition
      info['url'] = 'https://search.naver.com/search.naver?query=' + info['dutyName']
      info['mapUrl'] = item.dutyName

      let Startlat = currentPosition.latitude
      let Startlon = currentPosition.longitude
      let Endlat = item.wgs84Lat
      let Endlon = item.wgs84Lon

      let options = {
        format: 'json',
        headers: {
            appKey: tmapkey
        },
        query: {
            totalValue: 2,
            endX: Startlon,
            endY: Startlat,
            startX: Endlon,
            startY: Endlat,
        }
      }
      let TmapResponse = http.postUrl(tmapurl, params, options).features[0].properties.totalTime
      info['time'] = parseInt(TmapResponse/60)
  } else if (hospitalSummaryInfo.isPharmacy == true){ // 약국
    var url = PharmacyEndPoint + PharmacyOperation 
      + "?ServiceKey=" + ServiceKey 
      + "&HPID=" + hospitalSummaryInfo.hpId
      var details = http.getUrl(url,{format: 'xmljs'})
      var item = details.response.body.items.item
      info['point'] = {
        latitude : item.wgs84Lat,
        longitude : item.wgs84Lon,
        $id : null,
        $type : "viv.geo.GeoPoint"
      }
      info['dutyAddr'] = item.dutyAddr
      info['dutyName'] = item.dutyName
      info['dutyTel1'] = item.dutyTel1
      info['startTime'] = hospitalSummaryInfo.startTime
      info['endTime'] = hospitalSummaryInfo.endTime
      info['currentPosition'] = currentPosition
      info['url'] = 'https://search.naver.com/search.naver?query=' + info['dutyName']
      info['mapUrl'] = item.dutyName

      let Startlat = currentPosition.latitude
      let Startlon = currentPosition.longitude
      let Endlat = item.wgs84Lat
      let Endlon = item.wgs84Lon

      let options = {
        format: 'json',
        headers: {
            appKey: tmapkey
        },
        query: {
            totalValue: 1,
            endX: Startlon, // 128
            endY: Startlat, // 36
            startX: Endlon,
            startY: Endlat,
        }
      }
      let TmapResponse = http.postUrl(tmapurl, params, options).features[0].properties.totalTime
      info['time'] = parseInt(TmapResponse/60)
  }
  return info
}

