module.exports.function = function selectPharmacy (pharmacy) {
  const console = require("console")
  console.log(pharmacy.pHpid[0])
  console.log(pharmacy.pStartTime[0])
  console.log(pharmacy.pEndTime[0])
  return {
    pHpId: pharmacy.pHpid[0],
    pStartTime: pharmacy.pStartTime[0],
    pEndTime: pharmacy.pEndTime[0]
  }
}
 