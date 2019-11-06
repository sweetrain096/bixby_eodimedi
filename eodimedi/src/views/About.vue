<template>
  <div id="about">
      <span>
        &copy;2019 —
        <strong>Team TODOC</strong>
      </span><br><br>
      <span>Contact US : <a class="mail" href="mailto:todoc119@gmail.com">todoc119@gmail.com</a></span>
  </div>
</template>

<script>
export default {
  methods: {
    setHeight() {
      // let wHeight = window.screen.height;
      // document.getElementById("about").style.height = wHeight - 149 + "px";
    }
  },
  mounted() {
    this.setHeight();
  }
};
</script>

<style scoped>
#about {
  display: block;
  bottom: 90px;
  margin-top: 300px;;
}
.mail {
  text-decoration: none;
  color: darkgrey;
}
</style>