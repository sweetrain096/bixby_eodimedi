<template>
  <div id="dutyCommon">
    <div id="dmap">
      <div id="map" class="Map"></div>
    </div>
  </div>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa0a6e1d29e59a3ef4e379174688985d"></script>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    dataInfo () {
      return this.$store.state.infoDetail
    }
  },
  methods: {
  // getLocation: function(){
  //   window.navigator.geolocation.getCurrentPosition(this.success, this.error);
  // },
  // success: function(pos){
  //     let crd = pos.coords;
  //     console.log(this.position)

  //     this.getMap();
  //     // console.log(crd);
  // },
  // error: function(err){
  //   console.warn('ERROR(' + err.code + '): ' + err.message);
  // },
  getMap: function() {
    console.log('pos', this.dataInfo.wgs84Lon)
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
  //   if (this.pos) {
      mapOption = {
        center: new kakao.maps.LatLng(this.dataInfo.wgs84Lat, this.dataInfo.wgs84Lon), // 지도의 중심좌표
        // 병원, 약국을 중심으로
        level: 3 // 지도의 확대 레벨
      };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 마커가 표시될 위치입니다
      var markerPosition  = new kakao.maps.LatLng(this.dataInfo.wgs84Lat, this.dataInfo.wgs84Lon);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          position: markerPosition
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
  //   }

  },
  },
  mounted() {
    this.getMap();
  },
  watch: {
    dataInfo(to, from) {
      this.getMap()
    }
  }
}

</script>

<style>
.Map {
  width: 90%;
  height: 200px;
  background-color: green;
  margin: auto;
  margin-bottom: 30px;
}
.hidden {
  visibility: hidden
}
</style>