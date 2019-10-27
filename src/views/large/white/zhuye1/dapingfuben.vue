<template>
  <div class="dapingfuInfo">
    <div class="title">
      <span class="titleLeft">火警报告</span>
      <span class="quit" @click="changeDaPingFubenShow">×</span>
    </div>
    <div class="content">
      <div class="dapingfuInfo-content">
        <span class="left">触达时间</span>
        <span class="center">到场时间</span>
        <span class="right">持续时间</span>
      </div>
      <div class="dapingfuInfo-content1">
        <span class="left1">{{chuda}}</span>
        <span class="center1">{{daoTime}}</span>
        <span class="right1">{{conTime}}</span>
      </div>
      
      <div class="newstime" v-for="(item, index) in processLst" :key="index">
        <div class="newtimeleft">
          <span class="top">{{item.dealTime}}</span>
          <span class="cen">{{item.dealYear}}</span>
          <span class="bot">{{item.dealmm}}</span>
        </div>
        <div class="newtimeright">
          <span class="top">事件名称: {{item.fireTitle}}</span>
          <span class="cen" v-for="pdata in item.data" :key="pdata.data">
            {{pdata.name}}: 
            <span v-if="pdata.name !== '图片'">{{pdata.data}}</span>
            <img style="width:100%;" v-else :src="pdata.firereportimage" />
          </span>
        </div>
      </div>
      <!-- <div class="newtimeImage" v-if="iffireImage">
        <span class="top">现场图片:</span>
        <image class="fireReportImg" style="width:100%;height:100%"></image>
      </div> -->

    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'controlroomInfo',
  props: {
    fireReportData: {
      Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: [],
      eventName: '',
      devName: '',
      address: '',
      trueYear: '',
      truemm: '',
      processLst: [],
      trueTime: '',
      currenTime: '',
      firereportimage: '',
      iffireImage: false,
      timeDist: '',
      conTime: '',
      daoTime: '',
      chuda: ''
    };
  },
  mounted() {
    /* this.$nextTick(() => {
      this.getData();
    }); */
  },
  methods: {
    getData() {
      let params = {};
      if (this.fireReportData.productKey && this.fireReportData.deviceName) {
        params = {
          type: 'fireReport',
          productKey: this.fireReportData.productKey,
          deviceName: this.fireReportData.deviceName,
          emId: this.fireReportData.id
        }
      }
      else {
        params = {
          type: 'fireReport',
          emId: this.fireReportData.id
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'getfireWarnReport',
        params
      }).then(({
        data
      }) => {
        // console.log('fireReport', data);
        this.data = data.data;
        this.eventName = data.data.eventName;
        this.devName = data.data.devName;
        this.address = data.data.address;
        this.trueTime = data.data.trueTime;
        // console.log(this.trueTime);
        this.trueYear = data.data.trueTime.substr(0, 10);
        this.truemm = data.data.trueTime.substr(11);
        // console.log(this.trueYear, this.truemm);
        let gmtCreate = data.data.gmtCreate;
        let dealTime = data.data.dealTime;
        let trueTime = data.data.trueTime;
        let time1 = new Date(gmtCreate.replace('-', '/'));
        let time2 = new Date(dealTime.replace('-', '/'));
        let time3 = new Date(trueTime.replace('-', '/'));
        let cn = parseInt((time2.getTime() - time1.getTime()) / (1000 * 60)) + '';
        let cn1 = parseInt(((time2.getTime() - time1.getTime()) - cn * 1000 * 60) / 1000) + '';
        this.conTime = cn + 'min' + cn1 + 's';

        let dn = parseInt((time3.getTime() - time1.getTime()) / (1000 * 60)) + '';
        let dn1 = parseInt(((time3.getTime() - time1.getTime()) - dn * 1000 * 60) / 1000) + '';
        this.daoTime = dn + 'min' + dn1 + 's';

        // let chun = new Date(this.$utils.renderTime(data.processLst[0].accessTime, 'YYYY/MM/DD HH:mm:ss'));
        // let cdn = parseInt((chun.getTime() - time1.getTime()) / (1000 * 60)) + '';
        // let cd1 = parseInt(((chun.getTime() - time1.getTime()) - cdn * 1000 * 60) / 1000) + '';
        // this.chuda = cdn + 'min' + cd1 + 's';

        this.chuda = '';
        for (let i = 0; i < data.processLst.length; i++) {

          let timecon = parseInt((parseInt(data.processLst[i].timeDist)) / 60) + '';
          let timecons = parseInt((parseInt(data.processLst[i].timeDist) - timecon * 60)) + '';
          if (timecon.length <= 1) {
            timecon = '0' + timecon;
          }
          if (timecons.length <= 1) {
            timecons = '0' + timecons;
          }
          if (timecons < 0) {
            timecons = '00';
          }
          
          if (data.processLst[i].fireTitle === '消息触达' && this.chuda === '') {
            let min = timecon === '00' ? '0' : timecon;
            this.chuda = min + 'min' + timecons + 's';
          }
          data.processLst[i].dealTime = timecon + ':' + timecons;
          data.processLst[i].dealYear = this.$utils.renderTime(data.processLst[i].accessTime, 'YYYY-MM-DD');
          data.processLst[i].dealmm = this.$utils.renderTime(data.processLst[i].accessTime, 'HH:mm:ss');
          let j = (i === 0 ? 0 : i - 1);
          let c0 = this.$utils.renderTime(data.processLst[j].accessTime, 'YYYY/MM/DD HH:mm:ss');
          let c1 = this.$utils.renderTime(data.processLst[i].accessTime, 'YYYY/MM/DD HH:mm:ss');
          let c1Data = new Date(c1);
          let c0Data = new Date(c0);
          let cm = (parseInt((c1Data - c0Data) / 1000 / 60)) + '';
          let cn = (parseInt((c1Data - c0Data) / 1000) - cm * 60) + '';
          if (cn.length <= 1) {
            cn = '0' + cn;
          }
          if (cm.length <= 1) {
            cm = '0' + cm;
          }
          data.processLst[i].dealss = cm + ':' + cn;
          for (let j = 0; j < data.processLst[i].data.length; j++) {
            if (data.processLst[i].data[j].name === '图片') {
              // this.iffireImage = true;
              data.processLst[i].data[j].firereportimage = 'http://120.55.234.38/api/getPicture?picture=' + data.processLst[i].data[j].data;

              // data.processLst[i].data.splice(j, 1);
            }
          }
        }
        this.processLst = data.processLst;
        // console.log('this.processLst', this.processLst);

        if (this.iffireImage) {
          // console.log('this.firereportimage', this.firereportimage);
          // document.getElementsByClassName('fireReportImg')[0].src = this.firereportimage;
        }
      });
    },

    changeDaPingFubenShow() {
      this.$emit('closeDapingfubenShow');
    }
  },
  watch: {
    fireReportData(val) {
      if (val) {
        // console.log(val);
        // console.log(this.fireReportData, 'fireReportData');
        this.getData();
      }

    }
  }
};
</script>

