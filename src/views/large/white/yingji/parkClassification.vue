<template>
  <div class="parkClassification">
    <div @click="videoShow(1)" :class="{choiceFloor:isChoiceFloor}">楼层信息</div>
    <div @click="videoShow(2)" :class="{choiceVideo:isChoiceVideo}">视频联动</div>
  </div>
</template>
<script>
export default {
  name: 'parkClassification',
  data() {
    return {
      isChoiceFloor: false,
      isChoiceVideo: true
    };
  },
  methods: {
    videoShow(val) {
      this.$emit('isVideoShow', val);
      if (val === 1) {
        this.isChoiceFloor = true;
        this.isChoiceVideo = false;
      }
      else {
        this.isChoiceVideo = true;
        this.isChoiceFloor = false;
      }

    }
  }
};
</script>

<style lang="scss">
  .parkClassification {
    width: 100%;
    height: 100%;
    padding: 0 3.8rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    >div {
      margin: 0 .15rem;
      // width: 2.65rem;
      width: calc(50% - .3rem);
      height: 100%;
      background: url('../../../../assets/img/new/parkClassification.png') no-repeat;
      background-size: 100% 100%;
      font-family: 微软雅黑;
      font-size: .342rem;
      color: rgba($color: #fff, $alpha: 0.5);
      line-height: .76rem;
      font-weight: bold;
      cursor: pointer;
    }

    .choiceFloor {
      color: rgba($color: #fff, $alpha: 1);
    }

    .choiceVideo {
      color: rgba($color: #fff, $alpha: 1);
    }
  }
</style>
