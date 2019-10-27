<template>
  <div class="overTime">
    <div class="object1">
      <div class="container">
        <div v-if="flag1_1" class="pulse"></div>
        <div v-if="flag1_2" class="pulse"></div>
        <div v-if="flag1_3" class="pulse"></div>
        <div v-if="flag1_4" class="pulse"></div>
        <!-- <div v-if="flag1_5" class="pulse"></div> -->
      </div>
      <transition name="Point">
        <div v-if="flag1" class="point1">
          <div>报警</div>
        </div>
      </transition>
    </div>
    <div class="object2">
      <div class="container">
        <div v-if="flag2_1" class="pulse"></div>
        <div v-if="flag2_2" class="pulse"></div>
        <div v-if="flag2_3" class="pulse"></div>
        <div v-if="flag2_4" class="pulse"></div>
        <!-- <div v-if="flag2_5" class="pulse"></div> -->
      </div>
      <transition name="Point">
        <div v-if="flag2" class="point2">
          <div>维保</div>
        </div>
      </transition>
    </div>
    <div class="object3">
      <div class="container">
        <div v-if="flag3_1" class="pulse"></div>
        <div v-if="flag3_2" class="pulse"></div>
        <div v-if="flag3_3" class="pulse"></div>
        <div v-if="flag3_4" class="pulse"></div>
        <!-- <div v-if="flag3_5" class="pulse"></div> -->
      </div>
      <transition name="Point">
        <div v-if="flag3" class="point3">
          <div>隐患</div>
        </div>
      </transition>
    </div>
    <div class="object4">
      <div class="container">
        <div v-if="flag4_1" class="pulse"></div>
        <div v-if="flag4_2" class="pulse"></div>
        <div v-if="flag4_3" class="pulse"></div>
        <div v-if="flag4_4" class="pulse"></div>
        <!-- <div v-if="flag4_5" class="pulse"></div> -->
      </div>
      <transition name="Point">
        <div v-if="flag4" class="point4">
          <div>设备</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'overTime',
  data() {
    return {
      flag1: false,
      flag1_1: false,
      flag1_2: false,
      flag1_3: false,
      flag1_4: false,
      flag1_5: false,
      flag2: false,
      flag2_1: false,
      flag2_2: false,
      flag2_3: false,
      flag2_4: false,
      flag2_5: false,
      flag3: false,
      flag3_1: false,
      flag3_2: false,
      flag3_3: false,
      flag3_4: false,
      flag3_5: false,
      flag4: false,
      flag4_1: false,
      flag4_2: false,
      flag4_3: false,
      flag4_4: false,
      flag4_5: false
    };
  },
  props: {
    sendPage: Boolean
  },
  watch: {
    sendPage(val) { //  弹出标记点
      if (!val) {
        setTimeout(() => {
          this.flag1 = true;
          this.flag1_1 = true;
          this.flag2_1 = true;
          this.flag3_1 = true;
          this.flag4_1 = true;
          setTimeout(() => {
            this.flag1_2 = true;
            this.flag2_2 = true;
            this.flag3_2 = true;
            this.flag4_2 = true;
            setTimeout(() => {
              this.flag1_3 = true;
              this.flag2_3 = true;
              this.flag3_3 = true;
              this.flag4_3 = true;
              // this.flag5_3 = true;
              setTimeout(() => {
                this.flag1_4 = true;
                this.flag2_4 = true;
                this.flag3_4 = true;
                this.flag4_4 = true;
                // this.flag5_4 = true;
                setTimeout(() => {
                  this.flag1_5 = true;
                  this.flag2_5 = true;
                  this.flag3_5 = true;
                  this.flag4_5 = true;
                  // this.flag5_5 = true;
                }, 750);
              }, 750);
            }, 750);
          }, 750);
        }, 0);
        setTimeout(() => {
          this.flag2 = true;
        }, 150);
        setTimeout(() => {
          this.flag3 = true;
        }, 300);
        setTimeout(() => {
          this.flag4 = true;
        }, 450);
      }
      else {
        this.flag1 = false;
        this.flag1_1 = false;
        this.flag1_2 = false;
        this.flag1_3 = false;
        this.flag1_4 = false;
        this.flag1_5 = false;
        this.flag2 = false;
        this.flag2_1 = false;
        this.flag2_2 = false;
        this.flag2_3 = false;
        this.flag2_4 = false;
        this.flag2_5 = false;
        this.flag3 = false;
        this.flag3_1 = false;
        this.flag3_2 = false;
        this.flag3_3 = false;
        this.flag3_4 = false;
        this.flag3_5 = false;
        this.flag4 = false;
        this.flag4_1 = false;
        this.flag4_2 = false;
        this.flag4_3 = false;
        this.flag4_4 = false;
        this.flag4_5 = false;
        for (let i = 1; i < 1000; i++) {
          clearTimeout(i);
        }
      }
    }
  }
};
</script>
<style lang="scss">
.overTime {
  width: 100%;
  .object1 {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 57%;
    top: 53%;
    .container {
      position: relative;
    }
    .pulse {
      position: absolute;
      width: 160px;
      height: 70px;
      left: 63px;
      top: 152px;
      border: 16px solid #F4EA2A;
      border-radius: 100%;
      opacity: 1;
      -webkit-animation: warn 3s ease-out;
      animation: warn 3s ease-out;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }
    .point1 {
      background: url('../../../../assets/img/new/poin1v1.png') no-repeat center center;
      background-size: 100% 100%;
      width: 150px;
      height: 150px;
      position: absolute;
      left: 57%;
      top: 53%;
      div {
        color: #0EEDC6;
        font-size: 49px;
        position: absolute;
        letter-spacing: 8px;
        font-weight: bold;
        left: 14%;
        top: -52%;
      }
    }
  }
  .object2 {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 26%;
    top: 43%;
    .container {
      position: relative;
    }
    .pulse {
      position: absolute;
      width: 160px;
      height: 70px;
      left: 17px;
      top: 137px;
      border: 16px solid #D81E06;
      border-radius: 100%;
      opacity: 1;
      -webkit-animation: warn 3s ease-out;
      animation: warn 3s ease-out;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }
    .point2 {
      background: url('../../../../assets/img/new/poin2v1.png') no-repeat center center;
      background-size: 100% 100%;
      width: 150px;
      height: 150px;
      position: absolute;
      left: 26%;
      top: 43%;
      div {
        color: #0EEDC6;
        font-size: 49px;
        position: absolute;
        letter-spacing: 8px;
        font-weight: bold;
        left: 15%;
        top: -53%;
      }
    }
  }
  .object3 {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 38%;
    top: 35%;
    .container {
      position: relative;
    }
    .pulse {
      position: absolute;
      width: 160px;
      height: 70px;
      left: 35px;
      top: 131px;
      border: 16px solid #1296DB;
      border-radius: 100%;
      opacity: 1;
      -webkit-animation: warn 3s ease-out;
      animation: warn 3s ease-out;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }
    .point3 {
      background: url('../../../../assets/img/new/poin3v1.png') no-repeat center center;
      background-size: 100% 100%;
      width: 150px;
      height: 150px;
      position: absolute;
      left: 38%;
      top: 35%;
      div {
        color: #0EEDC6;
        font-size: 49px;
        position: absolute;
        letter-spacing: 8px;
        font-weight: bold;
        left: 15%;
        top: -51%;
      }
    }
  }
  .object4 {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 35%;
    top: 23%;
    .container {
      position: relative;
    }
    .pulse {
      position: absolute;
      width: 160px;
      height: 70px;
      left: 31px;
      top: 110px;
      border: 16px solid #1AFA29;
      border-radius: 100%;
      opacity: 1;
      -webkit-animation: warn 3s ease-out;
      animation: warn 3s ease-out;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }
    .point4 {
      background: url('../../../../assets/img/new/poin4v1.png') no-repeat center center;
      background-size: 100% 100%;
      width: 150px;
      height: 150px;
      position: absolute;
      left: 35%;
      top: 23%;
      div {
        color: #0EEDC6;
        font-size: 49px;
        position: absolute;
        letter-spacing: 8px;
        font-weight: bold;
        left: 14%;
        top: -48%;
      }
    }
  }
  .Point-enter-active {
    animation: aniPoint .5s;
  }
  .Point-leave-active {
    // animation: aniPoint .4s reverse;
    animation: zoomOut 1s;
  }
  @keyframes aniPoint {
    0% {
      opacity: 0;
      -webkit-transform: translateY(50%);
      -ms-transform: translateY(50%);
      transform: translateY(50%);
    }
    50% {
      -webkit-transform: translateY(-20%);
      -ms-transform: translateY(-20%);
      transform: translateY(-20%);
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes warn {
    0% {
      transform: scale(0);
      opacity: 0.0;
    }
    25% {
      transform: scale(0);
      opacity: 0.1;
    }
    50% {
      transform: scale(0.1);
      opacity: 0.3;
    }
    75% {
      transform: scale(0.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 0.0;
    }
  }
  @-webkit-keyframes "warn" {
    0% {
      -webkit-transform: scale(0);
      opacity: 0.0;
    }
    25% {
      -webkit-transform: scale(0);
      opacity: 0.1;
    }
    50% {
      -webkit-transform: scale(0.1);
      opacity: 0.3;
    }
    75% {
      -webkit-transform: scale(0.5);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0.0;
    }
  }
}
</style>
