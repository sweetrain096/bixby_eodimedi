<template>
  <div id="container">
    <div class="about">
      <span>
        &copy;2019 —
        <strong>Team TODOC</strong>
      </span>
      <br />
      <br />
      <span>
        Contact US :
        <a class="mail" href="mailto:todoc119@gmail.com">todoc119@gmail.com</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setHeight() {
      let wHeight = window.screen.height;
      document.getElementById("container").style.height = wHeight - 149 + "px";
    }
  },
  mounted() {
    this.setHeight();
  }
};
</script>

<style>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mail {
  text-decoration: none;
  color: darkgrey;
}
</style>