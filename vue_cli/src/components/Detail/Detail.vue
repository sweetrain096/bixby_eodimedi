<template>
  <div id="detail">
    <div class="detailMap">
        여기에 지도가 들어갈거야!
    </div>
    <div class="time">
        <div class="runTime">
            <div id="runTimeText">운영 시간</div>
            <div id="realRunTime">09:00 ~ 18:00</div>
        </div>
        <div class="timeByCar">
            <div id="timeByCarText">차량 이동 시간</div>
            <div id="realTimeByCar">10분</div>
        </div>
    </div>
    <div class="call">
        <button class="callImg">
            <i class="fas fa-phone-alt phone"></i>
        </button>
        <div class="callText">
            123-4567-8900
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .detailMap {
    width: 90%;
    height: 200px;
    border-radius: 10px;
    background-color: grey;
    margin: auto;
    margin-bottom: 10px;
  }

  .time {
    width: 90%;
    height: 60px;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    /* text-align:left; */
  }

  .runTime {
    display: inline-block;
    border-radius: 10px;
    text-align: left;
    width: 48%;
    padding: 2px;
    margin: 2px;
    background-color:rgba(40, 48, 116, 0.65);
  }

  .runTime #runTimeText {
    color: lightgrey;
    margin: 5px;
  }

  .runTime #realRunTime {
    color: white;
    margin: 5px;
  }

  .timeByCar {
    display: inline-block;
    border-radius: 10px;
    text-align: left;
    width: 48%;
    padding: 2px;
    margin: 2px;
    background-color:rgba(40, 48, 116, 0.65);
  }

  .timeByCar #timeByCarText {
    color: lightgrey;
    margin: 5px;
  }

  .timeByCar #realTimeByCar {
    color: white;
    margin: 5px;
  }

  .call {
    width: 90%;
    height: 60px;
    margin: auto;
    margin-bottom: 10px;
    background-color:rgba(40, 48, 116, 0.65);
    display: flex;    
    justify-content: space-between;    
    border-radius: 10px;
    color: white;
  }
  
  .callImg {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: inline-block;
    margin: 10px 15px 10px 15px;
    padding: 0px 10px 0px 0px;
    text-align: center;
    background-color: green;
  }

  .phone{
    margin-left: 9px;
    font-size: 20px;
    color: white;
    display: inline-block;
    text-align: right;
  }

  .callText {
    width: 90%;
    font-size: 20px;
    padding: 12px 10px 12px 0px;
    margin: 5px 10px 5px 0px;
    display: inline-block;
    text-align: left;
  }

</style>