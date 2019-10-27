<template>
  <div class="comprehensiveEvaluation-blue">
    <div class="title"><span>南川区综合评估</span></div>
    <div class="content">
      <div class="count-warp">
        <div class="left">98</div>
        <ul class="right">
          <li>
            <span class="count-title">设备</span>
            <el-progress :percentage="98" class="count-pro" :show-text="false" :stroke-width="7"></el-progress>
            <span class="count-num">98</span>
          </li>
          <li>
            <span class="count-title">火警</span>
            <el-progress :percentage="98" class="count-pro" :show-text="false" :stroke-width="7"></el-progress>
            <span class="count-num">98</span>
          </li>
          <li>
            <span class="count-title">隐患</span>
            <el-progress :percentage="78" class="count-pro" :show-text="false" :stroke-width="7"></el-progress>
            <span class="count-num">78</span>
          </li>
          <li>
            <span class="count-title">巡检</span>
            <el-progress :percentage="80" class="count-pro" :show-text="false" :stroke-width="7"></el-progress>
            <span class="count-num">80</span>
          </li>
        </ul>
      </div>
      <div id="comprehensiveEvaluation-echart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'comprehensiveEvaluation',
  data() {
    return {
      echart: null,
      echartOption: {
        title: {
          text: '南川区综合排名',
          x: 'center',
          textStyle: {
            color: '#1d73c5'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '40',
          left: '1%',
          right: '5%',
          bottom: '14',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: '#1d73c5',
              fontSize: 16
            },
            data: ['南川中学', '区中医院', '万达广场', '南商广场', '南川凤凰城']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#1d73c5',
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#1d73c5'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            name: '分数',
            data: [
              { name: '南川中学', value: 98 },
              { name: '区中医院', value: 96 },
              { name: '万达广场', value: 94 },
              { name: '南商广场', value: 92 },
              { name: '南川凤凰城', value: 90 }
            ],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0b487d' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#90bde8' // 100% 处的颜色
                }], false)
              }
            },
            barWidth: 20
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
      this.echart = echarts.init(document.getElementById('comprehensiveEvaluation-echart'));
      this.echart.setOption(this.echartOption);
      window.addEventListener('resize', () => {
        this.echart.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.comprehensiveEvaluation-blue {
  width: 100%;
  height: 100%;
  .count-warp{
    width: 100%;
    height: 3rem;
    display: flex;
    .left{
      width: 3rem;
      height: 3rem;
      background: url("../../../../assets/img/zongheBg1.png") no-repeat;
      background-size: 100% 100%;
      line-height: 3rem;
      font-size: .4rem;
      color: #ffd200;
    }
    .right{
      width: calc(100% - 3.16rem);
      height: 3rem;
      padding-left: .16rem;
      li{
        width: 100%;
        height: .55rem;
        padding: .1rem 0;
        display: flex;
        .count-title{
          width: .55rem;
          height: .55rem;
          background: url("../../../../assets/img/zongheBg2.png") no-repeat;
          background-size: 100% 100%;
          line-height: .54rem;
          color: #fff;
          font-size: .16rem;
        }
        .count-pro{
          width: calc(100% - 1.5rem);
          height: .07rem;
          padding: .24rem .2rem;
        }
        .count-num{
          width: .55rem;
          height: .55rem;
          line-height: .55rem;
          color: #ffd200;
          font-size: .3rem;
        }
      }
    }
  }
  #comprehensiveEvaluation-echart{
    width: 100%;
    height: calc(100% - 3rem);
  }
  .el-progress-bar__outer{
    background: transparent;
  }
  .el-progress-bar__inner{
    background-image: -webkit-linear-gradient(left , #0b487d, #90bde8);
  }
}
</style>
