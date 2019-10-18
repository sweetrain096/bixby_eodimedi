var http = require('http')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlMdcncLcinfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"
var pageNo = 1
var num = 5

module.exports.function = function getHospitalList (position, hospitalLists, hpId) {
  const console = require("console")
  let results = new Array
    
    // position['myPos']['latitude'] // 위도 
    // position['myPos']['longitude'] // 경도

  

  var url = EndPoint + Operation 
  + "?ServiceKey= " + ServiceKey 
  + "&WGS84_LON=" + position['myPos']['longitude']
  + "&WGS84_LAT=" + position['myPos']['latitude']
  + "&pageNo=" + pageNo
  + "&numOfRows=" + num

  var hList = http.getUrl(url,{format: 'xmljs'})

  var items = hList.response.body.items
  var item = items.item

  res = []
  for(i in item){
    let info = {}
    info['dutyName'] = item[i].dutyName
    info['distance'] = item[i].distance
    info['dutyDivName'] = item[i].dutyDivName
    info['hpid'] = item[i].hpid
    info['dutyTel1'] = item[i].dutyTel1
    info['endTime'] = item[i].endTime
    info['startTime'] = item[i].startTime
    res.push(info)
  }

  return res
}
