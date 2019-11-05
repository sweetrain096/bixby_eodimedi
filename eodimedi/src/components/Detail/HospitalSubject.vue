<template>
  <div id="hospitalSubject">
    <p class="medicalSubject">진료과목</p>
    <div class="subject">
      <div class="firstSubject">
        <p class="subjectList" v-for="item in treatment1" v-bind:key="item">{{ item }}</p>
      </div>
      <div class="secondSubject">
        <p class="subjectList" v-for="item in treatment2" v-bind:key="item">{{ item }}</p>
      </div>
      <div class="thirdSubject">
        <p class="subjectList" v-for="item in treatment3" v-bind:key="item">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treatment1: [
        "내과",
        "안과",
        "외과",
        "정신건강의학과",
      ],
      treatment2: [
        "소아청소년과",
        "치과",
        "산부인과",
        "정형외과",
      ],
      treatment3: [
        "이비인후과",
        "피부과",
        "비뇨기과",
        "한의원"
      ]
    };
  },
};
</script>

<style>
#hospitalSubject {
  height: 200px;
}

.medicalSubject {
  width: 90%;
  font-size: 5vw;
  font-weight: bold;
  color: rgb(108, 110, 112);
  text-align: left;
  margin: auto;
  margin-top: 15px;
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
  color: rgb(108, 110, 112);
  font-weight: bold;
}

.subjectList {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  width:100%;
  padding: 5px;
  margin: 5px;
  font-size: 4vw;
}

.secondSubject {
  color: lightgrey;
}

.thirdSubject {
  color: lightgrey;
}
</style>