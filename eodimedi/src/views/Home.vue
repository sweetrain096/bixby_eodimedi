<template>
  <div>
    <Map />
    <list-component />
  </div>
</template>

<script>
  import ListComponent from '@/components/Home/List.vue'
  import Map from '@/components/Home/Map.vue'
  import * as vars from '@/services/vars.js'
  import callListData from '@/services/callListData.js'
  import api from '@/services/api.js'


  export default {
    components: {
      ListComponent,
      Map
    },
    computed: {
      routeName() {
        return this.$route.params.type
      },
      currentPosition() {
        return this.$store.state.currentPosition
      },

    },
    methods: {
      callAPI() {
        let url = 'C:/Users/multicampus/Desktop/silverlyjoo/final/eodimedi/AjaxRequest.jsp?getUrl='
        let subURL =
          'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire?ServiceKey=K6sYWvqebVyngpczytPk5eOtSHyZapagbhcTDE31E6hsk57L5V8cJdQKn033Fvj4QU7m6jfDg7evWZLIgCHPBw%3D%3D&WGS84_LON=127.2983403&WGS84_LAT=36.3549777&pageNo=1&numOfRows=50'
        api.request(url+subURL, {
            method: 'get'
          })
          .then((res) => {
            console.log(res)
          })
        console.log(url+subURL)
      }
      // checkURL () {
      //   let pos = {
      //     latitude:36.3549777,
      //     longitude: 127.2983403
      //   }
      //   console.log(callListData(pos, vars, 1))
      // }
    },
    mounted() {
      this.callAPI()
      // this.checkURL()
    },
    watch: {
      routeName(to, from) {
        console.log(to)
      }
    }
  }
</script>

<style scoped>

</style>