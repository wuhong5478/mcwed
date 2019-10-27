<template>
  <div class="topData">
    <div class="count-warp">
      <div style="padding-left: .1rem;;">
        <span class='count-title'>设备总数</span>
        <span class="value">{{device}}</span>
        <!-- <span class='count-title'>小镇评估得分</span>
        <span>{{townScore}}</span> -->
      </div>
      <div>
        <span class='count-title'>设备完好率</span>
        <span class="value">{{deviceRate}}</span>
      </div>
      <div>
        <span class='count-title'>今日报警数量</span>
        <span class="value">{{todayFireNum}}</span>
        <!-- <span class='count-title'>火警误报率</span>
        <span>{{fireAlarmFalseRate}}</span> -->
      </div>
      <div>
        <span class='count-title'>今日已处理火警</span>
        <span class="value">{{todayDealFireNum}}</span>
        <!-- <span class='count-title'>火警周数量环比</span>
        <div class='trend'>
          <span>{{weekNumRate}}</span>
          <div class="up" v-if="this.weekNumTrend === 'up'"></div>
          <div class="down" v-else-if="this.weekNumTrend === 'down'"></div>
          <div class="chiping" v-else>-</div>
        </div> -->
      </div>
      <div>
        <span class='count-title'>今日隐患数量</span>
        <span class="value">{{todayTaskNum}}</span>
        <!-- <span class='count-title'>隐患处置率</span>
        <span>{{hiddenTroubleRate}}</span> -->
      </div>
      <div>
        <span class='count-title'>今日已处理隐患</span>
        <span class="value">{{todayDealTaskNum}}</span>
        <!-- <span class='count-title'>隐患周数量环比</span>
        <div class='trend'>
          <span>{{weekHiddenTroubleRate}}</span>
          <div class="up" v-if="this.weekHiddenTrend === 'up'"></div>
          <div class="down" v-else-if="this.weekHiddenTrend === 'down'"></div>
          <div class="chiping" v-else>-</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topData',
  props: {
    update: {
      Boolean,
      default: false
    }
  },
  data() {
    return {
      device: '0%', // 设备总数
      deviceRate: '0%', // 设备完好率
      todayFireNum: '0%', // 今日火警数量
      todayDealFireNum: '0%', // 今日已处理火警
      todayTaskNum: '0%', // 今日隐患数量
      todayDealTaskNum: '0%', // 今日已处理隐患
      hiddenTroubleRate: '0%', // 隐患处置率
      weekNumTrend: '0%', // 火警周数量环比
      weekNumRate: '0%', // 火警周数量环比
      fireAlarmFalseRate: '0%', // 火警误报率
      weekHiddenTrend: '0%', // 隐患周数量环比
      equipmentIntactRate: '0%', // 设备完好率
      weekHiddenTroubleRate: '0%', // 隐患周数量环比
      townScore: 0, // 镇评估得分
      menuOptions: [],
      points: [],
      muneValue: [],
      topclick: false
    };
  },
  mounted() {
    // this.getList();
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    menuClick() {
      this.$services.get({
        type: 'LARGE',
        url: 'getDevicePonit',
        params: {
          type: 'deviceTypesList',
          categoryId: this.muneValue
        }
      }).then(({ data }) => {
        this.points = data;
      });
    },
    topDataclick() {
      this.topclick = !this.topclick;
      this.$emit('topclick', this.topclick);
    },
    getList() {
      this.$services.get({
        type: 'LARGE',
        url: 'getDeviceTypeList',
        params: {
          type: 'deviceTypesList'
        }
      }).then(({ data }) => {
        this.menuOptions = data;
      });
    },
    getData() {
      this.$services.get({
        type: 'LARGE',
        url: 'important2GetData',
        params: {
          type: 'important'
        }
      }).then(({ data }) => {
        // console.log('importantGetData: ' + JSON.stringify(data));
        // this.hiddenTroubleRate = data.hiddenTroubleRate; // 隐患处置率
        // this.townScore = data.townScore; // 镇评估得分
        // this.weekNumTrend = data.weekNumTrend; // 火警周数量环比
        // this.weekNumRate = data.weekNumRate; // 火警周数量环比
        // this.fireAlarmFalseRate = data.fireAlarmFalseRate; // 火警误报率
        // this.weekHiddenTrend = data.weekHiddenTrend; // 隐患周数量环比
        // this.equipmentIntactRate = data.equipmentIntactRate; // 设备完好率
        // this.weekHiddenTroubleRate = data.weekHiddenTroubleRate; // 隐患周数量环比
        this.device = data.device; // 设备总数
        this.deviceRate = data.deviceRate; // 设备完好率
        this.todayFireNum = data.todayFireNum; // 今日火警数量
        this.todayDealFireNum = data.todayDealFireNum; // 今日已处理火警
        this.todayTaskNum = data.todayTaskNum; // 今日隐患数量
        this.todayDealTaskNum = data.todayDealTaskNum; // 今日已处理隐患
        // console.log(this.weekNumTrend);
      });
    }
  },
  watch: {
    update(val) {
      this.getData();
    }
  }
};
</script>

<style lang="scss">
.topData{
  width: 100%;
  height: 100%;
  // .title > span{
  //   background: url('../../../../assets/img/new/topData.png') no-repeat left center;
  //   background-size: auto 70%;
  // }
  .topData-title {
    position: relative;
    > div {
      width: 50%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      text-align: right;
      > span {
        padding-left: 0;
      }
      .search {
        width: .55rem;
        height: 100%;
        padding: 0 .4rem;
        border: none;
        background: url('../../../../assets/img/new/search.png') no-repeat center center;
        background-size: auto 60%;
        cursor: pointer;
      }
      .mune {
        width: .55rem;
        height: 100%;
        padding: 0 .4rem;
        border: none;
        background: url('../../../../assets/img/new/menu.png') no-repeat center center;
        background-size: auto 60%;
      }
    }
  }
  .count-warp{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    width: calc(100% - .76rem);
    height: calc(100% - 1.48rem);
    padding: 0.18rem .38rem;
    background: rgba(58, 72, 84, 0.9);
    color: #9BA8C1;
    font-size: .24rem;
    font-weight: 400;
    > div{
      // width: 10.5%;
      height: calc(100% - .1rem);
      font-size: .54rem;
      font-weight: bolder;
      text-align: left;
      padding-top: .1rem;
      > span{
        display: block;
      }
      .count-title{
        font-size: .24rem;
        font-weight: 400;
      }
      .value {
        color: #3091FA;
      }
      .trend{
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        .up{
          width: 0.3rem;
          margin-top: 0.2rem;
          margin-bottom: 0.45rem;
          float: left;
          background: url('../../../../assets/img/new/Up.png') no-repeat center center;
          background-size: 100% 100%;
        }
        .down{
          width: 0.3rem;
          margin-top: 0.2rem;
          margin-bottom: 0.45rem;
          float: left;
          background: url('../../../../assets/img/new/Down.png') no-repeat center center;
          background-size: 100% 100%;
        }
        .chiping{
          width: 100%;
          height: 28%;
          line-height: 28%;
          margin-top: 14%;
          margin-left: 13%;
          float: left;
          color: #44ACFB;
        }
      }
    }
  }
}
.topData-search{
  background: #3A4854;
  border: 1px solid #0A2138;
  color: #fff;
  .select-operation {
    display: flex;

    .el-select {
      margin: 0 10px;

      .el-input {
        width: 3rem;
      }
    }
    .el-cascader{
      width: 3rem;
    }

    .showtype {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
