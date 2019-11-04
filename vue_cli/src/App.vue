<template>
  <div id="app">
    <Loading v-show="loading"/>
    <div id="page" v-show="!loading">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <BottomButton/>
    </div>
    
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
// @ is an alias to /src
import Loading from '@/components/App/Loading.vue'
import BottomButton from '@/components/App/BottomButton.vue'


export default {
  name: 'app',
  components: {
    Loading,
    BottomButton,
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    loadLoading: function(){
      setTimeout(() => {this.loading = false}, 1000)
    }
  },
  mounted(){
    this.loadLoading();
  }
  // mounted() {
  //   loadingAjaxRequest.then(res =>{
  //     this.loading = false
  //   })
  // }
}
</script>