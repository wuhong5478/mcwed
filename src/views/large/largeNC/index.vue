<template>
  <div class="largeNC-warp">
   <div class="mapWarp">
      <large1Map :yingji = "yingji" :AlarmShow="isAlarmShow" :TypeName="typeName"></large1Map>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated  fadeIn" leave-active-class="animated  fadeOut">
      <myMask v-if="this.typeName === 0 && showmain !==0"></myMask>
    </transition>
    <myMask :ShowMain="showmain"></myMask>
    <header><span>南川区智慧消防</span>
      <el-button style="margin-left: 10px;" type="primary" id="abu" @click="action()">主页1</el-button>
      <!-- <el-button style="margin-left: 10px;" type="primary" id="stop" @click="stop()">停止自动切换</el-button> -->
      <el-button style="margin-left: 10px;" type="primary" id="back" @click="back()" v-show="backshow">返回主页1</el-button>
      <el-button style="margin-left: 10px;" type="primary" id="stop" @click="alarmShow()"  v-show="alarmshow">
        应急警报
      </el-button>
    </header>
    <transition name="custom-classes-transition" enter-active-class="animated flipInY-l" leave-active-class="animated fadeOutLeft"
      mode="out-in">
      <div class=" leftBox" v-if="this.typeName  ===0&&showmain  ===0" key="aa">
        <div class="comprehensiveEvaluation-warp">
          <comprehensiveEvaluation></comprehensiveEvaluation>
              </div>
        <div class="equipmentCondition-warp">
          <equipmentCondition></equipmentCondition>
        </div>
        <div class="emergencyAssessment-warp">
          <emergencyAssessment></emergencyAssessment>
        </div>
      </div>
      <div class=" leftBox1" v-else-if="this.typeName  ===1&&showmain  ===0" key="b">
        <div class="controlroomInfo-warp">
          <controlroomInfo></controlroomInfo>
        </div>
        <div class="emergencyGroupInfo-warp">
          <emergencyGroupInfo></emergencyGroupInfo>
        </div>
        <div class="recentReliefSupplies-warp">
          <recentReliefSupplies></recentReliefSupplies>
        </div>
      </div>
      <!-- <div class=" leftBox" v-else-if="this.typeName  ===2&&showmain  ===0" key="cc">
        <div class="comprehensiveEvaluation-warp">
          <comprehensiveEvaluation></comprehensiveEvaluation>
        </div>
        <div class="equipmentCondition-warp">
          <equipmentCondition></equipmentCondition>
        </div>
        <div class="emergencyAssessment-warp">
          <emergencyAssessment></emergencyAssessment>
        </div>
      </div> -->
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated slideInDown" leave-active-class="animated fadeOutUp"
      mode="out-in">
      <div class="centerTopBox" v-if="this.typeName  ===0&&showmain  ===0" key="ct1">
        <div class="topData-warp">
          <topData></topData>
        </div>
        <transition name="alarmAnimated" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp"
          mode="in-out">
          <div class="alarmInfo-warp" v-if="this.isAlarmShow" key="alar">
            <alarmInfo></alarmInfo>
          </div>
        </transition>
      </div>
      <div class="centerTopBox1" v-else-if="this.typeName  ===1&&showmain  ===0" key="ct2">
        <div class="topTime-warp">
          <topTime></topTime>
        </div>
      </div>
      <!-- <div class="centerTopBox" v-else-if="this.typeName  ===2&&showmain  ===0" key="ct3">
        <topData></topData>
      </div> -->
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut"
      mode="out-in">
      <div v-if="this.typeName  ===0" key="cc1"></div>
      <div class="video-warp" v-else-if="this.typeName  ===1&&this.viedoshow  ===0" key="cc2">
        <videoScreen></videoScreen>
      </div>
      <div v-else-if="this.typeName  ===2" key="cc3"></div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown"
      mode="out-in">
      <home1Menu @transferNum1="getNum1" v-if="this.typeName  ===0&&showmain  ===0" key="cd1"></home1Menu>
      <div class="centerDownBox1" v-else-if="this.typeName  ===0&&showmain  ===1" key="cd2">
        <alert></alert>
      </div>
      <div class="centerDownBox1" v-else-if="this.typeName  ===0&&showmain  ===2" key="cd3">
        <equipment></equipment>
      </div>
      <div class="centerDownBox1" v-else-if="this.typeName  ===0&&showmain  ===3" key="cd4">
        <parkScore></parkScore>
      </div>
      <div class="centerDownBox" v-else-if="this.typeName  ===1" key="d2">
        <div class="option-warp">
          <parkClassification @isVideoShow="getNum3"></parkClassification>
        </div>
      </div>
      <!-- <animation @transferPage="getPage" v-else-if="this.typeName  ===2" key="d3" :Flag1="flag1" :IsDisable="isDisable"
       @transferIs="getNum2"  @transferFlag1="getFlag1"></animation> -->
    </transition>
    <transition name="Point1" mode="out-in">
      <div v-if="page  ===true&&temp  ===true" class="first" @click="changePage()"></div>
    </transition>
    <transition name="Point1" mode="out-in">
      <div v-if="page  ===true&&temp  ===true" class="first1"></div>  <!-- 暂时没做提示框 -->
    </transition>
    <transition name="Point1" mode="out-in">
      <div v-if="page  ===true&&temp  ===true" class="first2"></div>  <!-- 暂时没做提示框 -->
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated flipInY-r" leave-active-class="animated fadeOutRight"
      mode="out-in">
      <div class=" rightBox" v-if="this.typeName  ===0&&showmain  ===0" key="rr1">
        <div class="alarmConditions-warp">
          <alarmConditions></alarmConditions>
        </div>
        <div class="workingSituation-warp">
          <workingSituation></workingSituation>
        </div>
      </div>
      <div class=" rightBox1" v-else-if="this.typeName  ===1&&showmain  ===0" key="rr2">
        <div class="fireScene-warp">
          <fireScene></fireScene>
        </div>
      </div>
      <!-- <div class=" rightBox" v-else-if="this.typeName  ===2&&showmain  ===0" key="rr3">
        <div class="alarmConditions-warp">
          <alarmConditions></alarmConditions>
        </div>
        <div class="workingSituation-warp">
          <workingSituation></workingSituation>
        </div>
      </div> -->
    </transition>
  </div>
