<template>
  <div>
    <DutyCommon />
    <HospitalSubject />
  </div>
</template>

<script>
import DutyCommon from "@/components/Detail/DutyCommon.vue";
import HospitalSubject from "@/components/Detail/HospitalSubject.vue";

export default {
  components: {
    DutyCommon,
    HospitalSubject
  },
  methods: {
    checkData() {
      console.log(this.$route.params.dataSet);
    }
  },
  mounted() {
    this.checkData();
  }
};
</script>

<style>
</style>