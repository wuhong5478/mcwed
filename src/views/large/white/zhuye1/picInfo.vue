<template>
  <div class="picInfo">
    <div class="picHead">
      <div class="theTitle">
        <div class="title1">查看图片</div>
      </div>
      <div class="quit" @click="closePicInfo()">×</div>
    </div>
    <div class="pic">
      <img :src="url" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'picInfo',
  props: {
    picObj: {
      Object,
      default: () => {}
    }
  },
  data() {
    return {
      url: ''
    };
  },
  mounted() {
    console.log(this.picObj.livePhoto);
    if (this.picObj.livePhoto.indexOf('png') !== -1 || this.picObj.livePhoto.indexOf('jpg') !== -1) {
      this.url = 'http://120.55.234.38/api/getPicture?picture=' + this.picObj.livePhoto;
    }
    else {
      // this.url = 'http://120.55.234.38/api/getPicture?picture=db65ec0b19944e7fa076d3b521ac7abd.png';
      let params = {};
      if (this.picObj.productKey && this.picObj.deviceName) {
        params = {
          pictureId: this.picObj.livePhoto,
          deviceName: this.picObj.deviceName,
          productKey: this.picObj.productKey,
          type: 1
        }
      }
      else {
        params = {
          pictureId: this.picObj.livePhoto,
          type: 1
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'getiotpictureUrl',
        params
      }).then(({ data }) => {
        this.url = data;
      });
    }
  },
  methods: {
    closePicInfo() {
      this.$parent.changePicInfoShow();
    },
  },
};
</script>

<style lang="scss">
.picInfo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: rgba(#000, 0.3);
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .picHead{
    height: 1rem;
    background-image: -webkit-linear-gradient(left, rgb(11,35,56), rgb(56,70,83));
    border-bottom: 0.01rem solid rgb(142,143,145);
    .quit{
      float:right;
      width: 2%;
      margin-right:.4rem;
      color: white;
      font: 100 0.6rem/1rem Tahoma,Verdana,sans-serif;
      cursor: pointer;
    }
    .theTitle{
      float: left;
      display: flex;
      width: 80%;
      flex-direction: row;
      justify-content: left;
      .title1{
        margin-left: .6rem;
        padding-top: .3rem;
        font-size: .33rem;
        color: white;
      }
    }
  }
  .picContext{
    background-color: rgb(57,72,84) !important;
    padding: .16rem 0.48rem !important;
    width: calc(100% - 0.96rem) !important;
    height: auto;
  }
  .pic{
    // background-image: url('../../../../assets/img/floor/testPH11f.png');
    // background-size: 100% 100%;
    width: 100%;
    height: 91%;
    overflow: auto;
    background: #394854;
    img{
      width: 100%;
    }
  }
}
</style>
