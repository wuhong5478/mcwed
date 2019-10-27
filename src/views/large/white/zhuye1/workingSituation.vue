<template>
  <div class="workingSituation">
    <div class="title"><span>隐患统计</span></div>
    <div class="content">
      <div class="echarttitle"><span>隐患数量统计</span></div>
      <div id="workingSituation-echart"></div>
      <div class="text" >
        <span class="textspan">
          <span class="titlespan">今日发现隐患</span>
          <span class="threndspan">
            <span class="jianspand">{{dayFireAlarm}}件</span>
            <span v-if="dayThred === 'up'" class="picspanu"></span>
            <span v-else class="picspand"></span>
            <span v-if="dayThred === 'up'" class="numspanu">{{dayRatio}}</span>
            <span v-else class="numspand">{{dayRatio}}</span>
          </span>
        </span>
        <span class="textspan1">
          <span class="titlespan">已处理隐患</span>
          <span class="threndspan">{{dayDeal}}件</span>
        </span>
      </div>
      <div class="count-warp">
        <div class="div">
          <!-- <div class="line"></div> -->
          <span class='count-title'>本月隐患数量</span>
          <span class="span1">{{monthNum}}件</span>
          <span class="span-Box">
            <span class="spanhu" v-if="monthRatioThred==='up'"></span>
            <span class="spanhd" v-else></span>
            <span class="spanhutext" v-if="monthRatioThred==='up'">{{monthRatio}}</span>
            <span class="spanhdtext" v-else>{{monthRatio}}</span>
            <span class="spantu" v-if="monthToThred==='up'"></span>
            <span class="spantd" v-else></span>
            <span class="spantutext" v-if="monthToThred==='up'">{{monthTo}}</span>
            <span class="spantdtext" v-else>{{monthTo}}</span>
          </span>
        </div>
        <div class="div">
          <span class='count-title'>隐患处置率</span>
          <span class="span1">{{dealRate}}</span>
          <span class="span-Box">
            <span class="spanhu" v-if="dealRatioThred==='up'"></span>
            <span class="spanhd" v-else></span>
            <span class="spanhutext" v-if="dealRatioThred==='up'">{{dealRatio}}</span>
            <span class="spanhdtext" v-else>{{dealRatio}}</span>
            <span class="spantu" v-if="dayToThred==='up'"></span>
            <span class="spantd" v-else> </span>
            <span class="spantutext" v-if="dayToThred==='up'">{{dealTo}}</span>
            <span class="spantdtext" v-else>{{dealTo}}</span>
          </span>
        </div>
        <div class="div">
          <!-- <div class="line1"></div> -->
          <span class='count-title'>重大未处理隐患</span>
          <span class="span4">{{importNum}}件</span>
        </div>
        <div class="div">
          <span class='count-title'>超时未处理隐患</span>
          <span class="span4">{{overNum}}件</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'workingSituation',
  props: {
    wsData: {
      Object,
      default: () => {}
    },
    update: {
      Boolean,
      default: false
    }
  },
  data() {
    return {
      echartdata: null,
      dayDeal: null,
      dayFireAlarm: null,
      dayThred: null,
      dayToThred: null,
      dealRate: null,
      dealRatio: null,
      dealRatioThred: null,
      dealTo: null,
      monthNum: null,
      monthRatio: null,
      monthRatioThred: null,
      monthTo: null,
      monthToThred: null,
      importNum: null,
      dayRatio: null,
      overNum: null,
      echart: null,
      echartOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          bottom: '0',
          textStyle: {
            color: '#D3E2FF',
            fontSize: 10,
            fontWeight: 400
          },
          data: ['设备隐患', '人员上报隐患']
        },
        grid: {
          top: 5,
          left: 25,
          right: 0,
          bottom: 40
        },
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,
            axisLabel: {
              interval: 0, // 强制全部显示，1表示隔一个；2隔两个
              rotate: 0,
              showMinLabel: true,
              showMaxLabel: true,
              color: '#9BA8C1',
              fontSize: 10,
              fontWeight: 400
              // formatter: function(params) {
              //   let newParamsName = ''; // 最终拼接成的字符串
              //   let paramsNameNumber = params.length; // 实际标签的个数
              //   let rowNumber = 2; // 换行的话，需要显示几行，向上取整
              //   let tempStr = params.replace(/（/g ,'(');
              //   let start = tempStr.indexOf('(');
              //   let tempStr2 = tempStr.slice(0, start) + '\n';
              //   tempStr = tempStr.slice(start, tempStr.length) + '\n';
              //   newParamsName = tempStr2 + tempStr;
              //   // 将最终的字符串返回
              //   return newParamsName;
              // }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月' , '七月', '八月', '九月'],
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999'
              }

            },
            splitNumber: 3,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLabel: {
              color: '#9BA8C1',
              fontSize: 10,
              fontWeight: 400,
              interval:0
            }
            // minInterval: 20,
            // max: value => {
            //   return value.max !== 0 ? (~~(value.max / 20) + 1) * 20 : 80
            // }
          }
        ],
        series: [
          {
            name: '设备隐患',
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

            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '人员上报隐患',
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

            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ] }
    };
  },
  mounted() {
    // this.initEchart();
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData() {
      this.$services.get({
        type: 'LARGE',
        url: 'taskGetData',
        params: {
          type: 'task'
        }
      }).then(({ data }) => {
        // console.log('-------------taskGetData---------------', data);
        this.setData(data);
      });
    },
    setData(data) {
      this.echartdata = data.data;
      this.dayDeal = data.dayDeal;
      this.dayRatio = data.dayRatio;
      this.dayFireAlarm = data.dayFireAlarm;
      this.dayThred = data.dayThred;
      this.dayToThred = data.dayToThred;
      this.dealRate = data.dealRate;
      this.dealRatio = data.dealRatio;
      this.dealRatioThred = data.dealRatioThred;
      this.dealTo = data.dealTo;
      this.importNum = data.importNum;
      this.monthNum = data.monthNum;
      this.monthRatio = data.monthRatio;
      this.monthRatioThred = data.monthRatioThred;
      this.monthTo = data.monthTo;
      this.monthToThred = data.monthToThred;
      this.overNum = data.overNum;
      let xAxisData = [];
      let trouble = [];
      let device = [];
      if (this.echartdata[0].name === 'trouble') {
        trouble = this.echartdata[0].data;
        device = this.echartdata[1].data;
      }
      else {
        device = this.echartdata[0].data;
        trouble = this.echartdata[1].data;
      }
      let deviceData = [];
      let troubleData = [];
      let splitLineColor = [];
      // console.log(device);
      for (let i = 0; i < device.length; i++) {
        // console.log(device[i].data);
        deviceData.push({
          name: this.$utils.monthChange(device[i].type),
          value: device[i].data
        });
        xAxisData.push(this.$utils.monthChange(device[i].type));
        splitLineColor.push('rgba(0, 0, 0, 0)');
      }
      for (let i = 0; i < trouble.length; i++) {
        troubleData.push({
          name: this.$utils.monthChange(device[i].type),
          value: trouble[i].data
        });
      }

      // console.log(deviceData);

      // console.log(troubleData);

      this.echartOption.xAxis[0].data = xAxisData;
      this.echartOption.series[0].data = deviceData;
      this.echartOption.series[1].data = troubleData;
      splitLineColor[splitLineColor.length - 1] = '#ccc';
      this.echartOption.xAxis[0].splitLine.lineStyle.color = splitLineColor;
      this.initEchart();
    },
    initEchart() {
      if (!this.echart) {
        this.echart = echarts.init(document.getElementById('workingSituation-echart'));
      }
      this.echart.setOption(this.echartOption);
      window.addEventListener('resize', () => {
        this.echart.resize();
      });
    }
  },
  watch: {
    wsData(val) {
      this.setData(val);
    },
    update(val) {
      this.getData();
    }
  }
};
</script>

