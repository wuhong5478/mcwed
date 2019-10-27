<template>
  <div class="myMask-blue">
    <div class="guodu"></div>
     <transition name="custom-classes-transition" enter-active-class="animated  fadeIn" leave-active-class="animated  fadeOut">
      <div class="s-zhuangshi" v-if="showMain !== 0"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'myMask',
  data() {
    return {
      showMain: 0
    };
  },
  props: {
    ShowMain: Number
  },
  watch: {
    ShowMain(val) {
      this.showMain = val;
    }
  }
};
</script>
<style lang="scss">
.myMask-blue {
  width: 100%;
  // min-width: 2880px;
  height: 100%;
  // min-height: 1620px;
  overflow: auto;
  background-size: cover;
  position:absolute;
  background-size: 100% 100%;
  pointer-events: none;
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
    pointer-events: auto;
  }
}
</style>
