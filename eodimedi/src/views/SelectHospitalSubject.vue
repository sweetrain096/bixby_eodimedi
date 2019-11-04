<template>
  <div id="popularHospitalSubject">
    <p class="medicalSubject">진료과목</p>
    <div class="subject">
      <div class="firstSubject">
        <img v-for="image in images" :src="image.url" :alt="image.alt" />{{ item }}
      </div>
      <div class="secondSubject">
        <img v-for="image in images" :src="image.url" :alt="image.alt" />{{ item }}
      </div>
      <div class="thirdSubject">
        <img v-for="image in images" :src="image.url" :alt="image.alt" />{{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { url: 'https://picsum.photos/100', alt: '랜덤이미지'},
        { url: 'https://picsum.photos/100', alt: '랜덤이미지'},
        { url: 'https://picsum.photos/100', alt: '랜덤이미지'},
      ]
    };
  },
};
</script>

<style>
#popularHospitalSubject {
  height: 100%;
}

.medicalSubject {
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
  width: 25%;
  margin: 0px 0px 0px -10px;
  color: lightcoral;
  font-weight: bold;
}

.secondSubject {
  width: 25%;
  color: lightgrey;
}

.thirdSubject {
  width: 25%;
  color: lightgrey;
}
</style>