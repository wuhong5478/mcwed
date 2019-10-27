<template>
  <div class="search">
    <div class="sertitle">
      <div class="titsea">
        <el-button icon="el-icon-search" type="text" class="icon" @click="searchclick()"></el-button>
        <input class="textspan" id="sear" @click="searchclick1()" placeholder="这里模糊搜索" autocomplete="off"/>
      </div>
      <div class="line"></div>
    </div>
    <div class="serContent" v-if="!ifclick">
      <div class="row">
        <div class="block">
          <!-- <div class="littleBlock" @click="changeHeatLayer()"> -->
          <div class="littleBlock">
            <!-- <div class="icon"></div>
            <span class="name">隐患热力图</span> -->
            <el-checkbox v-model="a" @change="changeHeatLayer(1)" :disabled="isHeatSet">区域火灾隐患热力图</el-checkbox>
            <el-checkbox v-model="b" @change="changeHeatLayer(2)" :disabled="isHeatSet">小镇火灾隐患热力图</el-checkbox>
          </div>
        </div>
      </div>
      <div class="col2">
        <span class="xi2">点击可以观看其他类型分布图</span>
      </div>
    </div>
    <div class="serContent1" v-if="ifclick">
      <div class="mes">
        <span>共计获得127条信息</span>
      </div>
      <div class="mes">
        <span class= "she">独立式感烟探测器</span>
        <span class= "lou">国际会展中心一期二楼103</span>
      </div>
      <div class="mes">
        <span class= "she">独立式感烟探测器</span>
        <span class= "lou">中大产业园几号楼几层</span>
      </div>
      <div class="mes">
        <span class= "she">独立式感烟探测器</span>
        <span class= "lou">艺展中心一期几层</span>
      </div>
      <div class="mes">
        <span class= "she">独立式感烟探测器</span>
        <span class= "lou">云栖小镇管委会几层</span>
      </div>
      <div class="mes">
        <span class= "she">独立式感烟探测器</span>
        <span class= "lou">云栖小镇管委会几层</span>
      </div>
      <div class="mes">
        <span class= "she">独立式感烟探测器</span>
        <span class= "lou">云栖小镇管委会几层</span>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'search',
  props: {
    isHeatSet: {
      Boolean,
      default: false
    }
  },
  data() {
    return {
      ifclick: false,
      a: false,
      b: false,
      c: false,
      d: false,
      select: -1
    };
  },
  mounted() {
 
  },
  methods: {
    changeHeatLayer(val) {
      if ( val === this.select) {
        this.select = -1;
      }
      else {
        this.select = val;
      }
      if (val === 1) {
        this.b = false;
      }
      else if (val === 2) {
        this.a = false;
      }
      this.$parent.changeHeatLayer(this.select);
    },
    searchclick() {
      let sear = document.getElementById('sear').value;
      if (sear) {
        this.ifclick = true;
      }
      else {
        this.ifclick = false;
      }
      this.$emit('searchClick', this.ifclick);
    },
    searchclick1() {
      // this.$parent.changePicSearchShow();
      this.$parent.topclick(true);
    },
    nameclick(val) {
      document.getElementById('sear').value = val;
    }
 
  },
  watch: {
 
  }
};
</script>
 
<style lang="scss">
  .el-checkbox:last-child {
    margin-right: 30px !important;
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
      .titsea{
        height: 99%;
        display: flex;
      }
      .icon{
        margin-left: 5%;
        height: 100%;
        width: 10%;
      }
      .textspan {
        height: 100%;
        width: 85%;
        color: #DCDFE1 !important;
        background: #3A4853;
        border:0;
        outline:none;
      }
 
      .line {
        margin-left: 5%;
        width: 90%;
        height: 1%;
        border-bottom: 1px solid #7F8A92;
      }
    }
    .serContent {
      height: 85%;
      width: calc(100% - .76rem);
      height: calc(100% - 1.04rem);
      padding: .46rem .38rem;
      font-size: .27rem;
      .row{
        width: 115%;
        display: flex;
        flex-direction: row;
        justify-content: left;
        .block{
          // width: 100%;
          display: flex;
          padding-right: 0.9rem;
          flex-direction: row;
          padding-bottom: .3rem;
          .littleBlock{
            display: flex;
            flex-direction: column;
            // cursor: pointer;
            .el-checkbox{
              color: white;
              padding-bottom: 0.2rem;
            }
            .el-checkbox__input.is-disabled+span.el-checkbox__label {
              color: #606266 !important;
            }
          }
          >span{
            line-height: 0.5rem;
            text-align: left;
          }
          .icon{
            width: 0.2rem;
            height: 0.2rem;
            background: #DCDFE1;
            margin: 0.1rem 0.1rem;
          }
        }
      }
      .col{
        width:100%;
        height:12%;
        display: flex;
        margin-left: 8%;
        margin-top: 5%;
        .xi{
          text-align: left;
          width:25%;
          height:20%;
          color: #DCDFE1;
          font-size: 0.3rem;
        }
        .xi:hover{
          cursor:pointer;
        }
      }
      .col1{
        width:100%;
        height:12%;
        display: flex;
        margin-left: 8%;
        .xi1{
          width:30%;
          height:20%;
          text-align: left;
          color: #DCDFE1;
          font-size: 0.3rem;
        }
        .xi1:hover{
          cursor:pointer;
        }
      }
      .col2{
        width:100%;
        height:12%;
        display: flex;
        margin-top: 3%;
        .xi2{
          width:100%;
          height:20%;
          text-align: left;
          color: #7F8A92;
          font-size: 0.25rem;
        }
      }
    }
    .serContent1 {
      width: 100%;
      height: 80%;
      font-size: 0.25rem;
      margin-top:5%;
      .mes {
        width: 88%;
        height: 10%;
        display: flex;
        margin-left: 8%;
        font-size: 0.25rem;
        .she{
          width: 40%;
          height: 10%;
          text-align:left;
          color: #DCDFE1;
        }
        .lou{
          width: 60%;
          height: 10%;
          text-align: right;
          color: #7F8A92
        }
      }
    }
  }
</style>