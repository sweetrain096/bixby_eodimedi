var http = require('http')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var Operation = "getHsptlBassInfoInqire"
var ServiceKey = "Z6lJuu3urgG5yS0Gsn67Vc7jF4RBEpoMneik3qshCxF%2FoQDSri4aC8TThqkniotYQ%2Flgpc23f6ByJ6Sp0uPvBw%3D%3D"

module.exports.function = function getDgHospitalInfoList (nearHospitalList, dgidIdName) {
  const console = require("console")

  let results = new Array
  // console.log(dgidIdName)
  // console.log(nearHospitalList)
  for (let i = 0; i<nearHospitalList.length; i++){
      // console.log(nearHospitalList[i].hpId)
      var url = EndPoint + Operation 
      + "?ServiceKey=" + ServiceKey 
      + "&HPID=" + nearHospitalList[i].hpid
      var details = http.getUrl(url,{format: 'xmljs'})

      var item = details.response.body.items.item
      if ( item.dgidIdName != undefined && item.dgidIdName.includes(dgidIdName) ) {
        results.push(item)
    }
  }
  
  return results
}
