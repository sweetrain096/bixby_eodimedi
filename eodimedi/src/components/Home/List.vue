<template>
  <div id="hospitalList" class="list-type">
    <ol>
      <li>
        <a @click="getDetail(listitem)">{{ listitem.dutyName }}</a>
        <!-- {{ routename }} -->
        <!-- {{ listitem }} -->
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    listitem: {
      type: Object
    },
    routename: {
      type: String
    }
  },
  methods: {
    getDetail(it) {
      let obj = {
        hpid: it.hpid,
        routename: this.routename,
        latitude: it.latitude,
        longitude: it.longitude
      };
      if (obj.routename == "hospital") {
        this.$router.push({ name: "detail", params: obj });
      } else if (obj.routename == "pharmacy") {
        this.$router.push({ name: "pdetail", params: obj });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/earlyaccess/jejugothic.css');

li {
  margin-bottom: 10px;
}

.list-type {
  width: 80%;
  margin: 0 auto;
  height: 20px;
}

.list-type ol {
  counter-reset: li;
  list-style: none;
  *list-style: decimal;
  font-size: 16px;
  padding: 0;
  margin: 45px 0px;
  height: 20px;
}
.list-type ol ol {
  margin: 0 0 0 2em;
}

.list-type a {
  position: relative;
  display: block;
  /* padding: 0.4em 0.4em 0.4em 2em; */
  padding: 15px;
  /* *padding: 0.4em; */
  margin: 0.5em 0;
  background: rgb(227, 239, 240);
  color: black;
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
  /* content: counter(li); */
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