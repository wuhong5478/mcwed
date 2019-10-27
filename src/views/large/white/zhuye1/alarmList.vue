<template>
  <div class="alarmList">
    <div class="title alarmList-title">
      <span>消息</span>
      <el-radio-group v-model="selectValue" @change="selectChange" class="raidoBox">
        <el-radio v-for="(item, index) in selectOptions" :key="index" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </div>
    <div class="content alarmList-content">
      <ul>
        <li v-for="(item, index) in list" :key="index" style="display: flex;width: 100%;">
          <p class="left" style="display: flex;">
            <span style="width:2%" v-if="item.type === 'fireWarn'" preserveAspectRatio="none" class="icon huoyandaping"></span>
            <span style="width:2%" v-else-if="item.type === 'hiddenWarn'" preserveAspectRatio="none" class="icon yinhuandaping"></span>
            <!-- <span v-else preserveAspectRatio="none" class="icon xiaoxidaping"></span> -->
            <span style="padding-left: .1rem;width:98%;display: flex;" v-if="item.eventType === '1' && item.type === 'fireWarn'"
              @click="msgitemClick(item)" class="devName1">
              <span style="width:35%"><span class="red">{{$utils.getTime(item.reciveTime)}}</span> (ID:{{item.id}})</span>
              <span style="width:65%">{{item.address}} <span :class="{devName: item.fireClick}">{{item.devName}}</span>{{item.eventName}}
                <span class="picture" v-if="item.livePhoto" @click="openPic(item)">【图片】</span>
                <span class="picture" v-if="item.statusStr === '已处理' || item.statusStr === '误报'">【报告】</span>
              </span>
            </span>
            <span style="padding-left: .1rem;width:98%;display: flex;" v-else-if="item.eventType === '1' && item.type === 'hiddenWarn'"
              class="devName1" @click="msgitemClick(item, $event)">
              <span style="width:35%">
                <span class="red">{{$utils.getTime(item.reciveTime)}}</span>
                (ID:{{item.id}})
                </span>
              <span style="width:65%">
                {{item.address}}，
                <span class="devName" @mouseover="shebeihover(item)" @mouseout="shebeiout(item)">{{item.devName}}</span>
                {{item.eventName}}
                <span class="picture" v-if="item.livePhoto" @click="openPic(item)">【图片】</span>
              </span>
            </span>
            <span style="padding-left: .1rem;width:98%;display: flex;" v-else @click="msgitemClick(item)" class="devName1">
              <span style="width:35%"><span class="red">{{$utils.getTime(item.reciveTime)}}</span> (ID:{{item.id}})</span>
              <span style="width:65%"> {{item.userName}} {{item.telphone}} {{item.eventName}}
              <span class="picture" v-if="item.statusStr === '已处理' || item.statusStr === '误报'">【报告】</span></span></span>
          </p>
          <!-- <p class="center">
            <span :class="{devName: (item.type === 'hiddenWarn' && item.eventType === '1') || item.fireClick}" @click="msgClick(item)">{{item.devName}}</span>
          </p> -->
          <p class="right">
            <span v-if="item.statusStr">【</span>
            <span :class="{red: item.statusStr === '待确认' || item.statusStr === '一般隐患',red1:item.statusStr === '重大隐患'}"
              v-if="item.statusStr">{{item.statusStr}}</span>
            <span v-if="item.statusStr">】</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import Icon from 'vue-svg-icon/Icon.vue';
