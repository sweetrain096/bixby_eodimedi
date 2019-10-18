module.exports.function = function getHospitalList (position, hospitalLists, hpId) {
  const console = require("console")
  let listName, listId
  let results = new Array
  console.log(position['myPos']['latitude'])
  console.log(position['myPos']['longitude'])
  listName = ['A병원', 'B병원', 'C병원']
  listId = [123, 124, 125]
  
  for (let i = 0; i<3; i++){
    let info = {}
    info['name'] = listName[i]
    info['id'] = listId[i]
    results.push(info)
  }
  
  console.log(results)
  return results
}
