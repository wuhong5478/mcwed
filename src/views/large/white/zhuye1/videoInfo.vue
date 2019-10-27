<template>
  <div class="videoInfo">
    <div class="videoHead">
      <div class="theTitle">
        <div class="title1">查看视频监控</div>
      </div>
      <div class="quit" @click="closeVideoInfo()">×</div>
    </div>
    <div class="content videoContext">
      <vedioplayer :videoUrl="videoUrl"></vedioplayer>
    </div>
  </div>
</template>

<script>
import vedioplayer from './vedioplayer.vue';

export default {
  name: 'videoInfo',
  props: {
    videoUrl: {
      String,
      default: ''
    },
    videoDeviceName: {
      String,
      default: ''
    },
    videoProductKey: {
      String,
      default: ''
    }
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    closeVideoInfo() {
      // this.closeVideo();
      this.$parent.changeVideoInfoShow();
    },
    closeVideo() {
      let params = {};
      if (this.videoProductKey && this.videoDeviceName) {
        params = {
          deviceName: this.videoDeviceName,
          productKey: this.videoProductKey,
          type: 'videoShow'
        }
      }
      else {
        params = {
          type: 'videoShow'
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'videoShowStopStream',
        params
        // params: {
        //  /* deviceName: 'yqeu8YXi63t7dX2LCmha', // 测试用数据
        //   productKey: 'a13m462Mhhy', */
        //   deviceName: this.videoDeviceName,
        //   productKey: this.videoProductKey,
        //   type: 'videoShow'
        // }
      }).then(({ data }) => {
        console.log('关闭deviceName: ', this.videoDeviceName, data.data);
      });
    }
  },
  components: {
    vedioplayer
  },
  beforeDestroy() {
    this.closeVideo();
  }
};
</script>

<style lang="scss">
.videoInfo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: rgba(#000, 0.3);
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .videoHead{
    height: 9%;
    background-image: -webkit-linear-gradient(left, rgb(11,35,56), rgb(56,70,83));
    border-bottom: 0.01rem solid rgb(142,143,145);
    .quit{
      float:right;
      width: 2%;
      margin-right:.4rem;
      color: white;
      font: 100 0.6rem/1rem Tahoma,Verdana,sans-serif;
      cursor: pointer;
    }
    .theTitle{
      float: left;
      display: flex;
      width: 80%;
      flex-direction: row;
      justify-content: left;
      .title1{
        margin-left: .6rem;
        padding-top: .3rem;
        font-size: .33rem;
        color: white;
      }
    }
  }
  .videoContext{
    background-color: rgb(57,72,84) !important;
    padding: .16rem 0.48rem !important;
    width: calc(100% - 0.96rem) !important;
    height: calc(91% - .32rem)!important;
  }
  .video-player{
    height: 100%;
  }
}
</style>
