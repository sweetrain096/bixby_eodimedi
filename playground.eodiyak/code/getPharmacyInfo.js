var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var Operation = "getParmacyBassInfoInqire"
var ServiceKey = "K6sYWvqebVyngpczytPk5eOtSHyZapagbhcTDE31E6hsk57L5V8cJdQKn033Fvj4QU7m6jfDg7evWZLIgCHPBw%3D%3D"

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
    // info['pWgs84Lat'] = item.wgs84Lat
    // info['pWgs84Lon'] = item.wgs84Lon
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

    return info
}
