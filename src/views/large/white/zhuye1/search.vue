<template>
  <div class="search">
    <div class="sertitle">
      <div class="titsea">

        <el-button icon="el-icon-search" type="text" class="icon" @click="searchclick()"></el-button>
        <input class="textspan" id="sear" @keyup.enter="searchclick()" placeholder="这里模糊搜索" autocomplete="off"></input>
        <div class="quit" @click="cleanspan()" v-if="ifclick">×</div>
      </div>
      <div class="line"></div>
    </div>
    <div class="sercontent" v-if="!ifclick">
      <div class="col">
        <!-- <span class="xi" @click="nameclick('建筑')">建筑</span>
        <span class="xi" @click="nameclick('设备')">设备</span>
        <span class="xi" @click="nameclick('隐患')">隐患</span>
        <span class="xi" @click="nameclick('火警')">火警</span> -->
        <span  class="xi" @click="optionClick(1)" :class="{optionClick:isClick === 1}">建筑</span>
        <span  class="xi" @click="optionClick(2)" :class="{optionClick:isClick === 2}">设备</span>
        <span  class="xi" @click="optionClick(3)" :class="{optionClick:isClick === 3}">隐患</span>
        <span  class="xi" @click="optionClick(4)" :class="{optionClick:isClick === 4}">火警</span>
      </div>
      <div class="col1">
        <!-- <span class="xi1" @click="nameclick('应急资源')">应急资源</span>
        <span class="xi1" @click="nameclick('重点单位')">重点单位</span> -->
        <span class="xi1" @click="optionClick(5)" :class="{optionClick:isClick === 5}">应急资源</span>
        <span class="xi1" @click="optionClick(6)" :class="{optionClick:isClick === 6}">重点单位</span>
        <span class="xi1" @click="optionClick(7)" :class="{optionClick:isClick === 7}">社会单位</span>

      </div>
      <div class="col2">
        <span class="xi2">请先选择类型定向搜索，这会增加搜索精度</span>
      </div>
    </div>
    <div class="sercontent1" v-if="ifclick">
      <div class="mes">
        <span>共计获得{{msgLength}}条信息</span>
      </div>
      <div v-if="isClick===7">

        <div v-if="isshehuidetailClick">
          <div class="mes" :class="isactive === index ? 'addclass':''" v-for="(architectureList,index) in architectureList" :key="architectureList.id"
            @click="onflytoClick(index)">
            <span class="shehui">{{architectureList.parkName}}{{architectureList.architectureName}}</span>
          </div>
        </div>
        <div v-else>
          <div class="mes" :class="isactive === index ? 'addclass':''" v-for="(deptList,index) in deptList" :key="deptList.name"
            @click="onshehuiClick(index)">
            <span class="shehui">{{deptList.name}}</span>
          </div>
        </div>
      </div>
      <div v-else-if="isClick===1">
        <div class="mes" :class="isactive === index ? 'addclass':''" v-for="(architectureList,index) in architectureList" :key="architectureList.id"
          @click="onflytoClick(index)">
          <span class="shehui">{{architectureList.parkName}}{{architectureList.architectureName}}</span>
        </div>
      </div>
      <div v-else-if="isClick===2">
        <div class="mes" :class="isactive === index ? 'addclass':''" v-for="(importDeptList,index) in importDeptList"
          :key="importDeptList.id" @click="onflytoClick(index)">
          <span class="she">{{importDeptList.categoryName}}</span>
          <span class="lou">{{importDeptList.address}}</span>
        </div>
      </div>
      <div v-else-if="isClick===3">
        <div class="mes" :class="isactive === index ? 'addclass':''" v-for="(taskWarnList,index) in taskWarnList"
          :key="taskWarnList.id" @click="onflytoClick(index)">
          <span class="she">{{taskWarnList.hiddangerName}}</span>
          <span class="lou">{{taskWarnList.place}}</span>
        </div>
      </div>
      <div v-else-if="isClick===4">
        <div class="mes" :class="isactive === index ? 'addclass':''" v-for="(fireWarnList,index) in fireWarnList"
          :key="fireWarnList.id" @click="onflytoClick(index)">
          <span class="she">{{fireWarnList.eventname}}</span>
          <span class="lou">{{fireWarnList.address}}</span>
        </div>
      </div>
      <div v-else-if="isClick===6">
        <div class="mes" :class="isactive === index ? 'addclass':''" v-for="(importDeptList,index) in importDeptList" :key="importDeptList.id"
          @click="onflytoClick(index)">
          <span class="shehui">{{importDeptList.parkName}}</span>
        </div>
      </div>

      <div v-else>
        <div class="mes" :class="isactive === index ? 'addclass':''" v-for="(emeResourceList,index) in emeResourceList"
          :key="emeResourceList.resourcesName" @click="onEmeClick(index)">
          <span class="she">{{emeResourceList.resourcesName}}</span>
          <span class="lou">{{emeResourceList.resourcesAddress}}</span>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  props: {

  },
  data() {
    return {
      ifclick: false,
      emeResourceList: null,
      msgLength: 0,
      isactive: -1,
      isClick: 0,
      deptList: null,
      architectureList: null,
      isshehuidetailClick: false,
      taskWarnList: null,
      fireWarnList: null,
      importDeptList: null
    };
  },
  mounted() {
    this.cleanData();

  },
  methods: {
    optionClick(val) {
      this.isClick = val;

    },

    searchclick() {
      console.log('-------enter------');
      let sear = document.getElementById('sear').value;
      this.cleanData();
      if (sear) {
        if (this.isClick === 7) {
          // 社会单位
          this.isshehuidetailClick = false;
          this.getShehui(sear);

        }
        else if (this.isClick === 5) {
          // 设备搜索
          this.getData(sear);
        }
        else if (this.isClick === 1) {
          // 建筑搜索
          this.getjianzhu(sear);
        }
        else if (this.isClick === 2) {
          // shebei搜索
          this.getshebei(sear);
        }
        else if (this.isClick === 3) {
          // 隐患搜索
          this.getyinhuan(sear);
        }
        else if (this.isClick === 4) {
          // 火警搜索
          this.gethuojing(sear);
        }
        else if (this.isClick ===6) {
          // 重点单位
          this.getImportantdept(sear);
        }
        this.ifclick = true;
      }
      else {
        this.ifclick = false;
      }
      this.$emit('searchClick', this.ifclick);


    },
    cleanspan() {
      document.getElementById('sear').value = '';
      this.ifclick = false;
      if (this.isClick === 5 ) {
        this.$emit('cleanemeRouter');
      }
      this.isClick = 0;
    },
    /* nameclick(val) {
        document.getElementById('sear').value = val;
      }, */
    cleanData() {
      this.emeResourceList = null;
      this.msgLength = 0;
      this.deptList = null;
      this.architectureList = null;
      this.taskWarnList = null;
      this.importDeptList = null;
      this.fireWarnList = null;
      this.isactive = -1;

    },
    cleansear() {
      document.getElementById('sear').value = '';
      this.ifclick = false;
      this.isClick = 0;

    },
    getData(val) {
      this.cleanData();
      this.$services.get({
        type: 'LARGE',
        url: 'getSearchEmeReList',
        params: {
          name: val,
          type: 'map'
        }
      }).then(({
        data
      }) => {
        // console.log('getSearchEmeReList', data);
        this.emeResourceList = data.emeResourceList;
        this.msgLength = data.emeResourceList.length;

      });
    },
    getShehui(val) {
      this.cleanData();
      this.$services.get({
        type: 'LARGE',
        url: 'searchDeptList',
        params: {
          name: val,
          type: 'map'
        }
      }).then(({
        data
      }) => {
        // console.log('getSearchEmeReList', data);
        this.deptList = data.deptList;
        this.msgLength = data.deptList.length;
      });
    },
    getjianzhu(val) {
      this.cleanData();
      this.$services.get({
        type: 'LARGE',
        url: 'searchArctitureList',
        params: {
          name: val,
          type: 'map'
        }
      }).then(({
        data
      }) => {
        // console.log('getSearchEmeReList', data);
        this.architectureList = data.architectureList;
        this.msgLength = data.architectureList.length;
      });
    },
    getshebei(val) {
      this.cleanData();
      this.$services.get({
        type: 'LARGE',
        url: 'searchDeviceList',
        params: {
          name: val,
          type: 'map'
        }
      }).then(({
        data
      }) => {
        // console.log('getSearchEmeReList', data);
        this.importDeptList = data.importDeptList;
        this.msgLength = data.importDeptList.length;
      });
    },

    getyinhuan(val) {
      this.cleanData();
      this.$services.get({
        type: 'LARGE',
        url: 'searchTaskWarnList',
        params: {
          name: val,
          type: 'map'
        }
      }).then(({
        data
      }) => {
        console.log('getyinhuan', data);
        this.taskWarnList = data.taskWarnList;
        this.msgLength = data.taskWarnList.length;
      });
    },
    gethuojing(val) {
      this.cleanData();
      this.$services.get({
        type: 'LARGE',
        url: 'searchFireWarnList',
        params: {
          name: val,
          type: 'map'
        }
      }).then(({
        data
      }) => {
        // console.log('getSearchEmeReList', data);
        this.fireWarnList = data.fireWarnList;
        this.msgLength = data.fireWarnList.length;
      });
    },
    getImportantdept(val) {
      this.cleanData();
      this.$services.get({
        type: 'LARGE',
        url: 'searchImportDeptList',
        params: {
          name: val,
          type: 'map'
        }
      }).then(({
        data
      }) => {
        // console.log('getSearchEmeReList', data);
        this.importDeptList = data.importDeptList;
        this.msgLength = data.importDeptList.length;
      });
    },
    onshehuiClick(val) {
      this.isactive = val;
      this.isshehuidetailClick = true;
      document.getElementById('sear').value = this.deptList[val].name;
      let id = this.deptList[val].id;
      this.$services.get({
        type: 'LARGE',
        url: 'searchArchListByDeptId',
        params: {
          id,
          type: 'map'
        }
      }).then(({
        data
      }) => {
        // console.log('getSearchEmeReList', data);
        this.architectureList = data.architectureList;
        this.msgLength = data.architectureList.length;
      });
    },
    onflytoClick(val) {
      this.isactive = val;
      if(this.isClick === 7) {
        let emelat = this.architectureList[val].latitude;
        let emelon = this.architectureList[val].longitude;
        this.$emit('shehuifly', {
          lat: emelat,
          lng: emelon
        });
      } else if(this.isClick === 1) {
        let emelat = this.architectureList[val].latitude;
        let emelon = this.architectureList[val].longitude;
        this.$emit('shehuifly', {
          lat: emelat,
          lng: emelon
        });
      } else if (this.isClick === 2) {
        let emelat = this.importDeptList[val].latitude;
        let emelon = this.importDeptList[val].longitude;
        this.$emit('shehuifly', {
          lat: emelat,
          lng: emelon
        });
      } else if (this.isClick === 3) {
        let emelat = this.taskWarnList[val].latitude;
        let emelon = this.taskWarnList[val].longitude;
        this.$emit('shehuifly', {
          lat: emelat,
          lng: emelon
        });
      }
      else if (this.isClick === 4) {
        let emelat = this.fireWarnList[val].lat;
        let emelon = this.fireWarnList[val].lng;
        this.$emit('shehuifly', {
          lat: emelat,
          lng: emelon
        });
      }
      else if (this.isClick === 6) {
        let emelat = this.importDeptList[val].latitude;
        let emelon = this.importDeptList[val].longitude;
        this.$emit('shehuifly', {
          lat: emelat,
          lng: emelon
        });
      }



    },
    onEmeClick(val) {
      this.isactive = val;
      let emelat = this.emeResourceList[val].latitude;
      let emelon = this.emeResourceList[val].longitude;
      this.$emit('emelatlon', {
        lat: emelat,
        lng: emelon
      });
    }

  },
  watch: {

  }
};
</script>

