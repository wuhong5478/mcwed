<template>
  <div class="buildfloorInfo">
    <div class="buildfloorOption">
      <div class="textdiv">
        <div class="textmargin">
          <span>楼层信息</span>
        </div>
        <div class="heightdiv" >
          <span class="smalltext">楼层地址:</span>
          <span class="smalltext1">{{architectureName}}</span>
        </div>
        <div class="heightdiv" >
          <span class="smalltext">负责人:</span>
          <span class="smalltext1">{{personLiable}}</span>
        </div>
        <div class="heightdiv" >
          <span class="smalltext">联系电话:</span>
          <span class="smalltext1">{{telephone}}</span>
        </div>
      </div>
      <div style="margin-top: 10%;">
        <div class="line"></div>

        <!-- <ul>
          <li @click="active(0)" :class="{fontColor: (temp === 0)}" >
            <span >1F</span>
          </li>
           <li @click="active(1)" :class="{fontColor: (temp === 1)}">
            <span >2F</span>
          </li>
          <li @click="active(2)" :class="{fontColor: (temp === 2)}">
            <span >3F</span>
          </li>
          <li @click="active(3)" :class="{fontColor: (temp === 3)}">
            <span >4F</span>
          </li>
          <li @click="active(4)" :class="{fontColor: (temp === 4)}">
            <span >5F</span>
          </li>
          <li @click="active(5)" :class="{fontColor: (temp === 5)}">
            <span >6F</span>
          </li>
          <li @click="active(6)" :class="{fontColor: (temp === 6)}">
            <span >7F</span>
          </li>
        </ul> -->
      </div>
      <div class="deviceContext">
        <div class="Menu">
        <el-table
            ref="menuTable"
            :data="drawingList"
            highlight-current-row
            @current-change="Cos1"
            style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <div >{{scope.row.floor}}</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        </div>
    </div>
    <div class="buildpictureBox">
        <div class="pictitle"><span class="picspan">平面图纸</span><span class="closeIcon" @click="closebuild()"></span></div>
        <div class="buildpicbox">
          <div class="floorPicture" id="bigImage1">
            <div class="column">
              <img id="buildimage" style="height:100%;" />
              <!-- <img v-show="ifbuildsheImage" class="shebeiposition" id="buildshebei" :src="pointSrc" /> -->
              <img src="../../../../assets/img/yinhuandaping1.png" class="shebeiposition" v-for="(item, index) in imgPoint" :key="index" :style="item"/>
            </div>
					</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'buildsfloor',
  props: {
    buildsData: {
      Object,
      default: () => {}
    }
  },
  data() {
    return {
      cos1: 0,
      temp: 0,
      personLiable: '',
      telephone: '',
      architectureName: '',
      floor: '',
      file: '',
      drawingList: [],
      deviceName: '',
      productKey: '',
      taskWarningList: null,
      shefloor: [],
      toLeft: [],
      toTop: [],
      // pictureLength: [],
      // pictureWidth: [],
      pictureWidth: 0,
      pictureLength: 0,
      ifbuildsheImage: false,
      pointSrc: '../../../../../public/img/fire.png',
      imgPoint: []



    };
  },

  mounted() {
    this.$nextTick(() => {
      if (this.buildsData) this.geteveryImage(this.buildsData.architecture.id,this.buildsData.architecture.latitude,this.buildsData.architecture.longitude);
    });
  },
  watch: {
    buildsData(val) {
      if (val) {
        if (this.buildsData) {
          this.setData();
          this.geteveryImage(this.buildsData.architecture.id,this.buildsData.architecture.latitude,this.buildsData.architecture.longitude);
        }
      }
    }
  },
  methods: {
    Cos1(val) {
      console.log('louceng', val);
      this.cos1 = val;
      this.setImage(this.cos1);
    },
    active(val) {
      this.temp = val;
    },
    closebuild() {
      this.$parent.changebulidInfoShow();
    },
    setData() {
      /* this.drawingList = this.buildsData.drawingList; */
      // console.log(this.buildsData,'this.buildsData');
      this.drawingList = this.buildsData.drawingList;
      // console.log('this.drawingList', this.drawingList);
      /* for (let i = 0; i < this.drawingList.length; i++) {
        this.floor = this.drawingList[i].floor;
        console.log("this.floor",this.floor);
        this.file = 'yunqiApi/api/getPicture?picture=' + this.drawingList[i].file;

      } */
      this.personLiable = this.buildsData.architecture.personLiable;
      this.telephone = this.buildsData.architecture.telephone;
      this.architectureName = this.buildsData.architecture.architectureName;
      this.$refs.menuTable.setCurrentRow(this.drawingList[0]);
    },
    setImage(val) {
      // console.log('file', val);
      this.deviceName = val.deviceName;
      this.productKey = val.productKey;
      this.file = 'http://120.55.234.38/api/getPicture?picture=' + val.file;
      document.getElementById('buildimage').src = this.file;
      let img = new Image();
      img.src = this.file;
      img.onload = () => {
        this.pictureWidth = img.width;
        this.pictureLength = img.height;
        this.setPoint(val);
      }
    },
    /* getToLeftData(){
      console.log(this.deviceName,this.productKey)
      this.$services.get({
        type: 'LARGE',
        url: 'getDeviceByPoint',
        params: {
          deviceName: 'ZJHZ_PHCYY12',
          productKey: 'a1HtT9cVviI',
          type: 'map'
        }
      }).then(({ data }) => {
        console.log('getDevicebyPint',data);
        this.devicePoint = data.devicePoint;
        this.toLeft = data.devicePoint.toLeft;
        this.toTop = data.devicePoint.toTop;

      });
    }, */
    geteveryImage(buildNo, lat, lng) {
      this.$services.get({
        type: 'LARGE',
        url: 'getTaskWarnGetDataList',
        params: {
          id: buildNo,
          lat: lat,
          lng: lng,
          type: 'map'
        }
      }).then(({ data }) => {
        console.log('getTaskWarnGetDataList',data);
        this.shefloor = [];
        this.toLeft = [];
        this.toTop = [];
        this.taskWarningList = data.taskWarningList;
        for (let i = 0; i < data.taskWarningList.length; i++) {
          let place = [];
          place = data.taskWarningList[i].place.split('-');
          let placefloor = place[1];
          this.shefloor.push(placefloor);
          this.toLeft.push(data.taskWarningList[i].toLeft);
          this.toTop.push(data.taskWarningList[i].toTop);
        }
        if (this.taskWarningList.length > 0) this.setData();
      });
    },
    setPoint(val){
      this.imgPoint = [];
      for (let i = 0; i < this.shefloor.length; i ++) {
        if (val.floor === this.shefloor[i]) {
          let shiheight = document.getElementById('buildimage').clientHeight;
          let shiwidth = document.getElementById('buildimage').clientWidth;
          let bigwidth = document.getElementById('bigImage1').clientWidth;
          let pianyi = (bigwidth - shiwidth) / 2;
          this.ifbuildsheImage = true;
          let shiToTop = (parseInt(this.toTop[i]) / parseInt(this.pictureLength)) * parseInt(shiheight);
          let shiToLet = (parseInt(this.toLeft[i]) / parseInt(this.pictureWidth)) * parseInt(shiwidth);
          console.log(this.toTop[i], this.pictureLength, shiheight, shiToTop);
          console.log(this.toLeft[i], this.pictureWidth, shiwidth, shiToLet, pianyi);
          if (this.toTop[i] && this.toLeft[i])  this.imgPoint.push(`top:${shiToTop}px;left:${shiToLet + pianyi}px;`);
          // document.getElementById('buildshebei').style.top = shiToTop + 'px';
          // document.getElementById('buildshebei').style.left = (shiToLet + pianyi) + 'px';
        }
      }

    }
  }

};
</script>

