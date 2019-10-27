<template>
  <div class="topTime">
    <div v-if="nowtime">
      <span class="smallSize fontStyle">距报警已经过去</span>
      <span>{{nowtime}}</span><span class="smallSize">:</span>
      <countTo class="smallSize" style="width: .6rem;" :startVal='startVal' :endVal='endVal' :duration='999' :autoplay='true' :easingFn="easingFn"></countTo>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to';

export default {
  name: 'topTime',
  components: {
    countTo
  },
  props: {
    yjProductkey: {
      String,
      default: ''
    },
    yjDeviceName: {
      String,
      default: ''
    },
    yjEmId: {
      String,
      default: ''
    }
  },
  data() {
    return {
      h: 0,
      m: 0,
      ms: 0,
      s: 0,
      nowtime: '',
      timer: null,
      startVal: 0,
      endVal: 99
    };
  },
  methods: {
    easingFn(t, b, c, d) {
      return t / d * c;
    },
    NowTime() {
      // this.ms = this.ms + 80;
      // this.ms = this.ms + 1;
      // if (this.ms >= 1000) {
      //   this.ms = 0;
      //   this.s = this.s + 1;
      // }
      this.s = this.s + 1;
      if (this.s >= 60) {
        this.s = 0;
        this.m = this.m + 1;
      }
      if (this.m >= 60) {
        this.m = 0;
        this.h = this.h + 1;
      }
      if (this.h !== 0) {
        this.nowtime = this.check(this.h) + ':' + this.check(this.m) + ':' + this.check(this.s);
      }
      else {
        this.nowtime = this.check(this.m) + ':' + this.check(this.s);
      }
      if (this.startVal === 1) {
        this.startVal = 0;
      }
      else {
        this.startVal = 1;
      }

    },
    // 时间数字小于10，则在之前加个“0”补位。
    check(i) {
      // 方法一，用三元运算符
      let num;
      i < 10 ? num = '0' + i : num = i;
      return num;

      // 方法二，if语句判断
      // if(i<10){
      //    i="0"+i;
      // }
      // return i;
    },
    check2(i) {
      // // 方法一，用三元运算符
      // let num;
      // i < 10 ? num = '00' + i : num = i;
      // return num;

      // 方法二，if语句判断
      if (i < 10) {
        i = '00' + i;
      }
      else if (i < 100) {
        i = '0' + i;
      }
      return i;
    }

  },
  mounted() {
    let params = {};
    if (this.yjProductkey && this.yjDeviceName) {
      params = {
        type: 'important',
        productKey: this.yjProductkey,
        deviceName: this.yjDeviceName,
        emId: this.yjEmId
      }
    }
    else {
      params = {
        type: 'important',
        emId: this.yjEmId
      }
    }
    this.$services.get({
      type: 'LARGE',
      url: 'important1GetData',
      params
    }).then(({ data }) => {
      let gmtCreate = new Date(data.data.gmtCreate).getTime();
      // console.log('time-----------', gmtCreate);
      let now = new Date().getTime();
      let diff = parseInt((now - gmtCreate) / 1000);
      this.h = Math.floor(diff / 3600);
      diff %= 3600;
      this.m = Math.floor(diff / 60);
      this.s = diff % 60;
      this.timer = setInterval(this.NowTime, 1000);
    });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>

<style lang="scss">
  .topTime {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .smallSize {
      font-size: .44rem;
      line-height: 1.22rem;
    }
    .fontStyle {
      color: #9BA8C1;
      font-size: 0.35rem;
      font-weight: 400;
    }
    // margin: 50px 0 20px;
    >div {
      // width: 50%;
      height: 100%;
      background-size: 100% 100%;
      font-size: .6rem;
      color: #3091FA;
      line-height: 1.1rem;
      margin: 0 auto;
      font-weight: bold;
      // background-image: -webkit-linear-gradient(left, #18E5FF, #7C82FF);
      // background-clip: text;
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      > span {
        display: block;
        float: left;
        width: auto;
      }
    }
    .leftTime {
      margin-left: 21%;
    }
  }
</style>
