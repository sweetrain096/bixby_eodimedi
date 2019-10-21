var http = require('http')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlMdcncLcinfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"
var pageNo = 1
var num = 50

module.exports.function = function getHospitalList (position, hospitalLists, hpId) {
  const console = require("console")
  let results = new Array
    
    // position['myPos']['latitude'] // 위도 
    // position['myPos']['longitude'] // 경도

  var url = EndPoint + Operation 
  + "?ServiceKey=" + ServiceKey 
  + "&WGS84_LON=" + position['myPos']['longitude']
  + "&WGS84_LAT=" + position['myPos']['latitude']
  + "&pageNo=" + pageNo
  + "&numOfRows=" + num

  console.log(url)

  var hList = http.getUrl(url,{format: 'xmljs'})

  var items = hList.response.body.items
  var item = items.item
  if (item.dutyName) {
      let info = {}
      info['dutyName'] = item.dutyName
      info['distance'] = item.distance
      info['dutyDivName'] = item.dutyDivName
      info['hpid'] = item.hpid
      info['dutyTel1'] = item.dutyTel1
      info['endTime'] = item.endTime
      info['startTime'] = item.startTime
      results.push(info)
  } else {
    for(i in item){
      let info = {}
      info['dutyName'] = item[i].dutyName
      info['distance'] = item[i].distance
      info['dutyDivName'] = item[i].dutyDivName
      info['hpid'] = item[i].hpid
      info['dutyTel1'] = item[i].dutyTel1
      
      var stime = item[i].startTime.substring(0,2) + ":" + item[i].startTime.substring(2,4)
    var etime = item[i].endTime.substring(0,2) + ":" + item[i].endTime.substring(2,4)
    if (stime.charAt(0)==0 && stime.charAt(1)!=0){
      stime = stime.substring(1,5)
    }
    if(etime.charAt(0)==0 && etime.charAt(1)!=0){
      etime = etime.substr(1,5)
    }
    info['endTime'] = etime
    info['startTime'] = stime
      results.push(info)
    }
  }
  return results
}
