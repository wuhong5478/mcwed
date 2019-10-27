<template>
  <div class="alarmConditions">
    <div class="title"><span>火情警报</span></div>
    <div class="content">
      <div id="alarmConditions-echart"></div>
      <div class="count-warp">
        <div>
          <span class='count-title'>触达率</span>
          <span>100%</span>
        </div>
        <div>
          <span class='count-title'>触达时间</span>
          <span>10s</span>
        </div>
        <div>
          <span class='count-title'>平均到场时间</span>
          <span>10:00</span>
        </div>
        <div>
          <span class='count-title'>处置率</span>
          <span>100%</span>
        </div>
         <div>
          <span class='count-title'>误报率</span>
          <span>100%</span>
        </div>
        <div>
          <span class='count-title'>平均处置时间</span>
          <span>10:00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'alarmConditions',
  data() {
    return {
      echart: null,
      echartOption: {
        series: [
          {
            name: '火情警报',
            type: 'gauge',
            max: 200,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[0.1, '#06D426'], [0.2, '#DFEB26'], [0.3, '#DF7E28'], [0.4, '#DF1226'], [0.6, '#881267'], [1, '#711244']]
              }
            },
            axisLabel: {
              distance: -15
            },
            pointer: {
              width: 5
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 50, name: '完成率' }]
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      this.echart = echarts.init(document.getElementById('alarmConditions-echart'));
      this.echart.setOption(this.echartOption);
      window.addEventListener('resize', () => {
        this.echart.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.alarmConditions {
  width: 100%;
  height: 100%;
  #alarmConditions-echart{
    width: 100%;
    height: 63%;
  }
  .count-warp{
    width: 100%;
    height: 37%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    > div{
      width: 33%;
      height: calc(50% - .1rem);
      font-size: .33rem;
      text-align: left;
      padding-top: .1rem;
      > span{
        display: block;
      }
      .count-title{
        font-size: .18rem;
      }
    }
  }
}
</style>
