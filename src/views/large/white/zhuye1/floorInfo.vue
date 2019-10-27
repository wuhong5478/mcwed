<template>
  <div class="floorInfo2">
    <div class="floorInfoTitle">
      <span class="titleText">建筑平面图</span>
      <div class="quit" @click="closeFloorInfo()">×</div>>
    </div>
    <div class="floorOption">
      <ul>
        <li @click="active(0)">
          <span :class="{fontColor: (temp === 0)}">1F</span>
          <span class="rightTriangle" :class="{orange: (temp === 0)}"></span>
        </li>
        <li @click="active(1)">
          <span :class="{fontColor: (temp === 1)}">2F</span>
          <span class="rightTriangle" :class="{orange: (temp === 1)}"></span>
        </li>
        <li @click="active(2)">
          <span :class="{fontColor: (temp === 2)}">3F</span>
          <span class="rightTriangle" :class="{orange: (temp === 2)}"></span>
        </li>
        <li @click="active(3)">
          <span :class="{fontColor: (temp === 3)}">4F</span>
          <span class="rightTriangle" :class="{orange: (temp === 3)}"></span>
        </li>
        <li @click="active(4)">
          <span :class="{fontColor: (temp === 4)}">5F</span>
          <span class="rightTriangle" :class="{orange: (temp === 4)}"></span>
        </li>
        <li @click="active(5)">
          <span :class="{fontColor: (temp === 5)}">6F</span>
          <span class="rightTriangle" :class="{orange: (temp === 5)}"></span>
        </li>
        <li @click="active(6)">
          <span :class="{fontColor: (temp === 6)}">7F</span>
          <span class="rightTriangle" :class="{orange: (temp === 6)}"></span>
        </li>
      </ul>
    </div>
    <div class="pictureBox">
      <transition name="custom-classes-transition" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight" mode="out-in">
        <div v-if="temp === 0" key="0" class="floorPicture floor1"></div>
        <div v-if="temp === 1" key="1" class="floorPicture floor2"></div>
        <div v-if="temp === 2" key="2" class="floorPicture floor3"></div>
        <div v-if="temp === 3" key="3" class="floorPicture floor4"></div>
        <div v-if="temp === 4" key="4" class="floorPicture floor5"></div>
        <div v-if="temp === 5" key="5" class="floorPicture floor6"></div>
        <div v-if="temp === 6" key="6" class="floorPicture floor7"></div>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'floorInfo',
  data() {
    return {
      temp: 0
    };
  },
  mounted() {},
  methods: {
    active(val) {
      this.temp = val;
    },
    closeFloorInfo() {
      this.$parent.changeFloorInfoShow();
    }
  }
};
</script>

<style lang="scss">
.floorInfo2 {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: #DCDFE1;
  border-width: 1px;
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .floorInfoTitle {
    width: 100%;
    height: .7rem;
    background-color: rgba(#0C2239, 1);
    border-bottom: 1px solid #DCDFE1;
    .titleText {
      display: block;
      float: left;
      line-height: .65rem;
      font-size: .4rem;
      font-weight: bold;
      padding-left: .6rem;
    }
    .quit{
      float:right;
      width: 2%;
      margin-right:.4rem;
      color: white;
      font: 100 0.6rem/.8rem Tahoma,Verdana,sans-serif;
      cursor: pointer;
    }
  }
  .floorOption {
    float: left;
    width: 10%;
    height: calc(100% - .7rem);
    background-color: rgba(#0C2239, 0.9);
    border: 1px solid #0C2239;
    box-sizing: border-box;
    overflow: hidden;
    li {
      height: 1rem;
      font-size: 0.5rem;
      cursor: pointer;
      color: #fff;
      border-bottom: 1px solid #DCDFE1;
      position: relative;
      >span {
       line-height: 1rem;
      }
      .rightTriangle {
        position: absolute;
        top: 0.36rem;
        left: 1.8rem;
        background: url('../../../../assets/img/new/rightWhite.png');
        background-size: cover;
        width: 0.3rem;
        height: 0.3rem;
        float: right;
      }
      .white {
        background: url('../../../../assets/img/new/rightWhite.png');
      }
      .orange {
        background: url('../../../../assets/img/new/rightOrange.png');
        background-size: cover;
      }
    }
    li:hover {
      color: #308EF3;
      background-color: rgba(#0C2239, 1.0);
      .rightTriangle {
        position: absolute;
        top: 0.36rem;
        left: 1.8rem;
        background: url('../../../../assets/img/new/rightBlue.png');
        background-size: cover;
        width: 0.3rem;
        height: 0.3rem;
        float: right;
      }
    }
    .fontColor {
      color: #FB844A;
    }
  }
  .pictureBox {
    float: left;
    width: 90%;
    height: calc(100% - .7rem);
    overflow: hidden;
    background-color: #fff;
    .floorPicture {
      width: 100%;
      height: 100%;
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: center center;
      overflow: hidden;
    }
    .floor1 {
      background-image: url('../../../../assets/img/floor/testPH11f.png');
    }
    .floor2 {
      background-image: url('../../../../assets/img/floor/testPH21f.png');
    }
    .floor3 {
      background-image: url('../../../../assets/img/floor/testPH31f.png');
    }
    .floor4 {
      background-image: url('../../../../assets/img/floor/testPH32f.png');
    }
    .floor5 {
      background-image: url('../../../../assets/img/floor/testRF11f.png');
    }
    .floor6 {
      background-image: url('../../../../assets/img/floor/testRF21f.png');
    }
    .floor7 {
      background-image: url('../../../../assets/img/floor/testZD11f.png');
    }
  }
}
</style>
