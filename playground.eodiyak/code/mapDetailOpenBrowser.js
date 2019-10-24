module.exports.function = function mapDetailOpenBrowser (hospitalInfo) {
  const console = require("console")
  console.log(hospitalInfo)
  let result = "daummaps://search?q="
  result += hospitalInfo.dutyName + '&p='
  result += hospitalInfo.point.latitude + ', '
  result += hospitalInfo.point.longitude
  console.log(result)
  return result
}
