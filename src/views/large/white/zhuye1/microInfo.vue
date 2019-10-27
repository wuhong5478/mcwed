<template>
  <div class="microInfo">
    <div class="microHead">
      <div class="theTitle">
        <div class="title1">微型消防站设备</div>
        <div class="title2" :class="{highLight:choose}" @click="change(1)">
          人员信息
          <div class="line"></div>
        </div>
        <div class="title2" :class="{highLight:!choose}" @click="change(2)">
          设备信息
          <div class="line"></div>
        </div>
      </div>
      <div class="quit" @click="changeClose()">×</div>
    </div>
    <div class="content microContext">
      <transition name="custom-classes-transition" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight" mode="out-in">
        <div class="left" v-if="choose" key="0">
          <div class="head">
            <span class="one"></span>
            <span class="two">姓名</span>
            <span class="three">性别</span>
            <span class="four">出生年月</span>
            <span class="five">学历</span>
            <span class="six">岗位</span>
            <span class="seven">联系电话</span>
            <span class="eight">进站日期</span>
            <span class="nine">在职状态</span>
          </div>
          <div class="list-box">
           <div v-for="(userList, index) in userList" :key="index">
              <div>
               <span class="one">{{index + 1}}</span>
               <span class="two">{{userList.name}}</span>
               <span class="three">{{userList.gender}}</span>
               <span class="four">{{userList.brithddate}}</span>
               <span class="five">{{userList.education}}</span>
               <span class="six">{{userList.post}}</span>
               <span class="seven">{{userList.phone}}</span>
               <span class="eight">{{userList.createTime}}</span>
               <span class="nine">
                 <span v-if="userList.jobstatus === 1">在职</span>
                 <span v-else>离职</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="right" v-else key="1">
          <div class="block1">
            <div class="brief">
              <span>车辆总数：{{sum[0]}}</span></div>
            <div class="carList" v-for="(car, index) in car" :key="index">
               <div>
                <span>{{car.name}}</span>
                <span>{{car.num}}</span>
                <span>{{car.person}}</span>
                <span>{{car.capacity}}</span>
               </div>
             </div>
          </div>
          <div class="block2">
            <div class="brief">
              <span>灭火器材总数：{{sum[1]}}</span>
            </div>
            <div class="outFireList" v-for="(outFire, index) in outFire" :key="index">
              <div>
                <span>{{outFire.equipment}}</span>
                <span>{{outFire.waterGun}}</span>
                <span>{{outFire.waterZone}}</span>
                <span>{{outFire.handle}}</span>
                <span>{{outFire.abc}}</span>
                <span>{{outFire.light}}</span>
                <span>{{outFire.other}}</span>
              </div>
            </div>
          </div>
          <div class="block2">
            <div class="brief">
              <span>破拆器材总数：{{sum[2]}}</span>
            </div>
            <div class="outFireList" v-for="(break1, index) in break1" :key="index">
              <div>
                <span>{{break1.break1}}</span>
                <span>{{break1.fox}}</span>
                <span>{{break1.waterZone}}</span>
                <span>{{break1.pliers}}</span>
                <span>{{break1.key}}</span>
                <span>{{break1.collar}}</span>
                <span>{{break1.other}}</span>
              </div>
            </div>
          </div>
          <div class="block3">
            <div class="brief">
              <span>个人防护装备总数：{{sum[3]}}</span>
            </div>
            <div class="outFireList" v-for="(protect, index) in protect" :key="index">
              <div>
                <span>{{protect.a}}</span>
                <span>{{protect.b}}</span>
                <span>{{protect.c}}</span>
                <span>{{protect.d}}</span>
                <span>{{protect.e}}</span>
                <span>{{protect.f}}</span>
                <span>{{protect.g}}</span>
                <span style="margin-left: 0.7rem;">{{protect.h}}</span>
              </div>
            </div>
          </div>
          <div class="block4">
            <div class="brief">
              <span>通讯器材总数：{{sum[4]}}</span>
            </div>
            <div class="outFireList" v-for="(tel, index) in tel" :key="index">
              <div>
                <span>{{tel.a}}</span>
                <span>{{tel.b}}</span>
                <span>{{tel.c}}</span>
                <span>{{tel.d}}</span>
                <span>{{tel.e}}</span>
                <span>{{tel.f}}</span>
              </div>
            </div>
          </div>
          <div class="block5">
            <div class="brief">
              <span>视频终端总数：{{sum[5]}}</span>
            </div>
            <div class="outFireList" v-for="(video, index) in video" :key="index">
              <div>
                <span>{{video.a}}</span>
                <span>{{video.b}}</span>
                <span>{{video.c}}</span>
                <span>{{video.d}}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'microInfo',
  data() {
    return {
      choose: true,
      sum: [0, 0, 0, 0, 0, 0],
      userList: [
        {
          id: '暂无数据',
          name: '暂无数据',
          gender: '暂无数据',
          brithddate: '暂无数据',
          education: '暂无数据',
          post: '暂无数据',
          phone: '暂无数据',
          createTime: '暂无数据',
          status: '暂无数据'
        }
      ],
      car: [
        {
          name: '车辆名称',
          num: '数量',
          person: '可载人数',
          capacity: '水箱容量'
        },
        {
          name: '三轮电动车',
          num: 0,
          person: 0,
          capacity: '无'
        },
        {
          name: '四轮电动车',
          num: 0,
          person: 0,
          capacity: '0L'
        },
        {
          name: '机动车',
          num: 0,
          person: 0,
          capacity: '0L'
        },
        {
          name: '其他',
          num: 0,
          person: 0,
          capacity: '0L'
        }
      ],
      outFire: [
        {
          equipment: '灭火器材',
          waterGun: '水枪(把)',
          waterZone: '水带(盘)',
          handle: '消防栓把手(把)',
          abc: 'ABC型干粉灭火器(个)',
          light: '强光照明灯(灯)',
          other: '其他'
        },
        {
          equipment: '数量',
          waterGun: 0,
          waterZone: 0,
          handle: 0,
          abc: 0,
          light: 0,
          other: 0
        }
      ],
      break1: [
        {
          break1: '破拆器材',
          fox: '消防斧(把)',
          waterZone: '水带(盘)',
          pliers: '绝缘剪短钳(把)',
          key: '电梯钥匙(把)',
          collar: '铁铤(把)',
          other: '其他'
        },
        {
          break1: '数量',
          fox: 0,
          waterZone: 0,
          pliers: 0,
          key: 0,
          collar: 0,
          other: 0
        }
      ],
      protect: [
        {
          a: '个人防护装备',
          b: '消防头盔(顶)',
          c: '消防员灭火防护服(套)',
          d: '消防员灭火防护靴(双)',
          e: '消防员安全腰带(条)',
          f: '消防手套(双)',
          g: '消防过滤式综合防毒面具(个)',
          h: '其他'
        },
        {
          a: '数量',
          b: 0,
          c: 0,
          d: 0,
          e: 0,
          f: 0,
          g: 0,
          h: 0
        }
      ],
      tel: [
        {
          a: '通讯器材',
          b: '固定电话（台）',
          c: '互联对讲机（台）',
          d: 'POC对讲机（台）',
          e: '民用对讲机（台）',
          f: '其他'
        },
        {
          a: '数量',
          b: 0,
          c: 0,
          d: 0,
          e: 0,
          f: 0
        }
      ],
      video: [
        {
          a: '视频终端',
          b: '4G终端（台）',
          c: '视频监控（台）',
          d: '其他'
        },
        {
          a: '数量',
          b: 0,
          c: 0,
          d: 0
        }
      ]
    };
  },
  mounted() {},
  methods: {
    setWindowData(data) {
      if (data && data.list.length > 0) {
        // console.log('----------setWindowData(data)-----------', data);
        let dataList = data.list;
        // console.log('----------list-----------', dataList);
        let car = [];
        let outFire = [];
        let break1 = [];
        let protect = [];
        let tel = [];
        let video = [];
        dataList.forEach(k => {
          // console.log(k);
          if (k.materialType === '1') {
            car.push(k);
          }
          else if (k.materialType === '2') {
            outFire.push(k);
          }
          else if (k.materialType === '3') {
            break1.push(k);
          }
          else if (k.materialType === '4') {
            protect.push(k);
          }
          else if (k.materialType === '5') {
            tel.push(k);
          }
          else if (k.materialType === '6') {
            video.push(k);
          }
        });
        car.forEach(k => {
          this.sum[0] += Number(k.materialNumber);
          if (k.materialName === '三轮电动车') {
            this.car[1].num = k.materialNumber;
            this.car[1].person = k.carrieableNumber;
            this.car[1].capacity = k.warterTankCapacity + 'L';
          }
          else if (k.materialName === '四轮电动车') {
            this.car[2].num = k.materialNumber;
            this.car[2].person = k.carrieableNumber;
            this.car[2].capacity = k.warterTankCapacity + 'L';
          }
          else if (k.materialName === '机动车') {
            this.car[3].num = k.materialNumber;
            this.car[3].person = k.carrieableNumber;
            this.car[3].capacity = k.warterTankCapacity + 'L';
          }
          else if (k.materialName === '其他车') {
            this.car[4].num = k.materialNumber;
            this.car[4].person = k.carrieableNumber;
            this.car[4].capacity = k.warterTankCapacity + 'L';
          }
        });
        outFire.forEach(k => {
          this.sum[1] += Number(k.materialNumber);
          if (k.materialName === '水枪（把）') {
            this.outFire[1].waterGun = k.materialNumber;
          }
          else if (k.materialName === '水袋（盘）') {
            this.outFire[1].waterZone = k.materialNumber;
          }
          else if (k.materialName === '消防栓扳手（把）') {
            this.outFire[1].handle = k.materialNumber;
          }
          else if (k.materialName === 'ABC型干粉灭火器（个）') {
            this.outFire[1].abc = k.materialNumber;
          }
          else if (k.materialName === '强光照明灯（个）') {
            this.outFire[1].light = k.materialNumber;
          }
          else if (k.materialName === '其他') {
            this.outFire[1].other = k.materialNumber;
          }
        });
        break1.forEach(k => {
          this.sum[2] += Number(k.materialNumber);
          if (k.materialName === '消防斧（把）') {
            this.break1[1].fox = k.materialNumber;
          }
          else if (k.materialName === '水袋（盘）') {
            this.break1[1].waterZone = k.materialNumber;
          }
          else if (k.materialName === '绝缘剪断钳（把）') {
            this.break1[1].pliers = k.materialNumber;
          }
          else if (k.materialName === '电梯钥匙（把）') {
            this.break1[1].key = k.materialNumber;
          }
          else if (k.materialName === '铁铤（把）') {
            this.break1[1].collar = k.materialNumber;
          }
          else if (k.materialName === '其他') {
            this.break1[1].other = k.materialNumber;
          }
        });
        protect.forEach(k => {
          this.sum[3] += Number(k.materialNumber);
          if (k.materialName === '消防头盔（顶）') {
            this.protect[1].b = k.materialNumber;
          }
          else if (k.materialName === '消防员灭火防护服（套）') {
            this.protect[1].c = k.materialNumber;
          }
          else if (k.materialName === '消防员灭火防护靴（双）') {
            this.protect[1].d = k.materialNumber;
          }
          else if (k.materialName === '消防员安全腰带（条）') {
            this.protect[1].e = k.materialNumber;
          }
          else if (k.materialName === '消防手套（双）') {
            this.protect[1].f = k.materialNumber;
          }
          else if (k.materialName === '消防过滤式综合防毒面具（个）') {
            this.protect[1].g = k.materialNumber;
          }
          else if (k.materialName === '其他') {
            this.protect[1].h = k.materialNumber;
          }
        });
        tel.forEach(k => {
          this.sum[4] += Number(k.materialNumber);
          if (k.materialName === '固定电话（台）') {
            this.tel[1].b = k.materialNumber;
          }
          else if (k.materialName === '互联网对讲机（台）') {
            this.tel[1].c = k.materialNumber;
          }
          else if (k.materialName === 'POC对讲机（台）') {
            this.tel[1].d = k.materialNumber;
          }
          else if (k.materialName === '民用对讲机（台）') {
            this.tel[1].e = k.materialNumber;
          }
          else if (k.materialName === '其他通讯器材（台）') {
            this.tel[1].f = k.materialNumber;
          }
        });
        video.forEach(k => {
          this.sum[5] += Number(k.materialNumber);
          if (k.materialName === '4G终端（台）') {
            this.video[1].b = k.materialNumber;
          }
          else if (k.materialName === '视频监控（台）') {
            this.video[1].c = k.materialNumber;
          }
          else if (k.materialName === '其他视频终端') {
            this.video[1].d = k.materialNumber;
          }
        });
      }
      // console.log('------userDTOList--------', data);
      this.userList = [];
      if (data && data.userDTOList.length > 0) this.userList = data.userDTOList;
    },
    changeClose() {
      // console.log('change');
      this.$emit('transferClose', false);
    },
    change(val) {
      if (val === 1 && this.choose === false) {
        this.choose = !this.choose;
      }
      else if (val === 2 && this.choose === true) {
        this.choose = !this.choose;
      }
    }
  }
};
</script>

