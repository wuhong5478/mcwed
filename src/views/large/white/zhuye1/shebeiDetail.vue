<template>
  <div class="shebeiDetail">
    <div class="title">
      <span class="detailspan">设备详情</span>
      <div class="quit" @click="closeshebeideatil1()">×</div>
    </div>
    <div class="content">
      <div class="top">
        <div class="duan">
          <span class="textspan">设备型号:</span>
          <span class="textblue">  {{deviceType}}</span>
        </div>
        <div class="duan">
          <span class="textspan">设备名称:</span>
          <span class="textblue">  {{equipment}}</span>
        </div>
        <div class="duan">
          <span class="textspan">部署位置:</span>
          <span class="textblue">  {{place}}</span>
        </div>
        <div class="duan">
          <span class="textspan">上报时间:</span>
          <span class="textblue">  {{reportTime}}</span>
        </div>
      </div>
      <div class="bottom" v-if="triggerOriginMessage.length > 0">
        <div class="duan">
          <span class="textspan">设备运行状态:</span>
        </div>
        <div class="center">
          <div class="box" v-for="(item, index) in triggerOriginMessage" :key="index">
            <span v-for="(value, name) in item" :key="'obj' + name">{{name}}:{{value}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="center">
        <div class="box">
          <span class="boxs1">电池电量</span>
          <span class="boxs2">100%</span>
          <span class="boxs3">2019-09-21 12:25:25</span>
        </div>
        <div class="box" style="margin-left: 2%;">
          <span class="boxs1">电池电量</span>
          <span class="boxs2">100%</span>
          <span class="boxs3">2019-09-21 12:25:25</span>
        </div>
        <div class="box" style="margin-left: 2%;">
          <span class="boxs1">电池电量</span>
          <span class="boxs2">100%</span>
          <span class="boxs3">2019-09-21 12:25:25</span>
        </div>
        <div class="box">
          <span class="boxs1">电池电量</span>
          <span class="boxs2">100%</span>
          <span class="boxs3">2019-09-21 12:25:25</span>
        </div>
        <div class="box" style="margin-left: 2%;">
          <span class="boxs1">电池电量</span>
          <span class="boxs2">100%</span>
          <span class="boxs3">2019-09-21 12:25:25</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'fireAnaly',
  props: {
    shebeidetailData: {
      Object,
      default: () => {}
    }
  },
  data() {
    return {
      architecture: null,
      deviceType: '',
      equipment: '',
      place: '',
      reportTime: '',
      triggerOriginMessage: [
        // {
        //   "LevValue": 1.7025,
        //   "DevStatus": "设备状态正常",
        //   "BatPt": 100,
        //   "LevStatus": "高液位超限",
        //   "isoId": "b103Kit6yRuTdEsW"
        // },
        // {
        //   "LevValue": 1.7025,
        //   "DevStatus": "设备状态正常",
        //   "BatPt": 100,
        //   "LevStatus": "高液位超限",
        //   "isoId": "b103Kit6yRuTdEsW"
        // },
        // {
        //   "LevValue": 1.7025,
        //   "DevStatus": "设备状态正常",
        //   "BatPt": 100,
        //   "LevStatus": "高液位超限",
        //   "isoId": "b103Kit6yRuTdEsW"
        // },
        // {
        //   "LevValue": 1.7025,
        //   "DevStatus": "设备状态正常",
        //   "BatPt": 100,
        //   "LevStatus": "高液位超限",
        //   "isoId": "b103Kit6yRuTdEsW"
        // }
      ]
    };
  },
  mounted() {
    /* this.$nextTick(() => {
        this.getData();
      }); */
  },
  methods: {
    closeshebeideatil1() {
      this.$emit('closeshebeideatil1');
    },
    cleanData() {
      this.architecture = null;
      this.deviceType = '';
      this.equipment = '';
      this.place = '';
      this.reportTime = '';
    },
    getData() {
      this.$services.get({
        type: 'LARGE',
        url: 'getTaskWarnGetData',
        params: {
          id: this.shebeidetailData.id,
          lat: this.shebeidetailData.latitude,
          lng: this.shebeidetailData.longitude,
          type: 'map'
        }
      }).then(({ data }) => {
        console.log('getTaskWarnGetData', data);
        console.log('triggerOriginMessage', this.shebeidetailData.triggerOriginMessage);
        this.architecture = data.architecture;
        this.deviceType = data.architecture.deviceType;
        this.equipment = data.architecture.equipment;
        this.place = data.architecture.place;
        this.reportTime = data.architecture.reportTime;
        this.triggerOriginMessage = this.shebeidetailData.triggerOriginMessage ? [JSON.parse(this.shebeidetailData.triggerOriginMessage)] : [];
      });
    },
    setData(data) {}
  },
  watch: {
    shebeidetailData(val) {
      console.log(val, this.shebeidetailData, '...');
      if (val) {
        this.getData();
      }

    }
  }
};
</script>

<style lang="scss">
  .shebeiDetail {
    width: 100%;
    height: 100%;
    background: #3A4854;
    border-radius: 8px;
    // border-style: solid;
    border-color: rgba(#000, 0.3);
    box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);

    .title {
      width: 100%;
      height: 7%;

      .detailspan {
        color: #fff;
        padding-left: 0rem;
      }

      .quit {
        float: right;
        width: 5%;
        color: white;
        font: 100 0.6rem/.6rem Tahoma, Verdana, sans-serif;
        cursor: pointer;
      }
    }

    .content {
      width: calc(100% - .9rem);
      height: calc(100% - .72rem);
      padding: 0 .45rem;
      overflow: auto;
      text-align: left;

      .top {
        height: 2rem;
      }

      .duan {
        color: #DCDFE1;
        font-size: 0.3rem;
        height: .5rem;
        line-height: .5rem;
      }

      .center {
        height: 65%;
        color: #DCDFE1;
        font-size: 0.3rem;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .box {
          width: calc(60% - .2rem);
          height: 1.75rem;
          border: 1px solid;
          margin-top: .2rem;
          padding: .1rem;
          span{
            display: block;
            line-height: .35rem;
            font-size: 0.23rem;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
