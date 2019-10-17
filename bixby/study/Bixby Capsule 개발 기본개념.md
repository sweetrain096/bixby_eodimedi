# 01 Bixby Capsule개발 기본개념

### 1. 음성 인식과 자연어 이해

* ASR(Automatic Speech Recognition) : 발화를 문자로 변환하는 기술

  * `발화` : 사람이 말하는 음성 언어

* NLU(Natural Language Understanding) : 문장의 의미를 이해하는 기술

  * 날씨 정보를 알기 위해서 필요한 값 : 날짜, 지역
  * 발화의 의도를 파악하고 의도를 충족하기 위한 값 찾아내기

### 2. Bixby 서비스 아키텍처

1. client에서 빅스비 실행 후 "오늘 날씨 알려줘" 말하기

2. 해당 발화를 녹음한 음성 파일이 빅스비로 전달

3. 빅스비 서버에서 ASR모듈을 통해 해당 음성을 문자로 변환

4. 문자로 변환된 "오늘 날씨 알려줘"값이 어느 캡슐로 가야하는지 NLU모듈에서 분류

5. 해당 발화가 어떤 의도이며 동작하기 위해 필요한 값이 무엇인지 분석

6. 빅스비 플랫폼에서 실시간으로 실행 절차를 나타내는 플랜 그래프 생성

   > `플랜` : 결과 값을 얻기 위해 해야할 일을 순서도처럼 나타낸 것, 
   >
   > 빅스비 캡슐 코드를 바탕으로 동작을 실행하기 위한 게획을 가장 효율적인 방법으로 재구성

7. 개발자가 작성한 자바스크립트 코드 실행

8. 결과값이 클라이언트에게 전달

### 3. Bixby Capsule 구조

1. 모델링

   * Concepts : 발화 인식 및 발화 결과를 리턴할 때 필요한 값

     > "햄버거 2개 주문해줘"
     >
     > 햄버거 -> FoodName
     >
     > 2 -> NumberOfFood

   * Actions : 캡슐이 사용자가 원하는 작업을 이해하도록 수행할 동작을 정의

2. 비즈니스 로직

   * Javascript Code : 사용자가 원하는 작업을 실제 수행하는 코드, 이 단계에서 서비스API를 연동

3. UI/UX

   * Bixby Views : 최종 결과를 사용자에게 보여주는 레이아웃 작업
   * Dialog : 사용자에게 되묻거나 결과를 응답해주는 응답문을 생성

4. 트레이닝

   * 발화 Training : Capsule이 잘 동작하도록 처리할 수 있는 발화를 생성하고 자연어 트레이닝(NL Training)을진행
* Debugging : 개발한 캡슐이 구현한대로 동작하는지 확인

## 02 Bixby Capsule 개발 기본 개념

### 1. Modeling

* 모델링을 통해 체계적인 구조설계를 바탕으로 개발하는 것이 효율적임
* 체계적 구조는 Dynamic Program Generation을 통한 자동 프로그래밍의 바탕이 됨
* input / output : concept
* action : input concept과 output concept의 연결

| 분야       | Concept | Action |
| ---------- | ------- | ------ |
| 언어       | 명사    | 동사   |
| 프로그래밍 | 변수    | 함수   |

* Concept의 종류

  | Primitives                | Structures              |
  | ------------------------- | ----------------------- |
  | Boolean, Integer, Decimal | Property로 다른 Concept |
  | Name, Text, Enum          | Primitive로 구성        |

* CAN : Concept Action Network



### 2. Business Logic

* 실제 동작(자바스크립트)
* endpoints.bxb 파일에 해당하는 액션과 연결



### 3. Traning

* 자연어 트레이닝
* 사용자가 말할 수 있는 다양한 패턴의 발화를 빅스비에게 학습
* 똑같은 패턴을 반복하는 것 보다 다양한 패턴을 입력하여 성능 향상



### 4. Views

* UI를 커스터마이즈하는 것을 담은 기본 설계도는 .view파일
* `match` : 각 뷰에서 보여질(사용되어질)데이터를 담은 컨셉 명시
* `message` : default응답(해당 뷰에서 빅스비가 모든 캡슐에서 사용이 가능하도록 설정된 응답)이 아닌 이 캡슐의 상황에 맞도록 사용자에게 어떤 말을 하게 할 지 명시하는 부분
  * dialog파일에 있는 세부 내용과 연결하여 작업
* `render` : 실제 해당 화면에 그피컬한 측면에서 어떤 방법으로 데이터를 보여줄 지 명시
  * 다양한 UI component를 활용



# 02 Modeling 구현

## 1. [Action](<https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-actions>)

* Action 명 : Action 의 이름
* Type : Action의 종류를 설정하는 부분, Bixby 시스템이 Action을 거색할 때 힌트를 줌
* Input : Action 실행에 필요한 입력 값을 지정하는 부분
  * 변수명 : Action에서 해당 Concept이 사용되는 이름
  * Concept명 : Concept의 이름
  * Min & Max : 발화로부터 이 input이 몇 개 받아들일지 결정
    * Min : Required, Optional
    * Max : One, Many(One일 때 여러개 들어오면 처음 나온 것만 인식)