<style lang="scss">
  .addclass{
    background: #4E5B64;
  }
  .search {
    width: 100%;
    height: 100%;
    background: #3A4853;

    .sertitle {
      width: 100%;
      height: 15%;
      font-size: 0.25rem;
      color: #7F8A92;

      .titsea {
        height: 99%;
        display: flex;
        .quit {
          float: right;
          font: 10 0.3rem/0.8rem Tahoma,Verdana,sans-serif;
        }
      }

      .icon {
        margin-left: 5%;
        height: 100%;
        width: 10%;
      }

      .textspan {
        height: 100%;
        width: 85%;
        color: #7F8A92;
        background: #3A4853;
        border: 0;
        outline: none;
      }

      .line {
        margin-left: 5%;
        width: 90%;
        height: 1%;
        border-bottom: 1px solid #7F8A92;
      }
    }

    .sercontent {
      width: 100%;
      height: 85%;
      font-size: 0.3rem;

      .col {
        width: 100%;
        height: 12%;
        display: flex;
        margin-left: 8%;
        margin-top: 5%;

        .xi {
          text-align: left;
          width: 25%;
          height: 20%;
          color: #DCDFE1;
          font-size: 0.3rem;
        }

        .xi:hover {
          cursor: pointer;
        }
      }

      .col1 {
        width: 100%;
        height: 12%;
        display: flex;
        margin-left: 8%;

        .xi1 {
          width: 30%;
          height: 20%;
          text-align: left;
          color: #DCDFE1;
          font-size: 0.3rem;
        }

        .xi1:hover {
          cursor: pointer;
        }
      }

      .col2 {
        width: 100%;
        height: 12%;
        display: flex;
        margin-left: 8%;
        margin-top: 3%;

        .xi2 {
          width: 100%;
          height: 20%;
          text-align: left;
          color: #7F8A92;
          font-size: 0.25rem;
        }
      }

      .optionClick {
        color: #3196FA !important;
        font-weight: 700 !important;
      }
    }

    .sercontent1 {
      width: 100%;
      height: 80%;
      font-size: 0.25rem;
      margin-top: 5%;
      overflow: auto;

      .mes {
        width: 88%;
        height: 10%;
        display: flex;
        margin-left: 8%;
        font-size: 0.25rem;
        cursor: pointer;

        .isactive {
          background-color: #515E68;
        }

        .shehui {
          width: 100%;
          height: 10%;
          line-height: 0.5rem;
          text-align: left;
          color: #DCDFE1;
        }

        .she {
          width: 50%;
          height: 10%;
          line-height: 0.5rem;
          text-align: left;
          color: #DCDFE1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .lou {
          width: 50%;
          height: 10%;
          line-height: 0.5rem;
          text-align: right;
          color: #7F8A92;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
