### How to use Bixby library

#### Using Capsule

* capsule.bxb에서 version과 함께 import 하기

-------

##### Core

* 단독으로 사용할 수 없고 time, geo등과 함께 작업할 때 사용

-------

##### DateTime

* fuzzyFactor 사용 시, ±3 days 지정 가능

> * `Date`
> * `Time`
> * `DateTime` : 몇분 후 도착하는지..? calculatedFromNow 사용

* Action Modeling

  ![스크린샷 2019-06-02 오후 9 50 51](https://user-images.githubusercontent.com/45934125/58761578-deb19980-8580-11e9-8bd7-16d6c709cc6b.png)

* Handling Dates and Times in JavaScript

  ![image](https://user-images.githubusercontent.com/45934125/58761603-40720380-8581-11e9-9028-219c9cd3f301.png)

------

##### Entity

* `image`, `geo`, `time`, `common`, `core` 등은 버전 이슈를 방지하기 위해 entity를 통해 import 하는 경우가 많음

* syntax

  ![image](https://user-images.githubusercontent.com/45934125/58761784-cc385f80-8582-11e9-8308-77e2d07e54ed.png)

------

##### Geography

> * `Level 1~4 Division` : 낮을 수록 큰 범주.
> * `GeoPoint`
>  ![image](https://user-images.githubusercontent.com/45934125/58762013-af515b80-8585-11e9-8bbe-63d70afce119.png)

* 현재 위치 정보를 사용하려면  `user-profile-access` 허용할 것

* 트레이닝

  https://bixbydevelopers.com/dev/docs/dev-guide/developers/library.geo#using-searchregion

----------

##### Open Hours

>* `HoursInfomation` : 첫차, 막차 시간 정보로 활용가능
>* `WeekOpenHours` : 평일, 주말 구분 가능
>* `OpenHoursJudgementQuestion` : yes or no
>* `OpenHoursWHQuestion`

* 사용법

  * 반드시 business structure에 추가해야 함

  * API로부터 정보를 가져오는 경우 다음과 같이 사용

    ![image](https://user-images.githubusercontent.com/45934125/58762571-14a84b00-858c-11e9-8f46-f75328a34698.png)

  * `OpenHoursJudgementQuestion` & `OpenHoursWHAnswer`를 사용하려면 `role-of` 정의해야 함

    ![image](https://user-images.githubusercontent.com/45934125/58762649-e9722b80-858c-11e9-93ea-b6e7ae1b2396.png)

--------

##### Money

* 사용법

  ![image](https://user-images.githubusercontent.com/45934125/58762957-68b52e80-8590-11e9-84bd-3e82d371f849.png)

------

##### Navigation

* Google Maps 활용 라이브러리

> * `Destination` : `geo.NamedPoint`로 지정
> * `Origin` : `geo.NamePoint`로 지정, 값이 없는 경우에는 현재 위치
> * `TravelMode` : Driving, Walking, Bicycling, Transit 

* 사용법

  * 다음과 같이 사용

    ![image](https://user-images.githubusercontent.com/45934125/58763165-648a1080-8592-11e9-8c0e-f88adc02786f.png)

----------

