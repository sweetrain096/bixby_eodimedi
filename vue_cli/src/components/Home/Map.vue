<template>
<div id="dmap">
  <div id="map" class="Map"></div>
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
      let currentPosition;
      window.navigator.geolocation.getCurrentPosition(this.success, this.error, currentPosition);
    },
    success: function(pos){
      let crd = pos.coords;
      this.pos.lat = crd.latitude;
      this.pos.lon = crd.longitude;
      // console.log(crd);
    },
    error: function(err){
      console.warn('ERROR(' + err.code + '): ' + err.message);
    },
    getMap: function(){
      console.log(this.pos)
      var that = this
      var temp = that.pos.lat
      if (this.pos){
        console.log('##', temp)
      }
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };
      var map = new kakao.maps.Map(mapContainer, mapOption); 
    },


  },
  mounted() {
    this.getLocation();
    this.getMap();
  }
}

// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  
//   mapOption = { 
//     center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//     level: 3 // 지도의 확대 레벨
//   };

</script>

<style scoped>
  .Map{
    width: 90%;
    height: 200px;
    background-color: green;
    margin: auto;
    margin-bottom: 30px;
  }
</style>