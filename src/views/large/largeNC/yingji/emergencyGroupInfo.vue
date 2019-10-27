<template>
  <div class="emergencyGroupInfo-blue">
    <div class="title"><span>应急组信息</span></div>
    <div class="content emergencyGroupInfo-content">
      <div>
        <span class="one">灭火组</span>
        <span class="two">陈某某</span>
        <span class="three">00:03:30</span>
        <span class="four">已触达</span>
      </div>
      <div>
        <span class="one">疏散组</span>
        <span class="two">陈某某</span>
        <span class="three">00:03:50</span>
        <span class="four">已触达</span>
      </div>
      <div>
        <span class="one">救护组</span>
        <span class="two">陈某某</span>
        <span class="three">00:04:20</span>
        <span class="four">已触达</span>
      </div>
      <div>
        <span class="one">警戒组</span>
        <span class="two">陈某某</span>
        <span class="three">00:04:40</span>
        <span class="four">已触达</span>
      </div>
      <div>
        <span class="one">灭火组</span>
        <span class="two">陈某某</span>
        <span class="three">00:05:10</span>
        <span class="four">已触达</span>
      </div>
      <div>
        <span class="one">救护组</span>
        <span class="two">陈某某</span>
        <span class="three">00:05:50</span>
        <span class="four">已触达</span>
      </div>
      <div>
        <span class="one">警戒组</span>
        <span class="two">陈某某</span>
        <span class="three">00:06:30</span>
        <span class="four">已触达</span>
      </div>
      <div>
        <span class="one">灭火组</span>
        <span class="two">陈某某</span>
        <span class="three">00:07:00</span>
        <span class="four">已触达</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'emergencyGroupInfo',
  data() {
    return {

    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
  .emergencyGroupInfo-blue {
    width: 100%;
    height: 100%;

    .emergencyGroupInfo-content {
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

        .one {
          width: 1.6rem;
        }

        .two {
          width: 1.75rem;
        }

        .three {
          width: 1.75rem;
        }

        .four {
          width: calc(100% - 5.1rem);
        }
      }
    }
  }
</style>
