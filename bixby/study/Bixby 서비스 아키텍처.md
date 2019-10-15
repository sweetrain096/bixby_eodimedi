## 01 Bixby Capsule개발 기본개념

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

## 시뮬레이터와 디버깅 On-Device 테스트

### 1. 시뮬레이터(Bixby Developer Studio에서의 발화 테스트 방법)



### 2. 디버깅(Graphical Trace와 Javascript Log를 활용한 디버깅 방법)



### 3. On-Device 테스트(실제 디바이스 환경에서의 발화 테스트 방법)