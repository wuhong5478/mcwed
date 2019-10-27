<template>
  <div class="microFireStationInfo">
    <div class="title"><span>微型消防站信息</span></div>
    <div class="content microFireStationInfo-content">
      <div>
        <el-tooltip class="item" effect="dark" :content="miniFireName" placement="top">
          <span class="left">{{miniFireName}}</span>
        </el-tooltip>
        <span class="right">{{statusStr}}</span>
      </div>
      <div>
        <span class="left">{{userName}}</span>
        <span class="right">{{telphone}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'microFireStationInfo',
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
      miniFireName: '',
      userName: '',
      statusStr: '',
      status: '',
      telphone: ''
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData() {
      let params = {};
      if (this.yjProductkey && this.yjDeviceName) {
        params = {
          type: 'miniFireStation',
          productKey: this.yjProductkey,
          deviceName: this.yjDeviceName,
          emId: this.yjEmId
        }
      }
      else {
        params = {
          type: 'miniFireStation',
          emId: this.yjEmId
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'miniFireStationGetData',
        params
      }).then(({ data }) => {
        // console.log('miniFireStation: ' + JSON.stringify(data));
        this.setData(data);
      });
    },
    setData(data) {
      if (data && data.data.length > 0) {
        this.miniFireName = data.data[0].miniFireName;
        this.userName = data.data[0].userName;
        this.statusStr = data.data[0].statusStr;
        this.status = data.data[0].status;
        this.telphone = data.data[0].telphone;
      }
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
  .microFireStationInfo {
  width: 100%;
  height: 100%;
  .microFireStationInfo-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .row{
      display: flex;
      flex-direction: column;
    }
    >div {
      height: .4rem;
      display: flex;
      >span {
        display: inline-block;
        // height: 100%;
        line-height: .4rem;
        text-align: left;
        // color: #0096ff;
        background-size: 100% 100%;
        font-size: .23rem;
      }
      .left {
        width: 2.6rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .right {
        padding-left: .2rem;
      }
    }
  }
}
</style>
