<template>
  <div class="home1Menu-blue">
  <!--  <div class="backgroundLine">
      <div class="myLine" />
      <div class="myLine" />
      <div class="myLine" />
      <div class="myLine" />
      <div class="myLine" />
      <div class="myLine" />
      <div class="myLine" />
      <div class="myLine" />
    </div> -->
    <div class="menu"></div>
    <div class="myButtons">
      <div class="lef"  @click="choose(1);setNum();" :class="{changeLeft:!flag1}" @mouseout="dark(1)"></div>
      <div class="lefT" :class="{changeT:!flag1}">隐患一张图</div>
      <div class="mid" :class="{changeMid:!flag2}"></div>
      <div class="midT" :class="{changeT:!flag2}">南川区消防可视化</div>
      <div class="rig" @click="choose(3);setNum();" :class="{changeRight:!flag3}"  @mouseout="dark(3)"></div>
      <div class="rigT" :class="{changeT:!flag3}">警情一张图</div>
      <div class="shadowLef" @mouseover="hover(1)" v-show="flag1">
      </div>
      <div class="shadowMid" v-show="flag2">
      </div>
      <div class="shadowRig"  @mouseover="hover(3)" v-show="flag3">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home1Menu',
  data() {
    return {
      flag1: true,
      flag2: false,
      flag3: true,
      val: 0
    };
  },
  methods: {
    choose(val) {
      if (val === 1) {
        this.val = 1;
      }
      // else if (val === 2) {
      //   this.val = 2;
      // }
      else if (val === 3) {
        this.val = 3;
      }
    },
    hover(val) {
      if (this.flag1 === true && val === 1) {
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = true;
      }
      else if (this.flag2 === true && val === 2) {
        this.flag1 = true;
        this.flag2 = false;
        this.flag3 = true;
      }
      else if (this.flag3 === true && val === 3) {
        this.flag1 = true;
        this.flag2 = true;
        this.flag3 = false;
      }
    },
    dark(val) {
      if (val === 1) {
        this.flag1 = true;
        this.flag2 = false;
      }
      else if (val === 3) {
        this.flag2 = false;
        this.flag3 = true;
      }
    },
    setNum() {
      this.$emit('transferNum1', this.val);
    }
  }
};
</script>

<style lang="scss">
.home1Menu-blue {
  position: absolute;
  left: 31%;
  right: 32%;
  bottom: -3%;
  overflow: hidden;
  height: 20%;
  .myLine {
    margin-top: 11%;
    margin-bottom: 11%;
    margin-left: 3%;
    float: left;
    width: 7.5%;
    height: .06rem;
    background-image: linear-gradient(to right, #028690 45%, #028690 30%, transparent 40%);
    background-size: .99rem .29rem;
    background-repeat: repeat-x;
  }

  .lef {
    height: 32%;
    cursor: pointer;
    background-size: 100% 100%;
    position: absolute;
    left: 9%;
    right: 82%;
    border-radius: .5rem;
    bottom: 39%;
    background-image: url('../../../../assets/img/new/lef.png');
  }
  .lefT {
    font-size: .26rem;
    color: #18E6F1;
    position: absolute;
    left: 5.5%;
    right: 78%;
    bottom: 20%;
  }
  .mid {
    height: 44%;
    background-size: 100% 100%;
    position: absolute;
    left: 45%;
    right:42%;
    bottom: 40%;
    border-radius: .59rem;
    background-image: url('../../../../assets/img/new/mid.png');
  }
  .midT {
    font-size: .26rem;
    color: #18E6F1;
    position: absolute;
    left: 36.5%;
    right: 33%;
    bottom: 20%;
  }
  .rig {
    cursor: pointer;
    height: 32%;
    background-size: 100% 100%;
    position: absolute;
    left:84%;
    right:7%;
    border-radius: .5rem;
    bottom: 39%;
    background-image: url('../../../../assets/img/new/rig.png');
  }
  .rigT {
    font-size: .26rem;
    color: #18E6F1;
    position: absolute;
    left: 81.5%;
    right: 4%;
    bottom: 20%;
  }
  .shadowMid {
    height: 44%;
    background-size: 100% 100%;
    position: absolute;
    left: 45%;
    right:42%;
    bottom: 40%;
    border-radius: 1rem;
    opacity: 0.4;
    background-color: #036075;
  }
  .shadowLef {
    cursor: pointer;
    // width: 95px;
    height: 32%;
    background-size: 100% 100%;
    position: absolute;
    left: 9%;
    right: 82%;
    bottom: 39%;
    background-color: #036075;
    border-radius: .6rem;
    opacity: 0.5;
  }
  .shadowRig {
    background-color: #036075;
    cursor: pointer;
    height: 32%;
    position: absolute;
    left:84%;
    right:7%;
    bottom: 39%;
    // background-color: black;
    border-radius: .6rem;
    opacity: 0.5;
  }
  @-webkit-keyframes bluePulse {
    //闪光动画 关键帧动画
    from {
      /* background-color: #036075; -webkit-box-shadow: 0 0 9px #333; */
    }
    50% {
      background-color: #036075;
    }
    to {
      /* background-color: #036075; */
      -webkit-box-shadow: 0 0 .09rem #333;
    }
  }
  .changeT {
    font-size: .3rem;
    font-weight: bold;
    animation: bigT .5s;
  }
  @keyframes bigLeft {
    0% {
      // width: 80px;
      height: .95rem;
      left: 9.5%;
      right: 82.5%;
    }
    50% {
      height: 1.7rem;
      left: 7%;
      right: 80%;
    }
    100% {
      // width: 120px;
      height: 1.48rem;
      background-color: #036075;
      left: 7.5%;
      bottom: 40%;
      right: 80.5%;
    }
  }
  @keyframes bigRight {
    0% {
      height: .95rem;
      left:84.8%;
      right:7.5%;
    }
    50% {
      height: 1.7rem;
      left: 82.3%;
      right: 5%;
    }
    100% {
      height: 1.48rem;
      background-color: #036075;
      left: 82.8%;
      bottom: 40%;
      right: 5.5%;
    }
  }
  @keyframes bigT {
    0% {
      font-size: .26rem;
    }

    100% {
      font-size: .3rem;
      font-weight: bold;
    }
  }
  .menu{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-image: url('../../../../assets/img/new/menu1_1.png');
  }
}
</style>
