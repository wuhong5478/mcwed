<template>
  <div class="alarmInfo-blue">
    <div>
      <span class="textName">消音</span>
      <span class="alarmData">
        <marquee>o.201901250012设备ID1232143112XXX建筑XXX位置烟感设备报警</marquee>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alarmInfo'
};
</script>

<style lang="scss">
.alarmInfo-blue {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  > div {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background-image: url("../../../../assets/img/new/alarmInfo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    > span {
      height: .7rem;
      font-size: .24rem;
      color: #ffd200;
      line-height: .7rem;
    }
    .textName{
      color: #fff;
      margin: 0px .6rem;
      position: absolute;
      left: 2.75rem;
    }
    .alarmData{
      width: 8rem;
      position: absolute;
      left: 4.35rem;
      text-shadow:.05rem .03rem .06rem #000;
      overflow: hidden;
    }
  }
}
</style>
