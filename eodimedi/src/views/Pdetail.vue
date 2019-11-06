<template>
  <div>
    <!-- {{ $route.params }}<br>
    {{ $route.params.hpid}}<br>
    {{ $route.params.routename}}<br>
    {{ $route.params.longitude}}<br>
    {{ $route.params.latitude}}<br> -->
    <!-- {{res}} -->
    <DutyCommon />
  </div>
</template>

<script>
import DutyCommon from "@/components/Detail/DutyCommon.vue";

import * as vars from "@/services/vars.js";
import api from "@/services/api.js";

export default {
  components: {
    DutyCommon,
  },
  methods: {
    checkOpCode() {
      let routename = this.$route.params.routename;
      if (routename == "hospital") {
        return vars.EndPoint + vars.detail;
      } else if (routename == "pharmacy") {
        return vars.EndPoint + vars.pdetail;
      }
    },
    callDetail() {
      let url =
        this.checkOpCode() +
        "?" +
        "key=" +
        vars.ServiceKey +
        "&HPID=" +
        this.$route.params.hpid;
        api.get(url).then(res => {
          this.$store.commit('setInfoDetail', res)
          console.log(res);
        });
      }
  },
  mounted() {
    this.callDetail();
  },
  destroyed() {
    this.$store.commit('stateClear')
  }
};
</script>

<style>
</style>