</template>
<script>
//  主页2中间和下面组件（标记点、按钮、最近报警信息）
// import animation from './zhuye2/animation';
//  地图组件
import large1Map from './map.vue';
//  小镇综合评估
import comprehensiveEvaluation from './zhuye1/comprehensiveEvaluation';
//  小镇设备状况
import equipmentCondition from './zhuye1/equipmentCondition';
//  小镇应急评估
import emergencyAssessment from './zhuye1/emergencyAssessment';
//  小镇报警情况
import alarmConditions from './zhuye1/alarmConditions';
//  小镇工作情况
import workingSituation from './zhuye1/workingSituation';
//  地图上方数据展示
import topData from './zhuye1/topData';
//  地图实时滚动条展示
import alarmInfo from './zhuye1/alarmInfo';
//  主页1菜单
import home1Menu from './zhuye1/home1Menu';
//  最近救援物资
import recentReliefSupplies from './yingji/recentReliefSupplies';
//  应急组信息
import emergencyGroupInfo from './yingji/emergencyGroupInfo';
//  消控室信息
import controlroomInfo from './yingji/controlroomInfo';
//  火灾现场
import fireScene from './yingji/fireScene';
//  园区分类
import parkClassification from './yingji/parkClassification';
//  视频画面
import videoScreen from './yingji/videoScreen';
//  地图上方数据展示
import topTime from './yingji/topTime';
//  最近报警信息
//  import recentAlarmInformation from './zhuye2/recentAlarmInformation';
//  超时页面
//  import overTime from './zhuye2/overTime';
//  import vediocam from './zhuye2/vediocam';
import parkScore from './defen/parkScore.vue';
import equipment from './defen/equipment.vue';
import alert from './defen/alert.vue';
import myMask from './zhuye1/myMask.vue';

