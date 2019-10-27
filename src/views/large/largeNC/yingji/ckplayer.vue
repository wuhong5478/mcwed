<template>

  <div id="ckplayer" style="width: 100%; height: 580px;max-width: 660px;">
    <div class="loading" v-loading="loading" element-loading-text="视频加载中"></div>
  </div>
</template>

<script>
export default {
  name: 'ckplayer',
  data() {
    return {
      showLoading: false,
      loading: true,
      showplayer: false,
      player: null

    };
  },
  components: {

  },
  methods: {
    play() {
      // 这里使用CKplayerJS进行视频播放
      let videoObject = {
        container: '#ckplayer', // 容器的ID或className
        variable: 'player', // 播放函数名称
        loaded: 'loadedHandler', // 当播放器加载后执行的函数
        // loop: true, // 播放结束是否循环播放
        // cktrack: 'static/ckplayer/material/srt.srt', // 字幕文件
        // poster: '../../../../assets/img/new/video_1.png', // 封面图片
        // preview: { // 预览图片
        //     file: ['../../../../assets/img/new/video_1.png'],
        //     scale: 1
        // },
        live: true, // 是否为直播
        autoplay: true,
        // config: '', // 指定配置函数
        // debug: true, // 是否开启调试模式
        // drag: 'start', // 拖动的属性
        // seek: 0, // 默认跳转的时间

        video: 'rtmp://58.200.131.2:1935/livetv/hunantv'
      };
      // 定义一个对象
      // eslint-disable-next-line
      let player = new ckplayer(videoObject);
      console.log(player);
    }
    /* loadedHandler(){
        this.player.addListener('error', this.errorHandler); //监听视频加载出错
        this.player.addListener('duration', this.durationHandler); //监听播放时间
        this.player.addListener('time', this.timeHandler); //监听播放时间

      },
    errorHandler(){
      changeText('.playerstate', '视频加载错误');
    },
    durationHandler(){
      this.showLoading=true;
    } */
  },
  computed: {

  },
  mounted() {
    this.$nextTick(() => {
      this.play();
    });

  }
};
</script>

<style lang="scss">
  .video-blue {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: .3rem .15rem;
    box-sizing: border-box;
    position: relative !important;

    >div {
      margin: 0;
      padding: 0;
      width: 6.6rem;
      height: 5.8rem;
      box-sizing: border-box;
      float: left;
      //background: url('../../../../assets/img/new/video_1.png') no-repeat center center;
    }
  }

  .loading {
    width: 6.6rem;
    height: 5.8rem;
    position: initial !important;
  }
</style>
