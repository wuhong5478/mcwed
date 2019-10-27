<template>
  <div class="equipmentCondition">
    <div class="title"><span>设备统计</span></div>
    <div class="content">
      <div class="top">
        <p>小镇设备总数</p>
        <div class="top-text">
          <div style="float: left;"><span class="normal" >完好{{normal}}</span><span class="bad">/故障{{bad}}</span></div>
          <div style="float: right;"><span >设备完好率{{normalPer}}%</span></div>
        </div>
        <el-progress :percentage="normalPer" class="top-pro" :show-text="false" :stroke-width="10"></el-progress>
      </div>
      <div class="echartTitle"><span>设备完好率</span></div>
      <div id="equipmentCondition-echart"></div>
      <div class="list-title">
        <span class="one"></span>
        <span class="two">完好</span>
        <span class="three">故障</span>
      </div>
      <vue-seamless :data="data" class="list-box" :class-option="defaultOption">
        <ul>
          <li v-for="(data, index) in data" :key="index">
            <span class="one" :class="{red:data.bad > 0}">{{data.productName}}</span>
            <span class="two" :class="{red:data.bad > 0}">{{data.normal}}</span>
            <span class="three"  :class="{red:data.bad > 0}">{{data.bad}}</span>
          </li>
        </ul>
      </vue-seamless>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import vueSeamless from 'vue-seamless-scroll';

