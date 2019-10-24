module.exports.function = function selectHospital (hospital, selectNum) {
  const console = require("console")
  console.log(hospital)
  console.log(selectNum)
  if (hospital.isPharmacy == true){
    return {
      hpId: hospital.hpid,
      startTime: hospital.startTime,
      endTime: hospital.endTime,
      isPharmacy: hospital.isPharmacy
    }
  }
  return {
    hpId: hospital.hpid,
    startTime: hospital.startTime,
    endTime: hospital.endTime,
    isPharmacy: false
  }
}
 