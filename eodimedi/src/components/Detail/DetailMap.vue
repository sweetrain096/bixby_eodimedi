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
  data(){
    return{
      pos: {
        lat: "",
        lon: ""
      }
    }
  },
  methods: {
    getLocation: function(){
      window.navigator.geolocation.getCurrentPosition(this.success, this.error);
    },
    success: function(pos){
        let crd = pos.coords;
        this.pos.lat = crd.latitude;
        this.pos.lon = crd.longitude;
        this.getMap();
        // console.log(crd);
    },
    error: function(err){
      console.warn('ERROR(' + err.code + '): ' + err.message);
    },
    getMap: function() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    //   if (this.pos) {
        mapOption = { 
            center: new kakao.maps.LatLng(this.pos.lat, this.pos.lon), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(this.pos.lat, this.pos.lon); 

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
    this.getLocation();
  }
}

// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  
//   mapOption = { 
//     center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//     level: 3 // 지도의 확대 레벨
//   };

</script>

<style>
  .Map{
    width: 90%;
    height: 200px;
    background-color: green;
    margin: auto;
    margin-bottom: 30px;
  }
</style>