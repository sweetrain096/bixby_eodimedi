<template>
  <div id="popularHospitalSubject">
    <p class="hospitalSubject">진료과목</p>

    <div class="imgCellContainer">

      <router-link to="/detail" style="text-decoration: none !important; color:black;">
        <div class="imgCell">
          <img class="img" src="../assets/내과.png" alt="내과"/>
          <p class="subjectName">내과</p>
        </div>
      </router-link>

      <div class="imgCell">
        <img class="img" src="../assets/소아청소년과.png" alt="소아청소년과"/>
        <p class="subjectName">소아청소년과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/이비인후과.png" alt="이비인후과"/>
        <p class="subjectName">이비인후과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/안과.png" alt="안과"/>
        <p class="subjectName">안과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/치과.png" alt="치과"/>
        <p class="subjectName">치과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/피부과.png" alt="피부과"/>
        <p class="subjectName">피부과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/외과.png" alt="외과"/>
        <p class="subjectName">외과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/산부인과.png" alt="산부인과"/>
        <p class="subjectName">산부인과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/비뇨기과.png" alt="비뇨기과"/>
        <p class="subjectName">비뇨기과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/정신건강의학과.png" alt="정신건강의학과"/>
        <p class="subjectName">정신건강의학과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="../assets/정형외과.png" alt="정형외과"/>
        <p class="subjectName">정형외과</p>
      </div>

      <div class="imgCell">
        <img class="img" src="https://picsum.photos/55/55" alt="한의원"/>
        <p class="subjectName">한의원</p>
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