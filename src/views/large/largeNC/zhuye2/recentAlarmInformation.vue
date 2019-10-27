<template>
  <div>
    <div class="ZuiJinBaoJing">
      <div class="top-ZuiJinBaoJing"></div>
      <!-- <div class="show1" :class='[reverse===true ? "show1" : "middle-ZuiJinBaoJing"]'> -->
      <div class="middle-ZuiJinBaoJing" :class="{show2:reverse}">
        <ul>
          <li v-for="(item, index) in items" :key="index">
            {{item.type}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{item.date}}&nbsp;
            {{item.time}}&nbsp;&nbsp;&nbsp;&nbsp;
            {{item.place}}&nbsp;&nbsp;&nbsp;&nbsp;
            {{item.detector}}
          </li>
        </ul>
      </div>
      <div class="bottom-ZuiJinBaoJing"></div>
    </div>
    <div class="Button-show" @click="reverse =!reverse;flag = true">
      <div class="text">展开</div>
      <div class="Button" :class="{rer:reverse}"></div>
    </div>
    <div class="pageChange" v-if="delayShow(reverse)">
      <div :class="{ active:!isActive}" @click="clickButton(1)">消防智能可视化</div>
      <div :class="{ active:isActive }" @click="clickButton(2)">园区警情一张图</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'recentAlarmInformation',
  data() {
    return {
      isActive: true,
      id: 1,
      reverse: false,
      flag: false,
      items: [{
        type: '最近报警信息',
        date: '2019-07-31',
        time: '08:30:00',
        place: '中大园区1号楼203室',
        detector: '独立式烟雾探测器'
      },
      {
        type: '最近报警信息',
        date: '2019-07-31',
        time: '12:50:00',
        place: '中大园区2号楼401室',
        detector: '独立式烟雾探测器'
      },
      {
        type: '最近报警信息',
        date: '2019-08-01',
        time: '06:13:00',
        place: '东大园区3号楼101室',
        detector: '独立式烟雾探测器'
      },
      {
        type: '最近报警信息',
        date: '2019-08-01',
        time: '16:00:00',
        place: '西大园区1号楼302室',
        detector: '独立式烟雾探测器'
      }
      ]
    };
  },
  props: {
    sendFlag: Boolean
  },
  methods: {
    setNum() {
      this.$emit('transferNum', this.isActive);
    },
    clickButton(val) { // 防止按钮多次点击
      if (this.sendFlag === false) {
        if (this.id !== val) {
          this.isActive = !this.isActive;
          this.setNum();
          if (this.id === 1) {
            this.id = 2;
          }
          else {
            this.id = 1;
          }
        }
      }
    },
    delayShow() {
      if (this.flag === true && this.reverse === false) {
        setTimeout(() => {
          this.flag = false;
        }, 500);
      }
      else if (this.flag === false && this.reverse === false) {
        return true;
      }
      else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
  .ZuiJinBaoJing {
    width: 44%;
    background-size: 100% 100%;
    position: absolute;
    left: 28%;
    bottom: 45px;
    overflow: hidden;
    .top-ZuiJinBaoJing {
      width: 99%;
      height: 19px;
      background-size: 100% 100%;
      background-image: url('../../../../assets/img/new/ZuiJinBaoJing-top.png');
    }
    .bottom-ZuiJinBaoJing {
      height: 26px;
      width: 100%;
      background-size: 100% 100%;
      background-image: url('../../../../assets/img/new/ZuiJinBaoJing-bottom.png');
    }
    .middle-ZuiJinBaoJing {
      height: 50px;
      width: 98%;
      margin-left: 1%;
      // background-size: 100% 100%;
      background-color: rgba(62, 65, 175, 0.3);
      // background-image: url('../../../assets/img/new/ZuiJinBaoJing-heart.png');
      overflow: hidden;
      // transition:  max-height 10s;
      // max-height: 20%;
      transition: all .5s;
      ul {
        width: 105%;
        margin-left: -6%;
        font-size: 32px;
        font-family: "Microsoft YaHei";
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.446;
        // text-align: center;
        -moz-transform: matrix(0.83282837275816, 0, 0, 0.83720930232558, 0, 0);
        -webkit-transform: matrix(0.83282837275816, 0, 0, 0.83720930232558, 0, 0);
        -ms-transform: matrix(0.83282837275816, 0, 0, 0.83720930232558, 0, 0);
        li {
          text-align: left;
        }
      }
    }
    .show1 {
      transition: all 5s;
      width: 98%;
      margin-left: 1%;
      // background-size: 100% 100%;
      background-color: rgba(62, 65, 175, 0.3);
      // background-image: url('../../../assets/img/new/ZuiJinBaoJing-heart.png');
      overflow: hidden;
      // transition:  max-height 10s;
      // max-height: 20%;
      transition: all 5s;
      ul {
        margin-left: -5%;
        font-size: 32px;
        font-family: "Microsoft YaHei";
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.446;
        // text-align: center;
        -moz-transform: matrix(0.83282837275816, 0, 0, 0.83720930232558, 0, 0);
        -webkit-transform: matrix(0.83282837275816, 0, 0, 0.83720930232558, 0, 0);
        -ms-transform: matrix(0.83282837275816, 0, 0, 0.83720930232558, 0, 0);
        li {
          text-align: left;
        }
      }
    }
  }
  .pageChange {
    height: 84px;
    width: 23%;
    background-size: 100% 100%;
    position: absolute;
    left: 39%;
    bottom: 130px;
    display: flex;
    justify-content: space-between;
    div {
      cursor: pointer;
      margin: 0 0 0 -37px;
      width: 314px;
      height: 100%;
      background: url('../../../../assets/img/new/parkClassification.png') no-repeat;
      background-size: 100% 100%;
      font-family: 微软雅黑;
      font-size: 34.2px;
      color: rgba(255, 255, 255, 0.5);
      line-height: 76px;
      font-weight: bold;
    }
    .active {
      cursor: pointer;
      margin: 0 0 0 -37px;
      width: 314px;
      height: 100%;
      background: url('../../../../assets/img/new/parkClassification.png') no-repeat;
      background-size: 100% 100%;
      font-family: 微软雅黑;
      font-size: 33.2px;
      color: rgba(255, 255, 255, 0.2);
      line-height: 76px;
      font-weight: bold;
    }
  }
  .Button-show {
    height: 44px;
    width: 6%;
    bottom: 65px;
    left: 67.5%;
    position: absolute;
    cursor: pointer;
    .text {
      margin-top: 4%;
      font-size: 23px;
      font-family: "Microsoft YaHei";
      float: left;
    }
    .Button {
      float: left;
      height: 50px;
      width: 50px;
      background: url('../../../../assets/img/new/show.png') no-repeat center center;
      background-size: 100% 100%;
      transition: all 1s;
    }
  }
  .show2 {
    // max-height: 200px !important;
    height: 162px !important;
    animation: change .5s;
  }
  @keyframes change {
    0% {
      height: 50px;
    }
    50% {
      height: 220px;
    }
    100% {
      height: 162px;
    }
  }
  .rer {
    transform: rotate(-180deg);
    transition: all 1s;
  }
</style>
