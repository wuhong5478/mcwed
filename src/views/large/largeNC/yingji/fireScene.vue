<template>
  <div class="fireScene-blue">
    <div class="title"><span>火灾现场情况</span></div>
    <div class="content fireScene-content">
      <div class="top">
        <div>
          <span class="left"></span>
          <span class="center">触达率: </span>
          <span class="right">100%</span>
        </div>
        <div>
          <span class="left fireTwo"></span>
          <span class="center">触达时间: </span>
          <span class="right">60s</span>
        </div>
        <div>
          <span class="left fireThree"></span>
          <span class="center">到场时间: </span>
          <span class="right">3min</span>
        </div>
      </div>
      <div class="bottom">
        <div class="main">
          <span class="left">00:05:00</span>
          <span class="center"></span>
          <span class="right">火灾应急响应</span>
        </div>
        <div class="detail">
          <span class="left"></span>
          <p class="right">事件类型：一般火灾</p>
        </div>
        <div class="detail">
          <span class="left"></span>
          <p class="right">火灾部位：设备损坏</p>
        </div>
        <div class="detail">
          <span class="left"></span>
          <p class="right">火灾描述：已经联系消控室和微消站人员，即将到达现场，目前已经做了人员疏散</p>
        </div>
        <div class="main">
          <span class="left">00:03:00</span>
          <span class="center"></span>
          <span class="right">火灾确认</span>
        </div>
        <div class="detail">
          <span class="left"></span>
          <p class="right">确认人员：陈某某&nbsp;&nbsp;鲜花量贩歌城物业人员</p>
        </div>
        <div class="detail">
          <span class="left"></span>
          <p class="right" style="padding-left: 130px;">138-8888-9999</p>
        </div>
        <div class="main">
          <span class="left">00:00:00</span>
          <span class="center"></span>
          <span class="right">火灾报警</span>
        </div>
        <div class="detail">
          <span class="left"></span>
          <p class="right">报警设备：独立式烟雾探测器</p>
        </div>
        <div class="detail">
          <span class="left"></span>
          <p class="right">报警位置：鲜花量贩歌城303室</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fireScene',
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
  .fireScene-blue {
    width: 100%;
    height: 100%;

    .fireScene-content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;

      .top {
        height: 2.7rem;
        width: calc(100% - .32rem);
        padding: .28rem .1rem;
        box-sizing: border-box;
        position: absolute;
        top: .2rem;

        >div {
          height: .51rem;
          width: calc(100% - .6rem);
          margin: .15rem auto;
          display: flex;
          box-sizing: border-box;

          >span {
            display: inline-block;
            height: 100%;
            line-height: .51rem;
            text-align: left;
            color: #0096ff;
            background-size: 100% 100%;
            font-size: .34rem;
          }

          .left {
            width: .51rem;
            background: url('../../../../assets/img/new/huozai_1.png') no-repeat center center;
            padding: 0 .45rem;
          }

          .center {
            width: 1.65rem;
          }

          .right {
            width: 1.1rem;
            // color: #ffd200;
          }

          .fireTwo {
            background: url('../../../../assets/img/new/huozai_2.png') no-repeat center center;
          }

          .fireThree {
            background: url('../../../../assets/img/new/huozai_3.png') no-repeat center center;
          }
        }
      }

      .bottom {
        height: calc(100% - 2.7rem);
        width: calc(100% - .32rem);
        position: absolute;
        top: 2.7rem;
        padding: .28rem .1rem;
        box-sizing: border-box;

        .main {
          height: .51rem;
          width: calc(100% - .2rem);
          margin: .15rem auto;
          display: flex;
          box-sizing: border-box;

          >span {
            display: inline-block;
            height: 100%;
            line-height: .51rem;
            text-align: right;
            color: #0096ff;
            background-size: 100% 100%;
            font-size: .2537rem;
          }

          .left {
            width: 1.1rem;
          }

          .center {
            width: .51rem;
            background: url('../../../../assets/img/new/huozai_4.png') no-repeat center center;
            padding: 0 .25rem;
            box-sizing: border-box;
          }

          .right {
            width: calc(100% - 1.61rem);
            text-align: left;
            font-size: .3044rem;
            font-weight: bold;
            box-sizing: border-box;
            // color: #ffd200;
          }
        }

        .detail {
          min-height: .51rem;
          height: auto;
          width: calc(100% - .2rem);
          margin: 0px auto;
          display: flex;
          box-sizing: border-box;

          >span {
            display: inline-block;
            height: 100%;
            line-height: .51rem;
            text-align: right;
            color: #0096ff;
            background-size: 100% 100%;
            font-size: .2537rem;
          }

          >p {
            display: inline-block;
            height: auto;
            line-height: .51rem;
            text-align: right;
            color: #0096ff;
            background-size: 100% 100%;
            font-size: .2537rem;
          }

          .left {
            width: .51rem;
            min-height: .51rem;
            height: auto;
            background: url('../../../../assets/img/new/huozai_5.png') center center;
            padding: 0 .25rem;
            margin-left: 1.1rem;
            box-sizing: border-box;
          }

          .right {
            width: calc(100% - 1.61rem);
            text-align: left;
            font-size: .2537rem;
            box-sizing: border-box;
            color: #0096ff;
            line-height: .51rem;
            // color: #ffd200;
          }
        }
      }
    }
  }
</style>
