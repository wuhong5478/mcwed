<template>
  <div class="regionalHDInfo">
    <div class="regionalHDHead">
      <div class="theTitle">
        <div class="title1">区域隐患分析</div>
      </div>
      <div class="quit" @click="closeRegionalHDInfo()">×</div>
    </div>
    <div class="content regionalHDContext">
      <div class="top">
        <div class="line1"></div>
        <div class="block">
          <span class="smallTitle">今日发现隐患数量</span>
          <div class="detail">
            <span>{{dayNum}}</span>
            <span class="danwei">个</span>
          </div>
          <div class="line"></div>
        </div>
        <div class="block">
          <span class="smallTitle">今日已处理隐患数量</span>
          <div class="detail">
            <span>{{dayDealNum}}</span>
            <span class="danwei">个</span>
          </div>
          <div class="line" style="width: 24%;"></div>
        </div>
        <div class="block">
          <span class="smallTitle">本月隐患数量</span>
          <div class="detail">
            <span>{{monthNum}}</span>
            <span class="danwei">个</span>
          </div>
          <div class="line" style="width: 18%;"></div>
        </div>
        <div class="block" style="width: 18%;">
          <span class="smallTitle">隐患处理率</span>
          <div class="detail">
            <span>{{dealRate}}</span>
            <span class="danwei">%</span>
          </div>
          <div class="line" style="border-right: 0rem solid"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="row">
          <div class="block">
            <div class="bottomTitle">隐患等级</div>
            <div class="echart" id="regional-echart1"></div>
          </div>
          <div class="block">
            <div class="bottomTitle">隐患类型</div>
            <div class="echart" id="regional-echart2"></div>
          </div>
        </div>
        <div class="row">
          <div class="block">
            <div class="bottomTitle">区域隐患分析</div>
            <div class="echart" id="regional-echart3"></div>
          </div>
          <div class="block">
            <div class="bottomTitle">持续时间</div>
            <div class="echart" id="regional-echart4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'regionalHDInfo',
  data() {
    return {
      dayNum: 0,
      dayDealNum: 0,
      monthNum: 0,
      dealRate: '',
      chartData1_1: 0,
      chartData1_2: 0,
      chartData2_1: 0,
      chartData2_2: 0,
      chartXData3: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      chartData3: [0, 0, 0, 0, 0, 0, 0],
      chartXData4: ['1天', '2天', '3天', '4天', '5天', '6天', '更久'],
      chartData4: [0, 0, 0, 0, 0, 0, 0],
      echart1: null,
      echart2: null,
      echart3: null,
      echart4: null,
      echartOption1: {
        title: {
          text: '隐患总数',
          x: 'center',
          y: 'middle',
          textStyle: {
            fontWeight: 'normal',
            color: '#DCDFE1',
            fontSize: 11
          }
        },
        series: [
          {
            name: '隐患总数',
            type: 'pie',
            selectedMode: 'single',
            hoverOffset: 5,
            center: ['50%', '50%'],
            radius: ['50%', '60%'],
            label: {
              normal: {
                formatter: params => '{white|' + params.value + '%}\n{white|' + params.name + '}',
                rich: {
                  white: {
                    color: '#DCDFE1',
                    fontSize: 11,
                    padding: [1, 1]
                    // align: 'left',
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: '重大隐患',
                itemStyle: {
                  normal: {
                    color: 'rgb(238,72,100)'
                  }
                }
              },
              {
                value: 0,
                name: '一般隐患',
                itemStyle: {
                  normal: {
                    color: 'rgb(50,150,250)'
                  }
                }
              }
            ]
          }
        ]
      },
      echartOption2: {
        title: {
          text: '隐患总数',
          x: 'center',
          y: 'middle',
          textStyle: {
            fontWeight: 'normal',
            color: '#DCDFE1',
            fontSize: 11
          }
        },
        series: [
          {
            name: '隐患总数',
            type: 'pie',
            selectedMode: 'single',
            hoverOffset: 5,
            center: ['50%', '50%'],
            radius: ['50%', '60%'],
            label: {
              normal: {
                formatter: params => '{white|' + params.value + '%}\n{white|' + params.name + '}',
                rich: {
                  white: {
                    color: '#DCDFE1',
                    fontSize: 11,
                    padding: [1, 1]
                    // align: 'left',
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: '人工上报',
                itemStyle: {
                  normal: {
                    color: 'rgb(238,72,100)'
                  }
                }
              },
              {
                value: 0,
                name: '设备隐患',
                itemStyle: {
                  normal: {
                    color: 'rgb(50,150,250)'
                  }
                }
              }
            ]
          }
        ]
      },
      echartOption3: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a}<br />{b}: {c}个'
        },
        grid: {
          bottom: '15%',
          top: '29%',
          left: '12%',
          right: '15%'
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#7F8A92',
              width: 2
            }
          },
          axisLabel: {
            interval: 0,
            color: '#1D73C5',
            fontSize: 10
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          z: 3,
          data: []
        },
        yAxis: {
          name: '隐患数量 (个)',
          nameTextStyle: {
            color: 'white',
            fontStyle: 10
          },
          nameGap: 15,
          type: 'value',
          // max: 4500,
          // min: 0,
          // interval: 1000,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            // color: '#1D73C5',
            color: '#999',
            fontSize: 10,
            opacity: 1
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '隐患数量',
            type: 'line',
            // smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                color: '#1D73C5'
              }
            },
            showSymbol: false,
            data: []
          }
        ]
      },
      echartOption4: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a}<br />{b} : {c}个'
        },
        grid: {
          bottom: '15%',
          top: '30%',
          left: '11%',
          right: '15%'
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#7F8A92',
              width: 2
            }
          },
          axisLabel: {
            interval: 0,
            color: '#1D73C5',
            // color: '#999',
            fontSize: 10
          },
          z: 3,
          data: []
        },
        yAxis: {
          name: '隐患持续时间 (天)',
          // offset:10,
          nameTextStyle: {
            color: 'white',
            fontStyle: 9,
            // align:'right'
            padding: [0, 0, 0, 30]
          },
          nameGap: 20,
          type: 'value',
          // max: 3000,
          // min: 0,
          // interval: 1000,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            // color: '#1D73C5',
            color: '#999',
            fontSize: 9,
            opacity: 1
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: '隐患持续时间',
            type: 'line',
            // smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                color: 'rgb(53, 124, 87)'
              }
            },
            showSymbol: false,
            data: [],
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(53,124,87)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(53,124,87,0)'
                  }
                ], false)
              }
            }
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    getData(list) {
      // console.log('----------buildInfo----------', list);
      if (list) {
        this.$services.get({
          type: 'LARGE',
          url: 'taskWarnAnalysisData',
          params: {
            // lat: '30.128077',
            // lng: '120.082088',
            lat: list.latitude,
            lng: list.longitude,
            type: 'map'
          }
        }).then(({ data }) => {
          // console.log('-------------taskWarnAnalysisData---------------', data);
          this.dayNum = data.dayNum;
          this.dayDealNum = data.dayDealNum;
          this.monthNum = data.monthNum;
          this.dealRate = data.dealRate;
          let splitLineColor = [];
          if (data && data.importRate) {
            this.chartData1_1 = Number(data.importRate.replace(/%/, ''));
            this.chartData1_2 = Number(data.normalRate.replace(/%/, ''));
          }
          if (data && data.deviceRate) {
            this.chartData2_1 = Number(data.personRate.replace(/%/, ''));
            this.chartData2_2 = Number(data.deviceRate.replace(/%/, ''));
          }
          if (data && data.monthList) {
            this.chartXData3 = [];
            this.chartData3 = [];
            data.monthList.forEach(k => {
              this.chartXData3.push(k.type);
              this.chartData3.push(k.data);
              splitLineColor.push('rgba(0, 0, 0, 0)');
            });
          }
          if (data && data.continueList) {
            this.chartXData4 = [];
            this.chartData4 = [];
            data.continueList.forEach(k => {
              this.chartXData4.push(k.type);
              this.chartData4.push(k.data);
            });
          }
          splitLineColor[splitLineColor.length - 1] = '#ccc';
          this.echartOption1.series[0].data[0].value = this.chartData1_1;
          this.echartOption1.series[0].data[1].value = this.chartData1_2;
          this.echartOption2.series[0].data[0].value = this.chartData2_1;
          this.echartOption2.series[0].data[1].value = this.chartData2_2;
          this.echartOption3.series[0].data = this.chartData3;
          this.echartOption3.xAxis.data = this.chartXData3;
          this.echartOption3.xAxis.splitLine.lineStyle.color = splitLineColor;
          this.echartOption4.series[0].data = this.chartData4;
          this.echartOption4.xAxis.data = this.chartXData4;

          // console.log('-------------this.echartOption4.series[0].data---------------', this.echartOption4.series[0].data);
          // console.log('-------------this.echartOption4.xAxis.data---------------', this.echartOption4.xAxis.data);
          // console.log('-------------this.echartOption4---------------', this.echartOption4);
          this.initEchart();
        });
      }
    },
    closeRegionalHDInfo() {
      this.$parent.changeRegionalHDInfoShow('');
    },
    initEchart() {
      this.echart1 = echarts.init(document.getElementById('regional-echart1'));
      this.echart2 = echarts.init(document.getElementById('regional-echart2'));
      this.echart3 = echarts.init(document.getElementById('regional-echart3'));
      this.echart4 = echarts.init(document.getElementById('regional-echart4'));
      this.echart1.setOption(this.echartOption1);
      this.echart2.setOption(this.echartOption2);
      this.echart3.setOption(this.echartOption3);
      this.echart4.setOption(this.echartOption4);
      window.addEventListener('resize', () => {
        this.echart1.resize();
        this.echart2.resize();
        this.echart3.resize();
        this.echart4.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.regionalHDInfo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: rgba(#000, 0.3);
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .regionalHDHead{
    height: 9%;
    background-image: -webkit-linear-gradient(left, rgb(11,35,56), rgb(56,70,83));
    .quit{
      float: right;
      color: white;
      font: 100 0.6rem/0.3rem Tahoma,Verdana,sans-serif;
      cursor: pointer;
      margin: 0.25rem 0.5rem 0rem 0rem;
    }
    .theTitle{
      float: left;
      display: flex;
      width: 80%;
      flex-direction: row;
      justify-content: left;
      .title1{
        margin-left: .5rem;
        padding-top: .15rem;
        font-size: .35rem;
        color: white;
      }
      .title2{
        transition: all .25s ease-in-out;
        margin-left: 0.3rem;
        font-size: 0.3rem;
        font-weight: 100;
        color: #DCDFE1;
        padding-top: 0.22rem;
      }
    }
  }
  .regionalHDContext {
      padding: .36rem 0.58rem !important;
      width: 94% !important;
      height: 100%;
      font-size: 0.3rem;
      text-align: left;
      display: flex;
      // overflow:scroll;
      max-height: 100%;
      overflow: auto;
      flex-direction: column;
      background-color: rgb(57,72,84) !important;
      .top{
        width: 100%;
        height: 16%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .line1{
          border-bottom: 0.01rem solid #7F8A92;
          width: 99.5%;
          height: 15%;
          margin-left: -0.55rem;
          position: absolute;
        }
        .block{
          display: flex;
          // width: 25%;
          flex-direction: column;
          padding-bottom: .3rem;
          .line{
            border-right: 0.01rem solid #7F8A92;
            width: 23%;
            height: 8%;
            margin: 0.2rem 0;
            position: absolute;
          }
          .smallTitle{
            color: #7F8A92;
            font-size: .28rem;
            padding-bottom: 0.1rem;
          }
          .detail{
            color: rgb(48,145,250);
            font-size: .35rem;
            .danwei{
              font-size: .26rem;
            }
          }
          >span{
            line-height: 0.5rem;
            // width: 25%;
            text-align: left;
          }
          .img{
            background: url('../../../../assets/img/new/50723086_p0.jpg') no-repeat center center;
            background-size: 100% 100%;
            width: 100%;
            height: 5rem;
          }
        }
      }
      .bottom{
        display: flex;
        width: 100%;
        height: 80%;
        padding-top: 0.6rem;
        flex-direction: column;
        .row{
          width: 100%;
          height: 45%;
          display: flex;
          flex-direction: row;
          .block{
            height: 100%;
            display: flex;
            width: 100%;
            flex-direction: column;
            padding-bottom: .3rem;
            .bottomTitle{
              color: white;
              font-size: .28rem;
            }
            .echart{
              width: 100%;
              height: 100%;
            }
        }
      }
    }
  }
}
</style>
