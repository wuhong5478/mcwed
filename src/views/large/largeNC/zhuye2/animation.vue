<template>
  <div>
    <div id="Parallelogram" @click="page = !page;flag3 = !flag3;"> </div>
    <transition name="First">
      <div id="show" v-if="flag1">
        <br />
        <div>园区3号楼消控室</div>
        <br />
        <div>地址：xxxxxxxx</div>
        <div class="second" @click="change()">
          <g-button-moema color="primary" size="button--size-m">消控室视频</g-button-moema>
        </div>
      </div>
    </transition>
    <transition name="Second">
      <div id="cam" v-if="flag2" @click="flag2 = !flag2; isDisable = false;sendIsDisable();sendIsFlag1();">
        <div style="padding-top: 95px;padding-left: 28px;padding-right: 21px;z-index: 99;">
          <vediocam></vediocam>
        </div>
      </div>
    </transition>
    <overTime :sendPage="page"></overTime>
    <recentAlarmInformation @transferNum="getNum" :sendFlag="flag3" @click="setPage();">
    </recentAlarmInformation>
  </div>
</template>
<script>
// 底部的最近报警情况
import recentAlarmInformation from './recentAlarmInformation.vue';
// 超时页面
import overTime from './overTime.vue';
import vediocam from './vediocam.vue';

export default {
  data() {
    return {
      flag1: false,
      flag2: false, // 控制第二个提示框
      flag3: false, // 多个按钮中点击了哪一个的判断条件
      isDisable: false, // 防止同时出现两个提示框
      page: true
    };
  },
  props: {
    Flag1: Boolean,
    IsDisable: Boolean
  },
  components: {
    recentAlarmInformation,
    overTime,
    vediocam
  },
  watch: {
    Flag1(val) {
      this.flag1 = val;
    },
    IsDisable(val) {
      this.isDisable = val;
    }
  },
  methods: {
    change() {
      this.flag1 = !this.flag1;
      this.isDisable = true;
      this.sendIsDisable();
      this.sendIsFlag1();
      setTimeout(() => {
        this.flag2 = !this.flag2;
      }, 500);
    },
    getNum(val) {
      this.page = val;
      this.setPage();
    },
    sendIsDisable() {
      this.$emit('transferIs', this.isDisable);
    },
    sendIsFlag1() {
      this.$emit('transferFlag1', this.flag1);
    },
    setPage() {
      this.$emit('transferPage', this.page);
    }
  }
};
</script>

<style lang="scss">
  .First-enter-active {
    animation: animatename .5s;
  }
  .First-leave-active {
    animation: animatename .5s reverse;
  }
  @keyframes animatename {
    0% {
      opacity: 0;
      -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    50% {
      -webkit-transform: translateX(25%);
      -ms-transform: translateX(25%);
      transform: translateX(25%);
    }
    100% {
      opacity: 1;
      }
  }
  .Second-enter-active {
    animation: animatename2 .5s;
  }

  .Second-leave-active {
    animation: animatename2 .5s reverse;
  }
  @keyframes animatename2 {
    0% {
      opacity: 0;
      -webkit-transform: translateX(100%);
      -ms-transform: translateX(100%);
      transform: translateX(100%);
    }
    50% {
      -webkit-transform: translateX(-25%);
      -ms-transform: translateX(-25%);
      transform: translateX(-25%);
    }
    100% {
      opacity: 1;
    }
  }
  #show {
    // display: none;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    width: 245px;
    height: 226px;
    left: 38%;
    top: 52%;
    div {
      cursor: default;
    }
    .second {
      position: absolute;
      left: 19%;
      top: 63%;
      .button--moema {
        border-radius: 48%;
        cursor: pointer;
      }
    }
  }
  #cam {
    background: url('../../../../assets/img/new/cameraVideo.png') no-repeat center center;
    background-size: 100% 100%;
    width: 461px;
    height: 461px;
    position: absolute;
    left: 38%;
    top: 38%;
  }
  #Parallelogram {
    position: absolute;
    left: 30%;
    top: 38%;
    width: 230px;
    height: 400px;
    -webkit-transform: skew(-49deg) rotate(-82deg);
    -moz-transform: skew(-49deg) rotate(-82deg);
    -o-transform: skew(-49deg) rotate(-82deg);
    background: rgba(0, 0, 0, 0);
    cursor: pointer;
  }
</style>
