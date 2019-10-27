<template>
  <div class="floorInfo">

    <div class="floorOption">
      <div class="textdiv">
        <div class="textmargin">
          <span>楼层信息</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">楼层地址:</span>
          <span v-if="yingji === 0 || yingji === 2" class="smalltext1">{{place}}</span>
          <span v-if="yingji === 1" class="smalltext1">{{address}}</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">负责人:</span>
          <span class="smalltext1">{{chargePerson}}</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">联系电话:</span>
          <span class="smalltext1">{{telphone}}</span>
        </div>
      </div>

      <div class="textdiv" v-if="type==='hiddenWarn'">
        <div class="textmargin">
          <span>隐患信息</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">隐患名称：</span>
          <span class="smalltext1">{{hiddangerName}}</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">隐患设备：</span>
          <span class="smalltext1">{{deviceType}}</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">隐患等级：</span>
          <span class="smalltext1">{{level}}</span>
        </div>
        <div class="duandiv">
          <span>隐患描述：</span>
        </div>
        <div class="duandiv1">
          <span>{{hiddenDescript}}</span>
        </div>
        <div class="duandiv" v-if="livePhoto">
          <span>隐患照片：</span>
        </div>
        <div class="duandiv1" v-if="livePhoto">
          <div class="pic"><img style=" width: 98%;height: 100%;" id="yinghuanpic" /></div>
        </div>
      </div>

      <div class="textdiv" v-if="type==='fireWarn'">
        <div class="textmargin">
          <span>火警信息</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">火警名称：</span>
          <span class="smalltext1">{{eventName}}</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">报警来源：</span>
          <span class="smalltext1">{{ways}}</span>
        </div>
        <div class="heightdiv">
          <span class="smalltext">报警地址：</span>
          <span class="smalltext1">{{address}}</span>
        </div>

      </div>


    </div>
    <div class="pictureBox">
      <div class="pictitle">
        <span class="picspan">平面图纸</span>
        <div class="quit" @click="closeFloorInfo()">×</div>
        <span class="closeIcon" @click="closeFloorInfo()"></span>
      </div>
      <div class="picbox">
        <div class="floorPicture floor1" id="bigImage">
          <div class="column">
            <img id="image" style="height:100%;" />
            <img v-show="ifsheImage && type === 'fireWarn'" class="sheImage" id="newsshebei" src="../../../../assets/img/huoyandaping.png" />
            <img v-show="ifsheImage && type !== 'fireWarn'" class="sheImage" id="newsshebei2" src="../../../../assets/img/yinhuandaping1.png" />
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'newsfloor',
  data() {
    return {
      temp: 0,
      eventName: '',
      address: '',
      ways: '',
      hiddangerName: '',
      deviceType: '',
      level: '',
      hiddenDescript: '',
      place: '',
      livePhoto: '',
      chargePerson: '',
      telphone: '',
      ifsheImage: false,
      pointSrc: '../../../../../public/img/fire.png'


    };
  },
  props: {
    yingji: Number,

    yjEmId: String,
    type: String,
    isbimData: {
      Object,
      default: () => {}
    }
  },
  mounted() {
    /* this.$nextTick(() => {


          this.getToLeftData('','',1034,990);
        }) */
    this.$nextTick(() => {
      this.setdata();
    });
  },
  methods: {
    active(val) {
      this.temp = val;
    },
    closeFloorInfo() {
      this.$parent.changeFloorInfoShow();
    },
    cleandata() {
      this.eventName = '';
      this.address = '';
      this.ways = '';
      this.hiddangerName = '';
      this.deviceType = '';
      this.level = '';
      this.hiddenDescript = '';
      this.place = '';
      this.livePhoto = '';
      this.place = '';
      this.telphone = '';
      this.chargePerson = '';
    },
    setdata() {
      this.cleandata();
      let pictureWidth = 0;
      let pictureLength = 0;
      if (this.isbimData.drawingList){
        this.file = 'http://120.55.234.38/api/getPicture?picture=' + this.isbimData.drawingList[0].file;
        document.getElementById('image').src = this.file;
        let img = new Image();
        img.src = this.file;
        img.onload = () => {
          pictureWidth = img.width;
          pictureLength = img.height;
          console.log(pictureWidth, pictureLength);
          let lat = this.isbimData.lat;
          let lon = this.isbimData.lon;
          if (this.type === 'fireWarn') {
            this.pointSrc = '../../../../assets/img/huoyandaping.png';

            this.$services.get({
              type: 'LARGE',
              url: 'getFireWarnGetData',
              params: {
                id: this.yjEmId,
                lat,
                lng: lon,
                type: 'map'
              }
            }).then(({
              data
            }) => {
              // console.log('----------getFireWarnGetData----', data);
              this.eventName = data.architecture.eventname;
              this.address = data.architecture.address;
              this.telphone = data.architecture.telphone;
              this.chargePerson = data.architecture.chargePerson;
              let devicename = data.architecture.devicename;
              let productkey = data.architecture.productkey;
              let ways = data.architecture.ways;
              if (ways === 3) {
                this.ways = '一键报警';
              }
              else {
                this.ways = '设备';
              }
              this.getToLeftData(devicename, productkey, pictureWidth, pictureLength);
            });
          }
          else {
            // this.pointSrc = '../../../../assets/img/yinhuandaping1.png';
            this.pointSrc = '../../../../../public/img/fire.png';
            this.$services.get({
              type: 'LARGE',
              url: 'getTaskWarnGetData',
              params: {
                id: this.yjEmId,
                lat,
                lng: lon,
                type: 'map'
              }
            }).then(({
              data
            }) => {
              // console.log('----------getTaskWarnGetData----', data);
              this.hiddangerName = data.architecture.hiddangerName;
              this.deviceType = data.architecture.deviceType;
              this.place = data.architecture.place;
              this.hiddenDescript = data.architecture.hiddenDescript;
              this.livePhoto = data.architecture.livePhoto ? 'http://120.55.234.38/api/getPicture?picture=' + data.architecture.livePhoto : '';
              this.telphone = data.architecture.telphone;
              this.chargePerson = data.architecture.chargePerson;
              if (this.livePhoto) document.getElementById('yinghuanpic').src = this.livePhoto;
              this.level = data.architecture.levelStr;
              let devicename = data.architecture.equipment;
              let productkey = data.architecture.productKey;
              this.getToLeftData(devicename, productkey, pictureWidth, pictureLength);
            });
          }
        }
      }
    },
    getToLeftData(deviceName, productKey, pictureWidth, pictureLength) {
      let shiheight = document.getElementById('image').clientHeight;
      let shiwidth = document.getElementById('image').clientWidth;
      let bigwidth = document.getElementById('bigImage').clientWidth;
      let pianyi = (bigwidth - shiwidth) / 2;
      this.$services.get({
        type: 'LARGE',
        url: 'getDeviceByPoint',
        params: {
          deviceName,
          productKey,
          // deviceName: 'ZJHZ_PHCYY12',
          // productKey: 'a1HtT9cVviI',
          type: 'map'
        }
      }).then(({
        data
      }) => {
        console.log('getDevicebyPint', data);
        this.devicePoint = data.devicePoint;
        this.toLeft = data.devicePoint.toLeft;
        this.toTop = data.devicePoint.toTop;
        if (this.toLeft && this.toTop) {
          this.ifsheImage = true;
          let shiToTop = (parseInt(this.toTop) / parseInt(pictureLength)) * parseInt(shiheight);
          let shiToLet = (parseInt(this.toLeft) / parseInt(pictureWidth)) * parseInt(shiwidth);
          let obj = this.type === 'fireWarn' ? document.getElementById('newsshebei') : document.getElementById('newsshebei2');
          obj.style.top = shiToTop + 'px';
          obj.style.left = (shiToLet + pianyi) + 'px';
        }


      });
    }
  },
  watch: {
    isbimData(val) {
      if (val) {
        if(val.drawingList){
          this.setdata();
        }
        console.log('val', val, 'obj', this.yjEmId, this.type);

      }
    }
  }
};
</script>

