<template>
  <div class="videoList">
    <div class="title tittle1">
      <span>视频列表</span>
      <div class="Button-show" @click="clickEvent">
        <div class="text">{{tip}}</div>
        <div class="Button" :class="{rer:!reverse}"></div>
      </div>
    </div>
    <div class="videoList-content" :class="{show1:reverse}">
      <div class="bottom" :class="{show2:reverse}">
        <el-table
          :data="VideoList"
          :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column>
            <template slot-scope="scope">
              <div :class="{videoListTable: true, toFixed: scope.row.toFixed}" @mousedown="mousedown($event, scope.row.toFixed)" @mouseup="mouseup(scope.row.toFixed)" @mousemove="mousemove($event, scope.row.toFixed)">
                <div class="videoTitle">
                  <span>{{scope.row.address}}</span>
                  <div class="fullButton" @click="Cos(scope.$index)" v-if="!scope.row.toFixed"></div>
                  <div class="quit" @click="handleClose(scope.$index)" v-else>×</div>
                </div>
                <!-- <div class="videoIcon" @click="getData()"></div> -->
                <vedioplayer class="theVideo" :videoUrl="scope.row.url" :id="'list' + scope.$index" :obj="scope.row"></vedioplayer>
                <div class="line" :class="{noLine:scope.row.index === maxIndex}"></div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
 
<script>
import vedioplayer from '../zhuye1/vedioplayer.vue';
export default {
  name: 'videoList',
  props: {
    yjProductkey: {
      String,
      default: ''
    },
    yjDeviceName: {
      String,
      default: ''
    }
  },
  components: {
    vedioplayer
  },
  data() {
    return {
      tip: '收起',
      VideoList: [
        // {
        //   address:'',
        //   url:''
        // }
      ],
      video: {
        address: '',
        url: ''
      },
      maxIndex: 0,
      reverse: false,
      timer: null,
      draggable: false,
      offsetX: 0,
      offsetY: 0
    };
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.getData();
      this.timer = setInterval(() => {
        this.getData();
      }, 30 * 1000);
    });
  },
  methods: {
    handleClose(index) {
      this.VideoList[index].toFixed = false;
    },
    mousedown(event, toFixed) {
      if (!toFixed) return;
      let obj = document.querySelector('.toFixed');
      this.draggable = true;
      this.offsetY = event.clientY - obj.offsetTop;
      this.offsetX = event.clientX - obj.offsetLeft;
    },
    mouseup(toFixed) {
      if (!toFixed) return;
      this.draggable = false;
    },
    mousemove(event, toFixed) {
      if (!toFixed) return;
      if (this.draggable){
        let obj = document.querySelector('.toFixed');
        obj.style.left = event.clientX - this.offsetX + "px";
        obj.style.top = event.clientY - this.offsetY + "px";
      }
    },
    clickEvent() {
      if(this.reverse === true) {
        this.tip = '收起';
      }
      else {
        this.tip = '展开';
      }
      this.reverse = !this.reverse;
      
    },
    closeAllVideo() {
      console.log("待关闭视频流数: ",this.VideoList.length);
      for (let i = 0; i < this.VideoList.length; i++) {
        console.log("第",i+1,"个视频:","\ndeviceName: ",this.VideoList[i].deviceName,"\nproductKey: ",this.VideoList[i].productKey);
        this.$services.get({
          type: 'LARGE',
          url: 'videoShowStopStream',
          params: {
            deviceName: this.VideoList[i].deviceName,
            productKey: this.VideoList[i].productKey,
            type: 'videoShow'
          }
        }).then(({ data }) => {
          console.log("第",i+1,"个视频: ",data.data);
        });
      }
    },
    Cos(index) {
      console.log("点击视频!", index);
      this.VideoList[index].toFixed = true;
      this.$nextTick(() => {
        let obj = document.querySelector('.toFixed');
        obj.style.left = "calc(50% - 8rem)";
        obj.style.top = "calc(50% - 7rem)";
      });
      // this.$services.get({ // 点击视频放大重新请求用新路径防止路径过期
      //   type: 'LARGE',
      //   url: 'videoShowGetData',
      //   params: {
      //     deviceName: val.deviceName,
      //     productKey: val.productKey,
      //     type: 'videoShow'
      //   }
      // }).then(({ data }) => {
      //   this.$parent.setVideoUrl(data.video.url,val.deviceName,val.productKey);
      // });
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row,自动添加行号,便于菜单与内容联动
      row.index = rowIndex;
    },
    getData() {
      let params = {};
      if (this.yjProductkey && this.yjDeviceName) {
        params = {
          productKey: this.yjProductkey,
          deviceName: this.yjDeviceName,
          type: 'videoShowList'
        }
      }
      else {
        params = {
          type: 'videoShowList'
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'videoShowList',
        params
      }).then(({ data }) => {
        console.log("视频列表: ",data);
        // this.video.address = data.data[0].address;
        // this.video.url = data.data[0].url;
        // this.VideoList[0] = this.video;
        // this.VideoList = data.data;
        for (let i = 0; i < this.VideoList.length; i++) {
          let k = this.VideoList[i];
          let obj = data.data.find(j => k.deviceName === j.deviceName);
          if (!obj) {
            return;
            this.VideoList.splice(i, 1);
            i--;
          }
        }
        data.data.length > 0 && data.data.forEach(k => {
          let obj = this.VideoList.find(j => k.deviceName === j.deviceName);
          if (!obj && obj.url !== null) {
            k.toFixed = false;
            this.VideoList.push(k);
          }
        });
        // for (let i = 0; i < data.data.length; i++) {
        //   this.video.address = data.data[i].address;
        //   this.video.url = data.data[i].url;
        //   this.VideoList.push(this.video);
        // }
        // this.VideoList.push({
        //   address: '测试',
        //   url: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc'
        // });
        // this.VideoList.push(this.video);
        // this.VideoList.push(this.video);
        // this.VideoList.push(this.video);
        // this.VideoList.push(this.video);
        // this.$parent.setVideoUrl(data.data[0].url);
        this.maxIndex = this.VideoList.length - 1;
      });
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.closeAllVideo();
  }
};
</script>
 
