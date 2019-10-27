<template>
  <div class="fireScene">
    <div class="title">
      <span>火情警报</span>
      <span class="backButton" @click="back"></span>
    </div>
    <div class="content fireScene-content">
      <div class="bottom">
        <div v-for="(item, index) in fireList" :key="index">
          <div class="main">
            <span class="left">{{ item.accessTime }}</span>
            <span class="center"></span>
            <span class="right">{{ item.fireTitle }}</span>
          </div>
          <div v-for="(detail, i) in item.data" :key="i" class="detail">
            <span v-if="i === 0 && item.changeTime !== '0'" class="changeTime">+{{ item.changeTime }}s</span>
            <span class="left" :class="{noLine1:index === fireList.length - 1}"></span>
            <p class="left2">{{ detail.name }}:</p>
            <p class="right2">
              <span v-if="detail.name !== '图片'">{{ detail.data }}</span>
              <img style="width:100%;" v-else :src="detail.img" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fireScene',
  props: {
    wsData: {
      Object,
      default: () => {}
    },
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
      name: '',
      id: '',
      phone: '',
      gmtCreate: 1567238600000,
      fireList: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getChangeTime(timeTemp) {
      // console.log(timeTemp, this.gmtCreate);
      timeTemp -= this.gmtCreate;
      return timeTemp / 1000;
    },
    timestampToTime(timestamp) {
      let date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let h = this.change(date.getHours()) + ':';
      let m = this.change(date.getMinutes()) + ':';
      let s = this.change(date.getSeconds());
      return h + m + s;
    },
    change(t) {
      if (t < 10) {
        return '0' + t;
      }
      return t;
    },
    getData() {
      let params = {};
      if (this.yjProductkey && this.yjDeviceName) {
        params = {
          type: 'siteStation',
          productKey: this.yjProductkey,
          deviceName: this.yjDeviceName,
          emId: this.yjEmId
        }
      }
      else {
        params = {
          type: 'siteStation',
          emId: this.yjEmId
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'siteStationGetData',
        params
      }).then(({ data }) => {
        // this.$services.get({
        //   type: 'LARGE',
        //   url: 'important1GetData',
        //   params: {
        //     type: 'important',
        //     productKey: this.yjProductkey,
        //     deviceName: this.yjDeviceName,
        //     emId: this.yjEmId
        //   }
        // }).then(({ data }) => {
        //   this.gmtCreate = new Date(data.data.gmtCreate).getTime();
        // });

        this.setData(data);
      });
    },
    setData({ data }) {
      let fireList = data;

      fireList = fireList.reduce((result, item) => {
        result.unshift({
          ...item,
          accessTime: this.timestampToTime(item.accessTime),
          // changeTime: this.getChangeTime(item.accessTime)
          changeTime: item.timeDist
        });

        return result;
      }, []);
      fireList.length > 0 && fireList.forEach(item => {
        item.data.length > 0 && item.data.forEach(k => {
          // if (k.name === '通知群') {
          if (k.name === '图片') {
            k.img = 'http://120.55.234.38/api/getPicture?picture=' + k.data;
            // k.img = 'http://120.55.234.38/api/getPicture?picture=753c6bf3366b4713af7c1b1afe890668.png';
          }
        });
      });

      this.fireList = fireList;
    },
    back() {
      this.$emit('toNormal');
    }
  },
  watch: {
    wsData(val) {
      this.setData(val);
    }
  }
};
</script>

<style lang="scss">
  .fireScene {
    width: 100%;
    height: 100%;
    .backButton {
      float: right;
      margin-top: .1rem;
      width: .8rem;
      height: .5rem;
      background: url('../../../../assets/img/new/backArrow.png') no-repeat center center;
      background-size: cover;
      padding-left: 0!important;
      cursor: pointer;
    }
    .fireScene-content {
      // display: flex;
      // flex-direction: column;
      // justify-content: space-around;
      // position: relative;
      overflow: auto;
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
            // height: 100%;
            line-height: .31rem;
            text-align: left;
            // color: #0096ff;
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
        // height: calc(100% - 2.7rem);
        // width: calc(100% - .32rem);
        // position: absolute;
        // top: 0rem;
        // // padding: .28rem .1rem;
        // box-sizing: border-box;
        position: relative;
        .main {
          height: .31rem;
          width: calc(100% - .2rem);
          margin: .15rem auto;
          display: flex;
          box-sizing: border-box;
          >span {
            display: inline-block;
            height: 100%;
            line-height: .31rem;
            text-align: right;
            // color: #0096ff;
            background-size: 100% 100%;
            font-size: .24rem;
            font-weight: 700;
            color: #D3E2FF;
          }
          .left {
            // width: 1.1rem;
          }
          .center {
            width: .51rem;
            background: url('../../../../assets/img/new/huozai_4.png') no-repeat center center;
            padding: 0 .25rem;
            box-sizing: border-box;
            background-size: contain;
          }
          .right {
            width: calc(100% - 1.61rem);
            text-align: left;
            font-size: .25rem;
            font-weight: 700;
            box-sizing: border-box;
            // color: #ffd200;
          }
        }
        .detail {
          min-height: .41rem;
          height: auto;
          width: calc(100% - .1rem);
          margin: 0px auto;
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          font-size: .2237rem;
          .changeTime {
            color: #F74722;
            position: absolute;
            left: 0.5rem;
          }
          >span {
            display: inline-block;
            // height: 100%;
            line-height: .31rem;
            text-align: right;
            // color: #0096ff;
            background-size: 100% 100%;
            // font-size: .2337rem;
          }
          >p {
            display: inline-block;
            height: auto;
            line-height: .34rem;
            text-align: left;
            // color: #0096ff;
            background-size: 100% 100%;
            white-space:pre-wrap;
          }
          .left {
            min-height: .41rem;
            height: auto;
            width: 2px;
            // background: linear-gradient(top,rgba(106, 103, 208, 0),rgba(64,78,116,0));
            // background: linear-gradient(top,#ccc,#000);
            background: -webkit-linear-gradient(top, #7E74FF, #4451FF);
            // background: url('../../../../assets/img/new/huozai_5.png') center center;
            padding: 0 .01rem;
            margin-left: 1.32rem;
            margin-right: 0.15rem;
            box-sizing: border-box;
          }
          .left1 {
            width: .31rem;
            min-height: .41rem;
            height: auto;
            padding: 0 .18rem;
            font-weight: bold;
            margin-left: 1.06rem;
            box-sizing: border-box;
          }
          .left2 {
            float:left;
            width: 39%;
            font-weight: 400;
            padding-left: .1rem;
          }
          .left3 {
            padding-left: .1rem;
          }
          .right {
            width: calc(100% - 1.61rem);
            padding-left: .1rem;
            text-align: left;
            box-sizing: border-box;
              line-height: .31rem;
          }
          .right2{
            text-align: left;
            float:left;
            width: calc(60% - .15rem);
            word-break: break-all;
            >p {
              display: inline-block;
              height: auto;
                line-height: .34rem;
              text-align: left;
              // color: #0096ff;
              background-size: 100% 100%;
              white-space:pre-wrap;
            }
          }
        }
      }
    }
    .noLine1{
      background: rgba(#000000, 0) !important;
    }
  }
</style>