* Output : Action 실행의 결과



## 2. [Concept](<https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-concepts>)

* Primitives : Boolean, Integer, Decimal, Name, Text, Enum, Qualified
* Structure : 다른 Primitive의 Concept으로 구성

#### 1) Primitive 타입

* Primitive 타입은 기본형 변수, 9가지 있음
* Boolean : True / False를 저장
* Decimal : 실수형 숫자 저장
* Integer : 정수형 숫자 저장
* Enum* : 열거할 수 있는 문자열 저장
* Name* : 짧은 문자열을 저장
* Qualified : Name과 기본적으로 비슷하지만 지정 패턴에 맞는 데이터를 저장
* Text* : 긴 문자열을 저장

* `*`표시된 타입은 문자열을 저장, 그러나 NL 트레이닝시에 역할 상이함

#### 2) Structure 타입

* Primitive 타입들을 묶어서 하나의 객체로 사용
* C의 구조체와 비슷한 역할
* Structure 구조
  * Structure 명 : Structure의 이름
  * Property : Structure의 일부분이 될 Concept
    * Property 명 : 해당 Structure에서 사용될 Concept
    * Type : Concept 이름
    * Min & Max : 해당 Structure에서 가질 수 있는 이 Concept의 갯수



#### (참고) 유연한 Modeling을 만드는 여러 기법

### 1. Bixby 값 검증 및 에러 처리

* Validation : Input값이 의도대로 저장되었는지 검증
  * Replace : Validation 을 통과하지 못할 경우 특정 값으로 대체
  * Replan : Validation 을 통과하지 못할 경우 다른 Action 실행
  * Halt : Validation 을 통과하지 못할 경우 Action 실행을 멈추고 에러 메시지를 화면에 띄움
  * Unlock : 실행을 멈추고 기기에 lock screen을 띄움
* Relaxation : Action의 결과가 없을 경우 이 다음 상황을 어떻게 만들지를 구성
  * On-empty : 이 문법을 사용하며 사용법은 Validation과 유사
* Throws : Javascript에서 던진 에러를 처리하는 부분

### 2. Default Init

* 해당 Concept의 값이 없을 경우, 기본적으로 실행할 action혹은 값을 지정

### 3. Evaluate

* 일반적으로 action에는 output을 만들기 위한 JS 코드가 필요, 그르나 이 input을 그대로 전달하는 식의 간단한 logic이면 evaluate 기능을 사용해서 JS 코드 없이 action을 수행 가능

### 4. Input Group

* 여러 input을 한가지로 묶어서 이 그룹에 대한 최대최소 개수로 input들을 관리
  * OneOf : input group의 멤버 중 한가지만 받음
  * OneOrMoreOf : input group의 멤버 중 한가지 또는 그 이상을 받음
  * ZeroOrOneOf : input group의 멤버들을 안받거나 그 중 한가지만 받음
  * ZeroOrMoreOf : input group의 멤버들을 안받거나 여러 멤버를 받음

### 5. Computed Input

* 다른 input값을 가져와 사용하거나 action 실행 등을 하기 위한 안전한 방법
  * 해당 액션에서 다른 input 값 가져옴
  * 다른 액션에서 값 얻어옴

### 6. Role-of & Extends

* 공통점 : 기존에 만들어진 Concept 재사용
* 차이점 
  * Role-of : 기존 Concept을 복제
  * Extends : 기존 Concept을 상속



# 03 Business Logic 구현

### 1. Javascript 기초

* Module.exports : 다른 파일에서 해당 함수 혹은 값이 사용될 수 있도록 모듈화하는 함수
* Require : Module.exports의 저장 값을 가져오는 함수
* 변수 : 데이터를 저장하는 저장소
  * var : 전체 외부 함수가지 사용할 수 있는 유효 범위
  * const : 블록 유효 범위를 갖는 변수, let과 다른 점은 한번 할당된 값은 변경 불가
  * let : 블록 유효 범위를 갖는 변수, const와 다른 점은 할당된 값의 변경 가능
* 분기
  * if 문
* 루프
  * for 문

### 2. [Bixby Business Logic](<https://bixbydevelopers.com/dev/docs/dev-guide/developers/actions.js-actions>)

* Action과 Javascript 파일은 1 : 1 매칭
* Action의 input은 Javascript 함수의 parameter
* Action의 output은 Javascript 함수의 return 값
* [Endpoints](<https://bixbydevelopers.com/dev/docs/reference/type/endpoints>) : Action 과 리소스를 매핑시켜 주는 설정 파일
  * Local : Action과 로컬 리소스를 매핑
  * Remote : Action과 외부 리소스를 매핑

#### [Bixby에서 사용가능한 내장 API](<https://bixbydevelopers.com/dev/docs/reference/JavaScriptAPI>)

* Config : Capsule.의 configuration 정보를 가져옴
* Console : Debug Console에 로그를 찍을 때 사용
* Dates : 날짜 관련 함수를 제공
* Fail : Runtime 에러 exception을 핸들링
* http : http request를 위한 함수 제공
* Secret : Capsule의 secrets를 가져옴

### 