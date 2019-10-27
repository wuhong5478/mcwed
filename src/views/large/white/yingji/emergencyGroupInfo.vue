<template>
  <div class="emergencyGroupInfo">
    <div class="title"><span>触达人员信息</span></div>
    <div class="content emergencyGroupInfo-content">
      <div id="emergencyGroupInfo-echart"></div>
      <div class="list-box">
        <div v-for="(data, index) in data" :key="index">
          <div>
            <span class="one">{{data.userName}}</span>
            <span class="two">{{timestampToTime(data.accessTime)}}</span>
            <!-- <span class="changeTime">+{{changeTime[index]}}s</span> -->
            <span v-if="data.timeDist !== '0' && data.timeDist !== 0" class="changeTime">+{{data.timeDist}}s</span>
            <span class="three">{{data.telphone}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'emergencyGroupInfo',
  props: {
    wsData: {
      Object,
      default: () => {}
    },
    yjProductkey: {
      String,
      default: ''
    },
    yjDeviceName: {
      String,
      default: ''
    },
    yjEmId: {
      String,
      default: ''
    }
  },
  data() {
    return {
      data: null,
      gmtCreate: 0,
      // changeTime: [],
      echart: null,
      echartOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          formatter: params => params[0].name + ': ' + params[0].value + ' 单位'
        },
        grid: {
          top: 5,
          left: 25,
          right: 0,
          bottom: 20
        },
        xAxis: {
          // name: '(时间)',
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#9BA8C1',
            fontSize: 10,
            fontWeight: 400
          },
          // boundaryGap: false,
          // axisTick: {
          //   show: false
          // },
          data: []
        },
        yAxis: {
          // name: '(单位)',
          // max: 120,
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#999'
            }

          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#9BA8C1',
            fontSize: 10,
            fontWeight: 400
          },
          // splitNumber: 4,
          // axisTick: {
          //   show: false
          // },
          // axisLine: {
          //   show: false
          // },
          // splitLine: {
          //   type: 'dashed'
          // }
        },
        series: [
          {
            type: 'line',
            name: '',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#53D6FF'
              }
            },
            lineStyle: {
              normal: {
                width: 4
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.4
              }
            },
            // markPoint: {
            //   data: [
            //     {
            //       name: '最大值',
            //       type: 'max'
            //     }
            //   ]
            // },
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.$services.get({
      //   type: 'LARGE',
      //   url: 'important1GetData',
      //   params: {
      //     type: 'important',
      //     productKey: this.yjProductkey,
      //     deviceName: this.yjDeviceName,
      //     emId: this.yjEmId
      //   }
      // }).then(({ data }) => {
      //   this.gmtCreate = new Date(data.data.gmtCreate).getTime();
      //   this.getData();
      // });
        this.getData();
    });
  },
  methods: {
    getChangeTime(timeTemp) {
      timeTemp -= this.gmtCreate;
      return timeTemp / 1000;
    },
    timestampToTime(timestamp) {
      let date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let h = this.change(date.getHours()) + ':';
      let m = this.change(date.getMinutes()) + ':';
      let s = this.change(date.getSeconds());
      return h + m + s;
    },
    change(t) {
      if (t < 10) {
        return '0' + t;
      }
      return t;
    },
    getData() {
      let params = {};
      if (this.yjProductkey && this.yjDeviceName) {
        params = {
          type: 'accessPerson',
          productKey: this.yjProductkey,
          deviceName: this.yjDeviceName,
          emId: this.yjEmId
        }
      }
      else {
        params = {
          type: 'accessPerson',
          emId: this.yjEmId
        }
      }
      this.$services.get({
        type: 'LARGE',
        url: 'accessPersonGetData',
        params
      }).then(({ data }) => {
        // console.log('-------------accessPersonGetData---------------', data);
        this.data = data.data;
        // console.log('-------------this.data---------------', this.data);
        this.setData(data.chartData);
      });
    },
    setData(data) {
      let dateX = [];
      let num = [];
      for (let i = 0; i < data.length; i++) {
        dateX.push(data[i].type);
        num.push(data[i].data);
      }
      // for (let i = 0; i < this.data.length; i++) {
      //   // this.changeTime.push(this.getChangeTime(this.data[i].accessTime));
      // }
      this.echartOption.xAxis.data = dateX;
      this.echartOption.series[0].data = num;
      this.initEchart();
    },
    initEchart() {
      this.echart = echarts.init(document.getElementById('emergencyGroupInfo-echart'));
      this.echart.setOption(this.echartOption);
      window.addEventListener('resize', () => {
        this.echart.resize();
      });
    }
  },
  watch: {
    wsData(val) {
      this.data = val.data;
      this.setData(val.chartData);
    }
  }
};
</script>

<style lang="scss">
.emergencyGroupInfo {
  width: 100%;
  height: 100%;
  .emergencyGroupInfo-content {
    overflow: auto;
    #emergencyGroupInfo-echart {
      height: calc(30% - .1rem);
      width: 100%;
      margin-bottom: .1rem;
    }
    .list-box{
      width: 100%;
      height: 70%;
      display: flex;
      flex-direction: column;
      // justify-content: space-around;
      >div {
        >div {
          height: .4rem;
          display: flex;
          >span {
            display: inline-block;
            height: 100%;
            line-height: .4rem;
            text-align: left;
            // color: #0096ff;
            background-size: 100% 100%;
            font-size: .23rem;
          }
          .one {
            width: 1rem;
          }
          .two {
            width: 1.1rem;
          }
          .three {
            width: 1.62rem;
          }
          .four {
            width: calc(100% - 3.6rem);
          }
          .changeTime {
            width: 0.9rem;
            color: #F74722;
          }
        }
      }
    }
  }
}
</style>
