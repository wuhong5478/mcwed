<template>
  <div class="fireAlarm">
    <div class="title"><span>火警统计</span></div>
    <div class="content">
      <div class="echartTitle"><span>火警报警统计</span></div>
      <div id="fireAlarm-echart1"></div>
      <div class="count-warp">
        <div id="fireAlarm-echart2"></div>
        <div id="fireAlarm-echart3"></div>
        <div>
          <span class='count-title'>当日火警数量</span>
          <span class="span1">{{dayNum}}件</span>
          <span class="span-Box">
            <span :class="{spanhu: dayThred === 'up', spanhd: dayThred !== 'up'}"></span>
            <span :class="{spanhutext: dayThred === 'up', spanhdtext: dayThred !== 'up'}">{{dayRatio}}</span>
            <span :class="{spantu: dayToThred === 'up', spantd: dayToThred !== 'up'}"></span>
            <span :class="{spantutext: dayToThred==='up', spantdtext: dayToThred !== 'up'}">{{dayTo}}</span>
          </span>
        </div>
        <div>
          <span class='count-title'>已处置火警</span>
          <span class="span1">{{dealNum}}件</span>
          <span class="span-Box">
            <span :class="{spanhu: dealThred === 'up', spanhd: dealThred !== 'up'}"></span>
            <span :class="{spanhutext: dealThred === 'up', spanhdtext: dealThred !== 'up'}">{{dealRatio}}</span>
            <span :class="{spantu: dealToThred === 'up', spantd: dealToThred !== 'up'}"></span>
            <span :class="{spantutext: dealToThred === 'up', spantdtext: dealToThred !== 'up'}">{{dealTo}}</span>
          </span>
        </div>
        <div>
          <span class='count-title'>未处置火警数量</span>
          <span class="span4">{{unDealNum}}件</span>
        </div>
      </div>
      <!-- <div class="count-warp2">
        <div>
          <span class='count-title'>今日火警数量</span>
          <span>{{showData.dayFireAlarm}}</span>
        </div>
      </div> -->
      <!-- <div class="count-warp">
       <div>
         <span class='count-title'>火警处理率</span>
         <span>{{showData.fireDisposalRate}}</span>
       </div>
         <div>
          <span class='count-title'>本周误报环比</span>
          <div class='trend'>
            <span>{{showData.weekFalseRatio}}</span>
            <div class="up" v-if="showData.weekFalseTrend === 'up'"></div>
            <div class="down" v-else-if="showData.weekNumTrend === 'down'"></div>
            <div class="chiping" v-else>-</div>
          </div>
        </div>
        <div>
          <span class='count-title'>今日误报率</span>
          <span>{{showData.dayFalseRate}}</span>
        </div>
         <div>
          <span class='count-title'>本周误报率</span>
          <span>{{showData.weekFalseRate}}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'fireAlarm',
  props: {
    update: {
      Boolean,
      default: false
    }
  },
  data() {
    return {
      dayNum: 0,
      dealNum: 0,
      unDealNum: 0,
      dayRatio: '',
      dayTo: '',
      dayThred: '',
      dayToThred: '',
      dealRatio: '',
      dealTo: '',
      dealThred: '',
      dealToThred: '',
      echart1: null,
      echart2: null,
      echart3: null,
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
          top: 5,
          left: 25,
          right: 0,
          bottom: 20
        },
        xAxis: [
          {
            axisTick: {
              show: false
            },
            axisLabel: {
              // color: '#fff',
              // fontSize: 10
              color: '#9BA8C1',
              fontSize: 10,
              fontWeight: 400
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 1
              }
            },
            type: 'category',
            z: 3,
            data: ['一月', '二月', '三月', '四月', '五月', '六月' , '七月', '八月', '九月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              // color: '#1D73C5',
              // color: '#fff',
              // fontSize: 10,
              // opacity: 1
              color: '#9BA8C1',
              fontSize: 10,
              fontWeight: 400
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                opacity: 1
              }
            }
            // minInterval: 20,
            // max: value => {
            //   return value.max !== 0 ? (~~(value.max / 20) + 1) * 20 : 80
            // }
          }
        ],
        series: [
          {
            name: '设备报警',
            type: 'bar',
            // barWidth: '50%',
            stack: 'sum',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#549AFE' }, { offset: 1, color: '#6CB4FE' }])
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '人员报警',
            type: 'bar',
            // barWidth: '50%',
            stack: 'sum',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#2A9975' }, { offset: 1, color: '#42C1D3' }])
              },
              opacity: 0.8
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
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
        series: [
          {
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
            data: [
              {
                value: 1,
                name: '底色'
              }
            ]
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
            data: [
              {
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
        series: [
          {
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
            data: [
              {
                value: 1,
                name: '底色'
              }
            ]
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
            data: [
              {
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
        series: [
          {
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
          }
        ]
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
      this.$services.get({
        type: 'LARGE',
        url: 'fire1GetData',
        params: {
          type: 'fireWarn'
        }
      }).then(({ data }) => {
        console.log('fireGetData: ', data);
        this.setData(data);
      });
    },
    setData(data) {
      this.dayNum = data.dayNum;
      this.dealNum = data.dealNum;
      this.unDealNum = data.unDealNum;
      this.dayRatio = data.dayRatio;
      this.dayTo = data.dayTo;
      this.dayThred = data.dayThred;
      this.dayToThred = data.dayToThred;
      this.dealRatio = data.dealRatio;
      this.dealTo = data.dealTo;
      this.dealThred = data.dealThred;
      this.dealToThred = data.dealToThred;
      this.monthData = [];
      this.echart1Data1 = [];
      this.echart1Data2 = [];
      let person = [];
      let device = [];
      if (data.data[0].name === 'person') {
        person = data.data[0].data;
        device = data.data[1].data;
      }
      else {
        device = data.data[0].data;
        person = data.data[1].data;
      }
      for (let i = 0; i < device.length; i++) {
        let item = device[i];
        this.monthData.push(this.$utils.monthChange(item.type));
        this.echart1Data1.push({
          name: this.$utils.monthChange(item.type),
          value: item.data
        });
      }
      for (let j = 0; j < person.length; j++) {
        let item = person[j];
        this.echart1Data2.push({
          name: this.$utils.monthChange(item.type),
          value: item.data
        });
      }
      this.echart2Data = data.secondRate ? Number(data.secondRate.replace(/%/, '')) : 0;
      this.echart3Data = data.minuteRate ? Number(data.minuteRate.replace(/%/, '')) : 0;
      this.echartOption1.xAxis[0].data = this.monthData;
      this.echartOption1.series[0].data = this.echart1Data1;
      this.echartOption1.series[1].data = this.echart1Data2;
      this.echartOption2.title.subtext = this.echart2Data + '%';
      this.echartOption2.series[1].data[0].value = this.echart2Data;
      this.echartOption2.series[1].data[1].value = 100 - this.echart2Data;
      this.echartOption3.title.subtext = this.echart3Data + '%';
      this.echartOption3.series[1].data[0].value = this.echart3Data;
      this.echartOption3.series[1].data[1].value = 100 - this.echart3Data;
      this.initEchart();
    },
    initEchart() {
      if (!this.echart1) {
        this.echart1 = echarts.init(document.getElementById('fireAlarm-echart1'));
      }
      if (!this.echart2) {
        this.echart2 = echarts.init(document.getElementById('fireAlarm-echart2'));
      }
      if (!this.echart3) {
        this.echart3 = echarts.init(document.getElementById('fireAlarm-echart3'));
      }
      this.echart1.setOption(this.echartOption1);
      this.echart2.setOption(this.echartOption2);
      this.echart3.setOption(this.echartOption3);
      window.addEventListener('resize', () => {
        this.echart1.resize();
        this.echart2.resize();
        this.echart3.resize();
      });
    }
  },
  watch: {
    update(val) {
      this.getData();
    }
  }
};
</script>

<style lang="scss">
.fireAlarm {
  width: 100%;
  height: 100%;
  // .title > span{
  //   background: url('../../../../assets/img/new/fireAlarm.png') no-repeat left center;
  //   background-size: auto 80%;
  // }
  .echartTitle {
    text-align: left;
    font-size: .24rem;
    width: 50%;
    height: .35rem;
    line-height: .35rem;
    font-weight: 700;
    color: #D3E2FF;
    margin: 0 0 .1rem;
  }
  #fireAlarm-echart{
    width: 100%;
    height: 40%;
  }
  #fireAlarm-echart1 {
    width: 100%;
    // height: 40%;
    height: calc(40% - .2rem);
    margin: 0 0 .1rem;
  }
  #fireAlarm-echart2 {
    // width: 50%;
    // height: 15%;
    // float: left;
    margin: 0 0 .1rem;
  }
  #fireAlarm-echart3 {
    // width: 50%;
    // height: 15%;
    // float: left;
    margin: 0 0 .1rem;
  }
  .count-warp{
    width: 100%;
    height: calc(60% - .4rem);
    // padding-left: 0.1rem;
    padding-top: 0.05rem;
    // display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div:nth-child(3), > div:nth-child(4){
      height: calc(40% - .1rem);
    }
    > div:nth-child(5){
      height: calc(26.6% - .1rem);
      margin-top: .1rem;
      .count-title {
        height: 50%;
      }
    }
    > div:nth-child(3), > div:nth-child(5){
      padding-right: .1rem;
      padding-left: 0;
      width: calc(50% - .13rem);
    }
    > div:nth-child(3){
      border-right: 0.03rem solid rgba(148, 166, 190, 0.3);
    }
    > div{
      width: calc(50% - .1rem);
      height: calc(33.3% - .1rem);
      font-size: .36rem;
      font-weight: bolder;
      text-align: left;
      float: left;
      padding-left: .1rem;
      >span {
        display: block;
        width: 100%;
      }
      .span1{
        height: 35%;
        color:#0088FF;
        font-size: .3rem;
      }
      .span-Box{
        height: 30%;
        display: flex;
        > span{
          // width: 20%;
          width: .6rem;
          height: .3rem;
          line-height: .3rem;
        }
        > span:nth-child(2), span:nth-child(4){
          width: 30%;
          text-align: center;
        }
      }
      .span4{
        color:#0088FF;
        font-size:.3rem;
        height: 50%;
      }
      .spanhd{
        width: 22%;
        background: url("../../../../assets/img/new/icon_h_down.png") no-repeat center center;

      }
      .spanhu{
        width: 22%;
        background: url("../../../../assets/img/new/icon_h_up.png") no-repeat center center;

      }
      .spanhutext{
        width: 22%;
        color: #2FC25B;
        font-size:.20rem;
      }
      .spanhdtext{
        width: 22%;
        color: #F04862;
        font-size:.20rem;

      }
      .spantd{
        width: 25%;
        color: #F04862;
        font-size:.30rem;
        margin-left: 0.2rem;
        background: url("../../../../assets/img/new/icon_t_down.png") no-repeat left center;
      }
      .spantu{
        width: 25%;
        color: #2FC25B;
        font-size:.30rem;
        margin-left: 0.2rem;
        background: url("../../../../assets/img/new/icon_t_up.png") no-repeat left center;
      }
      .spantdtext{
        width: 25%;
        color: #F04862;
        font-size:.20rem;
      }
      .spantutext{
        width: 25%;
        color: #2FC25B;
        font-size:.20rem;
      }
      .count-title{
        height: 35%;
        font-size: .24rem;
        font-weight: 700;
        color: #D3E2FF;
      }
    }
  }
  .count-warp2{
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-around;
    > div{
      width: 50%;
      height: calc(50% - .1rem);
      font-size: .36rem;
      font-weight: bolder;
      text-align: center;
      padding-top: .4rem;
      > span{
        display: block;
      }
      .count-title{
        font-size: .23rem;
        font-weight: normal;
      }
    }
  }
}
</style>
