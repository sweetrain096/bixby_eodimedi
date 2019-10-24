var http = require('http')
var fail = require('fail')
var console = require('console')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"

var Operation = "getHsptlMdcncLcinfoInqire"
var DetailOperation = "getHsptlBassInfoInqire"
var BabyOperation = "getBabyLcinfoInqire"
var PharmacyOperation = "getParmacyLcinfoInqire"

var ServiceKey = secret.get('servicekey')

var pageNo = 1
var num = 50

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

function makeDgididNameList(originData, hosName) { //원본DgidIdName, 병원이름
  var dgList = new Array();

  if (originData != undefined) {
    var spl = originData.split(",")
    for (var i = 0; i < treatmentList.length; i++) {
      if (hosName.includes(treatmentList[i])) {
        dgList[i] = true;
      } else {
        dgList[i] = false;
        for (var j = 0; j < spl.length; j++) {
          if (treatmentList[i] == spl[j]) {
            dgList[i] = true;
            break
          }
        }
      }
    }
  } else {
    for (var i = 0; i < treatmentList.length; i++) {
      if (hosName.includes(treatmentList[i])) {
        dgList[i] = true;
      } else {
        dgList[i] = false;
      }
    }
  }
  return dgList
}


function TimeFormat(time) {
  if (time == null) {
    time = "알수없음"
  } else {
    time = time.substring(0, 2) + ":" + time.substring(2, 4)
    if (time.charAt(0) == 0 && time.charAt(1) != 0) time = " " + time.substring(1, 5)
  }
  return time
}


module.exports.function = function getHospitalList(position, baby, dgName) {
  var ep = ""
  var oper = ""
  var flag = 0
  // flag == 0 ERROR
  // flag == 1 병원,달빛병원,약국
  // flag == 2 내과,치과 등

  if (baby == true) { //달빛병원 호출
    ep = EndPoint
    oper = BabyOperation
    flag = 1
  } else if (dgName == '병원') { //일반병원 호출
    ep = EndPoint
    oper = Operation
    flag = 1
  } else if (dgName == '약국') { //약국 호출
    ep = PharmacyEndPoint
    oper = PharmacyOperation
    flag = 1
  } else { // 내과,치과 등등 다른 병원들을 호출 할 때,
    ep = EndPoint
    oper = BabyOperation
    flag = 2
  }

  var url = ep + oper + "?ServiceKey=" + ServiceKey
  // 3 일때만 추가적인 작업을 하면된다
  url += "&WGS84_LON=" + position['myPos']['longitude']
    + "&WGS84_LAT=" + position['myPos']['latitude']
    + "&pageNo=" + pageNo
    + "&numOfRows=" + num

  var searchRes = http.getUrl(url, { format: 'xmljs' })
  if (searchRes.response.header.resultCode != 00) throw fail.checkedError('API 서버가 터졌을때 나오는 ERROR', 'ErrorNotWorking', {})

  let results = new Array // 리턴될 변수 선언

  var item = searchRes.response.body.items.item

  if (item == undefined) { // 검색은 성공적으로 성공하였지만 병원목록이 0개이다.
    throw fail.checkedError('검색결과가 0개일때 나오는 ERROR', 'ErrorNoResults', {})
  }

  else if (item.dutyName) { // 검색결과가 1개일 때,
    let info = {}

    info['dgNameText'] = dgName
    info['startTime'] = TimeFormat(item.startTime)
    info['endTime'] = TimeFormat(item.endTime)
    info['dutyName'] = item.dutyName
    info['distance'] = item.distance
    info['hpid'] = item.hpid
    info['dutyTel1'] = item.dutyTel1

    if ('약국' != dgName) info['dutyDivName'] = item.dutyDivName

    results.push(info)
  } else { // 검색결과가 여러개라면????
    for (i in item) {
      let info = {}

      info['dgNameText'] = dgName
      info['dutyName'] = item[i].dutyName
      info['distance'] = item[i].distance
      info['hpid'] = item[i].hpid
      info['dutyTel1'] = item[i].dutyTel1
      info['startTime'] = TimeFormat(item[i].startTime)
      info['endTime'] = TimeFormat(item[i].endTime)

      if ('약국' != dgName) info['dutyDivName'] = item[i].dutyDivName

      results.push(info)
    }
  }
  if (flag == 1) return results

  // results에는 근처에 있는 모든 병원의 정보가 담겨있다. 여기서 포문을 돌려서 가져온 후, 포함된다면 처리하면된다.

  console.log('여기부터 내과시작이다')
  let result = new Array()
  for (let i = 0; i < results.length; i++) {
    var detailUrl = EndPoint + DetailOperation
      + "?ServiceKey=" + ServiceKey
      + "&HPID=" + results[i].hpid
    var details = http.getUrl(detailUrl, { format: 'xmljs' })
    var item = details.response.body.items.item

    // 사용자가 찾는 병원인가?
    var flag = false;
    if (item.dgidIdName != undefined) { // dgidNmae이 하나도 없는 병원일 경우 예외처리
      if (item.dgidIdName.includes(",")) {
        var originDNList = item.dgidIdName.split(",");
        for (var k = 0; k < originDNList.length; k++) {
          if (originDNList[k] == dgName && item.dutyName.indexOf("요양병원") == -1) flag = true;
        }
      } else {
        if (item.dgidIdName == dgName && item.dutyName.indexOf("요양병원") == -1) flag = true;
      }
    }

    if (flag) {
      console.log(item)
      let info = {}
      info['dgNameText'] = dgName
      info['startTime'] = TimeFormat(results[i].startTime)
      info['endTime'] = TimeFormat(results[i].endTime)
      info['dutyName'] = item.dutyName
      info['distance'] = results[i].distance
      info['hpid'] = item.hpid
      info['dutyTel1'] = item.dutyTel1
      if ('약국' != dgName) info['dutyDivName'] = results[i].dutyDivName
      result.push(info);
    }
  }
  console.log(result)
  console.log("내과끝")
  return result
}

