var http = require('http')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlMdcncLcinfoInqire"
var ServiceKey = "gn5ejsq90TNNHM0RqAPfZLH3CqbsjglfdEtVcxywRr3WPeqGRCthdzAmebLE4s25J1iQoVNtAnKxDm7JGpOMVA%3D%3D"
var pageNo = 1
var num = 5

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

  res = []
  for(i in item){
    console.log(item[i])
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
    info['hyotest'] = "this is test!"
    results.push(info)
  }

  return results
}
