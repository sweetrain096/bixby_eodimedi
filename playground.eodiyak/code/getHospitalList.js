var http = require('http')
var fail = require('fail')
var console = require('console')

var db = require('./db.js')
var fn = require('./fn.js')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"

var Operation = "getHsptlMdcncLcinfoInqire"
var DetailOperation = "getHsptlBassInfoInqire"
var BabyOperation = "getBabyLcinfoInqire"
var PharmacyOperation = "getParmacyLcinfoInqire"
var LocationOperation = "getHsptlMdcncListInfoInqire"
var HpidOperation = "getHsptlBassInfoInqire"

var ServiceKey = secret.get('servicekey')

var pageNo = 1
var num = 30

var tmapkey = secret.get('tmapkey')
var tmapurl = 'https://apis.openapi.sk.com/tmap/routes'

let params = { version: 1 }

var options = {
  format: 'xmljs',
  cacheTime : 0
};

var treatmentList = db.treatmentList



module.exports.function = function getHospitalList(position, baby, dgName, locality, locationName) {
  var ep = ""
  var oper = ""
  var flag = 0
  var isLocal = (locality != undefined)?locality:false //가까운곳을 찾는 것인가?
  var date = new Date()
  var day = date.getDay(); //오늘 무슨 요일인지
  // flag == 0 ERROR
  // flag == 1 병원,달빛병원,약국
  // flag == 2 내과,치과 등
  // flag == 3 지역으로 찾기

  dgName = (dgName!=undefined)?dgName.replace(/ /gi, ""):""
  console.log("this is hyo test 3 : ", dgName)
  
  if(isLocal){
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
      oper = Operation
      flag = 2
    }
  }else{
    ep = EndPoint
    oper = LocationOperation
    flag = 3
  }

  console.log("flag : ", flag)

  var url = ep + oper + "?ServiceKey=" + ServiceKey
  if(isLocal){
    url += "&WGS84_LON=" + position['myPos']['longitude']
      + "&WGS84_LAT=" + position['myPos']['latitude']
      + "&pageNo=" + pageNo
      + "&numOfRows=" + num
  }else{
    var locData = fn.extractArea(locationName)
    if(locData.length==2){
      url += "&Q0=" + locData[0]
        +"&Q1=" + locData[1]
        + "&pageNo=" + pageNo
        + "&numOfRows=" + num
    }else if(locData.length==1){
      url += "&Q0=" + locData[0]
        + "&pageNo=" + pageNo
        + "&numOfRows=" + num
    }else{
      //지역정보를 하나도 못찾았을 경우의 throw를 만들어줘야한다
    }
  }
  console.log(url)
  var searchRes = http.getUrl(url, options)
  console.log(searchRes)
  fn.errorHandling(searchRes)
  let results = new Array // 리턴될 변수 선언

  var item = searchRes.response.body.items.item

  if (item == undefined) { // 검색은 성공적으로 성공하였지만 병원목록이 0개이다.
    throw fail.checkedError('검색결과가 0개일때 나오는 ERROR', 'ErrorNoResults', {})
  }

  else if (item.dutyName) { // 검색결과가 1개일 때,
    let info = {}

    info['dgNameText'] = dgName
    info['startTime'] = (isLocal)?fn.timeFormat(item.startTime):fn.timeFormat(fn.extreactTime(item, day).stime)
    info['endTime'] = (isLocal)?fn.timeFormat(item.endTime):fn.timeFormat(fn.extreactTime(item, day).etime)
    info['dutyName'] = item.dutyName
    info['distance'] = (isLocal)?item.distance:fn.computeDistance(fn.extractPos(item), position['myPos'])
    info['hpid'] = item.hpid
    info['dutyTel1'] = item.dutyTel1

    if ('약국' != dgName) info['dutyDivName'] = item.dutyDivName

    results.push(info)
  } else { // 검색결과가 여러개라면????
    for (i in item) {
      let info = {}

      info['dgNameText'] = dgName
      info['dutyName'] = item[i].dutyName
      info['distance'] = (isLocal)?item[i].distance:fn.computeDistance(fn.extractPos(item[i]), position['myPos'])
      info['hpid'] = item[i].hpid
      info['dutyTel1'] = item[i].dutyTel1
      info['startTime'] = (isLocal)?fn.timeFormat(item[i].startTime):fn.timeFormat(fn.extreactTime(item[i], day).stime)
      info['endTime'] = (isLocal)?fn.timeFormat(item[i].endTime):fn.timeFormat(fn.extreactTime(item[i], day).etime)

      if ('약국' != dgName) info['dutyDivName'] = item[i].dutyDivName
      

      results.push(info)
    }
  }
  // 가까운 병원과 지역구 병원 리스트는 여기까지만 한다
  if(!isLocal) results = fn.sortArr(results)
  if (flag == 1 || flag ==3) return results
  console.log(results)
  // results에는 근처에 있는 모든 병원의 정보가 담겨있다. 여기서 포문을 돌려서 가져온 후, 포함된다면 처리하면된다.

  
  let answer = new Array()
  for (let i = 0; i < results.length; i++) {
    console.log("this is hyo code")
    // 사용자가 찾는 병원인가?
    var tag = false;

    var DgNameList = db.DgNames[results[i].hpid]

    // db.js에 없는 병원을 찾으려고 했던것이다.
    if ( DgNameList == undefined ){
      var hpurl = ep + HpidOperation + "?ServiceKey=" + ServiceKey
        + "&HPID=" + results[i].hpid
        + "&pageNo=1"
        + "&numOfRows=1"

      var sr = http.getUrl(hpurl, options)
      fn.errorHandling(sr)
      DgNameList = sr.response.body.items.item.dgidIdName.split(",")
    }
    
    for (var k = 0; k < DgNameList.length; k++) {
      if (DgNameList[k] == dgName && results[i].dutyName.indexOf("요양병원") == -1) tag = true;
    }

    if (tag) {
      let info = {}
      info['dgNameText'] = dgName
      info['startTime'] = results[i].startTime
      info['endTime'] = results[i].endTime
      info['dutyName'] = results[i].dutyName
      info['distance'] = results[i].distance
      info['hpid'] = results[i].hpid
      info['dutyTel1'] = results[i].dutyTel1
      if ('약국' != dgName) info['dutyDivName'] = results[i].dutyDivName
      
      answer.push(info);
    }
  }

  if (answer.length == 0) {
    throw fail.checkedError('검색결과가 0개일때 나오는 ERROR', 'ErrorNoResults', {})
  }

  return answer
}

