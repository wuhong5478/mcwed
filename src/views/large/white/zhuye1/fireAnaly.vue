<template>
  <div class="fireAnaly">
    <div class="title">
      <span>火警分析</span>
      <div class="quit" @click="closefireAnaly()">×</div>
    </div>
    <div class="firecontent">
      <div class="top">
        <div class="duan">
          <span class="textspan">今日报警数量</span>
          <span class="textblue">{{todayNum}}个</span>
        </div>
        <div class="line"></div>
        <div class="duan">
          <span class="textspan">今日已处理报警数量</span>
          <span class="textblue">{{todayDealNum}}个</span>
        </div>
        <div class="line"></div>
        <div class="duan">
          <span class="textspan">本月火警数量</span>
          <span class="textblue">{{monthNum}}个</span>
        </div>
        <div class="line"></div>
        <div class="duan">
          <span class="textspan">确认火警数量</span>
          <span class="textblue">{{monthAffirmNum}}个</span>
        </div>
      </div>
      <div class="line1"></div>
      <div class="center">
        <div>
          <div class="echartTitle">月火警趋势</div>
          <div id="fireAnaly-echart1" class="fireAnaly-echart"></div>
        </div>
        <div>
          <div class="echartTitle">报警来源</div>
          <div id="fireAnaly-echart2" class="fireAnaly-echart"></div>
        </div>
        <div>
          <div class="echartTitle">处理时间</div>
          <div id="fireAnaly-echart3" class="fireAnaly-echart"></div>
        </div>
        <div>
          <div class="echartTitle">3分钟到场率</div>
          <div id="fireAnaly-echart4" class="fireAnaly-echart"></div>
        </div>
        <div>
          <div class="echartTitle">60s触达率</div>
          <div id="fireAnaly-echart5" class="fireAnaly-echart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'fireAnaly',
  props: {
    isfireAnaly: {
      Object,
      default: () => {}
    }
  },
  data() {
    return {
      personList: null,
      todayDealNum: null,
      monthAffirmNum: null,
      sixArriveRate: null,
      todayNum: null,
      overSixArriveRate: null,
      dealList: null,
      threeAffirmRate: null,
      overThreeAffirmRate: null,
      oneAffirmRate: null,
      deviceList: null,
      dealNum: [],
      dealType: [],
      fireNum: [],
      fireType: [],
      deviceNum: [],
      persionType: [],
      persionNum: [],
      monthNum: null,
      echart1: null,
      echart2: null,
      echart3: null,
      echart4: null,
      echart5: null,
      echart1Xdata: [],
      echart1Data1: [],
      echart1Data2: [],
      echart2Data: 0,
      echart3Data: 0,
      monthData: [],
      showData: {
        dayFireAlarm: '0',
        dayFalseRate: '0%',
        weekFalseRate: '0%',
        fireDisposalRate: '0%',
        weekFalseRatio: '0%',
        weekFalseTrend: ''
      },
      echartOption1: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '20%',
          right: '5%',
          bottom: '30%'
        },
        xAxis: [{
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#7F8A92',
            fontSize: 10
          },
          axisLine: {
            lineStyle: {
              color: '#DCDFE1',
              width: 1
            }
          },
          type: 'category',
          z: 3,
          data: []
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            // color: '#1D73C5',
            color: '#7F8A92',
            fontSize: 10,
            opacity: 1
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              opacity: 1
            }
          }
        }],
        series: [{
          name: '设备报警',
          type: 'bar',
          // barWidth: '50%',
          stack: 'sum',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#549AFE'
              }, {
                offset: 1,
                color: '#6CB4FE'
              }])
            }
          },
          data: []
        },
        {
          name: '人员报警',
          type: 'bar',
          // barWidth: '50%',
          stack: 'sum',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#2A9975'
              }, {
                offset: 1,
                color: '#42C1D3'
              }])
            },
            opacity: 0.8
          },
          data: []
        }
        ]
      },
      echartOption2: {
        title: {
          text: '60s触达率',
          subtext: '',
          x: '50%',
          y: '10%',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 10
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        series: [{
          name: '底色',
          type: 'pie',
          silent: true,
          center: ['25%', '50%'],
          radius: ['60%', '95%'],
          itemStyle: {
            normal: {
              color: '#4E6580'
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
          data: [{
            value: 1,
            name: '底色'
          }]
        },
        {
          name: '60s内',
          type: 'pie',
          selectedMode: 'single',
          silent: true,
          hoverOffset: 0,
          center: ['25%', '50%'],
          radius: ['60%', '95%'],
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
          data: [{
            value: 0,
            name: '数值',
            itemStyle: {
              normal: {
                color: '#3091FA'
              }
            }
          },
          {
            value: 0,
            name: '填充',
            itemStyle: {
              normal: {
                opacity: 0
              }
            }
          }
          ]
        }
        ]
      },
      echartOption3: {
        title: {
          text: '三分钟到场率',
          subtext: '',
          x: '50%',
          y: '10%',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 10
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        series: [{
          name: '底色',
          type: 'pie',
          silent: true,
          center: ['25%', '50%'],
          radius: ['60%', '95%'],
          itemStyle: {
            normal: {
              color: '#4E6580'
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
          data: [{
            value: 1,
            name: '底色'
          }]
        },
        {
          name: '三分钟内',
          type: 'pie',
          selectedMode: 'single',
          silent: true,
          hoverOffset: 0,
          center: ['25%', '50%'],
          radius: ['60%', '95%'],
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
          data: [{
            value: 0,
            name: '数值',
            itemStyle: {
              normal: {
                color: '#D34F7C'
              }
            }
          },
          {
            value: 0,
            name: '填充',
            itemStyle: {
              normal: {
                opacity: 0
              }
            }
          }
          ]
        }
        ]
      },
      echartOptionOld: {
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false,
          data: ['火灾报警'],
          top: '0',
          x: 'right',
          itemGap: 15,
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          left: '10%',
          top: '18%',
          right: '1%',
          bottom: '18%'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          name: '火灾报警',
          data: [],
          smooth: true,
          itemStyle: {
            color: '#4BC9FF'
          },
          lineStyle: {
            color: '#4BC9FF'
          },
          areaStyle: {
            color: '#4BC9FF',
            opacity: 0.4
          }
        }]
      },
      echartOption4: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {

          textStyle: {
            color: '#7F8A92'
          },
          data: []
        },
        grid: {
          top: '20%',
          right: '5%',
          bottom: '30%'
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0, // 强制全部显示，1表示隔一个；2隔两个
            rotate: 0,
            showMinLabel: true,
            showMaxLabel: true,
            color: '#7F8A92'

          },
          data: [],
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#DCDFE1'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          name: '      火警数量(个)',
          nameGap: 5,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#7F8A92'
            }

          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: '火警数量',
          type: 'line',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#0092f6',
              lineStyle: {
                color: '#0092f6',
                width: 1
              }
            }
          },

          data: []
        }]
      },
      echartOption5: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {

          textStyle: {
            color: '#7F8A92'
          },
          data: ['设备报警', '人工报警']
        },
        grid: {
          top: '20%',
          right: '5%',
          bottom: '30%'
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0, // 强制全部显示，1表示隔一个；2隔两个
            rotate: 0,
            showMinLabel: true,
            showMaxLabel: true,
            color: '#7F8A92'
          },

          data: [],
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#DCDFE1'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#7F8A92'
            }

          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: '人工报警',
          type: 'line',
          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#36A378',
              lineStyle: {
                color: '#36A378',
                width: 1
              },
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(54,163,120,0.1)'
                }, {
                  offset: 1,
                  color: 'rgba(54,163,120,0.9)'
                }])
              }
            }
          },

          data: [1, 2, 3]
        },
        {
          name: '设备报警',
          type: 'line',

          symbol: 'none',
          itemStyle: {
            normal: {
              color: '#0092f6',
              lineStyle: {
                color: '#0092f6',
                width: 1
              },
              areaStyle: {
                // color: '#94C9EC'
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(7,44,90,0.1)'
                }, {
                  offset: 1,
                  color: 'rgba(0,146,246,0.9)'
                }])
              }
            }
          },
          data: [4, 5, 6]
        }
        ]
      },
      echartOption6: {
        tooltip: {

        },
        title: [{
          text: '1分钟内',
          subtext: '',
          x: '8.67%',
          y: 'bottom',
          textStyle: {
            fontWeight: 'normal',
            color: '#DCDFE1',
            fontSize: 10
          },
          subtextStyle: {
            color: '#DCDFE1',
            fontSize: 12
          }
        },
        {
          text: '3分钟内',
          subtext: '',
          x: '42%',
          y: 'bottom',
          textStyle: {
            fontWeight: 'normal',
            color: '#DCDFE1',
            fontSize: 10
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        {
          text: '3分钟外',
          subtext: '',
          x: '74.33%',
          y: 'bottom',
          textStyle: {
            fontWeight: 'normal',
            color: '#DCDFE1',
            fontSize: 10
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 12
          }
        }
        ],
        series: [{
          name: '底色',
          type: 'pie',
          silent: true,
          center: ['16.67%', '45%'],
          radius: ['45%', '57%'],
          itemStyle: {
            normal: {
              color: '#4E6580'
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
          data: [{
            name: '底色'
          }]
        },
        {
          name: '1分钟内',
          type: 'pie',
          selectedMode: 'single',
          silent: true,
          hoverOffset: 0,
          center: ['16.67%', '45%'],
          radius: ['45%', '57%'],
          itemStyle: {
            normal: {
              color: '#3196FA'
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
          data: [{
            itemStyle: {
              normal: {
                color: '#3096FA'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'center',
                color: '#DCDFE1'
              }
            }
          },
          {
            name: '填充',
            itemStyle: {
              normal: {
                opacity: 0
              }
            }
          }
          ]
        },
        {
          name: '底色',
          type: 'pie',
          silent: true,
          center: ['50%', '45%'],
          radius: ['45%', '57%'],
          itemStyle: {
            normal: {
              color: '#4E6580'
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
          data: [{
            name: '底色'
          }]
        },
        {
          name: '3分钟内',
          type: 'pie',
          selectedMode: 'single',
          silent: true,
          hoverOffset: 0,
          center: ['50%', '45%'],
          radius: ['45%', '57%'],
          itemStyle: {
            normal: {
              color: '#2FC25B'
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
          data: [{
            itemStyle: {
              normal: {
                color: '#2FC25B'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'center',
                color: '#DCDFE1'
              }
            }
          },
          {
            name: '填充',
            itemStyle: {
              normal: {
                opacity: 0
              }
            }
          }
          ]
        },
        {
          name: '底色',
          type: 'pie',
          silent: true,
          center: ['83.33%', '45%'],
          radius: ['45%', '57%'],
          itemStyle: {
            normal: {
              color: '#4E6580'
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
          data: [{
            name: '底色'
          }]
        },
        {
          name: '3分钟外',
          type: 'pie',
          selectedMode: 'single',
          silent: true,
          hoverOffset: 0,
          center: ['83.33%', '45%'],
          radius: ['45%', '57%'],
          itemStyle: {
            normal: {
              color: '#EF4864'
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
          data: [{
            itemStyle: {
              normal: {
                color: '#EF4864'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'center',
                color: '#DCDFE1'
              }
            }
          },
          {
            name: '填充',
            itemStyle: {
              normal: {
                opacity: 0
              }
            }
          }
          ]
        }
        ]
      },
      echartOption7: {
        tooltip: {

        },
        series: [
          {
            name: '60s触达率',
            type: 'pie',
            selectedMode: 'single',
            clockwise: false,
            silent: true,
            hoverOffset: 0,
            center: ['50%', '50%'],
            radius: ['40%', '63%'],
            itemStyle: {
              normal: {
                color: '#3196FA'
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
            data: [{
              itemStyle: {
                normal: {
                  color: '#3196FA'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  color: '#DCDFE1',
                  fontSize: 10
                }
              }
            },
            {
              itemStyle: {
                normal: {
                  color: '#EF4864'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  color: '#DCDFE1',
                  fontSize: 10
                }
              }
            }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    /* this.$nextTick(() => {
      this.getData();
    }); */
  },
  methods: {
    closefireAnaly() {
      this.$emit('closefireAnaly');
    },
    cleanData() {
      this.personList = null;
      this.todayDealNum = null;
      this.monthAffirmNum = null;
      this.sixArriveRate = null;
      this.todayNum = null;
      this.overSixArriveRate = null;
      this.dealList = null;
      this.threeAffirmRate = null;
      this.overThreeAffirmRate = null;
      this.oneAffirmRate = null;
      this.deviceList = null;
      this.dealNum = [];
      this.dealType = [];
      this.fireNum = [];
      this.fireType = [];
      this.deviceNum = [];
      this.persionType = [];
      this.persionNum = [];
    },
    getData() {
      this.cleanData();
      if (this.isfireAnaly) {
        this.$services.get({
          type: 'LARGE',
          url: 'getFireWarnAnalysisData',
          params: {
            lat: this.isfireAnaly.latitude,
            lng: this.isfireAnaly.longitude,
            type: 'map'
          }
        }).then(({ data }) => {
          console.log('getFireWarnAnalysisData: ', data);
          this.setData(data);
        });
      }
    },
    setData(data) {
      this.personList = data.personList;
      this.todayDealNum = data.todayDealNum;
      this.monthAffirmNum = data.monthAffirmNum;
      this.sixArriveRate = data.sixArriveRate;
      this.todayNum = data.todayNum;
      this.overSixArriveRate = data.overSixArriveRate;
      this.dealList = data.dealList;
      this.threeAffirmRate = data.threeAffirmRate;
      this.overThreeAffirmRate = data.overThreeAffirmRate;
      this.oneAffirmRate = data.oneAffirmRate;
      this.deviceList = data.deviceList;
      this.monthNum = data.monthNum;

      for (let i = 0; i < data.fireNumList.length; i++) {
        let type = data.fireNumList[i].type;
        let typeName = this.$utils.monthChange(type.substring(0, type.length - 1));
        this.fireType.push(typeName);
        this.fireNum.push(data.fireNumList[i].data);
      }
      for (let j = 0; j < data.personList.length; j++) {
        let type = data.personList[j].type;
        let typeName = this.$utils.monthChange(type.substring(0, type.length - 1));
        this.persionType.push(typeName);
        this.persionNum.push(data.personList[j].data);
      }
      for (let j = 0; j < data.deviceList.length; j++) {
        this.deviceNum.push(data.deviceList[j].data);
      }
      for (let j = 0; j < data.dealList.length; j++) {
        this.dealType.push(data.dealList[j].type);
        this.dealNum.push(data.dealList[j].data);
      }

      this.echartOption4.xAxis[0].data = this.fireType;
      this.echartOption4.series[0].data = this.fireNum;
      this.echartOption5.xAxis[0].data = this.persionType;
      this.echartOption5.series[0].data = this.persionNum;
      this.echartOption5.series[1].data = this.deviceNum;
      this.echartOption1.xAxis[0].data = this.dealType;
      this.echartOption1.series[0].data = this.dealNum;
      this.echartOption6.series[0].data[0].value = 100 - parseInt(this.oneAffirmRate.replace('%', ''));
      this.echartOption6.series[1].data[0].value = parseInt(this.oneAffirmRate.replace('%', ''));
      this.echartOption6.series[1].data[0].name = this.oneAffirmRate;
      this.echartOption6.series[1].data[1].value = 100 - parseInt(this.oneAffirmRate.replace('%', ''));
      this.echartOption6.series[2].data[0].value = 100 - parseInt(this.threeAffirmRate.replace('%', ''));
      this.echartOption6.series[3].data[0].value = parseInt(this.threeAffirmRate.replace('%', ''));
      this.echartOption6.series[3].data[0].name = this.threeAffirmRate;
      this.echartOption6.series[3].data[1].value = 100 - parseInt(this.threeAffirmRate.replace('%', ''));
      this.echartOption6.series[4].data[0].value = 100 - parseInt(this.overThreeAffirmRate.replace('%', ''));
      this.echartOption6.series[5].data[0].value = parseInt(this.overThreeAffirmRate.replace('%', ''));
      this.echartOption6.series[5].data[0].name = this.overThreeAffirmRate;
      this.echartOption6.series[5].data[1].value = 100 - parseInt(this.overThreeAffirmRate.replace('%', ''));

      /* this.echartOption7.series[0].data[0].name = 65 + '%\n60s内到达';
      this.echartOption7.series[0].data[1].name = 35 + '%\n60s内到达'; */
      this.echartOption7.series[0].data[0].name = this.sixArriveRate + '%\n60s内到达';
      this.echartOption7.series[0].data[1].name = this.overSixArriveRate + '%\n60s内到达';
      this.echartOption7.series[0].data[0].value = parseInt(this.sixArriveRate.replace('%'), '');
      this.echartOption7.series[0].data[1].value = parseInt(this.overSixArriveRate.replace('%'), '');

      this.initEchart();
    },
    initEchart() {
      if (!this.echart1) {
        this.echart1 = echarts.init(document.getElementById('fireAnaly-echart1'));
      }
      if (!this.echart2) {
        this.echart2 = echarts.init(document.getElementById('fireAnaly-echart2'));
      }
      if (!this.echart3) {
        this.echart3 = echarts.init(document.getElementById('fireAnaly-echart3'));
      }
      if (!this.echart4) {
        this.echart4 = echarts.init(document.getElementById('fireAnaly-echart4'));
      }
      if (!this.echart5) {
        this.echart5 = echarts.init(document.getElementById('fireAnaly-echart5'));
      }
      this.echart1.setOption(this.echartOption4);
      this.echart2.setOption(this.echartOption5);
      this.echart3.setOption(this.echartOption1);
      this.echart4.setOption(this.echartOption6);
      this.echart5.setOption(this.echartOption7);
      window.addEventListener('resize', () => {
        this.echart1.resize();
        this.echart2.resize();
        this.echart3.resize();
        this.echart4.resize();
        this.echart5.resize();
      });
    }
  },
  watch: {
    isfireAnaly(val) {
      // console.log(val,this.isfireAnaly,'...');
      if(val){
        this.getData();
      }
      
    }
  }
};
</script>

<style lang="scss">
  .fireAnaly {
    width: 100%;
    height: 100%;
    background: #3A4854;
    border-radius: 8px;
    // border-style: solid;
    border-color: rgba(#000, 0.3);
    box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
    .title {
      width: 100%;
      height: 7%;
      .quit{
        float:right;
        width: 5%;
        color: white;
        font: 100 0.6rem/.6rem Tahoma,Verdana,sans-serif;
        cursor: pointer;
      }
    }

    .firecontent {
      width: calc(100% - .9rem);
      height: calc(100% - .72rem);
      padding: 0 .45rem;

      .top {
        width: 100%;
        height: 15%;

        .line {
          width: 1%;
          height: 50%;
          border-right: 1px solid #7F8A92;
          float: left;
          margin-top: 2.4%;
          text-align: left;
          margin-right: 0.45rem;
        }

        .duan {
          width: 21%;
          height: 100%;
          float: left;
          text-align: left;
          .textspan {
            display: block;
            color: #DCDFE1;
            margin-top: 10%;
            font-size: 0.25rem;

          }

          .textblue {
            display: block;
            color: #0088FF;
            padding: 0.2rem 0 0 0;
          }
        }
      }

      .line1 {
        width: 100%;
        height: 1%;
        border-bottom: 1px solid #7F8A92;
      }

      .center {
        width: 100%;
        height: 84%;
        display: flex;
        flex-wrap: wrap;
        >div {
          width: 50%;
          height: 33.33%;
        }

        .echartTitle {
          height: .6rem;
          line-height: .6rem;
          width: 100%;
          text-align: left;
          font-size: 0.25rem;
        }

        .fireAnaly-echart{
          width: 100%;
          height: calc(100% - .6rem);
        }
      }
    }
  }
</style>
