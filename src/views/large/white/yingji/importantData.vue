<template>
  <div id="data">
    <div class="centerData">
      <div class="title"><span>重要数据</span></div>
      <div class="content centerData-Content">
        <div class="one">
          <span class="head">触达率: </span>
          <span class="inside">100%</span>
        </div>
        <div class="one">
          <span class="head">触达时间: </span>
          <span class="inside">60s</span>
        </div>
        <div class="one">
          <span class="head">平均到场时间: </span>
          <span class="inside">3min</span>
        </div>
        <div class="one">
          <span class="head">已触达人员: </span>
          <span class="inside">18</span>
        </div>
        <div class="one">
          <span class="head">已到场人员: </span>
          <span class="inside">8</span>
        </div>
        <div class="one">
          <span class="head">持续时间: </span>
          <span class="inside">10:00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'importantData',
  data() {
    return {
    };
  },
  components: {
  },
  methods: {

  },
  computed: {

  },
  mounted() {

  }
};
</script>

<style lang="scss">
.centerData{
  height: 100%;
  box-sizing: border-box;
  background: url('../../../../assets/img/new/whiteDataBox.png') no-repeat center center;
  background-size: 100% 100%;
  .centerData-Content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    > div{
      width: 11.5%;
      height: calc(100% - .1rem);
      font-size: .45rem;
      font-weight: bolder;
      text-align: left;
      padding-top: .1rem;
      padding-left: .1rem;
      > span{
        display: block;
      }
      .head{
        font-size: .23rem;
        font-weight: normal;
      }
    }
  }
}
</style>
