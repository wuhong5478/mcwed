<template>
  <div class="alarmConditions-blue">
    <div class="title"><span>南川区报警情况</span></div>
    <div class="content">
      <div id="alarmConditions-echart"></div>
      <div class="bottom">
        <div>
          <p>当月报警总数</p>
          <span>1125</span>
        </div>
        <div>
          <p>当月火警总数</p>
          <span>1125</span>
        </div>
        <div>
          <p>处置率</p>
          <span>1125</span>
        </div>
        <div>
          <p>平均处置时间</p>
          <span>00:10</span>
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['设备报警', '故障报警'],
          orient: 'vertical',
          top: '4',
          x: 'right',
          textStyle: {
            color: '#0096ff',
            fontSize: 16
          }
        },
        grid: {
          top: '80',
          left: '1%',
          right: '5%',
          bottom: '14',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: '#0096ff',
              fontSize: 16
            },
            data: ['08-01', '08-02', '08-03', '08-04', '08-05', '08-06', '8-07']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#0096ff',
              fontSize: 16
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'line',
            name: '设备报警',
            data: [
              { name: '08-01', value: 28 },
              { name: '08-02', value: 16 },
              { name: '08-03', value: 24 },
              { name: '08-04', value: 12 },
              { name: '08-05', value: 10 },
              { name: '08-06', value: 20 },
              { name: '08-07', value: 17 }
            ],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#ffd001' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#df5753' // 100% 处的颜色
                }], false)
              }
            },
            barWidth: 20
          },
          {
            type: 'line',
            name: '故障报警',
            data: [
              { name: '08-01', value: 8 },
              { name: '08-02', value: 16 },
              { name: '08-03', value: 14 },
              { name: '08-04', value: 12 },
              { name: '08-05', value: 7 },
              { name: '08-06', value: 10 },
              { name: '08-07', value: 12 }
            ],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#4d85c3' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#abd7f9' // 100% 处的颜色
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
.alarmConditions-blue {
  width: 100%;
  height: 100%;
  #alarmConditions-echart{
    width: 100%;
    height: calc(100% - 2.5rem);
  }
  .bottom{
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div{
      width: 48%;
      height: .85rem;
      margin: .1rem 0;
      padding: .1rem 0;
      background: url("../../../../assets/img/baojingBg.png") no-repeat;
      background-size: 100% 100%;
      > p{
        font-size: .2rem;
        line-height: .35rem;
      }
      > span{
        font-size: .38rem;
        color: #ffd200;
        line-height: .5rem;
        font-weight: bolder;
      }
    }
  }
}
</style>
