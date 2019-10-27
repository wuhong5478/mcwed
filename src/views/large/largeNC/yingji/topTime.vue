<template>
  <div class="topTime-blue">
    <div>{{nowtime}}</div>
  </div>
</template>

<script>
export default {
  name: 'topTime',
  data() {
    return {
      h: 0,
      m: Math.round(Math.random() * (5 - 1) + 1),
      ms: 0,
      s: 0,
      nowtime: '',
      timer: null

    };

  },
  methods: {
    NowTime() {
      // this.ms = this.ms + 50;
      this.s = this.s + 1;
      // if (this.ms >= 1000) {
      //   this.ms = 0;
      //   this.s = this.s + 1;
      // }
      if (this.s >= 60) {
        this.s = 0;
        this.m = this.m + 1;
      }
      if (this.m >= 60) {
        this.m = 0;
        this.h = this.h + 1;
      }
      this.nowtime = this.check(this.h) + ':' + this.check(this.m) + ':' + this.check(this.s);
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
    }

  },
  mounted() {
    this.timer = setInterval(this.NowTime, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>

<style lang="scss">
  .topTime-blue {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    // margin: 50px 0 20px;
    >div {
      width: 20%;
      height: 100%;
      background-size: 100% 100%;
      font-size: .6rem;
      color: #ffd200;
      line-height: 1.1rem;
      margin: 0 auto;
      font-weight: bold;
      background-image: -webkit-linear-gradient(left, #18E5FF, #7C82FF);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
</style>