<style lang="scss">
  .videoList {
    width: 100%;
    height: auto;
    .toFixed{
      position: fixed;
      left: calc(50% - 8rem);
      top: calc(50% - 7rem);
      width: 16rem;
      height: 14rem;
      background: rgb(57,72,84);
      z-index: 200;
      .videoTitle{
        width: 100%;
        height: 1rem!important;
        line-height: 1rem!important;
        font-size: .33rem!important;
        background-image: -webkit-linear-gradient(left, #0A2138, #3A4754);
        cursor: move;
      }
      .theVideo{
        height: 13rem!important;
      }
      .player{
        margin-top: 0!important;
      }
      .fullButton{
        margin-right: 0.2rem;
      }
    }
    .vjs-big-play-button{
      display: none!important;
    }
    .tittle1{
      display: flex;
      flex-direction: row;
    }
    .Button-show {
      position: absolute;
      right: 0.1rem;
      top: 0.25rem;
      cursor: pointer;
      /* padding: 0rem 0; */
      transition:  all 0.5s;
      line-height: 0.4rem;
      .text {
        font-size: 0.1rem;
        float: left;
      }
      .Button {
        float: left;
        height: 0.4rem;
        width: 0.4rem;
        background: url('../../../../assets/img/new/show.png') no-repeat center center;
        background-size: 100% 100%;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
      }
      .rer {
        transform: rotate(-180deg);
        transition: all 0.5s;
      }
    }
    .videoList-content {
      // display: flex;
      // flex-direction: column;
      // justify-content: space-around;
      background: rgba(58, 72, 84, 0.9);
      transition:  all 0.5s;
      position: relative;
      overflow: auto;
      .top {
        height: 2.7rem;
        width: calc(100% - .32rem);
        padding: .28rem .1rem;
        box-sizing: border-box;
        position: absolute;
        top: .2rem;
        >div {
          height: .51rem;
          width: calc(100% - .6rem);
          margin: .15rem auto;
          display: flex;
          box-sizing: border-box;
          >span {
            display: inline-block;
            height: 100%;
              line-height: .31rem;
            text-align: left;
            // color: #0096ff;
            background-size: 100% 100%;
            font-size: .34rem;
          }
          .left {
            width: .51rem;
            background: url('../../../../assets/img/new/huozai_1.png') no-repeat center center;
            padding: 0 .45rem;
          }
          .center {
            width: 1.65rem;
          }
          .right {
            width: 1.1rem;
            // color: #ffd200;
          }
          .fireTwo {
            background: url('../../../../assets/img/new/huozai_2.png') no-repeat center center;
          }
          .fireThree {
            background: url('../../../../assets/img/new/huozai_3.png') no-repeat center center;
          }
        }
      }
      .bottom {
        transition:  all 0.5s;
        max-height:  11.75rem;
        // overflow: auto;
        .line{
          position: absolute;
          bottom: .1rem;
          width: 88%;
          border-bottom: 0.01rem solid #7F8A92;
        }
        .videoTitle{
          width: 100%;
          height: .3rem;
          line-height: .3rem;
          display: flex;
          justify-content: space-between;
        }
        .theVideo{
          // display: inline-block;
          // display: none;
          // pointer-events: none;
          width: 100%;
          height: 1.7rem;
          // padding-top: 0.5rem !important;
          #player{
            margin-top: 0;
            height: 100%;
          }
          .video-player{
            height: 100%;
          }
        }
        .cell{
          line-height: 0.3rem;
          padding-bottom: .2rem;
          // cursor: pointer;
          .player{
            padding: .1rem;
            margin-top: 0.1rem;
          }
          span{
            float: left;
            padding-left: 0.3rem;
          }
        }
        .el-table{
          /* 表格字体颜色 */
          color:white;
          max-height: 100%;
          overflow: auto;
          /* 表格边框颜色 */
          /* border: 0.5px solid #758a99; */
          // height: 500px;
          // height: 95%;
          }
        .el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td {
          // color: red;
          background-color: rgb(88,100,108) ;
        }
        .el-table__header-wrapper{
          height: 0rem;
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
            font-size: 0.23rem;
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
      }
    }
  }
  .noLine{
    border-bottom: 0rem solid #7F8A92 !important;
  }
  .show2 {
    height: 0rem!important;
    padding-top: 0rem !important;
    padding-bottom: 0rem !important;
    transition:  all 0.5s;
  }
  .videoIcon{
    height: 1.9rem;
    margin-top: 0.1rem;
    margin-right: 0.4rem;
    margin-left: 0.4rem;
    background: url('../../../../assets/img/new/videoIcon.png') no-repeat center center;
    cursor: pointer;
    background-size: 100% 100%;
  }
  .fullButton{
    float: left;
    height: 100%;
    width: 0.25rem;
    /* right: 0.1rem; */
    margin-top: 0.05rem;
    background: url('../../../../assets/img/new/full.png') no-repeat center center;
    background-size: 100% auto;
    -webkit-transition: all 1s;
    transition: all 1s;
    cursor: pointer;
  }
  .quit{
    float:right;
    width: 2%;
    margin-right:.4rem;
    color: white;
    font: 100 0.6rem/1rem Tahoma,Verdana,sans-serif;
    cursor: pointer;
  }
  .fullButton:hover{
    transform:scale(1.2,1.2);
  }
</style>