<style lang="scss">
.buildfloorInfo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: #DCDFE1;
  border-width: 1px;
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .floorInfoTitle {
    width: 100%;
    height: .7rem;
    background-color: rgba(#0C2239, 1);
    border-bottom: 1px solid #DCDFE1;
    .titleText {
      display: block;
      float: left;
      line-height: .65rem;
      font-size: .4rem;
      font-weight: bold;
      padding-left: .6rem;
    }
    .closeIcon {
      width: .5rem;
      height: .5rem;
      display: block;
      float: right;
      background: url('../../../../assets/img/new/closeIcon.png');
      background-size: cover;
      margin-top: .06rem;
      margin-right: .2rem;
      cursor: pointer;
    }
  }
  .buildfloorOption {
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
      height:25%;
    }
    .line {
      height: 10%;
      width: 100%;
      border-bottom: solid;
      border-color: #999;
      border-width: 0.01rem;
    }
     .deviceContext {
        width: 100%;
        height: 78%;
        background-color: rgba(12, 34, 57, 0.9) !important;
        font-size: 0.3rem;
        .cell{
          line-height: 0.3rem;
          cursor: pointer;
        }
        .el-table{
          /* 表格字体颜色 */
          color:white;
          /* 表格边框颜色 */
          /* border: 0.5px solid #758a99; */
          // height: 500px;
          // height: 95%;
          }
         .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
            // color: red;
             background-color: rgb(88,100,108) ;
          }
          .el-table__header{
            .cell{
              margin-left: 0.3rem;
              margin-top: .15rem;
              color: #7F8A92;
              font-weight: 100;
              font-size: .28rem;
            }
          }
          /* 鼠标悬浮高亮样式 */
          .el-table tbody tr:hover>td { background-color: rgb(88,100,108) }
          /* 表格内背景颜色 */
          .el-table th, .el-table tr,.el-table td{
          border: 0;
          background-color: transparent;
          }
          .el-table__body{
            width: 100%;
          }
          .el-table__row{
            .cell{
              margin-left: 0.9rem;
              font-size: 0.33rem;
              font-weight: 100;
            }
          }
          /* 双数行背景颜色 */
          // .el-table--striped .el-table__body tr.el-table__row--striped td {
          // background-color:#fff;
          // background-color: rgba(0,0,0,0)
          // }
          /* 使表格背景透明 */
          .el-table th, .el-table tr {
          background-color: transparent;
          }
          .el-table, .el-table__expanded-cell {
             background-color: rgba(0,0,0,0)
          }
          /* 删除表格下横线 */
          .el-table::before {
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0px;
          }
          /* 表格表头字体颜色 */
          .el-table thead {
          color: white;
          font-weight: 500;
          background-color: rgba(0,0,0,0)
          }
        .Menu {
          float: left;
          width: 100%;
          height: 100%;
          // border-right: 0.01rem solid #7F8A92;
          .menuNum{
            margin-top: .1rem;
            color: #7F8A92;;
            font-weight: 100;
            font-size: .25rem;
            .left{
              width: 31%;
              border-right: 0.01rem solid #7F8A92;
              float: left;
            }
            .right{
              margin-left: 1.4rem;
            }
          }
        }
        .Text {
          float: right;
          width: 77.4%;
          height: 100%;
          .el-table__body{
            .cell{
              line-height: 0.5rem;
            }
          }
        }
       }
    li {
      height: 1rem;
      font-size: 0.3rem;
      cursor: pointer;
      color: #fff;
      position: relative;
      >span {
       line-height: 1rem;
      }
      .rightTriangle {
        position: absolute;
        top: 0.36rem;
        left: 1.8rem;
        background-size: cover;
        width: 0.3rem;
        height: 0.3rem;
        float: right;
      }
      .white {
      }
      .orange {
        background-size: cover;
      }
    }
   /* li:hover {
      color: #FFFFFF;
      background-color: rgba(#515E68, 1.0);
      .rightTriangle {
        position: absolute;
        top: 0.36rem;
        left: 1.8rem;
        background: url('../../../../assets/img/new/rightBlue.png');
        background-size: cover;
        width: 0.3rem;
        height: 0.3rem;
        float: right;
      }
    } */
    .fontColor {
      color: #FFFFFF;
      background-color: rgba(#515E68, 1.0);
    }
  }
  }
  .buildpictureBox {
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

        .closeIcon {
          width: .5rem;
          height: .5rem;
          display: block;
          float: right;
          background: url('../../../../assets/img/new/closeIcon.png');
          background-size: cover;
          margin-top: .2rem;
          margin-right: .2rem;
          cursor: pointer;
        }

      }

      .buildpicbox {
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
          .shebeiposition{
            position: absolute;
            width: .3rem;
          }
        }


      }

    }
</style>
