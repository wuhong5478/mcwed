<template>
  <div class="emergencyAssessment-blue">
    <div class="title"><span>南川区应急评估</span></div>
    <div class="content emergencyAssessment-content">
      <div>
        <span class="left"></span>
        <span class="center">触达时间</span>
        <span class="right">50s</span>
      </div>
      <div>
        <span class="left home"></span>
        <span class="center">平均到场时间</span>
        <span class="right">3min</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'emergencyAssessment',
  data() {
    return {
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.emergencyAssessment-blue {
  width: 100%;
  height: 100%;
  .emergencyAssessment-content{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    > div{
      height: .51rem;
      width: calc(100% - .6rem);
      padding: 0 .3rem;
      display: flex;
      > span{
        display: inline-block;
        height: 100%;
        line-height: .51rem;
        text-align: left;
        color: #0096ff;
        background-size: 100% 100%;
        font-size: .34rem;
      }
      .left{
        width: .51rem;
        background: url("../../../../assets/img/yingjiTime.png") no-repeat center center;
        padding: 0 .45rem;
      }
      .center{
        width: calc(100% - 2.96rem);
      }
      .right{
        width: 1.1rem;
        padding-left: .45rem;
        color: #ffd200;
      }
      .home{
        background: url("../../../../assets/img/yingjiHome.png") no-repeat center center;
      }
    }
  }
}
</style>
