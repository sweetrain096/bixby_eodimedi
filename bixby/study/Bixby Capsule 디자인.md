# Bixby Capsule 디자인



### 1. Capsule 개요

* Capsule이란?
  * Bixby를 통해 사용자에게 제공하는 서비스 단위
* Capsule의 구성요소
  * Modeling (Concept, Action)
  * Business Logic (Javascript) - 캡슐이 실제로 동작할 수 있도록 코드를 구현하는 부분
  * UI (Dialog, Layout, Follow-up) - 캡슐의 디자인을 구성하는 부분
  * Natural Language (Vocabulary, Training data) - 실제 사용자의 발화들이 동작할 수 있도록 Training 시켜주는 부분



### 2. Bixby Views - UI를 구성하는 기본 요소

* Bixby Views
  * Bixby Views는 Bixby Language를 사용하여 구현한다.
  * Layout과 Dialog, Follow-Up를 사용하여 간편하게 사용자와 대화할 수 있는 디자인을 구성하실 수 있습니다.

* Bixby Views의 종류

  1. **Input Views** - 사용자의 입력을 받는 부분
  2. **Result View** - Input에 대한 결과를 보여주는 부분
  3. **Confirmation View** - 사용자가 선택한 정보들을 최종 확인하는 부분
  4. 개발자는 서비스의 용도에 따라 적절한 View를 선택하여 Capsule을 구현하면 된다.
  5. UI를 구성하기 위해서 Bixby Views가 필수!

  

* Bixby Views 구성 요소

  * Dialog
    * 캡슐의 제일 상단에서 사용자의 말에 대한 대답 혹은 질문 등 말을 걸어주는 부분
  * Layout
    * 날씨에 대한 정보, 근처에 있는 스타벅스 매장 등 요청한 정보를 보여주는 부분
  * Follow-Up
    * 캡슐 제일 하단에 '이번 주 미세먼지 알려줘' 등 다음 대화를 이어나갈 수 있도록 도와주는 부분

* Arithmetic 샘플 캡슐

```javascript
result-view { // 연산의 결과인 Result라는 Concept에 대해서 보여주는 result-view라고 선언되어 있다.
  match: Result(this) // 연산의 결과 Result

  message { // Dialog를 구현하는 부분
    template ("결과 값을 확인하여 보세요.")
  }

  render { // Layout을 구현하는 부분
    layout-macro (result-details) {
      param (info) {
      expression (this)
    }
    }
    }

    conversation-drivers { // Follow-Up을 구현하는 부분
        conversation-driver {
            template ("빼기는")
        }
        conversation-driver {
            template ("곱하기는")
        }
        conversation-driver {
            template ("나누기는")
        }
        conversation-driver {
            template ("더하기는")
        }
    }
}
```



### 3. Dialog - 사용자와 대화하는 창구

* Dialog는 사용자와 대화하는 다양한 방법들 중에 하나
* 설계에 따라서 현재 어떤 상황이 벌어졌는지 알려주거나, 사용자 발화의 결과를 알려줄수도, 부가적인 정보를 요청할 수도 있다.
* 개발자들이 Dialog를 설정하지 않아도 Bixby에서 제공하는 Default Dialog(검색 결과를 확인해보세요.)가 있다.
* 상황에 대한 설명을 통해서 사용자가 조금 더 편리하게 Capsule을 이용할 수 있도록 도와주는 부분이 Dialog다.



### 4. Layout - 사용자에게 다양한 경험 제공

* Bixby Views의 종류에 따라 다양한 Layout을 사용할 수 있다.
* 미리 설계된 Layout Component를 활용해 직관적이고 다양한 사용자 경험을 제공할 수 있다.
* Bixby Views 종류에 따라 다양한 Layout을 사용할 수 있고, Layout 또한 Bixby Language를 통해 구현하게 된다.
* Dialog와 마찬가지로, Default Layout을 지원한다.
* 기본 제공 Layout (Dice 샘플 캡슐)

```javascript
// views 부분이 구현되어 있지 않기 때문에 연산의 결과인 RollResult Concept을 나타내는 Default 화면이 보여지게 됨.

structure (RollResultConcept) {
  description (The result object produced by the RollDice action.)
  property (sum) {
    type (SumConcept)
    min (Required)
    max (One)
  }
  property (roll) {
    description (The list of results for each dice roll.)
    type (RollConcept)
    min (Required)
    max (Many)
  }
}
```

* 자신의 Capsule에 어울리는 Layout Component를 선택해서 사용자들에게 직관적이고 편리한 UI를 제공해주는 것이 Capsule Design에서 가장 중요한 부분!



### 5. Follow-up - Bixby와 지속적인 대화

* Follow-Up을 통해 Bixby와 지속적으로 대화를 이어나갈 수 있다.
* 결과 화면에서 다음 대화를 이어나갈 수 있는 힌트를 제공할 수도 있고 후속 질문의 응답을 기반으로 다른 기능을 유도할 수도 있다.
* Capsule의 확장 측면에서 중요한 역할을 수행한다!
* 다른 발화의 결과값을 볼 수 있도록 유도할 수도 있고, 리스트 정렬, 결제, Native App 호출 등 다양한 기능들을 Follow-Up을 통해서 사용할 수 있다.