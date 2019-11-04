<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <BottomButton />
    <div class="bottombuttonlayout"></div>
  </div>
</template>

<style>
.bottombuttonlayout {
  position: relative;
  height: 60px;
  z-index: -1;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
import BottomButton from "@/components/App/BottomButton.vue";

export default {
  name: "app",
  components: {
    BottomButton
  },
  methods: {
    setCurrentPosition() {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            let currentPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            console.log(position)
            this.$store.commit("setCurrentPosition", currentPosition);
          },
          error => {
            alert('error');
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다.");
      }
    }
  },
  mounted () {
    this.setCurrentPosition()
  }
};
</script>