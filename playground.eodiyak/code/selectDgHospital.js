module.exports.function = function selectDgHospital (hospital) {
  const console = require("console")
  console.log(hospital)
  
  var obj = new Object();
  let info = {}
  info = {
    latitude : hospital.point.latitude,
    longitude : hospital.point.longitude,
    $id : null,
    $type : "viv.geo.GeoPoint"
  }
  obj.point = info
  obj.dutyAddr = hospital.dutyAddr
  obj.dutyName = hospital.dutyName
  obj.dgidIdName = hospital.dgidIdName
  obj.dutyTel1 = hospital.dutyTel1
  obj.startTime = hospital.startTime
  obj.endTime = hospital.endTime
  obj.currentPosition = hospital.currentPosition

  console.log(obj)
  
  return obj
}
