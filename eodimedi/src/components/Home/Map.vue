<template>
  <div id="dmap">
    <div id="map" class="Map"></div>
  </div>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa0a6e1d29e59a3ef4e379174688985d"></script>
<script>
export default {
  data() {
    return {
      myPos: {}
    };
  },
  methods: {
    async drawMap() {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            let pos = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            this.myMap(pos);
          },
          error => {
            alert("위치 정보를 허용해주세요.");
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다.");
      }
    },
    async myMap(position) {
      let mapContainer = document.getElementById("map"); // 지도를 표시할 div
      let mapOption = {
        center: new kakao.maps.LatLng(position.latitude, position.longitude), // 지도의 중심좌표
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


