module.exports.function = function selectHospital (hospital, selectNum) {
  const console = require("console")
  console.log(hospital)
  console.log(selectNum)
  return {
    hpId: hospital.hpid,
    startTime: hospital.startTime,
    endTime: hospital.endTime
  }
}
 