<template>
  <div id="hospitalList" class="list-type">
    <!-- <ol v-for="(item, idx) in dataList" :key="idx">
      <li>
        <a prevent @click="getDetail">{{ item.name }}</a>
      </li> -->
    <ol>
      <li><a href="detail">A병원</a></li>
      <li><a href="#">B병원</a></li>
      <li v-on:click='tmpfunc'><a href="#">C병원</a></li>
    </ol>
  </div>
</template>

<script>
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
    async tmpfunc(){
      console.log("this is test",  this.hosList)
    },
    getList() {
      let hoslist = [{ name: "A병원" }, { name: "B병원" }, { name: "C병원" }];
      this.dataList.push(...hoslist);
    },
    getDetail () {
      this.$router.push({name:'detail', params:{dataSet: this.dataList}})
    }
  },
  mounted() {
    this.getList();
  },
    created : function() {
    this.hosList = fn.getHosList(fn.getMyPos(), 1, "")

  }
};

</script>

<style scoped>
.list-type {
  width: 80%;
  margin: 0 auto;
}

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
