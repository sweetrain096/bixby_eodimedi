module.exports.function = function getHospitalInfo (hpId) {
  let name, tel, addr, endtime;
  let result = {}
  name = "A병원"
  tel = "032-111-1111"
  addr = "대전 유성구 어쩌구저쩌구"
  endtime = "0630"

  result['name'] = name
  result['addr'] = addr
  result['dutytel'] = tel
  result['endtime'] = endtime


  return result
}
