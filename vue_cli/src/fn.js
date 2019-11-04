var db = require('./db')

var EndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"

var Operation = "getHsptlMdcncLcinfoInqire" // opCode1 : 가까운 병원
var DetailOperation = "getHsptlBassInfoInqire" //hpid를 파라미터로 보내서, 병원 상세정보를 받아옴
var BabyOperation = "getBabyLcinfoInqire" // opCode3 : 가까운 달빛병원
var PharmacyOperation = "getParmacyLcinfoInqire" //opCode2 : 가까운 약국
var LocationOperation = "getHsptlMdcncListInfoInqire" // 지역구 병원
var HpidOperation = "getHsptlBassInfoInqire" //왜인지모르겠는데 중복선언되어있다. 일단 두쟈
// opCode4의 경우, opCode1을 부른뒤, 리스트를 완전탐색해서 알맞은 진료과목 병원을 따로 뽑아서 리턴한다.
// 즉 따로 operation 함수가 없다

var ServiceKey = "nw2RgjbfShJMzZ05sLGUzWEasNUweUuRNuA6YHyEvNHn9b3Ahc9rp8VMOKYbPW5qb%2FKqQ0eP1imWvPWKnjJ9Zw%3D%3D"
var pageNo = "1"
var numOfRows = "50"

//API원본 데이터와 병원이름을 넘겨서, 어떤 진료과목을 가지고있는지 검사하는 함수
//이는 dgidIdName이 DB화 되면서 안쓰게 됐지만, 파이어베이스를 관뒀다면 다시 써야할것
export function makeDgididNameList(originData, hosName){ //원본DgidIdName, 병원이름
  var dgList = new Array();
  var treatmentList = db.treatmentList
  if(originData != undefined){
    var spl = originData.split(",")
    for(var i=0; i<treatmentList.length; i++){
      if(hosName.includes(treatmentList[i])){
        dgList[i] = true;
      }else{
        dgList[i]= false;
        for(var j=0; j<spl.length; j++){
          if(treatmentList[i] == spl[j]){
            dgList[i] = true;
            break
          }
        }
      }
    }
  }else{
    for(var k=0; k<treatmentList.length; k++){
      if(hosName.includes(treatmentList[k])){
        dgList[k] = true;
      }else{
        dgList[k] = false;
      }
    }
  }
  return dgList
}

//API원본 데이터에서 시간 이 숫자4자리로 온다. 이를 적절한 향태로 바꾼다.
export function timeFormat(time) {
  if (time == null) {
    time = "알 수 없음"
  } else {
    time = time.substring(0, 2) + ":" + time.substring(2, 4)
  }
  return time
}

// 지역구vocab에 대해, 어떤 지역인지 추측하는 함수.
// vue프로젝트에서는 사용하지 않는다.
export function extractArea(originData){
  var bigArea = null
  var smallArea = null
  var res = new Array();
  for(var area in db.AreaData){
    if(originData.indexOf(area)>=0){
      bigArea = area;
      break;
    }
  }
  if(bigArea!=null){
    var list = db.AreaData[bigArea];
    bigArea = db.AreaMapping[bigArea]
    for(var idx=0; idx<list.length; idx++){
      if(originData.indexOf(list[idx])>=0){
        smallArea = list[idx];
        break;
      }
    }
  }else{
    for(var item in db.AreaData){
      var list2 = db.AreaData[item]
      for(var idx2=0; idx2<list2.length; idx2++){
        if(originData.indexOf(list2[idx2])>=0){
          smallArea = list2[idx2];
          break;
        }
      }
    }
  }

  if(bigArea!=null){
    var endata = encodeURI(bigArea)
    res.push(endata)
  }
  if(smallArea!=null){
    var endata2 = encodeURI(smallArea)
    res.push(endata2)
  }
  return res;
}

// 위경도를 계산하여 거리측정
//vue프로젝트에서는 사용하지 않는다
export function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; //지구의 반경(km)
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;

    return distance.toFixed(2);
}
//위함수를 위한 보조 함수
function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
}

