var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var Operation = "getParmacyBassInfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"

module.exports.function = function getPharmacyInfo (pharmacySummaryInfo,currentPosition) {
  const console = require("console")

  // HPID=C1601135
  var url = EndPoint + Operation 
    + "?ServiceKey=" + ServiceKey 
    + "&HPID=" + pharmacySummaryInfo.pHpId

    var details = http.getUrl(url,{format: 'xmljs'})

    var item = details.response.body.items.item
    console.log(details)
    let info = {}
    info['pWgs84Lat'] = item.wgs84Lat
    info['pWgs84Lon'] = item.wgs84Lon
    info['pDutyAddr'] = item.dutyAddr
    info['pDutyName'] = item.dutyName
    info['pDutyTel1'] = item.dutyTel1
    info['pStartTime'] = pharmacySummaryInfo.pStartTime
    info['pEndTime'] = pharmacySummaryInfo.pEndTime
    info['currentPosition'] = currentPosition

    return info
}
