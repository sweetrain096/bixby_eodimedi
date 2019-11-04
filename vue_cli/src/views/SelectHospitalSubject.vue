<template>
  <div id="popularHospitalSubject">
    <p class="medicalSubject">진료과목</p>
    <div class="subject">
      <div class="firstSubject">
        <p v-for="item in treatment1" v-bind:key="item">{{ item }}</p>
      </div>
      <div class="secondSubject">
        <p v-for="item in treatment2" v-bind:key="item">{{ item }}</p>
      </div>
      <div class="thirdSubject">
        <p v-for="item in treatment3" v-bind:key="item">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cnt: 0,
      treatment1: [
        "내과",
        "안과",
        "가정의학과",
        "외과",
        "흉부외과",
        "정신건강의학과",
        "영상의학과",
        "피부병리과",
        "마취통증의학과",
      ],
      treatment2: [
        "소아청소년과",
        "치과",
        "산부인과",
        "정형외과",
        "재활의학과",
        "신경과",
        "치료방사선과",
        "임상병리과",
        "구강악안면외과",
      ],
      treatment3: [
        "이비인후과",
        "피부과",
        "비뇨기과",
        "성형외과",
        "응급의학과",
        "신경외과",
        "핵의학과",
        "요양병원",
        "한의원"
      ]
    };
  },
};
</script>

<style>
.popularHospitalSubject {
  width: 90%;
  font-size: 18px;
  font-weight: bold;
  color: rgb(108, 110, 112);
  text-align: left;
  margin: auto;
  margin-bottom: 15px;
}

.subject {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  text-align: left;
}

/*  */

.firstSubject {
  margin: 0px 0px 0px -10px;
  color: lightcoral;
  font-weight: bold;
}

.secondSubject {
  color: lightgrey;
}

.thirdSubject {
  color: lightgrey;
}
</style>