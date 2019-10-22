module.exports.function = function selectPharmacy (pharmacy) {
  const console = require("console")
  console.log(pharmacy)
  return {
    hpId: pharmacy.hpid,
    startTime: pharmacy.startTime,
    endTime: pharmacy.endTime
  }
}
 