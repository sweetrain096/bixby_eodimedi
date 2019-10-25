module.exports.function = function selectHospital (hospital, selectNum) {

  return {
    hpId: hospital.hpid,
    startTime: hospital.startTime,
    endTime: hospital.endTime,
    dgNameText : hospital.dgNameText
  }
}
 