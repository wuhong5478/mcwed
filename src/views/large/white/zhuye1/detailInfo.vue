<template>
  <div class="detailInfo1">
    <div class="detailHead1">
      <div class="theTitle">
        <div class="title1">设备详情</div>
        <div class="title2">{{districtName}}{{building}}</div>
      </div>
      <div class="quit" @click="closeDetailInfo()">×</div>
    </div>
    <div class="content detailContext">
      <div class="Head" style="padding-top: .2rem;">
        <span>{{productName}} (ID:{{id}})</span>
      </div>
      <div class="Text">
        <div class="row">
          <div class="block">
            <span class="smallTitle">设备型号</span>
            <span class="smallText">{{categoryName}}</span>
          </div>
          <div class="block">
            <span class="smallTitle">设备状态</span>
            <span class="smallText">{{status}}</span>
          </div>
          <div class="block">
            <span class="smallTitle">部署区域</span>
            <span class="smallText">{{districtName}}</span>
          </div>
        </div>
        <div class="row">
          <div class="block">
            <span class="smallTitle">设备类型</span>
            <span class="smallText">{{productName}}</span>
          </div>
          <div class="block">
            <span class="smallTitle">权属机构</span>
            <span class="smallText">{{organizationName}}</span>
          </div>
          <div class="block">
            <span class="smallTitle">部署位置</span>
            <span class="smallText">{{address}}</span>
          </div>
        </div>
        <div class="row">
          <div class="block">
            <span class="smallTitle">供货商</span>
            <span class="smallText">{{supplier}}</span>
          </div>
          <div class="block">
            <span class="smallTitle">上线时间</span>
            <span class="smallText">{{latestOnlineTime}}</span>
          </div>
          <div class="block">
            <span class="smallTitle">地理位置</span>
            <span class="smallText">{{longitude}},{{latitude}},{{altitude}}</span>
          </div>
        </div>
      </div>
      <div class="Head" style="padding-top: 0.4rem;" v-if="property===[]">
        <span>设备运行状态</span>
      </div>
      <div class="Text" style="width: 85%;" v-if="property===[]">
        <div class="row">
          <div class="block">
            <span class="smallTitle">设备警告状态</span>
            <span class="smallText">数据正常</span>
          </div>
          <div class="block">
            <span class="smallTitle">液位值告警状态</span>
            <span class="smallText">数据正常</span>
          </div>
          <div class="block">
            <span class="smallTitle">液位值</span>
            <span class="smallText">1.9862</span>
          </div>
          <div class="block">
            <span class="smallTitle">发送频率</span>
            <span class="smallText">10</span>
          </div>
          <div class="block">
            <span class="smallTitle">电池电量</span>
            <span class="smallText">89%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailInfo',
  props: {
    builddetail: Object,
    default: () => {}
  },
  data() {
    return {
      cos1: 5,
      cos2: 0,
      Data: [],
      menuData: [],
      textData: [],
      deviceList: [],
      id: '',
      deviceName: '',
      districtName: '',
      organizationName: '',
      status: '',
      address: '',
      building: '',
      productName: '',
      categoryName: '',
      longitude: '',
      latitude: '',
      altitude: '',
      lastUploadTime: '',
      latestOnlineTime: '',
      supplier: '',
      health: '',
      property: []
    };
  },

  watch: {
    builddetail(val) {
      if (val) {
        this.getData();
      }
    }
  },
  mounted() {
    /* this.$nextTick(() => {
      this.getData();
    }); */
  },
  methods: {
    closeDetailInfo() {
      this.$parent.changeDetailInfoShow();
    },
    getData() {
      this.$services.get({
        type: 'LARGE',
        url: 'getDeviceDetail',
        params: {
          id: this.builddetail.id,
          type: 'map'
        }
      }).then(({ data }) => {
        // console.log('-------------getDeviceDetail---------------', data);
        this.deviceList = data.deviceList;
        this.id = data.deviceList.id;
        this.deviceName = data.deviceList.deviceName;
        this.districtName = data.deviceList.districtName;
        this.organizationName = data.deviceList.organizationName;
        // this.status = data.deviceList.status;
        if (data.deviceList.status === 1) {
          this.status = '在线';
        }
        else if (data.deviceList.status === 0) {
          this.status = '离线';
        }
        else {
          this.status = '未激活';
        }
        this.address = data.deviceList.address;
        this.building = data.deviceList.building;
        this.productName = data.deviceList.productName;
        this.categoryName = data.deviceList.categoryName;
        this.longitude = data.deviceList.longitude;
        this.latitude = data.deviceList.latitude;
        this.altitude = data.deviceList.altitude;
        this.lastUploadTime = data.deviceList.lastUploadTime ? null : this.$utils.renderTime(data.deviceList.lastUploadTime, 'YYYY-MM-DD hh:mm');
        this.latestOnlineTime = data.deviceList.latestOnlineTime ? null : this.$utils.renderTime(data.deviceList.latestOnlineTime, 'YYYY-MM-DD hh:mm');
        this.health = data.deviceList.health;
        this.supplier = data.deviceList.supplier;
        this.property = data.deviceList.property;
      });
    }
  }
};
</script>

<style lang="scss">
.detailInfo1 {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: rgba(#000, 0.3);
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .detailHead1{
    height: 11%;
    background-image: -webkit-linear-gradient(left, rgb(11,35,56), rgb(56,70,83));
    border-bottom: 0.01rem solid #7F8A92;
    .quit{
      float: right;
      margin-right: .4rem;
      color: white;
      font: 100 0.6rem/0.3rem Tahoma,Verdana,sans-serif;
      cursor: pointer;
      margin: 0.3rem 0.5rem 0.4rem 0.4rem;
    }
    .theTitle{
      float: left;
      display: flex;
      width: 80%;
      flex-direction: row;
      justify-content: left;
      .title1{
        margin-left: .5rem;
        padding-top: .2rem;
        font-size: .37rem;
        color: white;
      }
      .title2{
        transition: all .25s ease-in-out;
        margin-left: 0.3rem;
        font-size: 0.33rem;
        font-weight: 100;
        color: #DCDFE1;
        padding-top: 0.27rem;
      }
    }
  }
  .detailContext {
    width: calc(100% - 1.4rem) !important;
    height: calc(91% - .6rem) !important;
    background-color: rgb(57,72,84) !important;
    font-size: 0.3rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.7rem !important;
    overflow: auto;
    .Head{
      font-size: .39rem;
      color: white;
      padding-bottom: .3rem;
    }
    .Text{
      display: flex;
      flex-direction: column;
      justify-content: left;
      .row{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: left;
        .block{
          width: 20%;
            display: flex;
            flex-direction: column;
            padding-bottom: .3rem;
            .smallTitle{
              color: #7F8A92;
              font-weight: 100;
              font-size: .28rem;
              padding-bottom: 0.1rem;
            }
            .smallText{
              color: white;
              font-weight: 100;
              font-size: .28rem;
            }
            >span{
              line-height: 0.5rem;
              // width: 25%;
              text-align: left;
            }
        }
      }
    }
  }
}
</style>
