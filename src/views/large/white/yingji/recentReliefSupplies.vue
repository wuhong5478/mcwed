<template>
  <div class="recentReliefSupplies">
    <div class="title"><span>最近救援物资</span></div>
    <div class="content recentReliefSupplies-content">
      <span class="top">微型消防站装备3号楼微消站</span>
      <div>
        <span class="left">中大园区3号楼微消站</span>
        <span class="right">查看</span>
      </div>
      <div>
        <span class="left">中大园区3号楼微消站</span>
        <span class="right">查看</span>
      </div>
      <div>
        <span class="left">中大园区3号楼微消站</span>
        <span class="right">查看</span>
      </div>
      <span class="top">室外消防栓</span>
      <div>
        <span class="left">中大园区3号楼微消站</span>
        <span class="right">中大园区3号楼微消站</span>
      </div>
      <div>
        <span class="left">中大园区3号楼微消站</span>
        <span class="right">中大园区3号楼微消站</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recentReliefSupplies',
  data() {
    return {

    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
  .recentReliefSupplies {
    width: 100%;
    height: 100%;

    .recentReliefSupplies-content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        height: 40px;
        width: calc(100% - .6rem);
        padding: 0 .3rem;
        display: flex;
        font-family: 黑体;
        font-size: .3046rem;
        font-weight: bold;
        color: #0096ff;
      }

      >div {
        height: .4rem;
        width: calc(100% - .6rem);
        padding: 0 .3rem;
        display: flex;

        >span {
          display: inline-block;
          height: 100%;
          line-height: .4rem;
          text-align: left;
          color: #0096ff;
          background-size: 100% 100%;
          font-size: .23rem;
        }

        .left {
          width: 3.6rem;
        }

        .right {
          width: calc(100% - 3.6rem);
          text-align: center;
        }
      }
    }
  }
</style>
