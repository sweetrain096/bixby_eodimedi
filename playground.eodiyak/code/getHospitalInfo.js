var http = require('http')
var db = require('./db.js')
var fn = require('./fn.js')
var console = require('console')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var PharmacyOperation = "getParmacyBassInfoInqire"
var ServiceKey = secret.get('servicekey')

var tMapKey = secret.get('tmapkey')
var tMapUrl = 'https://apis.openapi.sk.com/tmap/routes'

let params = { version: 1 }

module.exports.function = function getHospitalInfo (hospitalSummaryInfo,currentPosition) {
  let info = {}
  console.log(hospitalSummaryInfo.dgNameText)
  info['dgNameText']= hospitalSummaryInfo.dgNameText
  if (hospitalSummaryInfo.dgNameText != "약국"){ // 병원
      console.log("약국이 아니야")
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
      info['dgidIdName'] = fn.makeDgididNameList(item.dgidIdName, item.dutyName)
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
            appKey: tMapKey
        },
        query: {
            totalValue: 2,
            endX: Startlon,
            endY: Startlat,
            startX: Endlon,
            startY: Endlat,
        }
      }
      let TmapResponse = http.postUrl(tMapUrl, params, options).features[0].properties.totalTime
      info['time'] = parseInt(TmapResponse/60)
  } else if (hospitalSummaryInfo.dgNameText == "약국"){ // 약국
    console.log("약국")
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
            appKey: tMapKey
        },
        query: {
            totalValue: 1,
            endX: Startlon, // 128
            endY: Startlat, // 36
            startX: Endlon,
            startY: Endlat,
        }
      }
      let TmapResponse = http.postUrl(tMapUrl, params, options).features[0].properties.totalTime
      info['time'] = parseInt(TmapResponse/60)
  }
  return info
}

