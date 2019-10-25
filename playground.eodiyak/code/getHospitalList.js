var http = require('http')
var fail = require('fail')
var db = require('./db.js')
var console = require('console')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"

var Operation = "getHsptlMdcncLcinfoInqire"
var DetailOperation = "getHsptlBassInfoInqire"
var BabyOperation = "getBabyLcinfoInqire"
var PharmacyOperation = "getParmacyLcinfoInqire"
var LocationOperation = "getHsptlMdcncListInfoInqire"

var ServiceKey = secret.get('servicekey')

var pageNo = 1
var num = 50

var tmapkey = secret.get('tmapkey')
var tmapurl = 'https://apis.openapi.sk.com/tmap/routes'

let params = { version: 1 }

var options = {
  format: 'xmljs',
  //cacheTime : 0
};
var AreaData = {
  서울:["종로구","중구","용산구","성동구","광진구","동대문구","중랑구","성북구","강북구","도봉구","노원구","은평구","서대문구","마포구","양천구","강서구","구로구","금천구","영등포구","동작구","관악구","서초구","강남구","송파구","강동구"],
  부산:["중구","서구","동구","영도구","부산진구","동래구","남구","북구","강서구","해운대구","사하구","금정구","연제구","수영구","사상구","기장군"],
  대구:["중구","동구","서구","남구","북구","수성구","달서구","달성군"],
  인천:["중구","동구","미추홀구","연수구","남동구","부평구","계양구","서구","강화군","옹진군"],
  광주:["동구","서구","남구","북구","광산구"],
  대전:["서구","중구","동구","유성구","대덕구"],
  울산:["중구","남구","동구","북구","울주군"],
  세종:[],
  경기:["수원시","장안구","권선구","팔달구","영통구","성남시","수정구","중원구","분당구","안양시","만안구","동안구","안산시","상록구","단원구","용인시","처인구","기흥구","수지구","광명시","평택시","과천시","오산시","시흥시","군포시","의왕시","하남시","이천시","안성시","김포시","화성시","광주시","여주시","부천시","양평군","고양시","덕양구","일산동구","일산서구","의정부시","동두천시","구리시","남양주시","파주시","양주시","포천시","연천군","가평군"],
  강원:["춘천시","원주시","강릉시","동해시","태백시","속초시","삼척시","홍천군","횡성군","영월군","평창군","정선군","철원군","화천군","양구군","인제군","고성군","양양군"],
  충청:["청주시","상당구","서원구","흥덕구","청원구","충주시","제천시","보은군","옥천군","영동군","진천군","괴산군","음성군","단양군","증평군","천안시","동남구","서북구","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","부여군","서천군","청양군","홍성군","예산군","태안군"],
  전라:["전주시","완산구","덕진구","군산시","익산시","정읍시","남원시","김제시","완주군","진안군","무주군","장수군","임실군","순창군","고창군","부안군","목포시","여수시","순천시","나주시","광양시","담양군","곡성군","구례군","고흥군","보성군","화순군","장흥군","강진군","해남군","영암군","무안군","함평군","영광군","장성군","완도군","진도군","신안군"],
  경상:["포항시","남구","북구","경주시","김천시","안동시","구미시","영주시","영천시","상주시","문경시","경산시","군위군","의성군","청송군","영양군","영덕군","청도군","고령군","성주군","칠곡군","예천군","봉화군","울진군","울릉군","창원시","의창구","성산구","마산합포구","마산회원구","진해구","진주시","통영시","사천시","김해시","밀양시","거제시","양산시","의령군","함안군","창녕군","고성군","남해군","하동군","산청군","함양군","거창군","합천군"],
  제주:["제주시","서귀포시"]
}
var AreaMapping={
  서울:"서울특별시",
  부산:"부산광역시",
  대구:"대구광역시",
  인천:"인천광역시",
  광주:"광주광역시",
  대전:"대전광역시",
  울산:"울산광역시",
  세종:"세종특별자치시",
  경기:"경기",
  강원:"강원",
  충청:"충청",
  전라:"전라",
  경상:"경상",
  제주:"제주"
}

var treatmentList = db.treatmentList


function ErrorHandling(data) {
  if (data.OpenAPI_ServiceResponse != undefined && data.OpenAPI_ServiceResponse.cmmMsgHeader.returnReasonCode == 30)
    throw fail.checkedError('API 서버가 터졌을때 나오는 ERROR', 'ErrorNotWorking', {})
  if (data.response != undefined && data.response.header.resultCode != 00)
    throw fail.checkedError('API 서버가 터졌을때 나오는 ERROR', 'ErrorNotWorking', {})
}

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
    time = "알 수 없음"
  } else {
    time = time.substring(0, 2) + ":" + time.substring(2, 4)
  }
  return time
}

