var http = require('http')
var fail = require('fail')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlMdcncLcinfoInqire"
var BabyOperation = "getBabyLcinfoInqire"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var PharmacyOperation = "getParmacyLcinfoInqire"
var ServiceKey = secret.get('servicekey')
var pageNo = 1
var num = 50



module.exports.function = function getHospitalList(position, baby, dgName) {

  var ep = ""
  var oper = ""
  // if (baby != true && pharmacy != true ) { //일반병원 호출
  if (dgName == '병원' ) { //일반병원 호출
    ep = EndPoint
    oper = Operation
  } else if (baby == true) { //달빛병원 호출
    ep = EndPoint
    oper =BabyOperation
  } else if (dgName == '약국'){ //약국 호출
    ep = PharmacyEndPoint
    oper = PharmacyOperation
  } else {
    throw fail.checkedError('무언가 잘못되었다..', 'ErrorSomehings', {}) 
  }

  var url = ep + oper
    + "?ServiceKey=" + ServiceKey
    + "&WGS84_LON=" + position['myPos']['longitude']
    + "&WGS84_LAT=" + position['myPos']['latitude']
    + "&pageNo=" + pageNo
    + "&numOfRows=" + num

  var hList = http.getUrl(url, { format: 'xmljs' })
  var response = hList.response
  var resultCode = response.header.resultCode

  let results = new Array // 리턴될 변수 선언
  
  if ( resultCode != 00 ) {
    throw fail.checkedError('API 서버가 터졌을때 나오는 ERROR', 'ErrorNotWorking', {})
  }

  var item = response.body.items.item
  if (item == undefined) { // 검색은 성공적으로 성공하였지만 병원목록이 0개이다.
    throw fail.checkedError('검색결과가 0개일때 나오는 ERROR', 'ErrorNoResults', {})
  } else if (item.dutyName) { // 검색결과가 1개일 때,
    let info = {}
    
    var stime = item.startTime.substring(0,2) + ":" + item.startTime.substring(2,4)
    if(stime.charAt(0)==0 && stime.charAt(1)!=0) stime = " " + stime.substring(1,5)
    info['startTime'] = stime

    var etime = item.endTime.substring(0,2) + ":" + item.endTime.substring(2,4)
    if(etime.charAt(0)==0 && etime.charAt(1)!=0) etime = " " + etime.substr(1,5)
    info['endTime'] = etime
    
    if (pharmacy != true) { // 병원 리스트 1개일때
      info['dutyDivName'] = item.dutyDivName
      info['isPharmacy'] = false
    } else if (pharmacy == true) { // 약국 리스트 1개일때  
      info['isPharmacy'] = true
    } else {
      throw fail.checkedError('무언가 잘못되었다..', 'ErrorSomehings', {})
    }
    info['dutyName'] = item.dutyName
    info['distance'] = item.distance
    info['hpid'] = item.hpid
    info['dutyTel1'] = item.dutyTel1

    results.push(info)
  } else  {
    for (i in item) {
      let info = {}

      if(pharmacy != true) { // 병원
        info['dutyDivName'] = item[i].dutyDivName
        info['isPharmacy'] = false
      } else if(pharmacy == true) { // 약국
        info['isPharmacy'] = true
      } else {
        throw fail.checkedError('무언가 잘못되었다..', 'ErrorSomehings', {})
      }
      info['dutyName'] = item[i].dutyName
      info['distance'] = item[i].distance
      info['hpid'] = item[i].hpid
      info['dutyTel1'] = item[i].dutyTel1

      var stime = item[i].startTime.substring(0, 2) + ":" + item[i].startTime.substring(2, 4)
      if (stime.charAt(0) == 0 && stime.charAt(1) != 0) stime = stime.substring(1, 5)
      info['startTime'] = stime

      var etime = item[i].endTime.substring(0, 2) + ":" + item[i].endTime.substring(2, 4)
      if (etime.charAt(0) == 0 && etime.charAt(1) != 0) etime = etime.substr(1, 5)
      info['endTime'] = etime

      results.push(info)
    }
  }
  
  return results
}
