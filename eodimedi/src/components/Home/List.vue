<template>
  <div id="hospitalList" class="list-type">
    <ol>
      <li><a href="detail">A병원</a></li>
      <li><a href="detail">B병원</a></li>
      <li><a href="detail">C병원</a></li>
    </ol>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>
  .list-type{
  width:80%;
  margin:0 auto;
  }

  .list-type ol{
  counter-reset: li;
  list-style: none;
  *list-style: decimal;
  font-size: 15px;
  font-family: 'Raleway', sans-serif;
  padding: 0;
  margin-bottom: 4em;
  }
  .list-type ol ol{
  margin: 0 0 0 2em;
  }

  .list-type a{
  position: relative;
  display: block;
  padding: .4em .4em .4em 2em;
  *padding: .4em;
  margin: .5em 0;
  background: #93C775;
  color: #000;
  text-decoration: none;
  -moz-border-radius: .3em;
  -webkit-border-radius: .3em;
  border-radius: 10em;
  transition: all .2s ease-in-out;
  }

  .list-type a:hover{
  background: #d6d4d4;
  text-decoration:none;
  transform: scale(1.1);
  }

  .list-type a:before{
  content: counter(li);
  counter-increment: li;
  position: absolute;
  left: -1.3em;
  top: 50%;
  margin-top: -1.3em;
  background:#93C775;
  height: 2em;
  width: 2em;
  line-height: 2em;
  border: .3em solid #fff;
  text-align: center;
  font-weight: bold;
  -moz-border-radius: 2em;
  -webkit-border-radius: 2em;
  border-radius: 2em;
  color:#FFF;
  }
</style>
