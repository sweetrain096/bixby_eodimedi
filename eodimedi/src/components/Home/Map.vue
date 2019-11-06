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
      myPos: {latitude:36.355176, longitude:127.298694},
      flag: [false, false, false, false, false],
      positionList : [],
      getdataList : []
    };
  },
  computed: {
    dataList () {
      return this.$store.state.listItems
    }
  },
  methods: {
    // async drawMap() {
    //   if (window.navigator.geolocation) {
    //     window.navigator.geolocation.getCurrentPosition(
    //       position => {
    //         this.myPos = {
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude
    //         };
    //         // this.myMap(this.myPos);
    //       },
    //       error => {
    //         alert("위치 정보를 허용해주세요.");
    //       }
    //     );
    //   } else {
    //     alert("GPS를 지원하지 않습니다.");
    //   }
    // },
    async myMap(position) {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
          mapOption = { 
              center: new kakao.maps.LatLng(position.latitude, position.longitude), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
          };
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        
        // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
        var positions = [
            {
                content: `<div>${this.getdataList[0].dutyName}</div>`, 
                latlng: new kakao.maps.LatLng(this.getdataList[0].latitude, this.getdataList[0].longitude)
            },
            {
                content: `<div>${this.getdataList[1].dutyName}</div>`, 
                latlng: new kakao.maps.LatLng(this.getdataList[1].latitude, this.getdataList[1].longitude)
            },
            {
                content: `<div>${this.getdataList[2].dutyName}</div>`, 
                latlng: new kakao.maps.LatLng(this.getdataList[2].latitude, this.getdataList[2].longitude)
            },
            {
                content: `<div>${this.getdataList[3].dutyName}</div>`,
                latlng: new kakao.maps.LatLng(this.getdataList[3].latitude, this.getdataList[3].longitude)
            },
            {
                content: `<div>${this.getdataList[4].dutyName}</div>`,
                latlng: new kakao.maps.LatLng(this.getdataList[4].latitude, this.getdataList[4].longitude)
            }
        ];
        for (var i = 0; i < 5; i ++) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: positions[i].latlng // 마커의 위치
          });

          // 마커에 표시할 인포윈도우를 생성합니다 
          var infowindow = new kakao.maps.InfoWindow({
              content: positions[i].content // 인포윈도우에 표시할 내용
          });

          // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
          // 이벤트 리스너로는 클로저를 만들어 등록합니다 
          // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          if (this.flag[i] === false) {
            kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow));
          } else {
            kakao.maps.event.addListener(marker, 'click', makeOutListener(infowindow));
          }
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
      function makeOverListener(map, marker, infowindow) {
        return function() {
            infowindow.open(map, marker);
          };
      }

      // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
      function makeOutListener(infowindow, idx) {
          return function() {
            infowindow.close();
          };
      }
    }
  },
  mounted() {
    // this.drawMap();
    this.myMap(this.myPos)
  },
  watch: {
    dataList(to, from) {
      this.getdataList = this.dataList
      this.myMap(this.myPos);
      // this.dataList.forEach(data => {
      //   console.log(data)
      // });
      var list = new Array();
      for (var idx in this.dataList) {
        var Json = new Object();
        Json.content = `<div>${this.dataList[0].dutyName}</div>`
        Json.latlng = new kakao.maps.LatLng(this.dataList[idx].latitude, this.dataList[idx].longitude)
        list.push(Json)
      }
      this.positionList = list
    }
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


