<template>
  <div id="dmap">
    <div id="map" class="Map"></div>
  </div>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa0a6e1d29e59a3ef4e379174688985d"></script>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    async drawMap() {
      let myPos;
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            this.myMap(position);
          },
          error => {
            // let position = {
            //   coords: {
            //     latitude: 37,
            //     longitude: 128
            //   }
            // };
            // this.myMap(position);
            // console.log(error)

            alert("위치 정보를 허용해주세요.");
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다.");
      }
    },
    async myMap(position) {
      let mapContainer = document.getElementById("map"); // 지도를 표시할 div
      let myPos = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      let mapOption = {
        center: new kakao.maps.LatLng(myPos.latitude, myPos.longitude), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };
      let map = new kakao.maps.Map(mapContainer, mapOption);
    }
  },
  mounted() {
    this.drawMap();
  }
};
</script>

<style scoped>
.Map {
  width: 90%;
  height: 200px;
  background-color: green;
  margin: auto;
  margin-bottom: 30px;
}
</style>


