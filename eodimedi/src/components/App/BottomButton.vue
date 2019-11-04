<template>
  <div id="bottom">
    <button class="button" @click="goRoute('hospital')">
      <i class="fas fa-search icon"></i>병원 찾기
    </button>
    <button class="button" @click="goRoute('pharmacy')">
      <i class="fas fa-search icon"></i>약국 찾기
    </button>
    <button class="button" @click="goRoute('divhospital')">
      <i class="fas fa-search icon"></i>진료 과목
    </button>
    <button class="button" @click="goRoute('moon')">
      <i class="fas fa-search icon"></i>달빛 병원
    </button>
    // <router-link to="/subject" style="text-decoration: none !important;">
    //  <button class="button">
    //    <i class="fas fa-search icon"></i>달빛 병원
    //  </button>
    // </router-link>
  </div>
</template>

<script>
export default {
  name: "BottomButton",
  methods: {
    goRoute(to) {
      this.$router.push({ path: `/search/${to}` }, ()=> {});
    }
  }
};
</script>

<style>
#bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #10BECB;
  z-index: 2;
}
.button {
  width: 25%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-right: 1px white solid;
  font-weight: bold;
}
.button:hover {
  background-color: rgba(255, 255, 255, 0.6);
}
.icon {
  font-size: 20px;
  display: block;
  margin: auto;
  color: white;
  margin-bottom: 10px;
}
</style>