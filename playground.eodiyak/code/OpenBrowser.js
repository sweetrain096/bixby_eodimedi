module.exports.function = function openBrowser (url, dutyTel1) {
  const console = require('console');
  console.log(url);
  console.log(dutyTel1);
  
  let result = '';
  if(dutyTel1 != undefined){
    result = dutyTel1;
  }else{
    result = url;
  }
  
  return result;
}