//API원본 데이터에서 위경도를 뽑아 예쁜 객체로 만들어줌
export function extractPos(item){ //병원 객체
  var obj = new Object()
  obj.latitude = item.wgs84Lat
  obj.longitude = item.wgs84Lon
  return obj
}

//병원리스트를 뽑을때, 진료시간이 뒤죽박죽인 operation이 있다. 이를 검증함
//vue프로젝트에서는 사용하지않을것
export function extreactTime(item, day){ // 병원 객체와 오늘 날짜
  var res = new Object()

  var sidx = "dutyTime" + day + "s"
  var eidx = "dutyTime" + day + "c"

  res.stime = (item[sidx] != undefined)? item[sidx] : null
  res.etime = (item[eidx] != undefined)? item[eidx] : null

  return res;
}

//거리순에 따라 재배열 하는 함수
//vue프로젝트에서는 사용하지 않을것
export function sortArr(arr){
  arr.sort(function(a,b){
    return a.distance < b.distance ? -1 : a.distance > b.distance ? 1:0;
  })
  return arr
}

//내 위치를 받아오는 함수. vuex에서 저장했다면 아예 이 부분이 사라져도 된다.
export function getMyPos(){
  var myPos;
  // if(window.navigator.geolocation) {
  //   window.navigator.geolocation.getCurrentPosition(
  //     position => {
  //       myPos = {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude
  //       };
  //       console.log(myPos)
  //     },
  //     error => {
  //       myPos = {
  //           latitude: 37,
  //           longitude: 128
  //       };
  //       alert(error)
  //       alert("위치 정보를 허용해주세요.");
  //     }
  //   );
  // }else {
  //   alert("GPS를 지원하지 않습니다.");
  // }
  myPos = {
    latitude: 36.355495,
    longitude: 127.29875609999999
  };
  return myPos;
}


/* opCode
1 : 병원
2 : 약국
3 : 달빛
4 : 진료과목
*/

//pos는 latitude와 longitude를 가진 객체
//pos기준 근처 병원리스트 50개륿 반환한다.
//pos :: 위치 객체, opCode :: 위 주석 참조, option ::opCode==4일때 진료과목
export function getHosList(pos, opCode, option){
  console.log(pos)
  var res = new Array();
  //axios요청을 받아와
  var data = callAPI(pos,opCode,option)

  for (var i =0; i<data.length; i++){
    var obj = new Object();
    // obj.hpid = data[i].hpid;
    res.push(obj);
  }

  return res;
}

//조합된 url로 api호출. ==> 비동기 처리 해주세요
function callAPI(pos, opCode, option){
   var res = new Array();
   var url = ""
   //url 조합
   if(opCode == 1){ // 내 위치 병원 리스트
     url = EndPoint + Operation + "?"+
       "ServiceKey=" + ServiceKey +
       "&WGS84_LON=" + pos.longitude +
       "&WGS84_LAT=" + pos.latitude +
       "&pageNo=" + pageNo +
       "&numOfRows=" + numOfRows
   }else if (opCode == 2){ // 내 위치 주변 약국

   }else if (opCode == 3){ // 내 위치 주변 달빛

   }else if (opCode == 4){ //내 위치 주변 내과치과
     console.log(option)
   }else{ // err
     console.log("this is error")
   }

   var responseData = ""
   console.log(url, responseData, res)

   // TODO :: 여기가 비동기처리가 필요한 부분. api값에서 item을 뽑아서 배열로 만들어 리턴하면 된다.
   // axios.get(url).then(function(res){
   //   console.log("res!!", res);
   // }).catch(function(e){
   //   console.error(e);
   // })


  return responseData;
}

//선언해놓고 안쓰는 경우 발생하는 에러를 처리하기위해, export 함수를 선언했다.
//이 함수도 절대 쓰지 않지만 신경쓰지 않아도 된다.
export function nerverMind(){
  console.log(EndPoint,PharmacyEndPoint,Operation,DetailOperation,
BabyOperation,PharmacyOperation,LocationOperation,HpidOperation,ServiceKey)
}
