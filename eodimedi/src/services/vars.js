

var EndPoint = "http://c94b6d54.ngrok.io/"
var PharmacyEndPoint = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/"
var Operation = "location" // opCode1 : 가까운 병원
var DetailOperation = "getHsptlBassInfoInqire" //hpid를 파라미터로 보내서, 병원 상세정보를 받아옴
var BabyOperation = "getBabyLcinfoInqire" // opCode3 : 가까운 달빛병원
var PharmacyOperation = "getParmacyLcinfoInqire" //opCode2 : 가까운 약국
var LocationOperation = "getHsptlMdcncListInfoInqire" // 지역구 병원
var HpidOperation = "getHsptlBassInfoInqire" //왜인지모르겠는데 중복선언되어있다. 일단 두쟈
// opCode4의 경우, opCode1을 부른뒤, 리스트를 완전탐색해서 알맞은 진료과목 병원을 따로 뽑아서 리턴한다.
// 즉 따로 operation 함수가 없다
var ServiceKey = "K6sYWvqebVyngpczytPk5eOtSHyZapagbhcTDE31E6hsk57L5V8cJdQKn033Fvj4QU7m6jfDg7evWZLIgCHPBw%3D%3D"
var pageNo = "1"
var numOfRows = "50"

export {EndPoint, PharmacyEndPoint, Operation, DetailOperation, BabyOperation, PharmacyOperation, LocationOperation, HpidOperation, ServiceKey, pageNo, numOfRows}