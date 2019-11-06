<template>
  <div id="dutyCommon">
    <!-- <p>aaaa{{dataInfo.data.response.body.items.item}}</p> -->
    <p class="hospitalName">{{dataInfo.dutyName}}</p>
    <p class="hospitalAddress">{{dataInfo.dutyAddr}}</p>
    <DetailMap />
    <div class="timeAndTel">
      <div class="runTime">
        <button class="clockImg">
          <i class="far fa-clock clock"></i>
        </button>
        <div class="realRunTime">{{timeFormat(dataInfo.dutyTime1s)}} ~ {{timeFormat(dataInfo.dutyTime1c)}}</div>
        </div>
      <a :href="`tel:${dataInfo.dutyTel1}`" style="text-decoration: none !important;"> 
        <div class="call">
          <button class="callImg">
              <i class="fas fa-phone-alt phone"></i>
          </button>
          <div class="callText">
              {{dataInfo.dutyTel1}}
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa0a6e1d29e59a3ef4e379174688985d"></script>
<script>
import DetailMap from "@/components/Detail/DetailMap.vue";
export default {
  data() {
    return {};
  },
  components: {
    DetailMap
  },
  computed: {
    dataInfo() {
      return this.$store.state.infoDetail;
    }
  },
  methods: {
    timeFormat(time) {
      if (time == null) {
        time = "알 수 없음";
      } else {
        time = time.substring(0, 2) + ":" + time.substring(2, 4);
      }
      return time;
    }
    // infoDetail
    // postLocation () {
    //   console.log('postLocation', this.detailInfo.wgs84Lat)
    //   return {latitude: this.dataInfo.data.response.body.items.item.wgs84Lat, longitude: this.dataInfo.data.response.body.items.item.wgs84Lon}
    // }
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
    console.log("detailData", this.detailInfo);
    // this.getLocation();
    // this.getMap();
  }
};

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
    margin: -3px 5px -3px 0px;
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
    margin: -3px 10px -3px 2.5px;
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