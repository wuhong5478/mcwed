<template>
  <div class="parkScore">
    <!-- <transition name="bottom"> -->
      <div class="box">
        <div class="smallTitle">
          <span class="logo"></span>
          <span>园区得分指标</span>
        </div>
        <div class="borderOut" style="width: 550px;">
          <div class="angle angle1"></div>
          <div class="angle angle2"></div>
          <div class="angle angle3"></div>
          <div class="angle angle4"></div>
          <div class="borderInner">
            <div class="contentTitle">
              <span class="threePoint"></span>
              <span class="titleContent">中大得分：</span>
              <span class="titleData">98</span>
            </div>
            <div id="parkScoreEchart1" class="contentBottom"></div>
          </div>
        </div>
      </div>
    <!-- </transition> -->
    <!-- <transition name="bottom"> -->
      <div class="box">
        <div class="smallTitle">
          <span class="logo"></span>
          <span>工作位置情况</span>
        </div>
        <div class="borderOut" style="width: 750px;">
          <div class="angle angle1"></div>
          <div class="angle angle2"></div>
          <div class="angle angle3"></div>
          <div class="angle angle4"></div>
          <div class="borderInner">
            <div class="contentTitle">
              <span class="threePoint"></span>
              <span class="titleContent">当月综合处理事件：</span>
              <span class="titleData">10000</span>
              <span class="titleContent">当月综合处理率：</span>
              <span class="titleData">70%</span>
            </div>
            <div id="parkScoreEchart2" class="contentBottom"></div>
          </div>
        </div>
      </div>
    <!-- </transition> -->
    <!-- <transition name="bottom"> -->
      <div class="box">
        <div class="smallTitle">
          <span class="logo"></span>
          <span>最近报警事件</span>
        </div>
        <div class="borderOut">
          <div class="angle angle1"></div>
          <div class="angle angle2"></div>
          <div class="angle angle3"></div>
          <div class="angle angle4"></div>
          <div class="borderInner"><div id="parkScoreEchart3" class="contentBottom" style="margin-top: 5px; height: calc(100% - 5px);"></div></div>
        </div>
      </div>
    <!-- </transition> -->
    <!-- <transition name="bottom"> -->
      <div class="box">
        <div class="smallTitle">
          <span class="logo"></span>
          <span>设备情况</span>
        </div>
        <div class="borderOut">
          <div class="angle angle1"></div>
          <div class="angle angle2"></div>
          <div class="angle angle3"></div>
          <div class="angle angle4"></div>
          <div class="borderInner"><div id="parkScoreEchart4" class="contentBottom" style="margin-top: 5px; height: calc(100% - 5px);"></div></div>
        </div>
      </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'parkScore',
  data() {
    return {
      showFlag1: false,
      echart1: null,
      echartOption1: {
        color: '#9EDCE8',
        title: {
          text: '消防设施完好率  98',
          textStyle: {
            color: '#fff'
          },
          left: '65%',
          bottom: '10%'
        },
        tooltip: {},
        radar: {
          shape: 'circle',
          center: ['35%', '50%'],
          name: {
            textStyle: {
              color: '#fff',
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '', max: 6500 },
            { name: '', max: 16000 },
            { name: '', max: 30000 },
            { name: '', max: 38000 },
            { name: '', max: 52000 },
            { name: '', max: 25000 }
          ]
        },
        series: [
          {
            name: '',
            type: 'radar',
            areaStyle: { normal: {} },
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: ''
              }
            ]
          }
        ]
      },
      echart2: null,
      echartOption2: {
        color: '#52D3DE',
        title: [
          {
            text: '设备报警\n2387',
            x: '21.5%',
            y: '10.66%',
            textStyle: {
              color: '#fff',
              fontSize: 16,
              lineHeight: 20
            }
          },
          {
            text: '故障报警\n2387',
            x: '61.5%',
            y: '10.66%',
            textStyle: {
              color: '#fff',
              fontSize: 16,
              lineHeight: 20
            }
          },
          {
            text: '隐患处置\n2387',
            x: '21.5%',
            y: '44%',
            textStyle: {
              color: '#fff',
              fontSize: 16,
              lineHeight: 20
            }
          },
          {
            text: '巡检工作\n2387',
            x: '61.5%',
            y: '44%',
            textStyle: {
              color: '#fff',
              fontSize: 16,
              lineHeight: 20
            }
          },
          {
            text: '维保工作\n2387',
            x: '21.5%',
            y: '77.3%',
            textStyle: {
              color: '#fff',
              fontSize: 16,
              lineHeight: 20
            }
          }
        ],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['15%', '16.66%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 310,
                name: '直接访问',
                itemStyle: {
                  normal: {
                    opacity: 0.3,
                    tooltip: {
                      show: false
                    }
                  }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['15%', '16.66%'],
            avoidLabelOverlap: false,
            hoverOffset: 0,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 335,
                name: '直接访问',
                label: {
                  normal: {
                    show: true,
                    color: '#DBD668',
                    formatter: '{d}%',
                    position: 'center'
                  }
                }
              },
              {
                value: 310,
                name: '邮件营销',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: { opacity: 0 }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['55%', '16.66%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 310,
                name: '直接访问',
                itemStyle: {
                  normal: {
                    opacity: 0.3,
                    tooltip: {
                      show: false
                    }
                  }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['55%', '16.66%'],
            avoidLabelOverlap: false,
            hoverOffset: 0,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 335,
                name: '直接访问',
                label: {
                  normal: {
                    show: true,
                    color: '#DBD668',
                    formatter: '{d}%',
                    position: 'center'
                  }
                }
              },
              {
                value: 310,
                name: '邮件营销',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: { opacity: 0 }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['15%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 310,
                name: '直接访问',
                itemStyle: {
                  normal: {
                    opacity: 0.3,
                    tooltip: {
                      show: false
                    }
                  }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['15%', '50%'],
            avoidLabelOverlap: false,
            hoverOffset: 0,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 335,
                name: '直接访问',
                label: {
                  normal: {
                    show: true,
                    color: '#DBD668',
                    formatter: '{d}%',
                    position: 'center'
                  }
                }
              },
              {
                value: 310,
                name: '邮件营销',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: { opacity: 0 }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['55%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 310,
                name: '直接访问',
                itemStyle: {
                  normal: {
                    opacity: 0.3,
                    tooltip: {
                      show: false
                    }
                  }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['55%', '50%'],
            avoidLabelOverlap: false,
            hoverOffset: 0,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 335,
                name: '直接访问',
                label: {
                  normal: {
                    show: true,
                    color: '#DBD668',
                    formatter: '{d}%',
                    position: 'center'
                  }
                }
              },
              {
                value: 310,
                name: '邮件营销',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: { opacity: 0 }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['15%', '83.3%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 310,
                name: '直接访问',
                itemStyle: {
                  normal: {
                    opacity: 0.3,
                    tooltip: {
                      show: false
                    }
                  }
                }
              }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['18%', '20%'],
            center: ['15%', '83.3%'],
            avoidLabelOverlap: false,
            hoverOffset: 0,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 335,
                name: '直接访问',
                label: {
                  normal: {
                    show: true,
                    color: '#DBD668',
                    formatter: '{d}%',
                    position: 'center'
                  }
                }
              },
              {
                value: 310,
                name: '邮件营销',
                tooltip: {
                  show: false
                },
                itemStyle: {
                  normal: { opacity: 0 }
                }
              }
            ]
          }
        ]
      },
      echart3: null,
      echartOption3: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 14,
              color: '#4FCBC8',
              fontSize: 22
            },
            type: 'category',
            data: ['设备\n报警', '故障\n报警', '隐患', '巡检', '维保']
          }
        ],
        yAxis: [{ show: false, type: 'value' }],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            label: {
              normal: {
                show: true,
                color: '#4FCBC8',
                fontSize: 20,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowOffsetX: -5,
                shadowOffsetY: 5,
                shadowColor: '#304D60',
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#14F7FD' }, { offset: 1, color: '#069AF7' }])
              }
            },
            data: [20, 35, 25, 45, 28]
          }
        ]
      },
      echart4: null,
      echartOption4: {
        color: ['#45EAFF', '#4D62F1', '#EB5403', '#F29DC4', '#7150E1', '#F54C70', '#FCCF00'],
        title: {
          text: '19523',
          subtext: '设备总数',
          x: 'center',
          y: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 26
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '设备总数',
            type: 'pie',
            selectedMode: 'single',
            hoverOffset: 0,
            radius: [0, '40%'],
            itemStyle: {
              normal: {
                color: '#0C3550'
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 19523,
                tooltip: {
                  show: false
                }
              }
            ]
          },
          {
            name: '设备情况',
            type: 'pie',
            radius: ['50%', '75%'],
            label: {
              normal: {
                formatter: '{b|{b}}\n{hr|}\n{b|{d}% }  {b|{c} }',
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 22,
                    align: 'center'
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            data: [
              {
                value: 310,
                name: '电器火灾监控'
              },
              {
                value: 335,
                name: '消防水池水位',
                label: {
                  emphasis: {
                    show: true
                  }
                },
                labelLine: {
                  emphasis: {
                    show: true
                  }
                }
              },
              {
                value: 234,
                name: '喷淋末端水压'
              },
              {
                value: 135,
                name: '室外消火栓'
              },
              {
                value: 1048,
                name: '室内消火栓'
              },
              {
                value: 251,
                name: '独立式烟雾探测'
              },
              {
                value: 147,
                name: '可燃气体探测'
              }
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
  props: {
    showFlag: Boolean
  },
  watch: {
    showFlag: val => {
      this.showFlag1 = val;
    }
  },
  methods: {
    initEchart() {
      this.echart1 = echarts.init(document.getElementById('parkScoreEchart1'));
      this.echart1.setOption(this.echartOption1);
      this.echart2 = echarts.init(document.getElementById('parkScoreEchart2'));
      this.echart2.setOption(this.echartOption2);
      this.echart3 = echarts.init(document.getElementById('parkScoreEchart3'));
      this.echart3.setOption(this.echartOption3);
      this.echart4 = echarts.init(document.getElementById('parkScoreEchart4'));
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
.parkScore {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  .box {
    float: left;
    width: auto;
    min-width: 6rem;
    height: 4.65rem;
    .smallTitle {
      height: .45rem;
      width: 5rem;
      margin: .2rem 0 0 .1rem;
      padding: 0;
      background: linear-gradient(45deg, transparent 31px, rgba(33, 115, 144, 0.5) 0) top left,
        linear-gradient(135deg, transparent 31px, rgba(33, 115, 144, 0.5) 0) bottom left, linear-gradient(-135deg, transparent 15px, rgba(33, 115, 144, 0.5) 0) top right;
      background-repeat: no-repeat;
      // background-image: -webkit-linear-gradient(left, rgba(33,115,144, 0.4), rgba(33,115,144, 0.4));
      background-size: 50% 50%, 50% 50%, 50% 100%, 88.3% 100%;
      box-sizing: border-box;
      .logo {
        width: .45rem;
        height: .45rem;
        background-image: url('../../../../assets/img/new/titleLogo.png');
        background-size: 100%;
        float: left;
      }

      > span {
        width: calc(100% - .45rem);
        height: .45rem;
        color: #fff;
        float: left;
        line-height: .45rem;
        text-align: left;
        font-size: .26rem;
      }
    }
    .borderOut {
      margin: .2rem .5rem 0 .5rem;
      padding: .05rem;
      width: 6.2rem;
      height: 3.7rem;
      border-width: .01rem;
      border-style: solid;
      border-color: rgba(99, 116, 141, 0.3);
      box-sizing: border-box;
      position: relative;
      .angle {
        position: absolute;
        width: .2rem;
        height: .2rem;
      }
      .angle1 {
        top: -0.01rem;
        left: -0.01rem;
        border-left: .025rem solid rgba(99, 116, 141, 1);
        border-top: .025rem solid rgba(99, 116, 141, 1);
      }
      .angle2 {
        top: -0.01rem;
        right: -0.01rem;
        border-right: .025rem solid rgba(99, 116, 141, 1);
        border-top: .025rem solid rgba(99, 116, 141, 1);
      }
      .angle3 {
        bottom: -0.01rem;
        left: -0.01rem;
        border-left: .025rem solid rgba(99, 116, 141, 1);
        border-bottom: .025rem solid rgba(99, 116, 141, 1);
      }
      .angle4 {
        bottom: -0.01rem;
        right: -0.01rem;
        border-right: .025rem solid rgba(99, 116, 141, 1);
        border-bottom: .025rem solid rgba(99, 116, 141, 1);
      }
      .borderInner {
        width: 100%;
        height: 100%;
        border-width: .01rem;
        border-style: solid;
        border-color: rgba(22, 29, 39, 0.75);
        box-sizing: border-box;
      }
      .contentTitle {
        margin: .05rem auto 0;
        width: calc(100% - .1rem);
        height: .5rem;
        background-image: -webkit-linear-gradient(left, rgba(33, 115, 144, 0.6), rgba(33, 115, 144, 0.6));
        box-sizing: border-box;
        font-size: .16rem;
        .threePoint {
          width: .5rem;
          height: .5rem;
          margin-right: .2rem;
          background-image: url('../../../../assets/img/new/threePoint.png');
          background-position: center;
          background-size: 100%;
          background-repeat: no-repeat;
          float: right;
        }
        .titleContent {
          width: auto;
          min-width: 1rem;
          height: .5rem;
          margin-left: .2rem;
          line-height: .5rem;
          float: left;
          font-size: .16rem;
        }
        .titleData {
          width: auto;
          min-width: .3rem;
          height: .5rem;
          margin-right: .2rem;
          line-height: .5rem;
          float: left;
          color: aqua;
          font-size: .16rem;
        }
      }
      .contentBottom {
        margin: 0 auto .05rem;
        width: 100%;
        height: calc(100% - .55rem);
        background: linear-gradient(45deg, transparent .2rem, rgba(26, 90, 141, 0.3) 0) top center;
        background-size: calc(100% - .1rem) calc(100% - .05rem);
        background-repeat: no-repeat;
        box-sizing: border-box;
      }
    }
  }
}
</style>
