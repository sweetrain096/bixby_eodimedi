<template>
  <div id="dutyCommon">
    <p>{{dataInfo}}</p>
    <!-- <p class="hospitalName">{{detailInfo.dutyName}}</p>
    <p class="hospitalAddress">{{detailInfo.dutyAddr}}</p>
    <div id="dmap">
        <div id="map" class="Map"></div>
    </div> -->
    <!-- <DetailMap v-bind:position="postLocation"></DetailMap>
    <div class="time">
        <div class="runTime">
            <div id="runTimeText">운영 시간</div>
            <div id="realRunTime">09:00 ~ 18:00</div>
        </div>
        <div class="timeByCar">
            <div id="timeByCarText">전화 번호</div>
            <div id="realTimeByCar">{{detailInfo.dutyTel1}}</div>
        </div>
    </div> -->

  </div>
</template>


<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa0a6e1d29e59a3ef4e379174688985d"></script>
<script>
import DetailMap from '@/components/Detail/DetailMap.vue'

export default {
  components: {
    DetailMap
  },
  data(){
    return{
    }
  },
  computed: {
    dataInfo () {
      return this.$store.state.infoDetail
    }
  },
  methods: {
    // infoDetail
    // postLocation () {
    //   console.log('postLocation', this.detailInfo.wgs84Lat)
    //   return {latitude: this.detailInfo.wgs84Lat, longitude: this.detailInfo.wgs84Lon}
    // }
  // },
  // methods: {
  //   getLocation: function(){
      
  //     let currentPosition;
  //     window.navigator.geolocation.getCurrentPosition(this.success, this.error, currentPosition);
  //   },
  //   success: function(pos){
  //     let crd = pos.coords;
  //     this.pos.lat = crd.latitude;
  //     this.pos.lon = crd.longitude;
  //     // console.log(crd);
  //   },
  //   error: function(err){
  //     console.warn('ERROR(' + err.code + '): ' + err.message);
  //   },
    // getMap: function(){
    //   console.log(this.pos)
    //   var that = this
    //   var temp = that.pos.lat
    //   if (this.pos){
    //     console.log('##', temp)
    //   }
    //   var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    //     mapOption = { 
    //       center: new kakao.maps.LatLng(detailInfo.wgs84Lon, detailInfo.wgs84Lat), // 지도의 중심좌표
    //       level: 3 // 지도의 확대 레벨
    //     };
    //   var map = new kakao.maps.Map(mapContainer, mapOption); 
    // },


  },
  mounted() {
    console.log('detailData', this.detailInfo)
    // this.getLocation();
    // this.getMap();
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
    font-size: 18px;
    font-weight: bold;
    color: rgb(108, 110, 112);
    text-align: left;
    margin: auto;
    margin-bottom: 10px;
  }

  .hospitalAddress {
    width: 90%;
    font-size: 15px;
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
    margin-bottom: 30px;
  }

  .time {
    width: 90%;
    height: 60px;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .runTime {
    display: inline-block;
    border-radius: 10px;
    text-align: left;
    width: 48%;
    padding: 2px;
    margin: 2px;
    background-color:rgba(40, 48, 116, 0.65);
  }

  .runTime #runTimeText {
    color: lightgrey;
    margin: 5px;
  }

  .runTime #realRunTime {
    color: white;
    margin: 5px;
  }

  .timeByCar {
    display: inline-block;
    border-radius: 10px;
    text-align: left;
    width: 48%;
    padding: 2px;
    margin: 2px;
    background-color:rgba(40, 48, 116, 0.65);
  }

  .timeByCar #timeByCarText {
    color: lightgrey;
    margin: 5px;
  }

  .timeByCar #realTimeByCar {
    color: white;
    margin: 5px;
  }

  .call {
    width: 90%;
    height: 60px;
    margin: auto;
    margin-bottom: 15px;
    background-color:rgba(40, 48, 116, 0.65);
    display: flex;    
    justify-content: space-between;    
    border-radius: 10px;
    color: white;
  }
  
  .callImg {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: inline-block;
    margin: 10px 15px 10px 15px;
    padding: 0px 10px 0px 0px;
    text-align: center;
    background-color: green;
  }

  .phone{
    margin-left: 9px;
    font-size: 20px;
    color: white;
    display: inline-block;
    text-align: right;
  }

  .callText {
    width: 90%;
    font-size: 20px;
    padding: 12px 10px 12px 0px;
    margin: 5px 10px 5px 0px;
    display: inline-block;
    text-align: left;
  }
</style>