export default {
  name: 'alarmList',
  props: {
    wsData: {
      Object,
      default: () => {}
    },
    yjEmId: {
      String,
      default: ''
    },
    yingji: Number
  },
  data() {
    return {
      activeName: 'huoqing',
      selectValue: '0',
      selectOptions: [{
        label: '全部',
        value: '0'
      }, {
        label: '火警',
        value: '1'
      }, {
        label: '隐患',
        value: '2'
      }],
      testArr: [{
        code: 200,
        data: {
          address: '中大产业园6号楼-3层-配电箱',
          data: '2019-08-01 16:00:00 中大产业园6号楼-3层发生火情',
          devName: '用电安全探测器',
          deviceName: 'ZJHZ_YXXZGJHZZX4986',
          eventName: '电气火灾-报警',
          eventType: '1',
          id: '3',
          latitude: '30.126027',
          longitude: '120.084073',
          productKey: 'a1bA1E0trwT',
          reciveTime: 'Sat Aug 31 18:57:36 CST 2019',
          source: '北斗',
          statusStr: '待确认',
          type: 'fireWarn'
        }
      },
      // 下一条经纬度的参数
      {
        code: 200,
        data: {
          address: '中大产业园6号楼-3层-配电箱',
          data: '2019-08-01 16:00:00 中大产业园6号楼-3层发生火情',
          devName: '用电安全探测器',
          deviceName: 'd896e0001c000261',
          eventName: '电气火灾-报警',
          eventType: '1',
          id: '3',
          latitude: '30.126027',
          longitude: '120.084073',
          productKey: 'a1bA1E0trwT',
          reciveTime: 'Sat Aug 31 18:57:36 CST 2019',
          source: '北斗',
          statusStr: '已确认',
          type: 'fireWarn'
        }
      }, {
        code: 200,
        data: {
          address: '中大产业园6号楼-3层-配电箱',
          data: '2019-08-01 16:00:00 中大产业园6号楼-3层发生火情',
          devName: '用电安全探测器',
          deviceName: 'ZJHZ_YXXZGJHZZX4986',
          eventName: '电气火灾-报警',
          eventType: '1',
          id: '3',
          latitude: '30.126027',
          longitude: '120.084073',
          productKey: 'a1bA1E0trwT',
          reciveTime: 'Sat Aug 31 18:57:36 CST 2019',
          source: '北斗',
          statusStr: '已处理',
          type: 'fireWarn'
        }
      }, {
        code: 200,
        data: {
          address: '中大产业园6号楼-3层-配电箱',
          data: '2019-08-01 16:00:00 消防组陈某某已到达目的地',
          devName: '用电安全探测器',
          deviceName: 'ZJHZ_YXXZGJHZZX4986',
          eventType: '2',
          id: '3',
          position: '物业人员',
          latitude: '30.126027',
          longitude: '120.084073',
          productKey: 'a1bA1E0trwT',
          reciveTime: 'Sat Aug 31 18:57:36 CST 2019',
          telphone: '185213457',
          statusStr: '已触达',
          type: 'fireWarn'
        }
      }, {
        code: 200,
        data: {
          address: '中大产业园6号楼-3层-配电箱',
          data: '2019-08-01 16:00:00 中大产业园6号楼-3层发生火情',
          devName: '用电安全探测器',
          deviceName: 'd896e0001c000229',
          eventName: '电气火灾-报警',
          eventType: '1',
          id: '5',
          latitude: '30.126027',
          longitude: '120.084073',
          productKey: 'a1bA1E0trwT',
          reciveTime: 'Sat Aug 31 18:57:36 CST 2019',
          source: '北斗',
          statusStr: '待确认',
          type: 'hiddenWarn'
        }
      },
      // 下一条是bim参数
      {
        code: 200,
        data: {
          address: '中大产业园6号楼-3层-配电箱',
          data: '2019-08-01 16:00:00 中大产业园6号楼-3层发生火情',
          devName: '用电安全探测器',
          deviceName: 'd896e0000700001c',
          eventName: '电气火灾-报警',
          eventType: '1',
          id: '36',
          latitude: '30.126027',
          longitude: '120.084073',
          productKey: 'a1B7PnwW0wo',
          reciveTime: 'Sat Aug 31 18:57:36 CST 2019',
          source: '北斗',
          statusStr: '待确认',
          type: 'hiddenWarn'
        }
      }
      ],
      msgData: [
        // {
        //   address: "中大产业园6号楼-3层-配电箱",
        //   data: "2019-08-01 16:00:00 中大产业园6号楼-3层发生火情",
        //   devName: "用电安全探测器",
        //   deviceName: "ZJHZ_YXXZGJHZZX4986",
        //   eventName: "电气火灾-报警",
        //   eventType: "1",
        //   id: "23",
        //   latitude: "120.08347",
        //   longitude: "30.127843",
        //   productKey: "a1bA1E0trwT",
        //   reciveTime: "Sat Aug 31 18:57:36 CST 2019",
        //   source: "北斗",
        //   statusStr: "待确认",
        //   type: "fireWarn"
        // },
        // {
        //   address: "中大产业园6号楼-3层-配电箱",
        //   data: "2019-08-01 16:00:00 消防组陈某某已到达目的地",
        //   devName: "用电安全探测器",
        //   deviceName: "d896e0001c000261",
        //   eventType: "2",
        //   id: "23",
        //   position: "物业人员",
        //   productKey: "a1bA1E0trwT",
        //   reciveTime: "Sat Aug 31 19:20:25 CST 2019",
        //   statusStr: "已到达",
        //   telphone: "185213457",
        //   type: "fireWarn",
        //   userName: "陈坤"
        // },
        // {
        //   address: "中大产业园6号楼-3层-配电箱",
        //   data: "2019-08-01 16:00:00 中大产业园6号楼-3层-配电箱供电箱发生隐患",
        //   devName: "用电安全探测器",
        //   deviceName: "d896e0000700001d",
        //   eventName: "电气火灾-报警",
        //   eventType: "1",
        //   id: "23",
        //   latitude: "120.080526",
        //   longitude: "30.129546",
        //   productKey: "a1bA1E0trwT",
        //   reciveTime: "Sat Aug 31 19:43:41 CST 2019",
        //   statusStr: "一般隐患",
        //   type: "hiddenWarn"
        // },
        // {
        //   address: "中大产业园6号楼-3层-配电箱",
        //   data: "2019-08-01 16:00:00 消防组陈某某已到达目的地",
        //   devName: "用电安全探测器",
        //   deviceName: "d896e0001c000261",
        //   eventType: "2",
        //   id: "23",
        //   position: "物业人员",
        //   productKey: "a1bA1E0trwT",
        //   reciveTime: "Sat Aug 31 19:35:57 CST 2019",
        //   statusStr: "已到达",
        //   telphone: "185213457",
        //   type: "hiddenWarn ",
        //   userName: "陈坤"
        // }
      ],
      normalArr: [],
      fireUp: [],
      fireNormal: [],
      list: [],
      fireList: [],
      hiddenList: []
    };
  },
  components: {
    // Icon
  },
  mounted() {
    this.getData();
    /*  setTimeout(() =>{
             let obj={eventType:'1',deviceName:'d896e0001c000261',id:'3',productKey:'a1bA1E0trwT',type:'fireWarn'};
             this.msgClick(obj);
           }, 15*1000); */
  },
  methods: {
    openPic(obj) {
      console.log('打开图片: ',);
      this.$parent.changePicInfoShow(obj);
    },
    getData() {
      this.$services.get({
        type: 'LARGE',
        url: 'messageListGetData',
        params: {
          type: 'messageList'
        }
      }).then(({
        data
      }) => {
        console.log('消息列表: ', data);
        this.msgData = [];
        this.list = [];
        this.fireList = [];
        this.hiddenList = [];
        data.reverse(); // 时间先后顺序排列
        for (let i = 0; i < data.length; i++) {
          // data.length > 0 && data.forEach(k => {
          let obj = JSON.parse(data[i]);
          // console.log(obj.data.reciveTime, obj);
          obj.data.fireClick = false;
          if (obj.data.type === 'hiddenWarn') {
            this.hiddenList.unshift(obj.data);
            this.normalArr.unshift(obj.data);
          }
          // else if (obj.data.eventType === '2') { // 火情报警的人员信息
          //   this.normalArr.unshift(obj.data);
          //   this.fireNormal.unshift(obj.data);
          // }
          else if (obj.data.statusStr === '待确认') { // 火情报警未确认置顶
            this.fireUp.unshift(obj.data);
            for (let i = 0; i < this.fireNormal.length; i++) {
              if (this.fireNormal[i].id === obj.data.id) {
                this.fireNormal[i].statusNow = obj.data.statusStr;
              }
            }
            for (let i = 0; i < this.normalArr.length; i++) {
              if (this.normalArr[i].id === obj.data.id) {
                this.normalArr[i].statusNow = obj.data.statusStr;
              }
            }
            obj.data.statusNow = '待确认';
          }
          else if (obj.data.statusStr === '已确认') { // 火情报警已确认置顶，将该事件未确认通知放入正常排序不置顶
            for (let i = 0; i < this.fireUp.length; i++) {
              if (this.fireUp[i].id === obj.data.id) {
                this.fireUp[i].statusNow = '已确认';
                this.normalArr.unshift(this.fireUp[i]);
                this.fireNormal.unshift(this.fireUp[i]);
                this.fireUp.splice(i, 1);
                break;
              }
            }
            for (let i = 0; i < this.fireNormal.length; i++) {
              if (this.fireNormal[i].id === obj.data.id) {
                this.fireNormal[i].statusNow = obj.data.statusStr;
              }
            }
            for (let i = 0; i < this.normalArr.length; i++) {
              if (this.normalArr[i].id === obj.data.id) {
                this.normalArr[i].statusNow = obj.data.statusStr;
              }
            }
            obj.data.fireClick = true;
            obj.data.statusNow = '已确认';
            this.fireUp.unshift(obj.data);
          }
          else if (obj.data.statusStr === '已处理' || obj.data.statusStr === '误报') { // 火情报警已处理，将该事件未确认通知（误报时没有已确认过程所以未确认通知还在置顶内）和已确认通知放入正常排序不置顶
            for (let i = 0; i < this.fireUp.length; i++) {
              if (this.fireUp[i].id === obj.data.id) {
                this.fireUp[i].statusNow = obj.data.statusStr;
                this.fireUp[i].fireClick = false;
                this.normalArr.unshift(this.fireUp[i]);
                this.fireNormal.unshift(this.fireUp[i]);
                this.fireUp.splice(i, 1);
                i--;
              }
            }
            for (let i = 0; i < this.fireNormal.length; i++) {
              if (this.fireNormal[i].id === obj.data.id) {
                this.fireNormal[i].statusNow = obj.data.statusStr;
                this.fireNormal[i].fireClick = false;
              }
            }
            for (let i = 0; i < this.normalArr.length; i++) {
              if (this.normalArr[i].id === obj.data.id) {
                this.normalArr[i].statusNow = obj.data.statusStr;
                this.normalArr[i].fireClick = false;
              }
            }
            obj.data.fireClick = true;
            obj.data.statusNow = obj.data.statusStr;
            this.normalArr.unshift(obj.data);
            this.fireNormal.unshift(obj.data);
          }
          else {
            this.fireNormal.unshift(obj.data);
            this.normalArr.unshift(obj.data);
          }
        }
        this.msgData = this.fireUp.concat(this.normalArr);
        this.fireList = this.fireUp.concat(this.fireNormal);
        this.list = this.msgData;
      });
      this.getStatus();
    },
    getStatus() {
      this.$services.get({
        type: 'LARGE',
        url: 'emergencyStatusLimitData',
        params: {
          type: 'emergencyStation'
        }
      }).then(({
        data
      }) => {
        if (data && data.data) {
          let val = data.data;
          let lat = parseFloat(val.lat);
          let lon = parseFloat(val.lng);
          this.$emit('msgAlarmFirst', {
            lat,
            lon
          });
          let params = {};
          if (val.productKey && val.deviceName) {
            params = {
              deviceName: val.deviceName,
              id: val.id,
              productKey: val.productKey,
              type: 'fireWarn'
            }
          }
          else {
            params = {
              id: val.id,
              type: 'fireWarn'
            }
          }
          this.$services.get({
            type: 'LARGE',
            url: 'showDataById',
            params
          }).then(({
            data
          }) => {
            // console.log('-------------showDataById---------------', data);
            this.WarnData = data;
            // console.log(this.WarnData);
            this.WarnData.productKey = val.productKey;
            this.WarnData.deviceName = val.deviceName;
            this.WarnData.id = val.id.toString();
            this.WarnData.type = 'fireWarn';
            this.$emit('msgAction', this.WarnData);
          });
        }
      });
    },
    msgClick(obj) {
      console.log(obj.eventType);
      // console.log(obj.eventType);
      if ((obj.type === 'hiddenWarn' && obj.eventType === '1') || (obj.type === 'fireWarn' && obj.statusStr
            === '已确认') || (obj.type === 'fireWarn' && obj.statusStr === '已处理')) {
        let lat = parseFloat(obj.latitude);
        let lon = parseFloat(obj.longitude);
        this.$emit('msgClick', {
          lat,
          lon,
          deviceName: obj.deviceName,
          type: obj.type
        });
      }
    },
    shebeihover(obj) {
      console.log('88888888888888888888', obj);
      if ((obj.type === 'hiddenWarn' && obj.eventType === '1') || (obj.type === 'fireWarn' && obj.statusStr
            === '已确认') || (obj.type === 'fireWarn' && obj.statusStr === '已处理') || (obj.type === 'fireWarn' && obj.statusStr === '误报')) {
        this.$emit('closeshebeideatil', obj);
      }
    },
    shebeiout() {
      this.$emit('closeshebeideatil');
    },
    msgitemClick(obj, e) {
      console.log(obj);
      // console.log(obj.eventType);
      if (e && e.target.className === 'picture') return;
      if (obj.type === 'fireWarn' && obj.statusNow === '已确认') {
        let lat = parseFloat(obj.latitude);
        let lon = parseFloat(obj.longitude);
        this.$emit('msgClick', {
          lat,
          lon,
          deviceName: obj.deviceName,
          type: obj.type
        });
        let params = {};
        if (obj.deviceName && obj.productKey) {
          params = {
            deviceName: obj.deviceName,
            id: obj.id,
            productKey: obj.productKey,
            type: obj.type
          }
        }
        else {
          params = {
            id: obj.id,
            type: obj.type
          }
        }
        this.$services.get({
          type: 'LARGE',
          url: 'showDataById',
          params
        }).then(({
          data
        }) => {
          // console.log('-------------showDataById---------------', data);
          this.WarnData = data;
          // console.log(this.WarnData);
          this.WarnData.productKey = obj.productKey;
          this.WarnData.deviceName = obj.deviceName;
          this.WarnData.id = obj.id;
          this.WarnData.type = 'fireWarn';
          this.$emit('msgAction', this.WarnData);
        });
      }
      else if (obj.type === 'fireWarn' && obj.statusNow === '已处理' || obj.type === 'fireWarn' && obj.statusNow === '误报') {
        // 查看火灾报告
        // console.log('.......................yichuli')
        this.$emit('daPingData', {
          id: obj.id,
          productKey: obj.productKey,
          deviceName: obj.deviceName
        });
      }
      else if (obj.type === 'fireWarn' && obj.statusNow === '待确认') {
        let params = {};
        if (obj.deviceName && obj.productKey) {
          params = {
            deviceName: obj.deviceName,
            id: obj.id,
            productKey: obj.productKey,
            type: obj.type
          }
        }
        else {
          params = {
            id: obj.id,
            type: obj.type
          }
        }
        this.$services.get({
          type: 'LARGE',
          url: 'showDataById',
          params
        }).then(({
          data
        }) => {
          console.log('-------------showDataById待确认---------------', data);
          this.WarnData = data;
          this.WarnData.productKey = obj.productKey;
          this.WarnData.deviceName = obj.deviceName;
          this.WarnData.id = obj.id;
          this.WarnData.type = 'fireWarn';
          this.$emit('msgNormal', this.WarnData);
        });
      }
      else if (obj.type === 'hiddenWarn') {
        let params = {};
        if (obj.deviceName && obj.productKey) {
          params = {
            deviceName: obj.deviceName,
            id: obj.id,
            productKey: obj.productKey,
            type: obj.type
          }
        }
        else {
          params = {
            id: obj.id,
            type: obj.type
          }
        }
        this.$services.get({
          type: 'LARGE',
          url: 'showDataById',
          params
        }).then(({
          data
        }) => {
          console.log('-------------showDataById隐患---------------', data);
          this.WarnData = data;
          this.WarnData.productKey = obj.productKey;
          this.WarnData.deviceName = obj.deviceName;
          this.WarnData.id = obj.id;
          this.WarnData.type = 'hiddenWarn';
          console.log(this.WarnData);
          this.$emit('msgNormal', this.WarnData);
        });
      }
    },
    selectChange(val) {
      if (val === '0') {
        this.list = this.msgData;
      }
      else if (val === '1') {
        this.list = this.fireList;
      }
      else {
        this.list = this.hiddenList;
      }
    }
  },
  watch: {
    wsData(val) {
      // this.msgData.unshift(val);
      // if (val.type === 'fireWarn') {
      //   this.fireList.unshift(val);
      // }
      // else {
      //   this.hiddenList.unshift(val);
      // }
      let box = document.querySelector('.alarmList-content');
      box.scrollTop = 0;
      this.msgData = [];
      this.fireList = [];
      val.fireClick = false;
      if (val.type === 'hiddenWarn' || val.statusStr !== '已确认') {
        this.$services.get({
          type: 'LARGE',
          url: 'getBuildingTaskWarnByWarnId',
          params: {
            type: 'map',
            id: val.id
          }
        }).then(({
          data
        }) => {
          this.$emit('updateHiddenPoint', data.taskWarn);
        });
      }
      if (val.type === 'hiddenWarn') {
        this.hiddenList.unshift(val);
        this.normalArr.unshift(val);
      }
      // else if (val.eventType === '2') { // 火情报警的人员信息
      //   this.normalArr.unshift(val);
      //   this.fireNormal.unshift(val);
      // }
      else if (val.statusStr === '待确认') { // 火情报警未确认置顶
        this.fireUp.unshift(val);
        for (let i = 0; i < this.fireNormal.length; i++) {
          if (this.fireNormal[i].id === val.id) {
            this.fireNormal[i].statusNow = val.statusStr;
          }
        }
        for (let i = 0; i < this.normalArr.length; i++) {
          if (this.normalArr[i].id === val.id) {
            this.normalArr[i].statusNow = val.statusStr;
          }
        }
        val.statusNow = '待确认';
      }
      else if (val.statusStr === '已确认') { // 火情报警已确认置顶，将该事件未确认通知放入正常排序不置顶，跳转到应急模式
        for (let i = 0; i < this.fireUp.length; i++) {
          if (this.fireUp[i].id === val.id) {
            this.fireUp[i].statusNow = '已确认';
            this.normalArr.unshift(this.fireUp[i]);
            this.fireNormal.unshift(this.fireUp[i]);
            this.fireUp.splice(i, 1);
            break;
          }
        }
        for (let i = 0; i < this.fireNormal.length; i++) {
          if (this.fireNormal[i].id === val.id) {
            this.fireNormal[i].statusNow = val.statusStr;
          }
        }
        for (let i = 0; i < this.normalArr.length; i++) {
          if (this.normalArr[i].id === val.id) {
            this.normalArr[i].statusNow = val.statusStr;
          }
        }
        val.fireClick = true;
        val.statusNow = '已确认';
        this.fireUp.unshift(val);
        let lat = parseFloat(val.latitude);
        let lon = parseFloat(val.longitude);
        this.$emit('msgClick', {
          lat,
          lon,
          deviceName: val.deviceName,
          type: val.type
        });
        let params = {};
        if (val.deviceName && val.productKey) {
          params = {
            deviceName: val.deviceName,
            id: val.id,
            productKey: val.productKey,
            type: val.type
          }
        }
        else {
          params = {
            id: val.id,
            type: val.type
          }
        }
        this.$services.get({
          type: 'LARGE',
          url: 'showDataById',
          params
        }).then(({
          data
        }) => {
          console.log('-------------showDataById判断是否为火警---------------', data);
          this.WarnData = data;
          // console.log(this.WarnData);
          this.WarnData.productKey = val.productKey;
          this.WarnData.deviceName = val.deviceName;
          this.WarnData.id = val.id;
          this.WarnData.type = 'fireWarn';
          this.$emit('msgAction', this.WarnData);
        });
      }
      else if (val.statusStr === '已处理' || val.statusStr === '误报') { // 火情报警已处理，将该事件未确认通知（误报时没有已确认过程所以未确认通知还在置顶内）和已确认通知放入正常排序不置顶
        for (let i = 0; i < this.fireUp.length; i++) {
          if (this.fireUp[i].id === val.id) {
            this.fireUp[i].statusNow = val.statusStr;
            this.fireUp[i].fireClick = false;
            this.normalArr.unshift(this.fireUp[i]);
            this.fireNormal.unshift(this.fireUp[i]);
            this.fireUp.splice(i, 1);
            i--;
          }
        }
        for (let i = 0; i < this.fireNormal.length; i++) {
          if (this.fireNormal[i].id === val.id) {
            this.fireNormal[i].statusNow = val.statusStr;
            this.fireNormal[i].fireClick = false;
          }
        }
        for (let i = 0; i < this.normalArr.length; i++) {
          if (this.normalArr[i].id === val.id) {
            this.normalArr[i].statusNow = val.statusStr;
            this.normalArr[i].fireClick = false;
          }
        }
        val.fireClick = true;
        val.statusNow = val.statusStr;
        this.normalArr.unshift(val);
        this.fireNormal.unshift(val);
        if (this.yingji === 1 && val.id === this.yjEmId) this.$emit('toNormal');
      }
      else {
        this.fireNormal.unshift(val);
        this.normalArr.unshift(val);
      }
      this.msgData = this.fireUp.concat(this.normalArr);
      this.fireList = this.fireUp.concat(this.fireNormal);
      if (this.selectValue === '0') {
        this.list = this.msgData;
      }
      else if (this.selectValue === '1') {
        this.list = this.fireList;
      }
      else {
        this.list = this.hiddenList;
      }
    }
  }
};
</script>
<style lang="scss">
  // .icon{
  //   padding-right: .1rem;
  // }
  .red {
    color: #c9c9c9;
  }

  .red1 {
    color: #EA5052;
  }

  .bold {
    font-weight: bold;
  }

  .alarmList {
    position: absolute;
    left: 24%;
    right: 24%;
    bottom: .1rem;
    overflow: hidden;
    height: 19.5%;

    .alarmList-title {
      width: 35% !important;
      display: flex;
      justify-content: space-between;

      span {
        padding-left: 0 !important;
        display: inline-block;
      }
    }

    .alarmList-content {
      overflow: auto;
      font-size: .2rem;
      height: auto;
      padding-top: 0.2rem;

      p {
        display: inline-block;
        line-height: .36rem;
        // height: .36rem;
        vertical-align: bottom;
      }

      p.left {
        width: 85%;
        text-align: left;

        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        .icon {
          width: .22rem;
          height: .36rem;
          display: inline-block;
          background-size: 100% auto !important;
          padding-right: 0;
          vertical-align: bottom;
        }

        .huoyandaping {
          background: url('../../../../assets/img/huoyandaping.png') no-repeat center center;
        }

        .yinhuandaping {
          background: url('../../../../assets/img/yinhuandaping1.png') no-repeat center center;
        }

        .xiaoxidaping {
          background: url('../../../../assets/img/xiaoxidaping.png') no-repeat center center;
        }
      }

      p.center {
        width: calc(20% - .1rem);
        padding-left: .1rem;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      p.right {
        width: 15%;
        text-align: right;
        vertical-align: middle;
      }

      span.devName {
        color: #23AAF2;
        cursor: pointer;
      }

      span.devName:hover {
        //color: #23AAF2;
        text-decoration: underline;
        cursor: pointer;
      }

      span.devName1:hover {
        //color: #23AAF2;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .raidoBox .el-radio {
      // margin-left: .2rem;
      line-height: .72rem;
    }

    // .el-select {
    //   width: .9rem;
    //   float: right;
    //   right: -0.2rem;
    //   top: .02rem;
    // }
    // .el-input__suffix {
    //   right: 0.03rem;
    // }
    // .el-input__inner{
    //   height: 0.35rem;
    //   width: 100%;
    //   padding: 0 0.12rem;
    //   border-radius: 16px;
    //   font-size: 0.1rem;
    // }
    // .el-input {
    //   font-size: 11px;
    // }
  }

  // .alarmSelect{
  //   .el-popper {
  //     margin-top: 0px;
  //   }
  //   .el-select-dropdown__item {
  //     height: 24px;
  //     font-size: 11px;
  //     line-height: 25px;
  //   }
  //   .el-select-dropdown__list{
  //     padding: 0px 0;
  //     background: #ddd!important;
  //   }
  //   .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  //     background: #eee!important;
  //   }
  // }
  .picture{
    color:#23AAF2;
  }
</style>
