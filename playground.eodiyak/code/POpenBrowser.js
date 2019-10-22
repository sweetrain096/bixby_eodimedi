module.exports.function = function popenBrowser (purl, pDutyTel1) {
  const console = require('console');
  console.log(purl);
  console.log(pDutyTel1);
  
  let result = '';
  if(pDutyTel1 != undefined){
    result = pDutyTel1;
  }else{
    result = purl;
  }
  
  return result;
}
