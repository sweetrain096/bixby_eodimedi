<template>
  <div id="popularHospitalSubject">
    <p class="hospitalSubject">진료과목</p>

    <div class="imgCellContainer">

      <router-link to="/detail" style="text-decoration: none !important; color:black;">
        <div class="imgCell">
          <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
          <p class="subjectName">내과</p>
        </div>
      </router-link>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">외과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">치과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">소아과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">응급실</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">정형외과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">안과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">피부과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">한의원</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">후보1</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">후보2</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p class="subjectName">후보3</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style>
#popularHospitalSubject {
  /* height: 500px; */
}

.hospitalSubject {
  width: 90%;
  font-size: 9vw;
  font-weight: bold;
  color: rgb(108, 110, 112);
  text-align: center;
  margin: auto;
  margin-bottom: 15px;
}

.imgCellContainer {
  width: 90%;
  display: grid;
  grid-template-columns: auto auto auto;
  margin: auto;
}

.img {
  font-size: 5vw;
  text-align: center;
}

.imgCell {
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  padding: 10px;
  margin: 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

 .subjectName {
   font-size: 4vw;
 }
</style>