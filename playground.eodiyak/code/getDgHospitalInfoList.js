var http = require('http')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
var ServiceKey = "K6sYWvqebVyngpczytPk5eOtSHyZapagbhcTDE31E6hsk57L5V8cJdQKn033Fvj4QU7m6jfDg7evWZLIgCHPBw%3D%3D"

var treatmentList = new Array(
  "내과","소아청소년과","신경과","정신건강의학과","피부과",
  "외과","흉부외과","정형외과","신경외과","성형외과",
  "산부인과","안과","이비인후과","비뇨기과","재활의학과",
  "마취통증의학과","영상의학과","치료방사선과","임상병리과","해부병리과",
  "가정의학과","핵의학과","응급의학과","치과","구강악안면외과"
)

//nearHospitalList ==> 근처병원 리스트
// dgidIdName ==> 찾으려는 병원 종류 // 내과, 외과....
//currentPosition ==> 현재 위치
module.exports.function = function getDgHospitalInfoList (nearHospitalList, dgidIdName, currentPosition) {
  const console = require("console")
  var result = new Array() 
  console.log("====this is show time! ====")
  console.log(nearHospitalList)
  console.log(dgidIdName)
  console.log(currentPosition)
  console.log("===========")

  for (let i = 0; i<nearHospitalList.length; i++){
    var url = EndPoint + Operation 
      + "?ServiceKey=" + ServiceKey 
      + "&HPID=" + nearHospitalList[i].hpid
      var details = http.getUrl(url,{format: 'xmljs'})
      var item = details.response.body.items.item
      console.log("tag : ",item)
      console.log(nearHospitalList[i])
      console.log("-------")

      var flag = false;

      if( item.dgidIdName != undefined){
        if(item.dgidIdName.includes(",")){
          var originDNList = item.dgidIdName.split(",");
          for(var k=0; k<originDNList.length; k++){
            if(originDNList[k] == dgidIdName && item.dutyName.indexOf("요양병원")==-1) flag = true;
          }
        }else{
          if(item.dgidIdName == dgidIdName && item.dutyName.indexOf("요양병원")==-1) flag = true;
        }
      }

      if (flag ) {
        console.log("this is item",item)
        var obj = new Object();
        let info = {}
        let url = ""
        info = {
          latitude : item.wgs84Lat,
          longitude : item.wgs84Lon,
          $id : null,
          $type : "viv.geo.GeoPoint"
        }
        obj.point = info
        obj.dutyAddr = item.dutyAddr
        obj.dutyName = item.dutyName
        obj.dgidIdName = item.dgidIdName
        obj.dutyTel1 = item.dutyTel1
        obj.startTime = nearHospitalList[i].startTime[0]
        obj.endTime = nearHospitalList[i].endTime[0]
        obj.currentPosition = currentPosition
        obj.distance = nearHospitalList[i].distance[0]
        obj.dutyDivName = nearHospitalList[i].dutyDivName[0]

        url = 'https://search.naver.com/search.naver?query=' + item.dutyName
        obj.url = url

        console.log("url", url)
        console.log("obj", obj)
        result.push(obj);
    }
  }

  return result
}