export default {
  name: 'largeNC',

  data() {
    return {
      showmain: 0,
      view: 'child',
      active: 0,
      index: 8,
      typeName: 0, //  0:大屏；1:应急
      divname: '',
      actionname: '',
      moveOut: '',
      moveIn: '',
      show: true,
      showFlag: true,
      flag1: false, //  控制第一个提示框
      flag2: false, //  控制第二个提示框
      flag3: false, //  多个按钮中点击了哪一个的判断条件
      isDisable: false, //  防止同时出现两个提示框
      page: true,
      viedoshow: 0,
      backshow: false,
      alarmshow: true,
      isAlarmShow: false,
      temp: false, //  控制铃铛延迟出现
      yingji: 2, // 判断是不是应急 0不是1是 2刚开始状态
      timer: []
    };
  },
  components: {
    large1Map,
    comprehensiveEvaluation,
    equipmentCondition,
    emergencyAssessment,
    alarmConditions,
    workingSituation,
    topData,
    alarmInfo,
    recentReliefSupplies,
    emergencyGroupInfo,
    controlroomInfo,
    fireScene,
    parkClassification,
    videoScreen,
    topTime,
    //  recentAlarmInformation,
    //  overTime,
    //  vediocam,
    parkScore,
    equipment,
    alert,
    home1Menu,
    myMask
    // animation
  },
  watch: {
    // typeName(val) { // 控制特异点-铃铛的出现及延迟
    //   if (val === 2) {
    //     let timer = setTimeout(() => {
    //       this.temp = true;
    //       clearTimeout(timer);
    //     }, 2000);
    //   }
    //   else {
    //     this.temp = false;
    //   }
    // },
    yingji(val) {
      if (val === 0) {
        /* let timer1 = setTimeout(() => {
          this.isAlarmShow = true;
          clearTimeout(timer1);
        }, 4000); */
        let timer2 = setTimeout(() => {
          this.action();
          clearTimeout(timer2);
        }, 5 * 60 * 1000);
      }
      if (val === 1) {
        let timer3 = setTimeout(() => {
          this.action2();
          clearTimeout(timer3);
        }, 3 * 60 * 1000);
      }
    }
  },
  methods: {
    action() {
      //  0主页1 1应急 2主页2
      if (this.typeName === 0) {
        this.typeName = 1;
        this.showmain = 0;
        this.yingji = 1;
        this.viedoshow = 0;
        // this.isAlarmShow = false;
        this.alarmshow = false;
        this.backshow = false;
        document.getElementById('abu').innerText = '应急';
      }
      else {
        this.typeName = 0;
        this.showmain = 0;
        this.viedoshow = 1;
        this.yingji = 0;
        this.isAlarmShow = false;
        this.alarmshow = true;
        this.backshow = false;
        document.getElementById('abu').innerText = '主页1';
      }
    },
    action2() {
      if (this.typeName === 1) {
        this.typeName = 0;
        this.showmain = 0;
        this.viedoshow = 1;
        this.yingji = 0;
        this.isAlarmShow = false;
        this.backshow = false;
        this.alarmshow = true;
        document.getElementById('abu').innerText = '主页1';
      }
    },
    back() {
      this.typeName = 0;
      this.showmain = 0;
      this.viedoshow = 1;
      this.yingji = 0;
      this.isAlarmShow = false;
      this.backshow = false;
      this.alarmshow = true;
      // document.getElementById('abu').innerText = '主页1';
    },
    changePage() {
      if (!this.isDisable) {
        this.flag1 = !this.flag1;
      }
    },
    alarmShow() {
      this.isAlarmShow = !this.isAlarmShow;
      if (this.isAlarmShow) {
        this.timer.push(
          setTimeout(() => {
            if (this.typeName === 0) {
              this.action();
              this.count = 0;
            }
          }, 15 * 1000)
        );
      }
      else {
        for (let i = 0; i < this.timer.length; i++) {
          clearTimeout(this.timer[i]);
        }
      }
    },
    getFlag1(val) {
      this.flag1 = val;
    },
    getPage(val) {
      this.page = val;
    },
    getNum1(val) {
      if (val === 1) {
        this.showmain = 1;
        this.backshow = true;
        this.alarmshow = false;
      }
      else if (val === 3) {
        this.showmain = 2;
        this.backshow = true;
        this.alarmshow = false;
      }
      else {
        this.showmain = 0;
      }
      // this.showmain=
    },
    getNum2(val) {
      this.isDisable = val;
    },
    getNum3(val) {
      if (val === 1) {
        this.viedoshow = 1;
      }
      else {
        this.viedoshow = 0;
      }
    },
    setFontSize() {
      let designSize = 2880; // 设计图尺寸
      let html = document.documentElement;
      let wW = html.clientWidth;// 窗口宽度
      let rem = wW * 100 / designSize;
      document.documentElement.style.fontSize = rem + 'px';
    }
    /* stop() {
      let domStop = document.getElementById('stop');
      if (domStop.innerText.includes('停止')) {
        clearInterval(this.timer); //  在Vue实例销毁前，清除我们的定时器
        domStop.innerText = '启动自动切换';
      }
      else if (domStop.innerText.includes('启动')) {
        this.timer = setInterval(this.action, 5 * 1000);
        domStop.innerText = '停止自动切换';
      }
    } */
  },
  mounted() {
    this.yingji = 0;
    // this.timer = setInterval(this.action, 5 * 60 * 1000);
    // document.documentElement.style.fontSize = 100 + 'px';
    this.setFontSize();
    window.addEventListener('resize', () => {
      this.setFontSize();
    });
  },
  beforeDestroy() {
    /* if (this.timer) {
      clearInterval(this.timer); //  在Vue实例销毁前，清除我们的定时器
    } */
  }
};
</script>
<style lang="scss">
  .largeNC-warp {
    width: 100%;
    // min-width: 2880px;
    height: 100%;
    // min-height: 1620px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    .mapWarp {
      width: 100%;
      height: 100%;
      background: #000;
      // position: fixed;
      // top: 0;
      // left: 0;
      // right: 0;
      // bottom: 0;
      // z-index: -1;
    }
    .title {
      width: calc(100% - .4rem);
      height: .65rem;
      background-image: -webkit-linear-gradient(left, rgba(8, 38, 183, 0.6), rgba(1, 179, 254, 0.1));
      padding: 0 .2rem;
      line-height: .65rem;
      font-size: .28rem;
      text-align: left;
      font-weight: bolder;
      span {
        background-image: -webkit-linear-gradient(10deg, #0076ff, #00e9ff, #0275ba);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .content {
      width: calc(100% - .32rem);
      height: calc(100% - .97rem);
      box-shadow: inset 0 0 .1rem rgba($color: #0C33AD, $alpha: 0.8);
      padding: .16rem;
      background: rgba(2, 13, 41, 0.85) url("../../../assets/img/new/borderBottom.png") no-repeat left bottom;
      background-size: 100%;
    }
    header {
      height: 1.2rem;
      width: 100%;
      //  background-color: aqua;
      position: absolute;
      left: 0;
      top: 0;
      line-height: .7rem;
      font-size: .38rem;
      font-weight: bolder;
      background: url("../../../assets/img/new/headerBg.png") no-repeat;
      background-size: 100% 100%;
      span {
        background-image: -webkit-linear-gradient(45deg, #a9f1fe, #dcfefc, #accdfc, #d8e5ff);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .leftBox {
      width: 25%;
      height: calc(100% - 1.2rem);
      position: absolute;
      top: 1.2rem;
      left: 0;
      .comprehensiveEvaluation-warp {
        width: 100%;
        height: 45%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
      .equipmentCondition-warp {
        width: 100%;
        height: 35%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
      .emergencyAssessment-warp {
        width: 100%;
        height: 20%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
    }
    .leftBox1 {
      width: 26%;
      height: calc(100% - 1.2rem);
      position: absolute;
      top: 1.2rem;
      left: 0;
      .controlroomInfo-warp {
        width: 100%;
        height: 20%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
      .emergencyGroupInfo-warp {
        width: 100%;
        height: 40%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
      .recentReliefSupplies-warp {
        width: 100%;
        height: 40%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
    }
    .centerTopBox {
      width: calc(50% - .32rem);
      min-height: 1.1rem;
      position: absolute;
      top: 1.2rem;
      left: 25%;
      padding: 0 .16rem;
      .topData-warp {
        width: 100%;
        height: 1.1rem;
      }
      .alarmInfo-warp {
        width: 100%;
        height: .7rem;
        margin: .4rem auto;
        position: absolute;
      }
    }
    .centerTopBox1 {
      width: calc(48% - .32rem);
      height: 1.1rem;
      position: absolute;
      top: 1.2rem;
      left: 26%;
      padding: 0 .16rem;

      .topTime-warp {
        width: 100%;
        height: 1.1rem;
        box-sizing: border-box;
      }
    }
    .video-warp {
      position: absolute;
      top: 2.3rem;
      left: 26%;
      margin: auto;
      right: 26%;
      width: 48%;
      height: calc(100% - 3.7rem);
    }
    .centerDownBox {
      width: calc(48% - .32rem);
      height: 1.08rem;
      position: absolute;
      bottom: 0%;
      left: 26%;
      padding: 0 .16rem;
      .option-warp {
        width: 100%;
        height: 1.08rem;
        // padding: .62rem 0 .32rem 0;
        padding-bottom: .32rem;
        box-sizing: border-box;
      }
    }
    .centerDownBox1 {
      width: 100%;
      position: absolute;
      // top: 9.85rem;
      bottom: .32rem;
    }
    .centerBox {
      //   主页2
      width: calc(50% - .32rem);
      height: 1.1rem;
      position: absolute;
      top: 1.2rem;
      left: 25%;
      padding: 0 .16rem;
    }
    .rightBox {
      height: calc(100% - 1.2rem);
      width: 25%;
      position: absolute;
      top: 1.2rem;
      right: 0;
      .alarmConditions-warp {
        width: 100%;
        height: 45%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
      .workingSituation-warp {
        width: 100%;
        height: 55%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
    }
    .rightBox1 {
      height: calc(100% - 1.2rem);
      width: 26%;
      position: absolute;
      top: 1.2rem;
      right: 0;
      .fireScene-warp {
        width: 100%;
        height: 100%;
        padding: 0 .16rem .32rem .16rem;
        box-sizing: border-box;
      }
    }
    .first {
      background: url('../../../assets/img/new/bell.png') no-repeat center center;
      background-size: 100% 100%;
      width: .6rem;
      height: .6rem;
      position: absolute;
      left: 35%;
      top: 63%;
      border-radius: .5rem;
      border: none;
      outline: none;
      cursor: pointer;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: bluePulse;
    }
    .first1 {
      background: url('../../../assets/img/new/safe.png') no-repeat center center;
      background-size: 100% 100%;
      width: .6rem;
      height: .6rem;
      position: absolute;
      left: 50%;
      top: 34%;
      border-radius: .5rem;
      border: none;
      outline: none;
      cursor: pointer;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: bluePulse;
    }
    .first2 {
      background: url('../../../assets/img/new/urgent.png') no-repeat center center;
      background-size: 100% 100%;
      width: .6rem;
      height: .6rem;
      position: absolute;
      left: 55.5%;
      top: 64%;
      border-radius: .5rem;
      border: none;
      outline: none;
      cursor: pointer;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: bluePulse;
    }
    .Point1-enter-active {
      animation: tada 1s,;
    }
    .Point1-leave-active {
      animation: zoomOut 1s;
    }
    @keyframes bluePulse {
      50% {
        background-color: #036075;
        box-shadow: 0 0 .27rem #2daebf;
      }
      to {
        box-shadow: 0 0 .09rem #333;
      }
    }
    @keyframes tada {
      from {
        -webkit-transform: scale3d(1, 1, 1) ;
        transform: scale3d(1, 1, 1);
      }
      10%,
      20% {
        -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
      }
      30%,
      50%,
      70%,
      90% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
      }
      40%,
      60%,
      80% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
      }
      to {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }
    .tada {
      -webkit-animation-name: tada;
      animation-name: tada;
    }
  }
</style>
