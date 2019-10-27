<template>
  <div class="controlroomInfo-blue">
    <div class="title"><span>消控室信息</span></div>
    <div class="content controlroomInfo-content">
      <div>
        <span class="left">微型消防站装备3号楼微消站</span>
        <span class="center">陈某某</span>
        <span class="right">已触达</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'controlroomInfo',
  data() {
    return {

    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
  .controlroomInfo-blue {
    width: 100%;
    height: 100%;

    .controlroomInfo-content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

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
          font-size: .2538rem;
        }

        .left {
          width: 3.6rem;
        }

        .center {
          width: 1.5rem;
        }

        .right {
          width: calc(100% - 5.1rem);
        }
      }
    }
  }
</style>
