<template>
  <div class="alarmInfo">
    <div>
      <span class="textName">消音</span>
      <span class="alarmData">
        <marquee>{{alarmMsg}}</marquee>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alarmInfo',
  props: {
    alarmMsg: {
      String,
      default: ''
    }
  }
};
</script>

<style lang="scss">
.alarmInfo {
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
    text-align: left;
    > span {
      height: .7rem;
      font-size: .24rem;
      color: #ffd200;
      line-height: .7rem;
      display: inline-block;
      vertical-align: middle;
    }
    .textName{
      color: #fff;
      // margin: 0px .6rem;
      // position: absolute;
      // left: 2.75rem;
      // left: 3.5rem;
      width: 21%;
      text-align: right;
    }
    .alarmData{
      width: 8rem;
      margin-left: .6rem;
      // position: absolute;
      // left: 4.35rem;
      // left: 5.1rem;
      text-shadow:.05rem .03rem .06rem #000;
      overflow: hidden;
    }
  }
}
</style>
