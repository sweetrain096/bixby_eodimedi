# Bixby View

- 패키지는 따로 없었음. 부트스트랩처럼 Components들을 제공(카드, 리스트, 그리드같은 파티션, 등).

- 뷰 만들면서 필요한 요소 따다 쓰면 될 듯!
- 몇 가지 없음. 

## [컴포넌트 문서](<https://bixbydevelopers.com/dev/docs/dev-guide/developers/building-views.views#view-components>)



Input View, Confirm View, Result View 이렇게 세가지 뷰.



## Input View

입력 뷰에서는 사용자 발화의 정보가 부족하거나, 선택의 순간이 있을 때, - 입력값이 필요할 때 보여지는 뷰.

> ex) 
>
> user: 102번 버스 언제 오는지 알려줘
>
> bixby: 어느 정류장을 말씀하시는지 알려주세요 or 현재 계신 정류장을 선택해주세요.	
>
> ---
>
> 이 때 보여지는 화면! 

##### 제공되는 Components

- date-picker: 날짜 선택
-  time-picker: 시간 선택 
- calendar: 달력에서
-  image-picker: 이미지 선택
-  [selection-of](<https://bixbydevelopers.com/dev/docs/reference/type/input-view.render.selection-of>): 주어진 목록에서 하나 이상 선택
- [auto-complete](<https://bixbydevelopers.com/dev/docs/reference/type/input-view.render.auto-complete>): 주어진 목록에서 완성 제안이 있는 검색 필드 제공
- [form](<https://bixbydevelopers.com/dev/docs/reference/type/input-view.render.form>): 정보 입력 가능한 필드



## Confirmation View

- 확인 순간에 작업 검토, 확인 

  > ex) 예약 확인 맞는지, 지불정보 맞는지, 등등 맞습니까? 예 이런거

- 우리는 필요 없을 듯



## Result View

- 결과 순간, 아웃풋이 나오는 순간에 검색 결과, 개별 세부 정보 페이지 등 표시 가능
- [레이아웃](<https://bixbydevelopers.com/dev/docs/dev-guide/developers/building-views.layouts>) 렌더링해야됨. 반복되는 복잡한 것은 [레이아웃 매크로](<https://bixbydevelopers.com/dev/docs/dev-guide/developers/building-views.layouts>) 활용( 우리 예전에 nav바 html따로 만들고 했던 것 처럼)
- 우리는 그냥 단순히 몇번 버스 몇분 남았다 보여주면 될듯..
- 추가로 버스 어플 실행할 수 있게 하던지 / [앱 실행](<https://bixbydevelopers.com/dev/docs/reference/type/result-view.app-launch>)



------

# 결론.

- 별로 꾸밀 게 없다.  
- 스타일링도 다른 빅스비 디자인과 일관된 구성요소의 제한된 스타일링을 제공. 텍스트 크기와 보통색-부드러운 색 선택 가능
- 컴포넌트에서 사용 할 것 검색하면 되는데 생각해보면 쓸 게 없다.

- 레이아웃 연결하는 것만 조금 공부해보면 될듯!
- 밑에꺼 잠시 들여다보면 조금 감 잡히실듯!

![image](https://user-images.githubusercontent.com/45934033/58763294-cc8d2680-8593-11e9-8061-10dd48ed0c73.png)

- 위 사진출처입니당, 읽어보면 괜찮을듯~

  [**[기고문] Bixby 서비스의 개인화 구현 방법 및 동작 원리**](<https://bixby.developer.samsung.com/newsroom/ko-kr/21/05/2019/Bixby>)