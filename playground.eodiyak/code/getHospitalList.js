module.exports.function = function getHospitalList (position, hospitalLists) {
  const console = require("console")
  let lists
  
  console.log(position['myPos']['latitude'])
  console.log(position['myPos']['longitude'])
  lists = ['A병원', 'B병원', 'C병원']
  
  
  
  return lists
}
