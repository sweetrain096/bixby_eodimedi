import sys
sys.stdout = open('training_data2.txt', 'a')


verbs = ['알려줘', '찾아줘', '보여줘', '검색', '검색해줘']
 #5

localnames = ['광주광역시', '서울특별시 강남구', '서구', '대구광역시 유성구 봉명동', '대전시 대덕구', '제주특별시 강속구']
 #6

localities = ['주변', '근처', '여기']
 #3

babies = ["달빛 병원", "달빛병원", "소아 응급실", "소아 24시간 병원", "달빛 어린이 병원", "달빛 어린이병원"]
 #6

hospitals = ["병원", "약국", "내과", "소아청소년과", "신경과", "정신건강의학과", "피부과", "외과", "흉부외과", "정형외과", "신경외과", "성형외과", "산부인과", "안과", "이비인후과", "비뇨기과", "재활의학과", "마취통증의학과", "영상의학과", "치료방사선과", "임상병리과", "해부병리과", "가정의학과", "핵의학과", "응급의학과", "치과", "구강악안면외과"]
#27

hospitals2 = ["구강 악 안면 외과", "구강악 안면 외과", "구강악안면 외과", "구강 악안면 외과"]

# for idx in range(27):
#     print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localnames[idx%6] + ')[v:LocationName]} {[g:DgName] (' + hospitals[idx%27] + ')[v:DgName]} ' + verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localnames[idx%6] + ')[v:LocationName]}에 {[g:DgName] (' + hospitals[idx%27] + ')[v:DgName]} ' + verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localnames[idx%6] + ')[v:LocationName]}의 {[g:DgName] (' + hospitals[idx%27] + ')[v:DgName]} ' + verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localnames[idx%6] + ')[v:LocationName]}에 있는 {[g:DgName] (' + hospitals[idx%27] + ')[v:DgName]} ' + verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localnames[idx%6] + ')[v:LocationName]} {[g:DgName] (' + hospitals[idx%27] + ')[v:DgName]} 정보 ' + verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localnames[idx%6] + ')[v:LocationName]}에 {[g:DgName] (' + hospitals[idx%27] + ')[v:DgName]} 정보 ' + verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localnames[idx%6] + ')[v:LocationName]}의 {[g:DgName] (' + hospitals[idx%27] + ')[v:DgName]} 정보 ' + verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localnames[idx%6] + ')[v:LocationName]}에 있는 {[g:DgName] (' + hospitals[idx%27] + ')[v:DgName]} 정보 ' + verbs[idx%5])


for idx in range(5):
    print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]} {[g:DgName] ('+ hospitals2[idx%4] +')[v:DgName]} '+ verbs[idx%5])



# for idx in range(27):
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]} {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} '+ verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]}에 {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} '+ verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]}의 {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} '+ verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]}에 있는 {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} '+ verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]} {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} 정보 '+ verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]}에 {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} 정보 '+ verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]}의 {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} 정보 '+ verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + localities[idx%3] + ')[v:Locality:true]}에 있는 {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} 정보 '+ verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Locality] (' + '가까운' + ')[v:Locality:true]} {[g:DgName] ('+ hospitals[idx%27] +')[v:DgName]} 정보 '+ verbs[idx%5])


# for idx in range(6):
#     print('[g:GetHospitalInfo] {' + '[g:Baby] (' + babies[idx%6] + ')[v:Baby:true]} ' + verbs[idx%5])
#     print('[g:GetHospitalInfo] {' + '[g:Baby] (' + babies[idx%6] + ')[v:Baby:true]} 정보 ' + verbs[idx%5])





# for verb in verbs:
#     for localname in localnames:
#         for hospital in hospitals:
#             print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localname + ')[v:LocationName]} {[g:DgName] (' + hospital + ')[v:DgName]} ' + verb)
#             print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localname + ')[v:LocationName]}에 있는 {[g:DgName] (' + hospital + ')[v:DgName]} ' + verb)
#             print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localname + ')[v:LocationName]}에서 {[g:DgName] (' + hospital + ')[v:DgName]} ' + verb)
#             print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localname + ')[v:LocationName]}에 {[g:DgName] (' + hospital + ')[v:DgName]} ' + verb)
#             print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localname + ')[v:LocationName]} {[g:DgName] (' + hospital + ')[v:DgName]} 정보 ' + verb)
#             print('[g:GetHospitalInfo] {' + '[g:LocationName] (' + localname + ')[v:LocationName]}에 있는 {[g:DgName] (' + hospital + ')[v:DgName]} 정보 ' + verb)

    
#     for locality in localities:
#         for hospital in hospitals:
#             print('[g:GetHospitalInfo] {' + '[g:Locality] (' + locality + ')[v:Locality:true]} {[g:DgName] ('+ hospital +')[v:DgName]} '+ verb)
#             print('[g:GetHospitalInfo] {' + '[g:Locality] (' + locality + ')[v:Locality:true]} {[g:DgName] ('+ hospital +')[v:DgName]} 정보 '+ verb)


#     for baby in babies:
#         print('[g:GetHospitalInfo] {' + '[g:Baby] (' + baby + ')[v:Baby:true]} ' + verb)
#         print('[g:GetHospitalInfo] {' + '[g:Baby] (' + baby + ')[v:Baby:true]} 정보 ' + verb)