<style lang="scss">
  .dapingfuInfo {
    width: 100%;
    height: 100%;


    .titleLeft {
      padding-left: 0rem !important;
      margin-left: -0.1rem;
      font-size: 0.28rem;
    }

    .quit {
      float: right;
      margin: 0.2rem -0.2rem 0rem 0rem;
      color: white;
      font: 100 0.6rem/0.3rem Tahoma, Verdana, sans-serif;
      cursor: pointer;
      padding-left: 0rem !important;
    }

    .content {
      overflow: auto;

      .dapingfuInfo-content {
        width: 100%;
        height: 8%;
        display: flex;

        .left {
          width: 30%;
          text-align: left;
          height: 100%;
        }

        .center {
          width: 36%;
          text-align: left;
          height: 100%;
        }

        .right {
          width: 30%;
          text-align: left;
          height: 100%;
        }
      }

      .dapingfuInfo-content1 {
        width: 100%;
        height: 12%;
        display: flex;
        font-size: 0.45rem;
        color: #0088FF;
        font-weight: bold;

        .left1 {
          width: 30%;
          text-align: left;
          height: 100%;
        }

        .center1 {
          width: 36%;
          text-align: left;
          height: 100%;
        }

        .right1 {
          width: 33%;
          text-align: left;
          height: 100%;
        }
      }

      .newtimeImage {
        margin-left: 30%;
        text-align: left;
        width: 70%;
        height: 70%;

        .top {
          color: #7F8A92;
          font-size: 0.31rem;
        }
      }

      .newstime {
        width: 100%;
        height: auto;
        margin-top: 2%;
        display: flex;

        .newtimeleft {
          // float: left;
          width: 30%;
          text-align: left;
          height: 1.5rem;

          .top {
            display: block;
            color: #DCDFE1;
            font-size: 0.35rem;
          }

          .cen {
            display: block;
            font-size: 0.25rem;
            color: #7F8A92;
          }

          .bot {
            display: block;
            font-size: 0.3rem;
            color: #7F8A92;
          }
        }

        .newtimeright {

          // float: left;
          width: 69%;
          text-align: left;
          height: auto;
          color: #7F8A92;

          .top {
            display: block;

            font-size: 0.31rem;
          }

          .cen {
            display: block;
            font-size: 0.31rem;
          }

          .bot {
            display: block;
            font-size: 0.31rem;
          }
        }
      }
    }

  }
</style>
