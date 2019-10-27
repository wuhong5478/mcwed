<template>
  <div class="comprehensiveEvaluation">
    <div class="title"><span>综合评估</span></div>
    <div class="content">
      <div id="comprehensiveEvaluation-echart"></div>
      <div class="count-warp">
        <div v-for="(item, index) in dataList" :key="index">
          <span class='count-title'>{{item.address}}</span>
          <span :class="{red: item.score < 60, yellow: item.score >= 60 && item.score < 85, green: item.score >= 85}">{{Math.floor(item.score * 10) / 10}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'comprehensiveEvaluation',
  props: {
    wsData: {
      Object,
      default: () => { }
    }
  },
  data() {
    return {
      echart: null,
      dataList: [],
      echartOption: {
        tooltip: {
          confine: true
        },
        radar: {
          shape: 'circle',
          name: {
            color: '#4C4C4C'
          },
          radius: '60%',
          splitLine: {
            lineStyle: {
              color: '#aaa'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(250,250,250,0)', 'rgba(200,200,200,0)']
            }
          },
          indicator: []
        },
        series: [{
          name: '雷达图',
          type: 'radar',
          itemStyle: {
            normal: {
              color: '#8DC7FE'
            }
          },
          areaStyle: {
            normal: {
              opacity: 0.6
            }
          },
          data: []
        }]
      },
      echartOption1: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [{ //
          name: '得分',
          type: 'gauge',
          detail: {
            formatter: ['{a|{value}}', '{b|分}'].join(''),
            rich: {
              a: {
                fontSize: 22,
                fontWeight: 'bold'
              },
              b: {
                fontSize: 14,
                fontWeight: 'bold'
              }
            }
          },
          radius: '100%',
          data: [{
            value: 0,
            name: '小镇综合评估得分',
            color: '#2EB675'
          }],
          startAngle: 185,
          endAngle: -5,
          splitNumber: 2,
          splitLine: {
            show: false,
            length: 15
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: [
                [0.6, '#D81E06'],
                [0.85, 'yellow'],
                [1, '#1AFA29']
              ],
              width: 10
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          itemStyle: {
            normal: {
              color: '#B5C0D4'
            }
          },
          pointer: {
            length: '40%',
            width: 4
          },
          title: {
            show: true,
            offsetCenter: [0, '75%'],
            fontSize: 12,
            color: '#B5C0D4'
          }
        }, {
          name: '刻度1',
          type: 'gauge',
          radius: '82%',
          splitNumber: 2,
          startAngle: 180,
          endAngle: 0,
          axisLine: {
            show: false,
            lineStyle: {
              width: 1,
              color: [
                [1, 'rgba(0,0,0,0)']
              ]
            }
          },
          axisLabel: {
            color: '#AAB9D0',
            fontSize: 9,
            distance: -26
          },
          axisTick: {
            show: true,
            splitNumber: 1,
            lineStyle: {
              color: '#AAB9D0',
              width: 1
            },
            length: 3
          },
          splitLine: {
            show: false
          },
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        }]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData() {
      /* this.$services.get({
        type: 'LARGE',
        url: 'importantGetData',
        params: {
          type: 'important'
        }
      }).then(({ data }) => {
        this.echartOption1.series[0].data = [{
          value: data.townScore,
          name: '小镇综合评估得分'
        }];
        this.initEchart();
      }); */
      this.$services.get({
        type: 'LARGE',
        url: 'multipleAnalysisGetData',
        params: {
          type: 'multiple'
        }
      }).then(({ data }) => {
        this.setData(data);
      });
    },
    setData(data) {
      this.dataList = data.chartList;
      this.echartOption1.series[0].data = [{
        value: Math.floor(data.townScore * 10) / 10,
        name: '小镇综合评估得分'
      }];
      this.initEchart();
      // let xAxisData = [];
      // let seriesData = [];
      // data.chartList.length > 0 && data.chartList.forEach(k => {
      //   xAxisData.push({
      //     name: k.quota,
      //     max: 100
      //   });
      //   seriesData.push(k.score);
      // });
      // this.echartOption.radar.indicator = xAxisData;
      // this.echartOption.series[0].data = [{
      //   value: seriesData,
      //   name: '综合评估'
      // }];
      // this.initEchart();
    },
    initEchart() {
      this.echart = echarts.init(document.getElementById('comprehensiveEvaluation-echart'));
      this.echart.setOption(this.echartOption1);
      window.addEventListener('resize', () => {
        this.echart.resize();
      });
    }
  },
  watch: {
    wsData(val) {
      this.setData(val);
    }
  }
};
</script>

<style lang="scss">
.comprehensiveEvaluation {
  width: 100%;
  height: 100%;
  // .title > span{
  //   background: url('../../../../assets/img/new/comprehensiveEvaluation.png') no-repeat left center;
  //   background-size: auto 80%;
  // }
  #comprehensiveEvaluation-echart{
    width: 100%;
    height: 50%;
    // border-bottom: .01rem solid #000;
  }
  .count-warp{
    width: 105%;
    height: 50%;
		margin-top: 5%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // margin-top: -0.5rem;
    // padding-left: 0.4rem;
    .red{
      color: #D81E06;
    }
    .green{
      color: #1AFA29;
    }
    .yellow{
      color: yellow;
    }
    .blue{
      color: #308EF3;
    }
    > div{
      width: calc(50% - .03rem);
      height: calc(33.3% - .2rem);
      font-size: .3rem;
      font-weight: bolder;
      text-align: left;
      // padding-top: .1rem;
      margin: .1rem 0;
      > span{
        display: block;
      }
      .count-title{
        font-size: .24rem;
        font-weight: 700;
        color: #D3E2FF;
      }
    }
    > div:nth-child(2n-1) {
      border-right: 0.03rem solid rgba(148, 166, 190, 0.3);
    }
    > div:nth-child(2n) {
      padding-left: .38rem;
      width: calc(50% - .38rem);
    }
    > div:nth-child(5) {
      border-right: none;
    }
  }
  .el-progress-bar__outer{
    background: transparent;
  }
  .el-progress-bar__inner{
    background-image: -webkit-linear-gradient(left , #0b487d, #90bde8);
  }
}
</style>
