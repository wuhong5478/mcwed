<template>
  <div class="alert-blue">
    <!-- <transition name="bottom"> -->
    <div class="box">
      <div class="angle angle1"></div>
      <div class="angle angle2"></div>
      <div class="angle angle3"></div>
      <div class="angle angle4"></div>
      <div class="smallTitle">
        <span class="logo"></span>
        <span>设备报警趋势</span>
      </div>
      <div id="alertEchart1" class="contentBottom"></div>
    </div>
    <!-- </transition> -->
    <!-- <transition name="bottom"> -->
    <div class="box">
      <div class="angle angle1"></div>
      <div class="angle angle2"></div>
      <div class="angle angle3"></div>
      <div class="angle angle4"></div>
      <div class="smallTitle">
        <span class="logo"></span>
        <span>设备报警趋势</span>
      </div>
      <div id="alertEchart2" class="contentBottom"></div>
    </div>
    <!-- </transition> -->
    <!-- <transition name="bottom"> -->
    <div class="box">
      <div class="angle angle1"></div>
      <div class="angle angle2"></div>
      <div class="angle angle3"></div>
      <div class="angle angle4"></div>
      <div class="smallTitle">
        <span class="logo"></span>
        <span>报警未处置趋势</span>
      </div>
      <div id="alertEchart3" class="contentBottom" style="margin-top: 5px; height: calc(100% - 75px);"></div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import echarts from 'echarts';
// import liquidfill from 'echarts-liquidfill';

