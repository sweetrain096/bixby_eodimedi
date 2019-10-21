module.exports.function = function getDgHospitalInfoList (nearHospitalList, dgidIdName) {
  const console = require("console")
  let results = new Array
  
  console.log(dgidIdName)

  // 알아서 구현하세요
  console.log(nearHospitalList)
  for (let i = 0; i<nearHospitalList.length; i++){
    // console.log(nearHospitalList[i])
    // console.log(nearHospitalList[i].id[0])
    // 알아서 뭐 잘 넘어왔겠지
    // 여기서 아이디 뽑고 잘 가져오세요~~
    let tmp = {}
    let result = {}
    tmp['dutytel'] = nearHospitalList[i].id[0]
    tmp['name'] = nearHospitalList[i].name[0]
    tmp['addr'] = "가나다동"
    tmp['endtime'] = "0630"
    result['hospitalInfo'] = tmp
    results.push(result)
  }
  
  console.log(results)
  
  return results
}
