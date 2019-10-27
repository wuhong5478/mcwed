<template>
  <div class="workingSituation-blue">
    <div class="title"><span>南川区工作情况</span></div>
    <div class="content">
      <div class="top">
        <div>
          <p>当月隐患总数</p>
          <span>1125</span>
        </div>
        <div>
          <p>隐患处置率</p>
          <span>100%</span>
        </div>
        <div>
          <p>当月巡检任务</p>
          <span>2480</span>
        </div>
        <div>
          <p>巡检完成率</p>
          <span>98%</span>
        </div>
        <div>
          <p>当月维保任务</p>
          <span>580</span>
        </div>
        <div>
          <p>维保完成率</p>
          <span>99%</span>
        </div>
      </div>
      <div class="bottom">
        <div class="workingSituation-title">超时情况</div>
        <div id="workingSituation-echart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'workingSituation',
  data() {
    return {
      echart: null,
      echartOption: {
        title: {
          text: '当月超时统计 110',
          x: 'right',
          textStyle: {
            color: '#8ec6d8'
          }
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['隐患', '巡查', '维保'],
          bottom: '4',
          x: 'center',
          itemGap: 45,
          textStyle: {
            color: '#8ec6d8',
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
        series: [
          {
            type: 'pie',
            name: '超时情况',
            radius: '75%',
            center: ['50%', '50%'],
            roseType: 'radius',
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay() {
              return Math.random() * 200;
            },
            label: {
              show: true,
              position: 'inside',
              formatter: '{d}%',
              fontSize: 16
            },
            data: [
              { name: '隐患', value: 28, itemStyle: { color: '#23487a' } },
              { name: '巡查', value: 16, itemStyle: { color: '#17e6ff' } },
              { name: '维保', value: 24, itemStyle: { color: '#0e607d' } }
            ]
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
      this.echart = echarts.init(document.getElementById('workingSituation-echart'));
      this.echart.setOption(this.echartOption);
      window.addEventListener('resize', () => {
        this.echart.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.workingSituation-blue {
  width: 100%;
  height: 100%;
  .top{
    height: 3.75rem;
    width: 100%;
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
  .bottom{
    width: 100%;
    height: calc(100% - 3.75rem);
    .workingSituation-title{
      width: calc(100% - .3rem);
      height: .24rem;
      padding-left: .3rem;
      margin-bottom: .06rem;
      line-height: .24rem;
      color: #7ca1d2;
      font-size: .2rem;
      text-align: left;
      font-weight: bolder;
      background: url("../../../../assets/img/gongzuoIcon.png") no-repeat left center;
      background-size: .2rem 100%;
    }
    #workingSituation-echart{
      width: 100%;
      height: calc(100% - .3rem);
    }
  }
}
</style>
