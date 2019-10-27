<template>
  <div class="emergencyFireStation">
    <div class="title"><span>应急消防站信息</span></div>
    <div class="content emergencyFireStation-content">
      <div>
        <span class="left">{{miniFireName}}</span>
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
  name: 'emergencyFireStation',
  props: {
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
          type: 'emergencyStation',
          productKey: this.yjProductkey,
          deviceName: this.yjDeviceName,
          emId: this.yjEmId
        }
      }
      else {
        params = {
          type: 'emergencyStation',
          emId: this.yjEmId
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'emergencyStationGetData',
        params
      }).then(({ data }) => {
        // console.log('emergencyStatio: ' + JSON.stringify(data));
        this.miniFireName = data.data[0].miniFireName;
        this.userName = data.data[0].userName;
        this.statusStr = data.data[0].statusStr;
        this.status = data.data[0].status;
        this.telphone = data.data[0].telphone;
      });
    }
  }
};
</script>

<style lang="scss">
  .emergencyFireStation {
  width: 100%;
  height: 100%;
  .emergencyFireStation-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    >div {
      height: .4rem;
      display: flex;
      >span {
        display: inline-block;
        height: 100%;
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
