<template>
  <div class="equipmentCondition-blue">
    <div class="title"><span>南川区设备状况</span></div>
    <div class="content">
      <div class="top">
        <div>
          <div><span style="color: #008aec">所有设备</span><span class="left" style="color: #ffd200">33000</span></div>
          <div></div>
        </div>
        <div>
          <div><span>正常</span><span class="left">32000</span></div>
          <div><span>故障</span><span class="left">1000</span></div>
        </div>
        <el-progress :percentage="80" class="top-pro" :show-text="false" :stroke-width="10"></el-progress>
      </div>
      <div id="equipmentCondition-echart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'equipmentCondition',
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
          data: ['正常', '故障'],
          orient: 'vertical',
          top: '4',
          x: 'right',
          textStyle: {
            color: '#7693dd',
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
              color: '#7693dd',
              fontSize: 16
            },
            axisTick: {
              lineStyle: {
                type: 'dashed',
                color: '#7693dd'
              }
            },
            data: ['电器火灾监控', '消防水池水位', '喷淋末端水压', '室内消火栓水压', '室外消火栓水压', '可燃气体泄露', '独立式烟雾探测']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#7693dd',
              fontSize: 16
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'bar',
            name: '正常',
            stack: '总量',
            data: [
              { name: '电器火灾监控', value: 98 },
              { name: '消防水池水位', value: 96 },
              { name: '喷淋末端水压', value: 94 },
              { name: '室内消火栓水压', value: 92 },
              { name: '室外消火栓水压', value: 90 },
              { name: '可燃气体泄露', value: 90 },
              { name: '独立式烟雾探测', value: 90 }
            ],
            itemStyle: {
              normal: {
                color: '#7693dd'
              }
            },
            barWidth: 20
          },
          {
            type: 'bar',
            name: '故障',
            stack: '总量',
            data: [
              { name: '电器火灾监控', value: 8 },
              { name: '消防水池水位', value: 16 },
              { name: '喷淋末端水压', value: 14 },
              { name: '室内消火栓水压', value: 12 },
              { name: '室外消火栓水压', value: 10 },
              { name: '可燃气体泄露', value: 9 },
              { name: '独立式烟雾探测', value: 4 }
            ],
            itemStyle: {
              normal: {
                color: '#ffd200'
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
      this.echart = echarts.init(document.getElementById('equipmentCondition-echart'));
      this.echart.setOption(this.echartOption);
      window.addEventListener('resize', () => {
        this.echart.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.equipmentCondition-blue {
  width: 100%;
  height: 100%;
  .top{
    width: 100%;
    height: 1.2rem;
    >div{
      height: .55rem;
      width: 100%;
      line-height: .55rem;
      display: flex;
      justify-content: space-between;
      span{
        display: inline-block;
        width: .81rem;
        height: 100%;
        padding-right: .14rem;
        font-size: .2rem;
        text-align: right;
      }
      span.left{
        text-align: left;
      }
    }
    .top-pro{
      height: .1rem;
    }
  }
  #equipmentCondition-echart{
    width: 100%;
    height: calc(100% - 1.2rem);
  }
  .el-progress-bar__outer{
    background: #2e3e66;
  }
  .el-progress-bar__inner{
    background: #2485d6;
  }
}
</style>
