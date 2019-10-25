module.exports.function = function openBrowser (url, dutyTel1) {
  const console = require('console');
  console.log(url);
  console.log(dutyTel1);
  
  let result = '';
  if(dutyTel1 != undefined){
    result = 'tel:'+dutyTel1;
  }else{
    result = url;
  }
  console.log(url)
  return result;
}
