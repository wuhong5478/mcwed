<template>
  <div class="video">
    <div class="one">
      <vedioplayer></vedioplayer>
    </div>
    <div class="two">
      <vedioplayer1></vedioplayer1>
    </div>
    <div class="three">
      <vedioplayer2></vedioplayer2>
    </div>
    <div class="four">
      <vedioplayer3></vedioplayer3>
    </div>
  </div>
</template>

<script>
import vedioplayer from './vedioplayer.vue';
import vedioplayer1 from './vedioplayer1.vue';
import vedioplayer2 from './vedioplayer2.vue';
import vedioplayer3 from './vedioplayer3.vue';
// import ckplayer from './ckplayer.vue';
export default {
  name: 'videoScreen',
  data() {
    return {};
  },
  components: {
    vedioplayer,
    vedioplayer1,
    vedioplayer2,
    vedioplayer3
    // ckplayer
  },
  methods: {

  },
  mounted() {
    this.$nextTick(() => {
    });
  }
};
</script>

<style lang="scss">
  .video {
    width: 100%;
    height: 100%;
    margin: 0;
    // padding: .3rem .3rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;

    .one {
      // margin-left: 10px;
      position: relative;
      //background: url('../../../../assets/img/new/video_1.png') no-repeat center center;
    }

    .two {
      position: relative;
      //background: url('../../../../assets/img/new/video_2.png') no-repeat center center;
    }

    .three {
      // margin-left: 10px;
      position: relative;
      //background: url('../../../../assets/img/new/video_3.png') no-repeat center center;
    }

    .four {
      position: relative;
      //background: url('../../../../assets/img/new/video_4.png') no-repeat center center;
    }

  }
</style>
