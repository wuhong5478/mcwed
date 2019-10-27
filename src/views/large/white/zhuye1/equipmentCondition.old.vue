<template>
  <div class="equipmentCondition">
    <div class="title"><span>设备总览</span></div>
    <div class="content">
      <div class="top">
        <div>
          <div><span>正常</span><span class="left">{{ normal }}</span></div>
          <div><span>故障</span><span class="left">{{ bad }}</span></div>
        </div>
        <el-progress :percentage="normalPer" class="top-pro" :show-text="false" :stroke-width="10"></el-progress>
      </div>
      <div id="equipmentCondition-echart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'equipmentCondition',
  props: {
    wsData: {
      Object,
      default: ()=>{}
    },
    update: {
      Boolean,
      default: false
    }
  },
  data() {
    return {
      normal: null,
      bad: null,
      normalPer: 0,
      echart: null,
      echartOption: {
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
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
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
      this.bad = data.bad;
      this.normal = data.normal;
      this.normalPer = Number(data.normalPer.replace(/%/, ''));
      this.normalPer = isNaN(this.normalPer) ? 0 : this.normalPer;
      let legendData = [];
      let equipmentInfoData = [];
      let colorArr = ['#7B68EE', '#DDC526', '#3ADCFF', '#4666F4', '#D15926', '#D399CC', '#6956E8', '#DF4E89'];
      for (let i = 0; i < data.deviceCategoryDTOList.length; i++) {
        legendData.push(data.deviceCategoryDTOList[i].productName);
        equipmentInfoData.push({
          value: data.deviceCategoryDTOList[i].bad,
          name: data.deviceCategoryDTOList[i].productName,
          itemStyle: {
            color: colorArr[i]
          }
        });
      }
      this.echartOption.legend.data = legendData;
      this.echartOption.series[0].data[0].value = this.bad;
      this.echartOption.series[1].data = equipmentInfoData;
      this.initEchart();
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
  .title > span{
    background: url('../../../../assets/img/new/equipmentCondition.png') no-repeat left center;
    background-size: auto 80%;
  }
  .top{
    width: 100%;
    height: .7rem;
    >div{
      height: .6rem;
      width: 100%;
      line-height: .6rem;
      display: flex;
      justify-content: space-between;
      span{
        display: inline-block;
        width: .81rem;
        height: 100%;
        padding-right: .14rem;
        font-size: .2rem;
        text-align: right;
      }
      span.left{
        text-align: left;
      }
    }
    .top-pro{
      height: .1rem;
    }
  }
  #equipmentCondition-echart{
    width: calc(100% - .2rem);
    height: calc(100% - .9rem);
    padding: .1rem;
  }
  .el-progress-bar__outer{
    background: #4CC8FF;
  }
  .el-progress-bar__inner{
    background: #068DFF;
  }
}
</style>