<style lang="scss">
.workingSituation {
  width: 100%;
  height: 100%;
  // .title > span{
  //   background: url('../../../../assets/img/new/workingSituation.png') no-repeat left center;
  //   background-size: auto 80%;
  // }
  .echarttitle {
    text-align: left;
    font-size: .24rem;
    width: 50%;
    height: .35rem;
    line-height: .35rem;
    // margin: 0 auto;
    margin: 0 0 .1rem;
    font-weight: 700;
    color: #D3E2FF;
  }
  #workingSituation-echart{
    width: 100%;
    // height: 35%;
    height: calc(35% - .3rem);
  }
  .text{
    margin: .1rem 0;
    width: 100%;
    height: .7rem;
    line-height: .3rem;
    .textspan{
      display: flex;
      font-size: .24rem;
      margin-bottom: .05rem;
      .jianspand{
        margin-left: 0.75rem;
        color:#0088FF;
        font-size: .28rem;
        line-height: .3rem;
      }
      .titlespan{
        // color:#0088FF;
        color: #9BA8C1;
        width:50%;
        text-align: left;
        font-size: .24rem;
        font-weight: 400;
        line-height: .3rem;
      }
      .threndspan{
        color:#F04862;
        width:50%;
        display: flex;
        text-align: right;
      }
      .picspanu{
        //width:25%;
        width: 0.3rem;
        height: .3rem;
        background: url('../../../../assets/img/new/Up.png') no-repeat center center;
        background-size: 100% 100%;
      }
      .picspand{
        width: 0.3rem;
        background: url('../../../../assets/img/new/Down.png') no-repeat center center;
        background-size: 100% 100%;
      }
      .numspanu{
        color:#2FC25B;
        width:8%;
        text-align: right;
        font-size: .18rem;
      }
      .numspand{
        color:#F04862;
        width:8%;
        text-align: right;
      }
    }
    .textspan1{
      display: flex;
      font-size: .24rem;
      .titlespan{
        width:50%;
        color:#9BA8C1;
        text-align: left;
        font-size: .24rem;
        font-weight: 400;
      }
      .threndspan{
        color:#0088FF;
        width:50%;
        text-align: right;
      }
    }
  }
  .count-warp{
    margin-top: 0.07rem;
    width: 100%;
    height: calc(65% - 1.05rem);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .div:nth-child(1), .div:nth-child(2) {
      height: 55%;
    }
    .div:nth-child(1), .div:nth-child(3) {
      padding-right: .1rem;
      padding-left: 0;
      width: calc(50% - .13rem);
      border-right: 0.03rem solid rgba(148, 166, 190, 0.3);
    }
    .div:nth-child(3), .div:nth-child(4) {
      margin-top: .1rem;
      .count-title {
        height: 50%;
      }
    }
    .div{
      width: calc(50% - .1rem);
      height: calc(45% - .2rem);
      font-size: .21rem;
      font-weight: bolder;
      text-align: left;
      padding-left: .1rem;
      >span {
        display: block;
        width: 100%;
      }
      .span1{
        height: 35%;
        color:#0088FF;
        font-size:.30rem;
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
        font-size:.30rem;
        height: 50%;
      }
      .spanhd{
        width: 25%;
        background: url("../../../../assets/img/new/icon_h_down.png") no-repeat center center;

      }
      .spanhu{
        width: 25%;
        background: url("../../../../assets/img/new/icon_h_up.png") no-repeat center center;

      }
      .spanhutext{
        width: 25%;
        color:#2FC25B;
        font-size:.20rem;
      }
      .spanhdtext{
        width: 25%;
        color:#F04862;
        font-size:.20rem;

      }
      .spantd{
        width: 25%;
        color:#F04862;
        font-size:.23rem;
        margin-left: 0.2rem;
        background: url("../../../../assets/img/new/icon_t_down.png") no-repeat left center;
      }
      .spantu{
        width: 25%;
        color:#2FC25B;
        font-size:.23rem;
        margin-left: 0.2rem;
        background: url("../../../../assets/img/new/icon_t_up.png") no-repeat left center;
      }
      .spantdtext{
        width: 25%;
        color:#F04862;
        font-size:.20rem;
      }
      .spantutext{
        width: 25%;
        color:#2FC25B;
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
}
</style>