export default {
  name: 'alert',
  data() {
    return {
      showFlag3: false,
      echart1: null,
      echartOption1: {
        title: {
          text: '500',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: 30,
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} : {c} &nbsp;({d}%)'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['设备报警', '故障报警', '未处置时间'],
          textStyle: {
            color: '#fff',
            fontSize: 20
          }
        },
        series: [
          {
            name: '百分百',
            type: 'pie',
            radius: ['25%', '40%'],
            center: ['50%', '50%'],
            clockwise: false,
            silent: true,
            data: [{ value: 1, name: '' }],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#395666',
                opacity: 0.7
              }
            }
          },
          {
            name: '未处置时间',
            type: 'pie',
            radius: ['25%', '40%'],
            center: ['50%', '50%'],
            clockwise: false,
            hoverOffset: 0,
            data: [
              { value: 1, name: '' },
              {
                value: 1,
                name: '',
                itemStyle: {
                  opacity: 0
                },
                tooltip: {
                  show: false
                }
              }
            ],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#FDBD53',
                opacity: 0.7
              }
            }
          },
          {
            name: '百分百',
            type: 'pie',
            radius: ['41%', '56%'],
            center: ['50%', '50%'],
            clockwise: false,
            silent: true,
            data: [{ value: 1, name: '' }],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#395666',
                opacity: 0.7
              }
            }
          },
          {
            name: '故障报警',
            type: 'pie',
            radius: ['41%', '56%'],
            center: ['50%', '50%'],
            clockwise: true,
            hoverOffset: 0,
            data: [
              { value: 1, name: '' },
              {
                value: 1,
                name: '',
                itemStyle: {
                  opacity: 0
                },
                tooltip: {
                  show: false
                }
              }
            ],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#3FE7AF',
                opacity: 0.7
              }
            }
          },
          {
            name: '百分百',
            type: 'pie',
            radius: ['57%', '72%'],
            center: ['50%', '50%'],
            clockwise: false,
            silent: true,
            data: [{ value: 1, name: '' }],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#395666',
                opacity: 0.7
              }
            }
          },
          {
            name: '设备报警',
            type: 'pie',
            radius: ['57%', '72%'],
            center: ['50%', '50%'],
            clockwise: true,
            hoverOffset: 0,
            data: [
              { value: 1, name: '' },
              {
                value: 1,
                name: '',
                itemStyle: {
                  opacity: 0
                },
                tooltip: {
                  show: false
                }
              }
            ],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#69C0EB',
                opacity: 0.7
              }
            }
          }
        ]
      },
      echart2: null,
      echartOption2: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: 50,
          top: 70,
          left: 62
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#27669E',
              width: 2
            }
          },
          axisLabel: {
            interval: 0,
            color: '#1D73C5',
            fontSize: 20
          },
          z: 3,
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月']
        },
        yAxis: {
          name: '单位：次',
          nameTextStyle: {
            color: '#1D73C5',
            fontStyle: 20
          },
          nameGap: 20,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#1D73C5',
            fontSize: 20,
            opacity: 1
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              opacity: 1
            }
          }
        },
        series: [
          {
            name: '评估',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 4
              }
            },
            markPoint: {
              data: [
                {
                  name: '最大值',
                  type: 'max'
                }
              ]
            },
            itemStyle: {
              normal: {
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#8EBCE7' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#0D3B62' // 100% 处的颜色
                  }
                ])
              }
            },
            data: [988, 2005, 1782, 2103, 1432, 1512, 2923, 3999]
          }
        ]
      },
      echart3: null,
      echartOption3: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: 50,
          top: 70,
          left: 62
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#27669E',
              width: 2
            }
          },
          axisLabel: {
            interval: 0,
            color: '#1D73C5',
            fontSize: 20
          },
          z: 3,
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月']
        },
        yAxis: {
          name: '单位：次',
          nameTextStyle: {
            color: '#1D73C5',
            fontStyle: 20
          },
          nameGap: 20,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#1D73C5',
            fontSize: 20,
            opacity: 1
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              opacity: 1
            }
          }
        },
        series: [
          {
            name: '评估',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 4
              }
            },
            markPoint: {
              data: [
                {
                  name: '最大值',
                  type: 'max'
                }
              ]
            },
            itemStyle: {
              normal: {
                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#8EBCE7' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#0D3B62' // 100% 处的颜色
                  }
                ])
              }
            },
            data: [988, 2005, 1782, 2103, 1432, 1512, 2923, 3999]
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
      this.showFlag3 = val;
    }
  },
  methods: {
    initEchart() {
      this.echart1 = echarts.init(document.getElementById('alertEchart1'));
      this.echart1.setOption(this.echartOption1);
      this.echart2 = echarts.init(document.getElementById('alertEchart2'));
      this.echart2.setOption(this.echartOption2);
      this.echart3 = echarts.init(document.getElementById('alertEchart3'));
      this.echart3.setOption(this.echartOption3);
      window.addEventListener('resize', () => {
        this.echart1.resize();
        this.echart2.resize();
        this.echart3.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.alert-blue {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  .box {
    float: left;
    width: auto;
    min-width: 6rem;
    height: 4.65rem;
    margin: 0px .8rem;
    position: relative;
    border-width: .01rem;
    border-style: solid;
    border-color: rgba(99, 116, 141, 0.3);
    border-radius: .13rem;
    box-shadow: 0 0 .08rem rgba(99, 116, 141, 0.8);
    background: linear-gradient(45deg, transparent 0px, rgba(3, 13, 23, 0.3) 0) top center;
    background-size: calc(100% - .1rem) calc(100% - .1rem);
    background-repeat: no-repeat;
    background-position: center;
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
      border-radius: .13rem 0 0 0;
    }
    .angle2 {
      top: -0.01rem;
      right: -0.01rem;
      border-right: .025rem solid rgba(99, 116, 141, 1);
      border-top: .025rem solid rgba(99, 116, 141, 1);
      border-radius: 0 .13rem 0 0;
    }
    .angle3 {
      bottom: -0.01rem;
      left: -0.01rem;
      border-left: .025rem solid rgba(99, 116, 141, 1);
      border-bottom: .025rem solid rgba(99, 116, 141, 1);
      border-radius: 0 0 0 .13rem;
    }
    .angle4 {
      bottom: -0.01rem;
      right: -0.01rem;
      border-right: .025rem solid rgba(99, 116, 141, 1);
      border-bottom: .025rem solid rgba(99, 116, 141, 1);
      border-radius: 0 0 .13rem 0;
    }
    .smallTitle {
      height: .45rem;
      width: 5rem;
      margin: .2rem 0 0 .1rem;
      padding: 0;
      background: linear-gradient(45deg, transparent .31rem, rgba(33, 115, 144, 0.5) 0) top left,
        linear-gradient(135deg, transparent .31rem, rgba(33, 115, 144, 0.5) 0) bottom left, linear-gradient(-135deg, transparent .15rem, rgba(33, 115, 144, 0.5) 0) top right;
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
    .contentBottom {
      margin: .05rem auto 0;
      width: 100%;
      height: calc(100% - .75rem);
      box-sizing: border-box;
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
