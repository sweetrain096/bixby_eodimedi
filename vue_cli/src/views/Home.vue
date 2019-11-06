<template>
  <div>
    <Map/>
    <HospitalList/>
  </div>
</template>

<script>
import HospitalList from '@/components/Home/List.vue'
import Map from '@/components/Home/Map.vue'

export default {
  components:{
    HospitalList,
    Map
  }
}
</script>

<style scoped>

</style>
