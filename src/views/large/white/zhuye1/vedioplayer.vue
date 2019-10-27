<template>

  <div :id="'player' + id" class="player">
    <video-player v-if="showplayer" class="video-player vjs-custom-skin" ref="videoPlayer" :options="playerOptions"
      :playsinline="true" @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)">
    </video-player>
  </div>
</template>

<script>
import {
  videoPlayer
} from 'vue-video-player';
// import 'videojs-contrib-hls';
import 'videojs-flash';

// eslint-disable-next-line
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
// require('videojs-contrib-hls/dist/videojs-contrib-hls');
export default {
  name: 'vedioplayer',
  props: {
    videoUrl: {
      String,
      default: ''
    },
    id: {
      String,
      default: '0'
    },
    obj: {
      Object,
      default: () => {}
    }
  },
  data() {
    return {
      isOutTime: true,
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
        techOrder: ['flash', 'html5'], // 设置顺序，
        sourceOrder: true,
        flash: {
          hls: {
            withCredentials: false
          }
        },
        html5: {
          hls: {
            withCredentials: false
          }
        },
        sources: [
          {
            type: 'rtmp/flv',
            src: '' // 这是flv
          }
          // {
          //   withCredentials: false,
          //   type: 'application/x-mpegURL',
          //   src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8' // 这是hls流
          // }
        ],
       controlBar: {                     // 配置控制栏
         timeDivider: false, // 时间分割线
         durationDisplay: false, // 总时间
         progressControl: false, // 进度条
         customControlSpacer: false, // 未知
         fullscreenToggle: true // 全屏
       },
        // width: '660px',
        // height: '580px'
      }
    };
  },
  components: {
    videoPlayer // 注册组件
  },
  methods: {
    // canplaythrough表示可是流畅播放了
    onPlayerCanplaythrough(player) {
      console.log('准备好', player);
      // 这个是准备好播放
    },
    onPlayerCanplay(player) {
      // 这个是要刚好播放
      console.log('播放', player);
      this.isOutTime = false;
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
      this.playerOptions.sources[0].src = this.videoUrl;
      let timer = setTimeout(() => {
        clearTimeout(timer);
        if (this.isOutTime) { // 如果浏览器准备时间长，10s后还没播放，路径已过期，重新请求路径
          let params = {};
          if (this.obj.productKey && this.obj.deviceName) {
            params = {
              deviceName: this.obj.deviceName,
              productKey: this.obj.productKey,
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
            url: 'videoShowGetData',
            params
          }).then(({ data }) => {
            this.playerOptions.sources[0].src = this.data.video.url;
          });
        }
      }, 10 * 1000);
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
  .player{
    height: 93.5%;
    margin-top: 0.3rem;
    // > div{
    //   height: 93.5%;
    //   margin-top: 0.3rem;
    // }
  }
  .vjs-custom-skin > .video-js{
    height: 100%;
  }
  .el-loading-mask{
    top: 1.5rem;
    right: 0.4rem;
    bottom: 0.4rem;
    left: 0.5rem;
  }
</style>