<style lang="scss">
.microInfo {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border-style: solid;
  border-color: rgba(#000, 0.3);
  box-shadow: 0 0 .2rem rgba(99, 116, 141, 1);
  overflow: hidden;
  .microHead{
    height: 9%;
    background-image: -webkit-linear-gradient(left, rgb(11,35,56), rgb(56,70,83));
    .quit{
      float: right;
      color: white;
      font: 100 0.6rem/0.3rem Tahoma,Verdana,sans-serif;
      cursor: pointer;
      margin: 0.3rem 0.3rem 0rem 0rem;
    }
    .theTitle{
      float: left;
      display: flex;
      width: 80%;
      flex-direction: row;
      justify-content: left;
      .title1{
        margin-left: .6rem;
        padding-top: .2rem;
        font-size: .4rem;
        color: white;
      }
      .title2{
        transition: all .25s ease-in-out;
        margin-left: 0.3rem;
        font-size: 0.35rem;
        font-weight: 100;
        color: #DCDFE1;
        padding-top: 0.27rem;
        cursor: pointer;
        .line{
          transition: all .25s ease-in-out;
          height: 100%;
          border-bottom: 0.02rem solid white;
          margin-top: -0.35rem;
          margin-left: 0.7rem;
          margin-right: 0.7rem;
        }
      }
      .highLight{
        color: rgba(#fff,.8);
        cursor: default;
        user-select:none;
        transition: all .5s ease-in-out;
        .line{
          transition: all .5s ease-in-out;
          margin-left: 0.4rem;
          margin-right: 0.4rem;
        }
      }
    }
  }
  .microContext{
    background-color: rgb(57,72,84) !important;
    font-size: 0.3rem;
    height: calc(91% - .32rem)!important;
    .left{
      overflow: auto;
      width: 100%;
      height: 100%;
      .one {
        margin-left: -0.2rem;
        margin-right: -0.6rem;
      }
      // .two {
      //   width: 1.1rem;
      // }
      // .three {
      //   width: 1.62rem;
      // }
      .four {
        width: 2.7rem !important;
        margin-left: -.3rem;
        margin-right: -.3rem;
      }
      .five {
        // width: 5rem !important;
      }
      // .six {
      //   width: 1.62rem;
      // }
      .seven {
        width: 2.5rem !important;
      }
      .eight {
        width: 2.4rem !important;
      }
      .nine {
        padding-right: 0.5rem;
      }
      .head{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: .1rem 0;
        >span{
          width: 1.2rem;
          color: #DCDFE1;
          text-align: left;
        }
      }
      .list-box{
        width: 100%;
        // height: 70%;
        display: flex;
        // margin: .1rem 0;
        flex-direction: column;
        justify-content: space-around;
        >div{
          >div{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin: .2rem 0;
             >span{
              text-align: left;
              width: 1.2rem;
              color: white;
              font-weight: 100;
              display: inline-block;
            }
          }
        }
      }
    }
    .right{
      overflow: auto;
      width: 100%;
      height: 100%;
      padding-left: 0.2rem;
      font-size: .2rem;
      display: flex;
      flex-direction: column;
      // justify-content: ;
      .brief{
        color: rgb(133,142,150);
        >span{
          float: left;
        }
      }
      .block1{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: left;
        color: rgba(#fff,.8);
        .carList{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          float: left;
          span{
            line-height: 0.5rem;
            width: 25%;
            text-align: left;
          }
          >div{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
        }
      }
      .block2{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: left;
        margin-top: 0.15rem;
        color: rgba(#fff,.8);
        .outFireList{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          float: left;
          >div{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            >span{
              line-height: 0.5rem;
              width: 25%;
              text-align: left;
            }
          }
        }
      }
      .block3{
        width: 103%;
        display: flex;
        flex-direction: column;
        justify-content: left;
        margin-top: 0.15rem;
        color: rgba(#fff,.8);
        .outFireList{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          float: left;
          >div{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            >span{
              line-height: 0.5rem;
              width: 25%;
              text-align: left;
            }
          }
        }
      }
      .block4{
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: left;
        margin-top: 0.15rem;
        color: rgba(#fff,.8);
        .outFireList{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          float: left;
          >div{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            >span{
              line-height: 0.5rem;
              width: 25%;
              text-align: left;
            }
          }
        }
      }
      .block5{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: left;
        margin-top: 0.15rem;
        color: rgba(#fff,.8);
        .outFireList{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          float: left;
          >div{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            >span{
              line-height: 0.5rem;
              width: 25%;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>