export default {
  name: 'equipmentCondition',
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
      defaultOption: {
        step: 1, // 步长 越大滚动速度越快
        limitMoveNum: 5, // 启动无缝滚动最小数据量 this.dataList.length
        hoverStop: true, // 是否启用鼠标hover控制
        direction: 1, // 1 往上 0 往下
        openWatch: true, // 开启data实时监听
        singleHeight: 0, // 单条数据高度有值hoverStop关闭
        waitTime: 1000 // 单步停止等待时间
      },
      data: [],
      animate: true,
      normal: null,
      bad: null,
      normalPer: 0,
      echartdata: null,
      echart: null,
      echartOption: {
        // title: {
        //   text: '设备完好率',
        //   textStyle: {
        //     fontWeight: 'normal',
        //     fontSize: 12,
        //     align: 'center'
        //   },
        //   left: '35%'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{a}<br />{b}: {c}%'
        },
        grid: {
          top: 5,
          left: 25,
          right: 0,
          bottom: 20
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
            // color: '#1D73C5',
            // color: '#999',
            // fontSize: 10
            color: '#9BA8C1',
            fontSize: 10,
            fontWeight: 400
          },
          z: 3,
          data: ['一月', '二月', '三月', '四月', '五月', '六月' , '七月', '八月', '九月']
        },
        yAxis: {
          // name: '单位：次',
          // nameTextStyle: {
          //   color: '#1D73C5',
          //   fontStyle: 10
          // },
          // nameGap: 20,
          type: 'value',
          max: 100,
          min: 0,
          interval: 25,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            // color: '#1D73C5',
            // color: '#999',
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
        },
        series: [
          {
            name: '设备完好率',
            type: 'line',
            // smooth: true,
            lineStyle: {
              normal: {
                width: 2,
                color: '#1D73C5'
              }
            },
            showSymbol: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      echartOptionold: {
        legend: {
          show: false,
          orient: 'vertical',
          x: 'right',
          align: 'left',
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 3,
          data: []
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '设备故障数量',
            type: 'pie',
            radius: ['0%', '35%'],
            center: ['50%', '50%'],
            label: {
              color: '#fff',
              normal: {
                position: 'center'
              }
            },
            data: [
              {
                value: null,
                name: '设备故障数量',
                label: {
                  color: '#fff',
                  formatter: '{x|{c}}\n{b}',
                  rich: {
                    x: {
                      fontSize: 16,
                      color: '#fff'
                    }
                  }
                },
                itemStyle: {
                  color: '#113F6A'
                }
              }
            ]
          },
          {
            name: '设备情况',
            type: 'pie',
            radius: ['40%', '65%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              color: '#fff',
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            data: []
          }
        ]
      }
    };
  },
  components: {
    vueSeamless
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
        url: 'deviceList'
      }).then(({ data }) => { // 传参pick.id._id调取设备详情接口，返回值编辑content，deviceProperty
        // console.log('-------------deviceListData---------------', data);
        this.setData(data);
      });
    },
    setData(data) {
      this.data = data.deviceCategoryDTOList;
      this.bad = data.bad;
      this.normal = data.normal;
      this.normalPer = Number(data.normalPer.replace(/%/, ''));
      this.normalPer = isNaN(this.normalPer) ? 0 : this.normalPer;
      this.echartdata = data.data;
      let xAxisData = [];
      let equipData = [];
      for (let i = 0; i < this.echartdata.length; i++) {
        equipData.push({
          name: this.$utils.monthChange(this.echartdata[i].type),
          value: parseFloat(this.echartdata[i].data)
        });
        xAxisData.push(this.$utils.monthChange(this.echartdata[i].type));
      }
      this.echartOption.xAxis.data = xAxisData;
      this.echartOption.series[0].data = equipData;
      this.initEchart();
    },
    scroll() {
      if (document.getElementById('oUl') === null) {
        clearInterval(this.timer);
        return;
      }
      this.data.push(this.data[0]);
      this.data.shift();
      document.getElementById('oUl').style.top = '0';
      this.animate = false;
      let thisTimer = setTimeout(() => {
        if (document.getElementById('oUl') === null) {
          clearTimeout(thisTimer);
          return;
        }
        document.getElementById('oUl').style.top = '-.4rem';
        this.animate = true;
      }, 1000);
    },
    toPause() {
      clearInterval(this.timer);
    },
    toStart() {
      if (this.data.length > 1) {
        this.timer = setInterval(this.scroll, 2000);
      }
    },
    initEchart() {
      if (!this.echart) {
        this.echart = echarts.init(document.getElementById('equipmentCondition-echart'));
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
.equipmentCondition {
  width: 100%;
  height: 100%;
  // .title > span{
  //   background: url('../../../../assets/img/new/equipmentCondition.png') no-repeat left center;
  //   background-size: auto 80%;
  // }
  .top{
    width: 100%;
    height: 1.1rem;
    margin-bottom: .1rem;
    color: #D3E2FF;
    font-weight: 700;
    .top-text{
      height: .6rem;
      width: 100%;
      line-height: .6rem;
      display: flex;
      justify-content: space-between;
      span{
        display: inline-block;
        /* width: 2.25rem; */
        height: 100%;
        // padding-right: .14rem;
        font-size: .24rem;
        text-align: right;
        font-weight: 400;
        // transform: scale(.9);
      }
      span.bad{
        width: auto;
        padding-right: .18em;
        text-align: left;
        font-size: .24rem;
        font-weight: 400;
      }
      span.normal{
        width: auto;
        padding-right: 0;
        font-size: .24rem;
        text-align: left;
        font-weight: 400;
        // transform: scale(1);
      }
      >div:nth-child(1) {
        color: #9BA8C1;
      }
      >div:nth-child(2) {
        color: #9BA8C1;
      }
    }
    > p {
      text-align: left;
      font-size: .24rem;
    }
    .top-pro{
      // height: .1rem;
    }
  }
  .echartTitle {
    text-align: left;
    font-size: .24rem;
    width: 50%;
    height: .35rem;
    line-height: .35rem;
    margin: .2rem 0 .1rem;
    font-weight: 700;
    color: #D3E2FF;
   }
  #equipmentCondition-echart{
    // width: calc(100% - .2rem);
    width: 100%;
    // height: 40%;
    // padding: .1rem;
    height: calc(40% - .4rem);
    margin-bottom: .1rem;
  }
  .el-progress-bar__outer{
    background: #4CC8FF;
  }
  .el-progress-bar__inner{
    background: #068DFF;
  }
  .list-title{
    height: .4rem;
    display: flex;
    color: #9BA8C1;
    margin-bottom: .1rem;
    >span {
      display: inline-block;
      height: 100%;
      line-height: .4rem;
      text-align: left;
      font-size: .18rem;
    }
    .one {
      width: 3rem;
    }
    .two {
      width: calc((100% - 3rem) / 2);
      text-align: right;
    }
    .three {
      width: calc((100% - 3rem) / 2);
      text-align: right;
    }
  }
  .list-box {
    width: 100%;
    height: calc(60% - 1.95rem);
    overflow: hidden;
    position: relative;
    cursor: pointer;
    color: #9BA8C1;
    ul {
      width: 100%;
      > li {
        display: flex;
        height: .4rem;
        width: 100%;
        >span {
          display: inline-block;
          height: 100%;
          line-height: .4rem;
          text-align: left;
          font-size: .18rem;
        }
        .one {
          width: 3rem;
        }
        .two {
          width: calc((100% - 3rem) / 2);
          text-align: right;
        }
        .three {
          width: calc((100% - 3rem) / 2);
          text-align: right;
        }
        .red{
          color: #F04862;
        }
      }
    }
  }
}
</style>
