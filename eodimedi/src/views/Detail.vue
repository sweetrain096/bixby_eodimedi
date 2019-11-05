<template>
  <div>
    {{ $route.params.hpid}}
    {{ $route.params.routename}}
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
  }
};
</script>

<style>
</style>