<template>

  <div id="player">

    <video-player v-if="showplayer" class="video-player vjs-custom-skin" ref="videoPlayer" :options="playerOptions"
      :playsinline="true" @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)">


    </video-player>
    <div class="loading" v-if="!showLoading" v-loading="loading" element-loading-text="视频加载中"></div>
  </div>
</template>

<script>
import {
  videoPlayer
} from 'vue-video-player';
import 'videojs-contrib-hls';
import 'videojs-flash';

// eslint-disable-next-line
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
// require('videojs-contrib-hls/dist/videojs-contrib-hls');

export default {
  name: 'vedioplayer1',
  data() {
    return {
      showLoading: false,
      loading: true,
      showplayer: false,
      // 这里使用vedioJS组件进行直播视频播放
      title: '',
      size: '',
      name: [1],
      videoShow: false,
      playerOptions: {
        // videojs options
        live: true, // 是否为直播
        autoplay: true, // 如果true,浏览器准备好时开始播放
        muted: true, // 静音
        language: 'zh-CN', // 初始化语言
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        // techOrder: ['flash', 'html5'],// 设置顺序，
        sourceOrder: true,
        sources: [
          {
            type: 'application/x-mpegURL',
            src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
          }

        ],
        // width: '660px',
        // height: '580px',
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    };
  },
  components: {
    videoPlayer // 注册组件
  },
  methods: {
    // canplaythrough表示可是流畅播放了
    onPlayerCanplaythrough(player) {
      console.log(player);
      // 这个是准备好播放
      // this.showLoading = true;
    },
    onPlayerCanplay(player) {
      // 这个是要刚好播放
      console.log(player);
      this.showLoading = true;
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.showplayer = true;
    });

  }
};
</script>

<style lang="scss">
  .video {
    width: 100%;
    height: 100%;
    margin: 0;
    // padding: .3rem .15rem;
    box-sizing: border-box;
    position: relative !important;

    >div {
      margin: 0;
      padding: 0;
      width: 50%;
      height: 50%;
      box-sizing: border-box;
      float: left;
      //background: url('../../../../assets/img/new/video_1.png') no-repeat center center;
    }
  }

  .loading {
    width: 100%;
    height: 100%;
    position: initial !important;
  }
</style>
