var fail = require('./fail')

module.exports.errorHandling = function errorHandling(data) {
  if (data.OpenAPI_ServiceResponse != undefined && data.OpenAPI_ServiceResponse.cmmMsgHeader.returnReasonCode == 30)
    throw fail.checkedError('API 서버가 터졌을때 나오는 ERROR', 'ErrorNotWorking', {})
  if (data.response != undefined && data.response.header.resultCode != 00)
    throw fail.checkedError('API 서버가 터졌을때 나오는 ERROR', 'ErrorNotWorking', {})
}


module.exports.makeDgididNameList = function makeDgididNameList(originData, hosName){ //원본DgidIdName, 병원이름
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

module.exports.timeFormat = function timeFormat(time) {
  if (time == null) {
    time = "알 수 없음"
  } else {
    time = time.substring(0, 2) + ":" + time.substring(2, 4)
  }
  return time
}

module.exports.extractArea = function extractArea(originData){
  var bigArea = null
  var smallArea = null
  var res = new Array();

  for(area in db.AreaData){
    if(originData.indexOf(area)>=0){
      bigArea = area;
      break;
    }
  }
  if(bigArea!=null){
    var list = db.AreaData[bigArea];
    bigArea = db.AreaMapping[bigArea]
    for(var idx=0; idx<list.length; idx++){
      if(originData.indexOf(list[idx])>=0){
        smallArea = list[idx];
        break;
      }
    }
  }else{
    for(item in db.AreaData){
      var list = db.AreaData[item]
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

module.exports.computeDistance = function computeDistance(startCoords, destCoords) {
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

module.exports.degreesToRadians = function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

module.exports.extractPos = function extractPos(item){ //병원 객체
  var obj = new Object()
  obj.latitude = item.wgs84Lat
  obj.longitude = item.wgs84Lon
  return obj
}

module.exports.extreactTime = function extreactTime(item, day){ // 병원 객체와 오늘 날짜
  var res = new Object()

  var sidx = "dutyTime" + day + "s"
  var eidx = "dutyTime" + day + "c"
  
  res.stime = (item[sidx] != undefined)? item[sidx] : null
  res.etime = (item[eidx] != undefined)? item[eidx] : null

  return res;
}
module.exports.sortArr = function sortArr(arr){
  arr.sort(function(a,b){
    return a.distance < b.distance ? -1 : a.distance > b.distance ? 1:0;
  })
  return arr
}
