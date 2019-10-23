var http = require('http')
var EndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var Operation = "getParmacyLcinfoInqire"
var ServiceKey = "K6sYWvqebVyngpczytPk5eOtSHyZapagbhcTDE31E6hsk57L5V8cJdQKn033Fvj4QU7m6jfDg7evWZLIgCHPBw%3D%3D"

module.exports.function = function getPharmacyList (position) {
  const console = require("console")

  var url = EndPoint + Operation 
  + "?Serv iceKey=" + ServiceKey 
  + "&WGS84_LON=" + position['myPos']['longitude']
  + "&WGS84_LAT=" + position['myPos']['latitude']

  console.log(url)
  var pList = http.getUrl(url,{format: 'xmljs'})

  var item = pList.response.body.items.item

  let results = new Array
  
  if (item.dutyName) {
      let info = {}
      var stime = item.startTime.substring(0,2) + ":" + item.startTime.substring(2,4)
      var etime = item.endTime.substring(0,2) + ":" + item.endTime.substring(2,4)
      if (stime.charAt(0)==0 && stime.charAt(1)!=0){
        stime = " " + stime.substring(1,5)
      }
      if(etime.charAt(0)==0 && etime.charAt(1)!=0){
        etime = " " + etime.substr(1,5)
      }

      info['pDutyName'] = item.dutyName
      info['pDistance'] = item.distance
      info['pHpid'] = item.hpid
      info['pDutyTel1'] = item.dutyTel1
      info['pStartTime'] = stime
      info['pEndTime'] = etime
      
      results.push(info)
  } else {
    for(i in item){
      let info = {}

      var stime = item[i].startTime.substring(0,2) + ":" + item[i].startTime.substring(2,4)
      var etime = item[i].endTime.substring(0,2) + ":" + item[i].endTime.substring(2,4)
      if (stime.charAt(0)==0 && stime.charAt(1)!=0){
        stime = " " + stime.substring(1,5)
      }
      if(etime.charAt(0)==0 && etime.charAt(1)!=0){
        etime = " " + etime.substr(1,5)
      }

      info['pDutyName'] = item[i].dutyName
      info['pDistance'] = item[i].distance
      info['pHpid'] = item[i].hpid
      info['pDutyTel1'] = item[i].dutyTel1
      info['pStartTime'] = stime
      info['pEndTime'] = etime

      results.push(info)
    }
  }

  return results
}
 