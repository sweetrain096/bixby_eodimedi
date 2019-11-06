<template>
  <div>
    <Map />

    <div v-for="(listitem, idx) in dataList" :key="idx">
      <list-component :listitem='listitem' :routename='routeName'/>
      <!-- {{ listitem}} -->
    </div>
  </div>
</template>

<script>
  import ListComponent from '@/components/Home/List.vue'
  import Map from '@/components/Home/Map.vue'

  import * as vars from '@/services/vars.js'
  import api from '@/services/api.js'

  export default {
    data() {
      return {
        dataList: []
      }
    },
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
      checkOpCode() {
        if (this.routeName == 'hospital') {
          return vars.EndPoint + vars.location
        } else if (this.routeName == 'pharmacy') {
          return vars.EndPoint + vars.plocation
        } else if (this.routeName == 'moon') {
          return vars.EndPoint + BabyOperation
        }
      },

      // startList() {
        // if (window.navigator.geolocation) {
        //   window.navigator.geolocation.getCurrentPosition(
        //     position => {
        //       let url = this.checkOpCode() + "?" +
        //         "key=" + vars.ServiceKey +
        //         "&lon=" + '36.355176' +
        //         "&lat=" + '127.298694' +
        //         "&page=" + vars.pageNo +
        //         "&row=" + vars.numOfRows

        //       api.get(url)
        //         .then((res) => {
        //           let payloadData = res.data.response.body.items
        //           if (payloadData.item.length > 1) {
        //             this.dataList.push(...payloadData.item)
        //           } else if (payloadData) {
        //             this.dataList.push(payloadData.item)
        //           } else {
        //             console.log('there is no Hospital')
        //           }
        //         })
        //     },
        //     error => {
        //       alert("위치 정보를 허용해주세요.");
        //     }
        //   );
        // } else {
        //   alert("GPS를 지원하지 않습니다.");
        // }
        
      // },
      makeList () {
        let url = this.checkOpCode() + "?" +
          "key=" + vars.ServiceKey +
          "&lon=127.298694" + 
          "&lat=36.355176" +
          "&page=" + vars.pageNo +
          "&row=" + vars.numOfRows

        api.get(url)
          .then((res) => {
            console.log(res)
            let payloadData = res.data.response.body.items
            if (payloadData.item.length > 1) {
              this.dataList.push(...payloadData.item)
            } else if (payloadData) {
              this.dataList.push(payloadData.item)
            } else {
              console.log('there is no Hospital')
            }
          })
          this.$store.commit('setListItems', this.dataList)
      }
    },
    mounted() {
      this.makeList()
    },
    watch: {}
  }
</script>

<style scoped>

</style>