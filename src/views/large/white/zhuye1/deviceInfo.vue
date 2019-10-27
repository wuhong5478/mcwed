<template>
  <div class="deviceInfo">
    <div class="deviceHead">
      <div class="theTitle">
        <div class="title1">设备列表</div>
        <div class="title2">{{districtName}}{{building}}</div>
      </div>
      <div class="quit" @click="closeDeviceInfo()">×</div>
    </div>
    <div class="deviceContext">
      <div class="Menu">
        <el-table
          ref="menuTable"
          :data= "deviceCategoryList"
          highlight-current-row
          @current-change="Cos1"
          style="width: 100%">
          <el-table-column
            prop="type"
            label="设备类型">
            <template slot-scope="scope">
              <div>
                <div >{{scope.row.categoryName}}</div>
              </div>
              <div class="menuNum">
                <div class="left">在线  {{scope.row.onLineNum}}</div>
                <div class="right">总数  {{scope.row.totalNum}}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="Text">
        <el-table
          ref="textTable"
          :data="detaildata"
          :cell-class-name="tableCellClassName"
          highlight-current-row
          @current-change="Cos2"
          style="width: 100%; height: 100%; overflow: auto;">
          <el-table-column
            prop="productName"
            label="设备名称"
            min-width="40%">
          </el-table-column>
          <el-table-column
            prop="address"
            label="设备位置">
          </el-table-column>
          <el-table-column
            label="状态"
            min-width="15%">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">在线</span>
              <span v-else-if="scope.row.status === 0">离线</span>
              <span v-else>未激活</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deviceInfo',
  props: {
    isbeiData: {
      Object,
      default: () => {}
    }
  },
  data() {
    return {
      cos1: 0,
      cos2: 0,
      detaildata: [],
      deviceCategoryList: [],
      deviceList: [],
      Data: [],
      categoryId: '',
      categoryName: '',
      building: '',
      districtName: '',
      onLineNum: '',
      totalNum: '',
      menuData: [
        {
          id: 0,
          type: '室内消火栓水压检测仪',
          onLine: 16,
          all: 16
        },
        {
          id: 1,
          type: '喷淋末端水压检测仪',
          onLine: 16,
          all: 16
        },
        {
          id: 2,
          type: '消防池水位检测仪',
          onLine: 16,
          all: 16
        },
        {
          id: 3,
          type: '云栖小镇智慧消防网关',
          onLine: 16,
          all: 16
        },
        {
          id: 4,
          type: '独立式可燃气体探测器',
          onLine: 16,
          all: 16
        }, {
          id: 5,
          type: '独立式烟感探测器',
          onLine: 16,
          all: 16
        }
      ],
      textData: [
        {
          id: 0,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '在线'
        },
        {
          id: 1,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '离线'
        },
        {
          id: 2,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '离线'
        },
        {
          id: 3,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '在线'
        },
        {
          id: 4,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '在线'
        },
        {
          id: 5,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '在线'
        },
        {
          id: 6,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '在线'
        },
        {
          id: 7,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '离线'
        },
        {
          id: 8,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '离线'
        },
        {
          id: 9,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '在线'
        },
        {
          id: 10,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '离线'
        },
        {
          id: 11,
          name: '独立式烟感探测器',
          place: '7号楼-东侧中大配电房',
          status: '在线'
        }
      ]
    };
  },
  mounted() {

    // this.$refs.textTable.setCurrentRow(this.Data[this.cos1][0]);
    /* this.$nextTick(() => {
      this.getData();
    }); */

  },
  watch: {
    isbeiData(val) {
      // console.log(val);
      this.getData();
    }
  },
  methods: {
    closeDeviceInfo() {
      this.$parent.changeDeviceInfoShow();
    },
    tableCellClassName({ row, columnIndex }) {
      // console.log(columnIndex);
      if (row.status === 0 && columnIndex === 2) {
        return 'offLine-row';
      }
    },
    Cos1(val) {
      this.categoryId = val && val.categoryId ? val.categoryId : '';
      this.building = val && val.building ? val.building : '';
      this.districtName = val && val.districtName ? val.districtName : '';
      this.getData1();
    },
    Cos2(val) {
      if (val !== null) {
        this.$parent.changeDetailInfoShow(val);
      }
    },
    getData() {
      this.$services.get({
        type: 'LARGE',
        url: 'getDeviceCategoryGetData',
        params: {
          lat: this.isbeiData.latitude,
          lng: this.isbeiData.longitude,
          type: 'map'
        }
      }).then(({ data }) => {
        // console.log('-------------getDeviceCategoryGetData---------------', data);
        this.deviceCategoryList = data && data.deviceCategoryList ? data.deviceCategoryList : [];
        if (this.deviceCategoryList.length > 0) this.$refs.menuTable.setCurrentRow(this.deviceCategoryList[0]);
      });
    },
    getData1() {
      this.$services.get({
        type: 'LARGE',
        url: 'getDeviceListByCategory',
        params: {
          building: this.building,
          categoryId: this.categoryId,
          districtName: this.districtName,
          type: 'map'
        }
      }).then(({ data }) => {
        // console.log('-------------getDeviceListByCategory---------------', data);
        this.detaildata = data && data.deviceList ? data.deviceList : [];
      });
    }
  }
};
</script>

<style lang="scss">
.deviceInfo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: rgba(#000, 0.3);
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .deviceHead{
    height: 9%;
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
        font-size: .4rem;
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
  .deviceContext {
    width: 100%;
    height: 91%;
    background-color: rgb(57,72,84) !important;
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
          margin-left: 0.3rem;
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
      width: 22.5%;
      height: 100%;
      border-right: 0.01rem solid #7F8A92;
      overflow: auto;
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
  .offLine-row{
    color: #7F8A92;
  }
}
</style>
