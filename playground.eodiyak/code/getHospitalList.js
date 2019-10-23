var http = require('http')
var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlMdcncLcinfoInqire"
var BabyOperation = "getBabyLcinfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"
var pageNo = 1
var num = 50



module.exports.function = function getHospitalList(position, baby) {
  const console = require("console")
  var url = ""
  if (baby == true) {
    url = EndPoint + BabyOperation
      + "?ServiceKey=" + ServiceKey
      + "&WGS84_LON=" + position['myPos']['longitude']
      + "&WGS84_LAT=" + position['myPos']['latitude']
      + "&pageNo=" + pageNo
      + "&numOfRows=" + num
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
  var item = hList.response.body.items.item
  if (item == undefined) {
    let info = {}
    info['dutyName'] = "null"
    info['distance'] = "null"
    info['dutyDivName'] = "null"
    info['hpid'] = "null"
    info['dutyTel1'] = "null"
    info['endTime'] = "null"
    info['startTime'] = "null"
    results.push(info)
  } else if (item.dutyName) {
    let info = {}
    info['dutyName'] = item.dutyName
    info['distance'] = item.distance
    info['dutyDivName'] = item.dutyDivName
    info['hpid'] = item.hpid
    info['dutyTel1'] = item.dutyTel1
    info['endTime'] = item.endTime
    info['startTime'] = item.startTime

    results.push(info)
  } else {
    for (i in item) {
      let info = {}
      info['dutyName'] = item[i].dutyName
      info['distance'] = item[i].distance
      info['dutyDivName'] = item[i].dutyDivName
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
      results.push(info)
    }
  }

  let Apointlat = '36.355064'
  let Apointlong = '127.298356'

  let Bpointlat = '37.492711'
  let Bpointlong = '127.046315'


  // var tmapkey = secret.get('tmapkey')
  // var tmapurl = 'https://apis.openapi.sk.com/tmap/routes'

  // let params = { version: 1 }

  // let options = {
  //   format: 'json',
  //   headers: {
  //     appKey: tmapkey
  //   },
  //   query: {
  //     totalValue: 2,
  //     endX: Apointlong, // 128
  //     endY: Apointlat, // 36
  //     startX: Bpointlong,
  //     startY: Bpointlat,
  //   }
  // }


  // let tmapreq = http.postUrl(tmapurl, params, options).features[0].properties

  // totalDistance:154959
  // totalTime:7688
  // totalFare:10100
  // taxiFare:144100




  return results
}
