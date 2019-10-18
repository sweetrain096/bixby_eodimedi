module.exports.function = function getCurrentPosition(point){
  var console = require('console');
  console.log(point)
  
  return{
    myPos: {
      longitude: point.longitude,
      latitude: point.latitude
    }
  }
}