<style lang="scss">
  .floorInfo {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border-style: solid;
    border-color: #DCDFE1;
    border-width: 1px;
    box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
    overflow: hidden;


    .floorOption {
      float: left;
      width: 13%;
      height: 100%;
      background-color: rgba(#0C2239, 0.9);
      box-sizing: border-box;
      overflow: hidden;

      .textdiv {
        margin: 2%;
        margin-top: 10%;
        font-size: .3rem;
        color: #FFFFFF;
        text-align: left;
        margin-left: 6%;
        height: 17%;

        .textmargin {
          margin-top: 7%;
          margin-bottom: 4%;
        }

        .smalltext {
          font-size: .2rem;
          float: left;
          width: 40%;
          color: #E6E7E8;
          margin-top: 3%;
        }

        .duandiv {
          font-size: .2rem;
          float: left;
          color: #E6E7E8;
          margin-top: 3%;
          height: 20%;
          width: 100%;
        }

        .duandiv1 {
          font-size: .2rem;
          float: left;
          color: #999;
          margin-top: 3%;
          height: 50%;
          width: 100%;

        }

        .smalltext1 {
          font-size: .2rem;
          color: #999;
          float: left;
          width: 60%;
          margin-top: 3%;
        }
      }

      .heightdiv {
        height: 25%;
      }


    }

    .pictureBox {
      float: left;
      width: 87%;
      height: 100%;
      overflow: hidden;
      background-color: #394852;

      .pictitle {
        width: 100%;
        height: 10%;
        text-align: left;
        display: flex;

        .picspan {
          margin: 1%;
          margin-left: 3%;
          font-size: 0.3rem;
          width: 90%;
        }

        .quit {
          float: right;
          margin-right: .4rem;
          color: white;
          font: 100 0.6rem/0.3rem Tahoma, Verdana, sans-serif;
          cursor: pointer;
          margin: 0.4rem 0.6rem 0.4rem 0.4rem;
        }

      }

      .picbox {
        width: 94%;
        height: 82%;
        margin-left: 3%;
        margin-right: 3%;
        background: #000000;

        .floorPicture {
          width: 100%;
          height: 100%;
          background-size: auto 100%;
          background-repeat: no-repeat;
          background-position: center center;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .floor1 {
          /* background-image: url(''); */
        }

        .sheImage {
          position: absolute;
          width: .3rem;
        }
      }

    }
  }

  .column {
    // width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
  }
</style>
