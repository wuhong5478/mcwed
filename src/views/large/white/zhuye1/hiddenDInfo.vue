<template>
  <div class="hiddenDInfo">
    <div class="hiddenDHead">
      <div class="theTitle">
        <div class="title1">隐患列表</div>
        <div class="title2">{{buildName[0]}}</div>
      </div>
      <div class="quit" @click="closeHiddenDInfo()">×</div>
    </div>
    <div class="hiddenDContext">
      <div class="Menu">
        <el-table
          ref="menuTable"
          :data="menuData"
          highlight-current-row
          :row-class-name="tableRowClassName"
          @current-change="Cos1"
          style="width: 100%">
          <el-table-column
            prop="type">
            <template slot-scope="scope">
              <div>
                <div >{{scope.row.type}}</div>
              </div>
              <div class="subTitle">
                <div>{{scope.row.place}}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content Text">
          <div class="row">
            <div class="block">
              <span class="smallTitle">隐患名称</span>
              <span class="smallText">{{textData[index].name}}</span>
            </div>
          </div>
          <div class="row">
            <div class="block">
              <span class="smallTitle">隐患地址</span>
              <span class="smallText">{{textData[index].place}}</span>
            </div>
            <div class="block">
              <span class="smallTitle">隐患等级</span>
              <span class="smallText">{{textData[index].level}}</span>
            </div>
            <div class="block">
              <span class="smallTitle">隐患类型</span>
              <span class="smallText">{{textData[index].type}}</span>
            </div>
          </div>
          <div class="row">
            <div class="block">
              <span class="smallTitle">隐患描述</span>
              <span class="smallText">{{textData[index].detail}}</span>
            </div>
          </div>
          <div class="row">
            <div class="block">
              <span class="smallTitle">照片</span>
              <img :src="textData[index].livePhoto" v-if="textData[index].livePhoto" />
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hiddenDInfo',
  data() {
    return {
      cos: 0,
      Data: [],
      index: 0,
      buildName: [],
      menuData: [
        {
          type: '暂无数据',
          place: ''
        }
      ],
      textData: [
        {
          name: '暂无数据',
          place: '暂无数据',
          level: '暂无数据',
          type: '暂无数据',
          detail: '暂无数据'
        }
      ]
    };
  },
  mounted() {
    this.$refs.menuTable.setCurrentRow(this.menuData[0]);
  },
  methods: {
    getData(list) {
      // console.log('----------buildInfo----------', list);
      // this.menuData = [];
      // this.textData = [];
      if (list) {
        this.$services.get({
          type: 'LARGE',
          url: 'getTaskWarnGetDataList',
          params: {
            // id: '35',
            // lat: '30.128077',
            // lng: '120.082088',
            id: list.id,
            lat: list.latitude,
            lng: list.longitude,
            type: 'map'
          }
        }).then(({ data }) => {
          // console.log('-------------getTaskWarnGetData---------------', data);
          let menuData = [];
          let textData = [];
          data.taskWarningList.forEach((k, i) => {
            console.log('-------------livePhoto---------------', k.livePhoto);
            let addr = k.place.split('-');
            if (i === 0) {
              this.buildName.push(addr[0]);
            }
            menuData.push({
              type: k.hiddangerName,
              place: addr[0] + addr[1]
            });
            let url = '';
            if (k.livePhoto && k.livePhoto.indexOf('png') !== -1 || k.livePhoto && k.livePhoto.indexOf('jpg') !== -1) {
              url = 'http://120.55.234.38/api/getPicture?picture=' + k.livePhoto;
            }
            else if (k.livePhoto) {
              this.$services.get({
                type: 'LARGE',
                url: 'getiotpictureUrl',
                params: {
                  pictureId: k.livePhoto,
                  deviceName: k.equipment,
                  productKey: k.productKey,
                  type: 1
                }
              }).then(({ data }) => {
                url = data;
              });
            }
            textData.push({
              name: k.hiddangerName,
              place: k.place,
              level: k.level,
              type: k.type,
              detail: k.hiddenDescript,
              livePhoto: k.livePhoto ? url : null
            });
          });
          this.menuData = menuData;
          this.textData = textData;
          this.$refs.menuTable.setCurrentRow(this.menuData[0]);
        });
      }
    },
    closeHiddenDInfo() {
      this.$parent.changeHiddenDInfoShow('');
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row,自动添加行号,便于菜单与内容联动
      row.index = rowIndex;
    },
    Cos1(val) {
      // console.log(val);
      if (val && val.index != null) {
        this.index = val.index;
      }

    }
  }
};
</script>

<style lang="scss">
.hiddenDInfo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: rgba(#000, 0.3);
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .hiddenDHead{
    height: 9%;
    background-image: -webkit-linear-gradient(left, rgb(11,35,56), rgb(56,70,83));
    border-bottom: 0.01rem solid #7F8A92;
    .quit{
      float: right;
      color: white;
      font: 100 0.6rem/0.3rem Tahoma,Verdana,sans-serif;
      cursor: pointer;
      margin: 0.25rem 0.5rem 0rem 0rem;
    }
    .theTitle{
      float: left;
      display: flex;
      width: 80%;
      flex-direction: row;
      justify-content: left;
      .title1{
        margin-left: .5rem;
        padding-top: .15rem;
        font-size: .35rem;
        color: white;
      }
      .title2{
        transition: all .25s ease-in-out;
        margin-left: 0.3rem;
        font-size: 0.3rem;
        font-weight: 100;
        color: #DCDFE1;
        padding-top: 0.22rem;
      }
    }
  }
  .hiddenDContext {
    width: 100%;
    height: 91%;
    background-color: rgb(57,72,84) !important;
    font-size: 0.3rem;
    text-align: left;
    display: flex;
    flex-direction: row;
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
          padding-top: .05rem;
          margin-left: 0.3rem;
          font-size: 0.3rem;
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
      max-height: 100%;
      overflow: auto;
      float: left;
      width: 22.5%;
      height: 100%;
      border-right: 0.01rem solid #7F8A92;
      .el-table__header-wrapper{
        height: 0rem;
      }
      .subTitle{
        margin-top: .1rem;
        color: #7F8A92;;
        font-weight: 100;
        font-size: .25rem;
      }
    }
    .Text {
      max-height: 100%;
      overflow: auto;
      width: 77.4%;
      height: 95%;
      font-size: 0.3rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      padding-top: 0.3rem !important;
      .row{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: left;
        .block{
          width: 100%;
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
          img{
            width: 100%;
            height: 5rem;
          }
        }
      }
    }
  }
}
</style>
