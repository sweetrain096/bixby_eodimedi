var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlMdcncListInfoInqire"
var ServiceKey = secret.get('servicekey')

var tmapkey = secret.get('tmapkey')
var tmapurl = 'https://apis.openapi.sk.com/tmap/routes'

let params = { version: 1 }

var treatmentList = new Array(
  "내과", "소아청소년", "이비인후과",
  "안과", "치과", "피부과",
  "가정의학과", "산부인과", "비뇨기과",
  "외과", "정형외과", "성형외과",
  "흉부외과", "재활의학과", "응급의학과",
  "정신건강의학과", "신경과", "신경외과",
  "영상의학과", "치료방사선과", "핵의학과",
  "해부병리과", "임상병리과", "요양병원",
  "마취통증의학과", "구강악안면외과", "한의원"
)

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; //지구의 반경(km)
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

function cuttingTime(time){
  if(time == null){
    time = "알수없음"
  }else{
    time = time.substring(0,2) + ":" + time.substring(2,4)
    if(time.charAt(0)==0 && time.charAt(1)!=0){
      time= " " + time.substring(1,5)
    }
  }
  return time
}

function makeDgididNameList(originData, hosName){ //원본DgidIdName, 병원이름
  var dgList = new Array();

  if(originData != undefined){
    var spl = originData.split(",")
    for(var i=0; i<treatmentList.length; i++){
      if(hosName.includes(treatmentList[i])){
        dgList[i] = true;
      }else{
        dgList[i]= false;
        for(var j=0; j<spl.length; j++){
          if(treatmentList[i] == spl[j]){
            dgList[i] = true;
            break
          }
        }
      }
    }
  }else{
    for(var i=0; i<treatmentList.length; i++){
      if(hosName.includes(treatmentList[i])){
        dgList[i] = true;
      }else{
        dgList[i] = false;
      }
    }
  }
  return dgList
}

function getDgiddData(hpid){
  var operation2 = "getHsptlBassInfoInqire"
  var url = EndPoint + operation2
    + "?ServiceKey=" + ServiceKey 
    + "&HPID=" + hpid
    + "&pageNo=1"
    + "&numOfRows=10"
  
  var details = http.getUrl(url,{format: 'xmljs'})
  //API SERVER ERROR 발생시를 대비한 분기처리
  if(details.response != undefined){
    var item = details.response.body.items.item
    return item.dgidIdName
  }else{
    return ""
  }
}

module.exports.function = function getLocationHospitalList (position, locationName1, locationName2) {  
  const console = require("console")

  var enlocation1 = encodeURI(locationName1)
  var enlocation2 = encodeURI(locationName2)
  
  var today = new Date();
  var day = today.getDay();

  var url = EndPoint + Operation 
  + "?ServiceKey=" + ServiceKey 
  + "&Q0=" + enlocation1
  + "&Q1=" + enlocation2
  + "&QT= " + day
  + "&pageNo=1"
  + "&numOfRows=10"

  var details = http.getUrl(url,{format: 'xmljs'})
  var item = details.response.body.items.item

  var result = new Array() 

  for(var i =0; i<item.length; i++){
    var obj = new Object();
    let url = ""
    let info = {
      latitude : item[i].wgs84Lat,
      longitude : item[i].wgs84Lon,
      $id : null,
      $type : "viv.geo.GeoPoint"
    }
    obj.point = info // 병원이 존재하는 좌표
    obj.currentPosition = position.myPos // 사용자의 좌표
    obj.dutyAddr = item[i].dutyAddr
    obj.dutyName = item[i].dutyName
    obj.dgidIdName = makeDgididNameList(getDgiddData(item[i].hpid), item[i].dutyName)
    obj.dutyTel1 = item[i].dutyTel1

    ////////////////오늘의 진료시간을 알아내기위함
    var sidx = "dutyTime" + day + "s"
    var eidx = "dutyTime" + day + "c"
    var sTime = (item[i][sidx] != undefined)?item[i][sidx]:null
    var eTime = (item[i][eidx] != undefined)?item[i][eidx]:null
    sTime = cuttingTime(sTime)
    eTime = cuttingTime(eTime)
    obj.startTime = sTime
    obj.endTime = eTime    

    var posdistance = computeDistance(info,position.myPos)
    obj.distance = posdistance.toFixed(2)
    obj.dutyDivName = (item[i].dutyDivNam!=undefined)?item[i].dutyDivNam:"null" //없는경우가 있다.
    obj.mapUrl = item.dutyName
    url = 'https://search.naver.com/search.naver?query=' + item.dutyName
    obj.url = url


    let Startlat = position.myPos.latitude
    let Startlon = position.myPos.longitude

    let Endlat = item[i].wgs84Lat
    let Endlon = item[i].wgs84Lon

    let options = {
      format: 'json',
      headers: {
          appKey: tmapkey
      },
      query: {
          totalValue: 1,
          endX: Startlon, // 128
          endY: Startlat, // 36
          startX: Endlon,
          startY: Endlat,
      }
    }
    let tmapreq = http.postUrl(tmapurl, params, options).features[0].properties.totalTime
    obj.time = parseInt(tmapreq/60)

    result.push(obj);
  }
  
  return result
  //getDgHospitalInfoList와 똑같은 형식으로 출력해주세요!!!!!
}
