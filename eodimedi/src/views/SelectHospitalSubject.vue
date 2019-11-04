<template>
  <div id="popularHospitalSubject">
    <p class="hospitalSubject">진료과목</p>

    <div class="imgCellContainer">

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>내과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>외과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>치과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>소아과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>응급실</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>정형외과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>안과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>피부과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="랜덤이미지"/>
        <p>한의원</p>
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
  font-size: 35px;
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
  font-size: 30px;
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
</style>