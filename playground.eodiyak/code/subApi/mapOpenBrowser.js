module.exports.function = function mapOpenBrowser (hospitalInfo) {
  const console = require("console")
  console.log(hospitalInfo)
  let result = "daummaps://route?sp="
  result += hospitalInfo.currentPosition.latitude+', '
  result += hospitalInfo.currentPosition.longitude + '&ep='
  result += hospitalInfo.point.latitude + ', '
  result += hospitalInfo.point.longitude += '&by=CAR'
  console.log(result)
  return result
}
