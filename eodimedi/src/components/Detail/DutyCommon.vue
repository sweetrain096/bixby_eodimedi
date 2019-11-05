<template>
  <div id="dutyCommon">
    <p class="hospitalName">최경호가정의학과의원</p>
    <p class="hospitalAddress">대전광역시 유성구 학하중앙로59번길 5-3 (덕명동, 호연빌딩)</p>
    <div id="dmap">
        <div id="map" class="Map"></div>
    </div>
    <!-- <hr class="thickHr"> -->
    <div class="timeAndTel">
      <div class="runTime">
        <button class="clockImg">
          <i class="far fa-clock clock"></i>
        </button>
        <div class="realRunTime">09:00 ~ 18:00</div>
      </div>
      <a href="tel:010-5399-3731" style="text-decoration: none !important;">
        <div class="call">
            <button class="callImg">
                <i class="fas fa-phone-alt phone"></i>
            </button>
            <div class="callText">
                123-4567-8900
            </div>
        </div>
      </a>
    </div>
    <!-- <hr class="thickHr"> -->
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
          center: new kakao.maps.LatLng(36.34599697710344, 127.3016960888486), // 지도의 중심좌표
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

<style>
  .hospitalName {
    width: 90%;
    font-size: 5vw;
    font-weight: bold;
    color: rgb(108, 110, 112);
    text-align: left;
    margin: auto;
    margin-bottom: 10px;
  }

  .hospitalAddress {
    width: 90%;
    font-size: 4.1vw;
    color: lightgrey;
    text-align: left;
    margin: auto;
    margin-bottom: 10px;
  }

  .Map{
    width: 90%;
    height: 200px;
    background-color: green;
    margin: auto;
    margin-bottom: 10px;
  }

  .timeAndTel {
    width: 90%;
    height: 25px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
  }

  .runTime {
    height: 25px;
    display: flex;
    justify-content: space-between;    
    color: black;
    border-right: 2px solid rgb(238, 238, 238);
  }

  .clockImg {
    height: 25px;
    width: 25px;
    border: 0;
    outline: 0;
    border-radius: 50%;
    display: inline-block;
    margin: 0px 5px 0px 0px;
    padding: 0px 10px 0px 5px;
    text-align: center;
    background-color: white;
  }

  .clock {
    margin-top: 5px;
    font-size: 4vw;
    color: lightgrey;
    display: inline-block;
    text-align: right;
  }

  .realRunTime {
    font-size: 4vw;
    padding: 0px 2.5vw 1px 0px;
    margin: 4px 10px 3px 0px;
    display: inline-block;
    text-align: left;
  }

  .call {
    height: 25px;
    display: flex;
    justify-content: space-between;
    margin: auto; 
    color: black;
  }
  
  .callImg {
    height: 25px;
    width: 25px;
    border: 0;
    outline: 0;
    border-radius: 50%;
    display: inline-block;
    margin: 0px 10px 0px 2.5px;
    text-align: center;
    background-color: white;
  }

  .phone{
    margin-left: 7px;
    margin-top: 5px;
    font-size: 4vw;
    color: lightgrey;
    display: inline-block;
    text-align: right;
  }

  .callText {
    width: 90%;
    font-size: 4vw;
    padding: 0px 10px 1px 0px;
    margin: 4px 10px 3px 0px;
    display: inline-block;
    text-align: left;
  }

  .thickHr {
    width: 90%;
    margin-top: 15px;
    margin-bottom: 25px;
    margin-left:auto;
	  margin-right:auto;
    border: 0.5px solid rgb(238, 238, 238);
  }
</style>