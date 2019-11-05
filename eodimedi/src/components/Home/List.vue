<template>
  <div id="hospitalList" class="list-type">
    <ol v-for="(item, idx) in dataList" :key="idx">
      <li>
<<<<<<< eodimedi/src/components/Home/List.vue
        <a prevent @click="getDetail(item)">{{ item.dutyName }}</a>
=======
        <a prevent @click="getDetail">{{ item.name }}</a>
>>>>>>> eodimedi/src/components/Home/List.vue
      </li>
    </ol>
    <!-- <ol>
      <li><a href="detail">A병원</a></li>
      <li><a href="#">B병원</a></li>
      <li v-on:click='tmpfunc'><a href="#">C병원</a></li>
    </ol> -->
  </div>
</template>

<script>
<<<<<<< eodimedi/src/components/Home/List.vue
import * as fn from "../../fn.js"
import * as db from "../../db.js"

export default {
  data() {
    return {
      dataList: [],
      fn,db,
      myPos : {},
      url: "",
      hosList : [],
    };
  },
  methods: {
    // async tmpfunc(){
    //   console.log("this is test",  this.hosList)
    // },
    getList() {
      let hoslist = [
        { 
          dutyName: "큰우리요양병원", 
          wgs84Lon:"36.34638685631565", 
          wgs84Lat: "127.29873466968104", 
          dutyAddr:"대전광역시 유성구 학하서로 99",
          dutyTel1: "042-522-1001"
        }, 
        { 
          dutyName: "최경호가정의학과의원",
          wgs84Lon:"36.3459943059", 
          wgs84Lat: "127.3016832678", 
          dutyAddr:"대전광역시 유성구 학하중앙로59번길 5-3 (덕명동, 호연빌딩)",
          dutyTel1: "042-822-7589"
        }, 
        { 
          dutyName: "새봄의원",
          wgs84Lon:"36.3641513645", 
          wgs84Lat: "127.2899736518", 
          dutyAddr:"대전광역시 유성구 갑동로25번길 53-28",
          dutyTel1: "042-840-7975"
        },
        { 
          dutyName: "세림소아청소년과의원",
          wgs84Lon:"36.3422872129", 
          wgs84Lat: "127.3036784859", 
          dutyAddr:"대전광역시 유성구 학하서로20번길 21 201호",
          dutyTel1: "042-528-8275"
        },
        { 
          dutyName: "몸편한한의원", 
          wgs84Lon:"36.34190587522547", 
          wgs84Lat: "127.30337847550981", 
          dutyAddr:"대전광역시 유성구 학하남로 9, 2층 (계산동)",
          dutyTel1: "070-4201-4593"
        }, 
      ];
      this.dataList.push(...hoslist);
    },
    getDetail (item) {
      this.$store.commit('setInfoDetail', item)
      this.$router.push({name:'detail', params:{item: item}})
    }
  },
  mounted() {
    this.getList();
  },
    created : function() {
    this.hosList = fn.getHosList(fn.getMyPos(), 1, "")
    this.myPos = fn.getMyPos()

  }
};

=======
  export default {
    data() {
      return {
        dataList: [],
        myPos: {},
        url: "",
        hosList: [],
      };
    },
    methods: {
      getList() {
        let hoslist = [{
          name: "A병원"
        }, {
          name: "B병원"
        }, {
          name: "C병원"
        }];
        this.dataList.push(...hoslist);
      },
      getDetail() {
        this.$router.push({
          name: 'detail',
          params: {
            dataSet: this.dataList
          }
        })
      }
    },
    mounted() {
      this.getList();
    }
  };
>>>>>>> eodimedi/src/components/Home/List.vue
</script>

<style scoped>
  .list-type {
    width: 80%;
    margin: 0 auto;
  }

<<<<<<< eodimedi/src/components/Home/List.vue
.list-type ol {
  counter-reset: li;
  list-style: none;
  *list-style: decimal;
  font-size: 15px;
  font-family: "Raleway", sans-serif;
  padding: 0;
}
.list-type ol ol {
  margin: 0 0 0 2em;
}
=======
  .list-type ol {
    counter-reset: li;
    list-style: none;
    *list-style: decimal;
    font-size: 15px;
    font-family: "Raleway", sans-serif;
    padding: 0;
    margin-bottom: 4em;
  }

  .list-type ol ol {
    margin: 0 0 0 2em;
  }
>>>>>>> eodimedi/src/components/Home/List.vue

  .list-type a {
    position: relative;
    display: block;
    padding: 0.4em 0.4em 0.4em 2em;
    *padding: 0.4em;
    margin: 0.5em 0;
    background: #93c775;
    color: #000;
    text-decoration: none;
    -moz-border-radius: 0.3em;
    -webkit-border-radius: 0.3em;
    border-radius: 10em;
    transition: all 0.2s ease-in-out;
  }

  .list-type a:hover {
    background: #d6d4d4;
    text-decoration: none;
    transform: scale(1.1);
  }

  .list-type a:before {
    content: counter(li);
    counter-increment: li;
    position: absolute;
    left: -1.3em;
    top: 50%;
    margin-top: -1.3em;
    background: #93c775;
    height: 2em;
    width: 2em;
    line-height: 2em;
    border: 0.3em solid #fff;
    text-align: center;
    font-weight: bold;
    -moz-border-radius: 2em;
    -webkit-border-radius: 2em;
    border-radius: 2em;
    color: #fff;
  }
</style>
