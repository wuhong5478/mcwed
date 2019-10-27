<template>
  <div class="equipment">
    <!-- <transition name="bottom"> -->
    <div class="box">
      <div class="angle angle1"></div>
      <div class="angle angle2"></div>
      <div class="angle angle3"></div>
      <div class="angle angle4"></div>
      <div class="smallTitle">
        <span class="logo"></span>
        <span>设备情况</span>
      </div>
      <div id="equipmentEchart1" class="contentBottom"></div>
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
        <span>设备情况</span>
      </div>
      <div id="equipmentEchart2" class="contentBottom"></div>
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
        <span>设备故障趋势</span>
      </div>
      <div id="equipmentEchart3" class="contentBottom" style="margin-top: 5px; height: calc(100% - 75px);"></div>
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
        <span>设备故障趋势</span>
      </div>
      <div id="equipmentEchart4" class="contentBottom" style="margin-top: 5px; height: calc(100% - 75px);"></div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import echarts from 'echarts';
import liquidFill from 'echarts-liquidfill';

console.log(liquidFill);

export default {
  name: 'equipment',
  data() {
    return {
      showFlag2: true,
      echart1: null,
      echartOption1: {
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
      },
      echart2: null,
      echartOption2: {
        title: {
          top: '45%',
          left: 'center',
          text: '设备在线占比',
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 22
          },
          subtext: '50%',
          subtextStyle: {
            color: '#fff',
            fontSize: 22
          }
        },
        series: [
          {
            type: 'liquidFill',
            name: '今日完成进度',
            data: [
              {
                value: 0.5,
                itemStyle: {
                  normal: {
                    color: '#53d5ff',
                    opacity: 0.4
                  }
                }
              }
            ],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#14F7FD'
              },
              {
                offset: 1,
                color: '#769AF7'
              }
            ]),
            center: ['50%', '50%'],
            label: {
              normal: {
                formatter: '',
                textStyle: {
                  fontSize: 12
                }
              }
            },
            backgroundStyle: {
              borderWidth: 0, // 内边框宽度
              color: '#042D43', // 背景颜色
              opacity: 0.7
            },
            outline: {
              itemStyle: {
                borderWidth: 0
              },
              borderDistance: 0
            }
          },
          {
            type: 'pie',
            radius: ['50%', '53%'],
            silent: true,
            hoverAnimation: false, // 设置饼图默认的展开样式
            label: {
              show: false
            },
            labelLine: {
              normal: {
                show: false
              }
            },

            itemStyle: {
              // 此配置
              normal: {
                color: '#2F99D5',
                opacity: 1
              }
            },
            data: [1]
          },
          {
            type: 'pie',
            radius: ['50%', '60%'],
            silent: true,
            hoverAnimation: false, // 设置饼图默认的展开样式
            label: {
              show: false
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7,
                color: '#042D43'
              }
            },
            data: [1]
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
      },
      echart4: null,
      echartOption4: {
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
      this.showFlag2 = val;
    }
  },
  methods: {
    initEchart() {
      this.echart1 = echarts.init(document.getElementById('equipmentEchart1'));
      this.echart1.setOption(this.echartOption1);
      this.echart2 = echarts.init(document.getElementById('equipmentEchart2'));
      this.echart2.setOption(this.echartOption2);
      this.echart3 = echarts.init(document.getElementById('equipmentEchart3'));
      this.echart3.setOption(this.echartOption3);
      this.echart4 = echarts.init(document.getElementById('equipmentEchart4'));
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
.equipment {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  .box {
    float: left;
    width: auto;
    min-width: 6rem;
    height: 4.65rem;
    margin: 0px .50rem;
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
    box-sizing: border-box;
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
  }
}
</style>
