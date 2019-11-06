<template>
  <div id="hospitalList">
    <div class="listlayout">
      <a @click="getDetail(listitem)" class="clicklayout">
        <span>{{ listitem.dutyName }}</span>
        <span v-if="listitem.distance">{{listitem.distance}}km</span>
      </a>
    </div>
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
@import url("https://fonts.googleapis.com/earlyaccess/jejugothic.css");

#hospitalList {
  margin: 12px 10px;
  padding: 0 50px;
}
.listlayout {
  background-color: rgb(227, 239, 240);
  padding: 10px;
  border-radius: 1.03em;
}

.listlayout:hover {
  background: #d6d4d4;
  text-decoration: none;
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}

.clicklayout {
  padding: 2px 15px;
  display: flex;
  justify-content: space-between;
}
</style>