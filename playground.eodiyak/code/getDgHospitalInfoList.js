module.exports.function = function getDgHospitalInfoList (nearHospitalList, dgidIdName, currentPosition) {
  const console = require("console")
  let results = new Array
  
  console.log(dgidIdName)

  // 알아서 구현하세요
  console.log(nearHospitalList)
  console.log(currentPosition)
  for (let i = 0; i<nearHospitalList.length; i++){
    // console.log(nearHospitalList[i])
    // console.log(nearHospitalList[i].hpid)
    // 알아서 뭐 잘 넘어왔겠지
    // 여기서 아이디 뽑고 잘 가져오세요~~
    let tmp = {}
    let result = {}
    tmp['dutytel'] = nearHospitalList[i].hpid[0]
    tmp['name'] = nearHospitalList[i].dutyName[0]
    tmp['addr'] = "가나다동"
    tmp['endtime'] = "0630"
    result['hospitalInfo'] = tmp
    results.push(result)
  }
  
  console.log(results)
  
  var obj = new Array();

  //배열에 객체 넣기
  var hospital = new Object();
  hospital.hpid = "A000"
  hospital.openTime = "8:30"
  hospital.closeTime = "18:00"
  obj[0] = hospital

  //for문으로 배열에 객체넣기
  for (var i = 1; i<=3; i++){
      var hp = new Object();
      hp.hpid = "A00"+i;
      hp.openTime = "9:0"+i
      hp.closeTime = "18:0"+i
      obj[i] = hp
  }

  //배열을 json으로 만듬 ==> jpack을 빅스비 text취급할 수 있게됨
  var jpack = JSON.stringify(obj)
  console.log(jpack)

  // jpack을 받은곳에서 데이터를 배열로 쓰려면, json.parse를 쓰면됨
  var origin = JSON.parse(jpack)
  console.log(origin)
  console.log(origin[0])

  console.log(obj)

  return obj
}
