<template>
  <div>
    {{ $route.params.hpid}}<br>
    {{ $route.params.routename}}<br>
    {{ $route.params.longitude}}<br>
    {{ $route.params.latitude}}<br>
    <DutyCommon />
    <HospitalSubject />
  </div>
</template>

<script>
import DutyCommon from "@/components/Detail/DutyCommon.vue";
import HospitalSubject from "@/components/Detail/HospitalSubject.vue";

import * as vars from "@/services/vars.js";
import api from "@/services/api.js";

export default {
  components: {
    DutyCommon,
    HospitalSubject
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
        console.log(res);
      });
    }
  },
  mounted() {
    this.callDetail();
  }
};
</script>

<style>
</style>