function extractArea(originData){
  var bigArea = null
  var smallArea = null
  var res = new Array();

  for(area in AreaData){
    if(originData.indexOf(area)>=0){
      bigArea = area;
      break;
    }
  }
  if(bigArea!=null){
    var list = AreaData[bigArea];
    bigArea = AreaMapping[bigArea]
    for(var idx=0; idx<list.length; idx++){
      if(originData.indexOf(list[idx])>=0){
        smallArea = list[idx];
        break;
      }
    }
  }else{
    for(item in AreaData){
      var list = AreaData[item]
      for(var idx=0; idx<list.length; idx++){
        if(originData.indexOf(list[idx])>=0){
          smallArea = list[idx];
          break;
        }
      }
    }
  }

  if(bigArea!=null){
    var endata = encodeURI(bigArea)
    res.push(endata)
  }
  if(smallArea!=null){
    var endata = encodeURI(smallArea)
    res.push(endata)
  }
  return res;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; //지구의 반경(km)
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;

    return distance.toFixed(2);
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

function extractPos(item){ //병원 객체
  var obj = new Object()
  obj.latitude = item.wgs84Lat
  obj.longitude = item.wgs84Lon
  return obj
}

function extreactTime(item, day){ // 병원 객체와 오늘 날짜
  var res = new Object()

  var sidx = "dutyTime" + day + "s"
  var eidx = "dutyTime" + day + "c"
  
  res.stime = (item[sidx] != undefined)? item[sidx] : null
  res.etime = (item[eidx] != undefined)? item[eidx] : null

  return res;
}
function sortArr(arr){
  console.log("before", arr)
  arr.sort(function(a,b){
    return a.distance < b.distance ? -1 : a.distance > b.distance ? 1:0;
  })
  console.log("after",arr)
  return arr
}

/////////////////////////////////////////////////

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
    var locData = extractArea(locationName)
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

  var searchRes = http.getUrl(url, options)
  ErrorHandling(searchRes)
  let results = new Array // 리턴될 변수 선언

  var item = searchRes.response.body.items.item

  if (item == undefined) { // 검색은 성공적으로 성공하였지만 병원목록이 0개이다.
    throw fail.checkedError('검색결과가 0개일때 나오는 ERROR', 'ErrorNoResults', {})
  }

  else if (item.dutyName) { // 검색결과가 1개일 때,
    let info = {}

    info['dgNameText'] = dgName
    // info['startTime'] = TimeFormat(item.startTime) // ★
    info['startTime'] = (isLocal)?TimeFormat(item.startTime):TimeFormat(extreactTime(item, day).stime)
    // info['endTime'] = TimeFormat(item.endTime) // ★
    info['endTime'] = (isLocal)?TimeFormat(item.endTime):TimeFormat(extreactTime(item, day).etime)
    info['dutyName'] = item.dutyName
    // info['distance'] = item.distance // ★
    info['distance'] = (isLocal)?item.distance:computeDistance(extractPos(item), position['myPos'])
    info['hpid'] = item.hpid
    info['dutyTel1'] = item.dutyTel1

    if ('약국' != dgName) info['dutyDivName'] = item.dutyDivName

    results.push(info)
  } else { // 검색결과가 여러개라면????
    for (i in item) {
      let info = {}

      info['dgNameText'] = dgName
      info['dutyName'] = item[i].dutyName
      // info['distance'] = item[i].distance // ★
      info['distance'] = (isLocal)?item[i].distance:computeDistance(extractPos(item[i]), position['myPos'])
      info['hpid'] = item[i].hpid
      info['dutyTel1'] = item[i].dutyTel1
      // info['startTime'] = TimeFormat(item[i].startTime) // ★
      // info['endTime'] = TimeFormat(item[i].endTime) // ★
      info['startTime'] = (isLocal)?TimeFormat(item[i].startTime):TimeFormat(extreactTime(item[i], day).stime)
      info['endTime'] = (isLocal)?TimeFormat(item[i].endTime):TimeFormat(extreactTime(item[i], day).etime)

      if ('약국' != dgName) info['dutyDivName'] = item[i].dutyDivName
      else if ('약국' == dgName) info['isPharmacy'] = true

      results.push(info)
    }
  }
  // 가까운 병원과 지역구 병원 리스트는 여기까지만 한다
  if(!isLocal) sortArr(results)
  if (flag == 1 || flag ==3) return results

  // results에는 근처에 있는 모든 병원의 정보가 담겨있다. 여기서 포문을 돌려서 가져온 후, 포함된다면 처리하면된다.

  let answer = new Array()

  for (let i = 0; i < results.length; i++) {
    // 사용자가 찾는 병원인가?
    var tag = false;

    var DgNameList = db.DgNames[results[i].hpid]

    if ( DgNameList == undefined ) continue
    
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
      else if ('약국' == dgName) info['isPharmacy'] = true
      answer.push(info);
    }
  }

  if (answer.length == 0) {
    throw fail.checkedError('검색결과가 0개일때 나오는 ERROR', 'ErrorNoResults', {})
  }

  return answer
}

