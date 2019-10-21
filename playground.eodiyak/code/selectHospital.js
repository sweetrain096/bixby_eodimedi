module.exports.function = function selectHospital (hospital) {
  const console = require("console")
  console.log(hospital)
  return {
    hpId: hospital.hpid,
    startTime: hospital.startTime,
    endTime: hospital.endTime
  }
}
