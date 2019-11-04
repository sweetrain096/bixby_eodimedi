<template>
  <div>
    <Map/>
    <HospitalList/>
    <div>{{ currentPosition }}</div>
  </div>
</template>

<script>
import HospitalList from '@/components/Home/List.vue'
import Map from '@/components/Home/Map.vue'

export default {
  components:{
    HospitalList,
    Map
  },
  computed : {
    routeName () {
      return this.$route.params.type
    },
    currentPosition () {
      return this.$store.state.currentPosition
    }
  },
  methods : {
    checkRoute () {
      console.log(this.routeName)
    }
  },
  mounted () {
    this.checkRoute()
  },
  watch : {
    routeName (to, from) {
      console.log(to)
    }
  }
}
</script>

<style scoped>

</style>
