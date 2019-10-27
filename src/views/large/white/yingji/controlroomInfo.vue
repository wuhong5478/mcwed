<template>
  <div class="controlroomInfo">
    <div class="title"><span>消控室信息</span></div>
    <div class="content controlroomInfo-content">
      <div>
        <el-tooltip class="item" effect="dark" :content="controlRoomName" placement="top">
          <span class="left">{{controlRoomName}}</span>
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
  name: 'controlroomInfo',
  props: {
    wsData: {
      Object,
      default: () => {}
    },
    update: {
      Boolean,
      default: false
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
      controlRoomName: '',
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
          type: 'controlRoom',
          productKey: this.yjProductkey,
          deviceName: this.yjDeviceName,
          emId: this.yjEmId
        }
      }
      else {
        params = {
          type: 'controlRoom',
          emId: this.yjEmId
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'controlRoomGetData',
        params
      }).then(({ data }) => {
        // console.log('controlRoomGetData: ' + JSON.stringify(data));
        this.setData(data);
      });
    },
    setData(data) {
      if (data && data.data.length > 0) {
        this.controlRoomName = data.data[0].controlRoomName;
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
    },
    update(val) {
      this.getData();
    }
  }
};
</script>

<style lang="scss">
.controlroomInfo {
  width: 100%;
  height: 100%;
  .controlroomInfo-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
