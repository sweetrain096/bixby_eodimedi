<template>
  <div id="dmap">
    <div id="map" class="Map"></div>
  </div>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa0a6e1d29e59a3ef4e379174688985d"></script>
<script>
import * as fn from "../../fn.js"
export default {
  data() {
    return {
      myPos : {}
    };
  },
  methods: {
    async drawMap() {
      this.myPos = fn.getMyPos()
      if (this.myPos) {
            this.myMap(this.myPos);
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
      } else {
        alert("GPS를 지원하지 않습니다.");
      }
    },
    async myMap(position) {
      let mapContainer = document.getElementById("map"); // 지도를 표시할 div
      let myPos = {
        latitude: position.latitude,
        longitude: position.longitude
      };
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


