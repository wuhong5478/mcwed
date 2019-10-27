<template>
  <div class="buildInfo">
    <div class="dialogBox">
      <div class="infoTitle">
        <p class="h6">建筑信息</p>
        <span class="closeSpan" @click="closeBuildInfoShow">+</span>
      </div>
      <div class="Content">
        <div class="row">
          <p class="left">建筑名称:</p>
          <p class="right2">{{buidData.architectureName}}</p>
        </div>
        <div class="row">
          <p class="left">所属园区:</p>
          <p class="right2">{{buidData.parkName}}</p>
        </div>
        <div class="row">
          <p class="left">建筑类型:</p>
          <p class="right2">{{buidData.architectureType}}</p>
        </div>
        <div class="row">
          <p class="left">负责人:</p>
          <p class="right2">{{buidData.personLiable}}</p>
        </div>
        <div class="row">
          <p class="left">联系电话:</p>
          <p class="right2">{{buidData.telephone}}</p>
        </div>
        <div class="row">
          <span class="left">图纸类型:</span>
          <span class="right2">{{buidData.drawingType}}</span>
        </div>
        <div class="row">
          <span class="left">重点单位:</span>
          <span class="right2">{{buidData.isKeyUnit}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'buildInfo',
  props: {},
  data() {
    return {
      buidData: {
        architectureName: '',
        parkName: '',
        architectureType: '',
        personLiable: '',
        telephone: '',
        drawingType: '',
        isKeyUnit: ''
      }
    };
  },
  mounted() {},
  methods: {
    closeBuildInfoShow() {
      this.$emit('closeBuildInfoShow', '', '');
    },
    setData(data) {
      if (data) {
        let list = data.architecture;
        this.buidData.architectureName = list.architectureName;
        this.buidData.parkName = list.parkName;
        this.buidData.architectureType = list.architectureType;
        this.buidData.personLiable = list.personLiable;
        this.buidData.telephone = list.telephone.substr(0, 3) + '-';
        this.buidData.telephone += list.telephone.substr(3, 4) + '-';
        this.buidData.telephone += list.telephone.substr(7, 4);
        this.buidData.drawingType = list.drawingType;
        if (list.isKeyUnit === '1') {
          this.buidData.isKeyUnit = '是';
        }
        else {
          this.buidData.isKeyUnit = '否';
        }
      }
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
    .buildInfo{
      width: 100%;
      height: 100%;
      position: relative;
      .dialogBox{
        position: absolute;
        z-index: 999;
        font-size: .3rem;
        text-align: left;
        width: 4.5rem;
        color: white;
        background-color: rgb(57, 72, 84);
        padding: 0 0 0 0;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(99, 116, 141, 0.3);
        border-radius: .2rem;
        box-shadow: 0 0 8px rgba(99, 116, 141, 1);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        animation: animatename 1s;
        .infoTitle{
          // background-image: -webkit-linear-gradient(left , rgb(43, 141, 250), rgb(82, 190, 254));
          background-image: -webkit-linear-gradient(left, rgb(11, 35, 56), rgb(56, 70, 83));
          position: relative;
          border-radius: .2rem .2rem 0 0;
          .h6{
            padding: .22rem 26px .28rem;
            font-size: .3rem;
          }
          .closeSpan{
            display: block;
            position: absolute;
            top: .119205rem;
            right: .119205rem;
            font-size: .405298rem;
            color: #fff;
            cursor: pointer;
            transform: rotate(45deg);
          }
        }
        .Content{
          font-size: .22rem;
          // color: black;
          padding: .25rem .3rem;
          display: flex;
          flex-direction: column;
          overflow: auto;
          background-color: rgb(57, 72, 84);
          border-radius: .2rem;
          table {
            width: 100%;
            tr{
              height: .34rem;
            };
            td {
              flex-direction: row;
            }
          }
        }
        .row{
          padding:2px 0px;
        }
        .left{
          float:left;
          width: 41%;
        }
        .right{
          float:left;
          padding-left: .3rem;
        }
        .right1{
          float:left;
          padding-left: .15rem;
        }
        .right2{
          float:left;
          width: calc(59% - .15rem);
          padding-left: .15rem;
        }
        // &::after {
        //   display: block;
        //   content: '';
        //   position: absolute;
        //   left: 48%;
        //   bottom: -10px;
        //   width: 0;
        //   height: 0;
        //   border-left: 10px solid transparent;
        //   border-right: 10px solid transparent;
        //   border-top: 10px solid rgb(57, 72, 84);
        // }
      }
    }
</style>
