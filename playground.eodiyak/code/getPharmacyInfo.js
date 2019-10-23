var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var Operation = "getParmacyBassInfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"

module.exports.function = function getPharmacyInfo (pharmacySummaryInfo,currentPosition) {
  const console = require("console")
  let info = {}
  if ( pharmacySummaryInfo.pHpId == "null" && pharmacySummaryInfo.pStartTime == "null" && pharmacySummaryInfo.pEndTime == "null" ) {
      info['point'] = null
      info['pDutyAddr'] = null
      info['pDutyName'] = null
      info['pDutyTel1'] = null
      info['pStartTime'] = null
      info['pEndTime'] = null
      info['currentPosition'] = null
      info['purl'] = null
  } else {
    var url = EndPoint + Operation 
      + "?ServiceKey=" + ServiceKey 
      + "&HPID=" + pharmacySummaryInfo.pHpId

      var details = http.getUrl(url,{format: 'xmljs'})

      var item = details.response.body.items.item
  
      info['point'] = {
      latitude : item.wgs84Lat,
      longitude : item.wgs84Lon,
      $id : null,
      $type : "viv.geo.GeoPoint"
    }
      
      info['pDutyAddr'] = item.dutyAddr
      info['pDutyName'] = item.dutyName
      info['pDutyTel1'] = item.dutyTel1
      info['pStartTime'] = pharmacySummaryInfo.pStartTime
      info['pEndTime'] = pharmacySummaryInfo.pEndTime
      info['currentPosition'] = currentPosition
      info['purl'] = 'https://search.naver.com/search.naver?query=' + info['pDutyName']
    }
    return info
}
