module.exports.function = function getCurrentPosition(point){
  var console = require('console');
  console.log("######", point)
  console.log(typeof(point.$type))
  
  return{
    myPos: {
      longitude: point.longitude,
      latitude: point.latitude
    }
  }
}