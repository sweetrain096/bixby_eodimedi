var http = require('http')
var fail = require('fail')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlMdcncLcinfoInqire"
var BabyOperation = "getBabyLcinfoInqire"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var PharmacyOperation = "getParmacyLcinfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"
var pageNo = 1
var num = 50



module.exports.function = function getHospitalList(position, baby, pharmacy) {
  const console = require("console")
  var url = ""
  if (baby == true) {
    url = EndPoint + BabyOperation
      + "?ServiceKey=" + ServiceKey
      + "&WGS84_LON=" + position['myPos']['longitude']
      + "&WGS84_LAT=" + position['myPos']['latitude']
      + "&pageNo=" + pageNo
      + "&numOfRows=" + num
  } else if (pharmacy == true){
    url = PharmacyEndPoint + PharmacyOperation 
      + "?Serv iceKey=" + ServiceKey 
      + "&WGS84_LON=" + position['myPos']['longitude']
      + "&WGS84_LAT=" + position['myPos']['latitude']

  } else {
    url = EndPoint + Operation
      + "?ServiceKey=" + ServiceKey
      + "&WGS84_LON=" + position['myPos']['longitude']
      + "&WGS84_LAT=" + position['myPos']['latitude']
      + "&pageNo=" + pageNo
      + "&numOfRows=" + num
  }
  let results = new Array


  var hList = http.getUrl(url, { format: 'xmljs' })

  var response = hList.response
  var resultCode = response.header.resultCode

  if ( resultCode != 00 ) {
    throw fail.checkedError('API 서버가 터졌을때 나오는 ERROR', 'ErrorNotWorking', {})
  }

  var item = response.body.items.item
  if (item == undefined) {
    throw fail.checkedError('검색결과가 0개일때 나오는 ERROR', 'ErrorNoResults', {})
    // let info = {}
    // info['dutyName'] = "null"
    // info['distance'] = "null"
    // info['dutyDivName'] = "null"
    // info['hpid'] = "null"
    // info['dutyTel1'] = "null"
    // info['endTime'] = "null"
    // info['startTime'] = "null"
    // results.push(info)
  } else if (item.dutyName) {
    let info = {}
    if (pharmacy == true){    // 약국 처리
      var stime = item.startTime.substring(0,2) + ":" + item.startTime.substring(2,4)
      var etime = item.endTime.substring(0,2) + ":" + item.endTime.substring(2,4)
      if (stime.charAt(0)==0 && stime.charAt(1)!=0){
        stime = " " + stime.substring(1,5)
      }
      if(etime.charAt(0)==0 && etime.charAt(1)!=0){
        etime = " " + etime.substr(1,5)
      }

      info['startTime'] = stime
      info['endTime'] = etime
      info['isPharmacy'] = true

    } else{   // 약국 아닐때
      info['dutyDivName'] = item.dutyDivName
      info['endTime'] = item.endTime
      info['startTime'] = item.startTime
      info['isPharmacy'] = false
    }
    
    info['dutyName'] = item.dutyName
    info['distance'] = item.distance
    info['hpid'] = item.hpid
    info['dutyTel1'] = item.dutyTel1
    console.log(info)
    results.push(info)
  } else {
    for (i in item) {
      let info = {}
      console.log(pharmacy)
      if (pharmacy == true){
        info['isPharmacy'] = true
      } else{
        info['dutyDivName'] = item[i].dutyDivName
        info['isPharmacy'] = false
      }

      info['dutyName'] = item[i].dutyName
      info['distance'] = item[i].distance
      info['hpid'] = item[i].hpid
      info['dutyTel1'] = item[i].dutyTel1

      var stime = item[i].startTime.substring(0, 2) + ":" + item[i].startTime.substring(2, 4)
      var etime = item[i].endTime.substring(0, 2) + ":" + item[i].endTime.substring(2, 4)
      if (stime.charAt(0) == 0 && stime.charAt(1) != 0) {
        stime = stime.substring(1, 5)
      }
      if (etime.charAt(0) == 0 && etime.charAt(1) != 0) {
        etime = etime.substr(1, 5)
      }
      info['endTime'] = etime
      info['startTime'] = stime
      console.log(info)
      results.push(info)
    }
  }
  
  return results
}
