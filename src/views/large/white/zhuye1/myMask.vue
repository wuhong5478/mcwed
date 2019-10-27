<template>
  <div class="myMask">
    <div class="guodu"></div>
    <div class="s-zhuangshi"></div>
  </div>
</template>

<script>
export default {
  name: 'myMask',
  data() {
    return {
    };
  }
};
</script>

<style lang="scss">
.myMask {
  width: 100%;
  // min-width: 2880px;
  height: 100%;
  // min-height: 1620px;
  overflow: auto;
  background-size: cover;
  position:absolute;
  background-size: 100% 100%;
  // pointer-events: none;
  div{
    float:left;
    position:absolute;
  }
  .guodu{
    width: 100%;
    // min-width: 2880px;
    height: 100%;
    // min-height: 1620px;
    background: url('../../../../assets/img/new/gd.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .s-zhuangshi{
    width: 100%;
    // min-width: 2880px;
    height: 100%;
    // min-height: 1620px;
    background: url('../../../../assets/img/new/s-zs.png') no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>
