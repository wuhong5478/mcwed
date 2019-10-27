<template>
  <div id="mapContainer3">
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="btnBox leftBox6" v-show="isbimShow &&  isbimShow1" @click="aboutBim"><span class="btnBg1"></span><span>{{box3Content}}</span></div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="btnBox leftBox4" v-show="type ==='build' && isbuildbim  " @click="closebuildBim">关闭建筑BIM图</div>
    </transition>
    <!-- <div class="title leftBox3"  @click="toZoom('in')" style="top:4rem">放大</div> -->
    <!-- <div class="title leftBox3"  @click="toZoom('out')" style="top:4.8rem">缩小</div> -->
    <div class="bimclass" v-if="bimshow === 1"><iframe id="loadFrame" style="width: 100%;height:100%"  ></iframe></div>
    <div class="dialogBox" v-if="dialogShow === 1" :style="dislogStyle">
      <div class="infoTitle">
        <p class="h6">{{dialogData.device.categoryName}}</p>
        <span class="closeSpan" @click="closeDialog">+</span>
      </div>
      <div class="Content">

        <div class="row"><p class="left">设备ID：</p><p class="right2">{{dialogData.device.deviceName}}</p></div>
        <div class="row">

          <p class="left">设备状态：</p>
          <p class="right2"><span v-if="dialogData.device.status === 1">在线</span><span v-else-if="dialogData.device.status === 0">离线</span><span v-else>未激活</span></p>
        </div>
        <div class="row"><p class="left">设备类型：</p><p class="right2">{{dialogData.device.categoryName}}</p></div>
        <div class="row"><span class="left">部署位置：</span><span class="right2">{{dialogData.device.address}}</span></div>
        <div class="row"><span class="left">最后上线时间：</span><span class="right2">{{this.$utils.renderTime(new Date(dialogData.device.activeTime))}}</span></div></div>
        <input id="lnglat2container" type="button" class="bot" value="查看设备状态" @click="changeDialog"/>
    </div>
    <div class="dialogBox" v-if="dialogShow === 2" :style="dislogStyle">
      <div class="infoTitle">
        <p class="h6">查看设备状态</p>
        <span class="closeSpan" @click="closeDialog">+</span>
      </div>
      <div class="Content">
        <table class="status" border="0" cellspacing="0" cellpadding="0">
          <tr><td><div class="left">经度:</div><div class="right">{{dialogData.device.longitude}}</div></td></tr>
          <tr><td><div class="left">纬度:</div><div class="right">{{dialogData.device.latitude}}</div></td></tr>
          <tr><td><div class="left">海拔:</div><div class="right">{{dialogData.device.altitude}}m</div></td></tr>
          <tr v-for="(item, index) in dialogData.property" :key="index"><td><div class="left">{{item.funName}}:</div><div class="right">{{item.value}}</div></td></tr>
        </table>
      </div>
    </div>
    <div class="dialogBox" v-if="dialogShow === 3" :style="dislogStyle">
      <div class="infoTitle">
        <p class="h6">微型消防站信息</p>
        <span class="closeSpan" @click="closeDialog">+</span>
      </div>
      <div class="Content">
        <div class="row">

          <p class="left">微消站名称：</p>
          <p class="right2">{{miniFireStationInfo.name}}</p>
          <div class="img"></div>
        </div>
        <div class="row">

          <p class="left">所属区域：</p>
          <p class="right2">{{miniFireStationInfo.managementArea}}</p>
        </div>
        <div class="row">

          <p class="left">微消站电话：</p>
          <p class="right2">{{miniFireStationInfo.miniFireStationTelephone}}</p>
        </div>
        <div class="row">
          <span class="left">微消站负责人：</span>
          <span class="right2">{{miniFireStationInfo.administrator}}</span>
        </div>
        <div class="row">
          <span class="left">负责人电话：</span>
          <span class="right2">{{miniFireStationInfo.administratorTelephone}}</span>
        </div>
      <input id="lnglat2container" type="button" class="bot" value="查看微型消防站设备" @click="changeDialog2"/>
    </div>
    </div>
    <div class="dialogBox" v-if="dialogShow === 4" :style="dislogStyle">
      <div class="infoTitle">
        <p class="h6">应急资源信息</p>
        <span class="closeSpan" @click="closeDialog">+</span>
      </div>
      <div class="Content">
        <div class="row">
          <p class="left">物资名称：</p>
          <p class="right2">{{yingjiResources.resourcesName}}</p>
        </div>
        <div class="row">
          <p class="left">物资类型：</p>
          <p class="right2">{{yingjiResources.resourcesType}}</p>
        </div>
        <div class="row">
          <p class="left">物资位置：</p>
          <p class="right2">{{yingjiResources.resourcesAddress}}</p>
        </div>
        <div class="row">
          <p class="left">物资数量：</p>
          <p class="right2">{{yingjiResources.resourcesNumber}}</p>
        </div>
        <div class="row">
          <span class="left">负责人：</span>
          <span class="right2">{{yingjiResources.chargePerson}}</span>
        </div>
        <div class="row">
          <span class="left">联系电话：</span>
          <span class="right2">{{yingjiResources.contactTelephone}}</span>
        </div>
      </div>
    </div>
    <div class="dialogBox" v-if="dialogShow === 5" :style="dislogStyle">
      <div class="infoTitle">
        <p class="h6">消控室信息</p>
        <span class="closeSpan" @click="closeDialog">+</span>
      </div>
      <div class="Content">
        <div class="row">
          <p class="left">消控室名称：</p>
          <p class="right2">{{controlRoom.name}}</p>
          <div class="img"></div>
        </div>
        <div class="row">
          <p class="left">所属区域：</p>
          <p class="right2">{{controlRoom.managementArea}}</p>
        </div>
        <div class="row">
          <p class="left">消控室电话：</p>
          <p class="right2">{{controlRoom.fireRoomTelephone}}</p>
        </div>
        <div class="row">
          <p class="left">消控室负责人：</p>
          <p class="right2">{{controlRoom.administrator}}</p>
        </div>
        <div class="row">
          <span class="left">负责人电话：</span>
          <span class="right2">{{controlRoom.administratorTelephone}}</span>
        </div>
        <input id="lnglat2container" type="button" class="bot" @click="openVideo" value="查看消控室视频" />
      </div>
    </div>
    <div class="hoverBox" v-if="isHover" :style="hoverStyle" >
      <div class="hoverIconBox">
        <div class="hoverIcon hoverIcon1" @click="hoverclick(7)"></div>
        <span class="iconText">建筑信息</span>
      </div>
      <div class="hoverIconBox" v-if ="isbimbuildshow">
        <div class="hoverIcon hoverIcon2" @click="hoverclick(0)"></div>
        <span class="iconText">bim</span>
      </div>
      <div class="hoverIconBox" v-if ="!isbimbuildshow">
        <div class="hoverIcon hoverIcon2" @click="hoverclick(1)"></div>
        <span class="iconText">平面图纸</span>
      </div>
      <div class="hoverIconBox" v-if="isTaskShow">
        <div class="hoverIcon hoverIcon3" @click="hoverclick(2)"></div>
        <span class="iconText">隐患</span>
      </div>
      <div class="hoverIconBox">
        <div class="hoverIcon hoverIcon4" @click="hoverclick(3)"></div>
        <span class="iconText">隐患分析</span>
      </div>
      <div class="hoverIconBox">
        <div class="hoverIcon hoverIcon5" @click="hoverclick(4)"></div>
        <span class="iconText">设备</span>
      </div>
      <div class="hoverIconBox" v-if="isFireShow">
        <div class="hoverIcon hoverIcon6" @click="hoverclick(5)"></div>
        <span class="iconText">火警</span>
      </div>
      <div class="hoverIconBox">
        <div class="hoverIcon hoverIcon7" @click="hoverclick(6)"></div>
        <span class="iconText">火警分析</span>
      </div>
    </div>
  </div>
</template>

<script>
let coordtransform = require('coordtransform');

let map = null;
let _belongs = null;

export default {
  name: 'large1Map',
  props: {
    isHeatLayerShow: {
      Boolean
    },
    ifAlarm: {
      Object,
      default: () => {}
    },
    yingji: Number,
    isbimShow: {
      Boolean,
      default: false
    },
    isbimData: {
      Object,
      default: () => {}
    },
    wsData: {
      Object,
      default: () => {}
    },
    type: String,
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
      // map: null,
      mapLevel: 1,
      isbuildbim: true,
      box3Content: 'BIM模式',
      isBox3Click: false,
      max: 0,
      min: 0,
      routes: null,
      routePlannig: null,
      currentPosition: [],
      latitude: '',
      longitude: '',
      xuanId: '',
      ArchitectureDetail: null,
      isbimbuildshow: false,
      isFireShow: false,
      isTaskShow: false,
      buildid: '',
      bimViewer: null,
      openBim: false,
      lnglats: [],
      lnglatsHydrants: [],
      lnglatsCameras: [],
      miniFireStationLnglats: [],
      level1: 1.2,
      level2: 1.3,
      cameraHeight: 150,
      isZoom: false, // 是否是缩放事件
      requestTime: 0,
      infoWindow: null,
      currentID: null,
      dialogShow: 0, // 0：隐藏， 1： 设备详情， 2： 设备属性
      dislogStyle: 'left:40%;bottom:40%',
      dialogData: {
        device: {
          categoryName: '',
          deviceName: '',
          status: -1,
          address: '',
          activeTime: '',
          longitude: 0,
          latitude: 0,
          altitude: 0
        },
        property: {}
      },
      bimshow: 0, // 用于判断打不打开bim
      resourceArr: [], // 应急资源id
      pointArr: [], // 普通建筑打点,蓝色点和隐患点
      buildArr: [], // 接入系统的建筑
      weixiaozhanArr: [], // 微消站打点id
      controlRoomArr: [], // 微消站打点id
      equipmentArr: [], // 室外设备打点id
      importDeptListArr: [], // 重点单位打点id
      hoverTimer: null,
      isHover: false,
      hoverStyle: 'left:40%;top:40%',
      isbimShow1: true,
      miniFireStationInfo: {
        name: '',
        managementArea: '',
        administrator: '',
        administratorTelephone: '',
        miniFireStationTelephone: '',
        longitude: 0,
        latitude: 0
      },
      yingjiResources: {
        resourcesName: '',
        resourcesType: '',
        resourcesAddress: '',
        resourcesNumber: 0,
        chargePerson: '',
        contactTelephone: '',
        longitude: 0,
        latitude: 0
      },
      controlRoom: {
        name: '',
        managementArea: '',
        fireRoomTelephone: '',
        administrator: '',
        administratorTelephone: '',
        longitude: 0,
        latitude: 0
      },
      microInfoData: '',
      heatMap: null,
      buildInfo: '',
      isHeatSet: false
    };
  },
  watch: {
    // isbimShow1(val) {
    //   this.$emit('isbinShow1', val);
    // },
    mapLevel(val) {
      this.mapHeightChange(val);
    },
    isHeatLayerShow(Nval,Oval) {
      if (Oval !== -1) {
        this.removeHeatmap();
      }
      if (Nval === -1) {
        this.removeHeatmap();
      }
      else if (Nval === 1) {
        this.getHeatMapData(map);
      }
      else if (Nval === 2) {
        this.heatMapBuildList(map);
      }
    },
    yingji(val) {
      console.log('yingji: ', val);
      this.closeDialog();
      if (val === 1) {
        let timer = setInterval(() => {
          if (map) {
            clearInterval(timer);
            this.setYingJiPoint();
            this.setYingjiResourcePoint(this.isbimData.lon, this.isbimData.lat); // 地图应急模式打点应急资源(切换后在index文件中调用过了，不用重复调用)
            if (this.openBim) {
              this.bimshow = 0;
              this.openBim = false;
              if (_belongs) {
                _belongs.showAll(true); // 显示所有图层
                map.scene.requestRender();
              }
            }
          }
        }, 1000);
      }
      else {
        this.removeYingJiPoint();
        this.setNormalResourcePoint();
      }
    }
    // ifAlarm(val) {
    //   if (val) {
    //     this.bimshow = 1;
    //     this.$services.post({
    //       type: 'NEWBIM',
    //       url: 'setLayerCon',
    //       params: {
    //         warn:
    //           JSON.stringify({

    //             Type: 'Warning',
    //             deviceId: 'ZJHZ_YXXZGJHZZX3972',
    //             deviceName: '室内消火栓水压监测装置',
    //             deviceTypeName: '室内消火栓水压监测装置',
    //             deviceAddress: '一期中展区2层西侧',
    //             unitId: 'ZJHZ_YXXZGJHZZX_20180522',
    //             unitName: '云栖小镇国际会展中心',
    //             unitAddress: '浙江省杭州市西湖区河山路1号',
    //             device_time: '2018/6/28 14:08:47',
    //             Desc: '设备发现水压上限异常,水压8.08MPa',
    //             Id: 1,
    //             created_at: '2018/6/28 14:08:47'

    //           }),
    //         layerConfig:
    //           JSON.stringify(
    //             [{
    //               name: '1F',
    //               visible: true
    //             }, {
    //               name: '2F',
    //               visible: true
    //             }, {
    //               name: '3F',
    //               visible: true
    //             }, {
    //               name: 'B1',
    //               visible: true
    //             }, {
    //               name: 'B2',
    //               visible: true
    //             }, {
    //               name: 'F1消防设备',
    //               visible: true
    //             }, {
    //               name: 'F2消防设备',
    //               visible: true
    //             }, {
    //               name: 'F3消防设备',
    //               visible: true
    //             }, {
    //               name: 'B1消防设备',
    //               visible: false
    //             }, {
    //               name: 'B2消防设备',
    //               visible: false
    //             }, {
    //               name: '国际会展中心二期外层',
    //               visible: false
    //             }, {
    //               name: '云栖小镇高清影像',
    //               visible: true
    //             }]
    //           )

    //       }
    //     }).then(({ message, url }) => {
    //       console.log(message);
    //       if (message === 'success') {
    //         console.log(url);
    //         url = 'http://' + url;
    //         if (!this.openBim) {
    //           // this.bimViewer.innerHTML = url;
    //           document.getElementById('loadFrame').src = url;
    //           this.openBim = true;
    //         }
    //       }
    //     });
    //   }
    // }
  },
  methods: {
    isShowOutdoorEquipment(val) { // 改变室外设备打点显隐
      for (let i = 0; i < map.Billboards._billboards.length; i++) {
        if (map.Billboards._billboards[i]._id.indexOf('outdoorEquipment') !== -1) {
          map.Billboards._billboards[i].show = val;
        }
      }
      map.scene.requestRender();
    },
    isShowShexiangtou(val) { // 改变摄像头打点显隐
      for (let i = 0; i < map.Billboards._billboards.length; i++) {
        if (map.Billboards._billboards[i]._id.indexOf('shexiangtou_') !== -1) {
          map.Billboards._billboards[i].show = val;
        }
      }
      map.scene.requestRender();
    },
    setImportDeptList() {
      this.importDeptListArr.length > 0 && this.importDeptListArr.forEach(k => {
        this.removeById(k);
      });
      this.importDeptListArr = [];
      this.$services.get({
        type: 'LARGE',
        url: 'searchImportDeptList',
        params: {
          type: 'map'
        }
      }).then(({ data }) => {
        console.log('重点单位信息', data);
        data.importDeptList.length > 0 && data.importDeptList.forEach(k => {
          let imagelURL = './img/deviceIcon/importDept.png';
          let position = coordtransform.gcj02towgs84(Number(k.longitude), Number(k.latitude));
          let pos3D = QMap.Cartesian3.fromDegrees(position[0], position[1], 30);
          map.Billboards.add({
            id: 'importDeptList,' + k.id + ',' + k.longitude + ',' + k.latitude,
            position: pos3D,
            image: imagelURL,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 20,
            width: 20
          });
          this.importDeptListArr.push('importDeptList,' + k.id + ',' + k.longitude + ',' + k.latitude);
        });
      });
    },
    changeMapLevel() {
      if (map.camera.positionCartographic.height < 800) {
        this.mapLevel = 1;
      }
      else if (map.camera.positionCartographic.height < 1600) {
        this.mapLevel = 2;
      }
      else {
        this.mapLevel = 3;
      }
    },
    mapHeightChange(mapLevel) { // 地图视角高度变化是触发的事件,根据高度显示隐藏建筑与园区隐患火情打点
      console.log('显示等级', mapLevel);
      if (mapLevel === 3) {
        this.$parent.changeResourceCheckList(false);
        this.$parent.changeNormalResourceShow1(false);
        this.$parent.changeImportantShow1(false);
        this.isShowOutdoorEquipment(false);
        this.isShowShexiangtou(false);
        if (map.hydrantCollection) {
          map.hydrantCollection.show = false;
        }
        if (map.BillboardsText) {
          console.log('------------map1', map);
          for (let i = 0; i < map.BillboardsText._billboards.length; i++) {
            map.BillboardsText._billboards[i].show = false;
            console.log('-----------隐藏园区与建筑打点');
          }
          console.log('------------map2', map);
          console.log('隐藏园区与建筑打点');
        }
      }
      else {
        this.$parent.changeResourceCheckList(true);
        this.$parent.changeNormalResourceShow1(true);
        this.$parent.changeImportantShow1(true);
        this.isShowOutdoorEquipment(true);
        this.isShowShexiangtou(true);
        if (map.hydrantCollection) {
          map.hydrantCollection.show = true;
        }
        if (map.BillboardsText && mapLevel === 1) {
          for (let i = 0; i < map.BillboardsText._billboards.length; i++) {
            if (map.BillboardsText._billboards[i] && (map.BillboardsText._billboards[i]._id.substr(0, 11) === 'hiddenBuild' || map.BillboardsText._billboards[i]._id.substr(0, 9) === 'hiddenOut')) {
              map.BillboardsText._billboards[i].show = true;
              // console.log('-----------显示建筑打点');
            }
            else if (map.BillboardsText._billboards[i] && map.BillboardsText._billboards[i]._id.substr(0, 6) === 'yuanqu') {
              map.BillboardsText._billboards[i].show = false;
              console.log('-----------隐藏园区打点');
            }
          }
          console.log('显示建筑打点，隐藏园区打点');
        }
        else if (map.BillboardsText && mapLevel === 2) {
          for (let i = 0; i < map.BillboardsText._billboards.length; i++) {
            if (map.BillboardsText._billboards[i] && (map.BillboardsText._billboards[i]._id.substr(0, 11) === 'hiddenBuild' || map.BillboardsText._billboards[i]._id.substr(0, 9) === 'hiddenOut')) {
              map.BillboardsText._billboards[i].show = false;
              console.log('-----------隐藏建筑打点');
            }
            else if (map.BillboardsText._billboards[i] && map.BillboardsText._billboards[i]._id.substr(0, 6) === 'yuanqu') {
              map.BillboardsText._billboards[i].show = true;
              // console.log('-----------显示园区打点');
            }
          }
          console.log('隐藏建筑打点，显示园区打点');
        }
      }
      map.scene.requestRender();
    },
    openVideo() {
      console.log(this.controlRoom);
      this.$services.get({
        type: 'LARGE',
        url: 'getLiveData',
        params: {
          id: this.controlRoom.id,
          type: 'map'
        }
      }).then(({ data }) => {
        console.log('视频流: ', data);
        this.$parent.setVideoUrl(data.video.url, data.video.deviceName, data.video.productKey);
      });
    },
    toZoom(type) {
      let camera = map.camera;
      if (type === 'in') {
        camera.zoomIn(100);
        this.changeMapLevel();
      }
      else {
        camera.zoomOut(100);
        this.changeMapLevel();
      }
    },
    isShowNormalResource() {
      for (let i = 0; i < map.Billboards._billboards.length; i++) {
        if (map.Billboards._billboards[i]._id.substr(0, 8) === 'resource') {
          map.Billboards._billboards[i].show = !map.Billboards._billboards[i].show;
        }
      }
      map.scene.requestRender();
    },
    isShowNormalResource1(val) {
      for (let i = 0; i < map.Billboards._billboards.length; i++) {
        if (map.Billboards._billboards[i]._id.substr(0, 8) === 'resource') {
          map.Billboards._billboards[i].show = val;
        }
      }
      map.scene.requestRender();
    },
    isShowImportant() {
      for (let i = 0; i < map.Billboards._billboards.length; i++) {
        if (map.Billboards._billboards[i]._id.indexOf('importDeptList') !== -1) {
          map.Billboards._billboards[i].show = !map.Billboards._billboards[i].show;
        }
      }
      map.scene.requestRender();
    },
    isShowImportant1(val) {
      for (let i = 0; i < map.Billboards._billboards.length; i++) {
        if (map.Billboards._billboards[i]._id.indexOf('importDeptList') !== -1) {
          map.Billboards._billboards[i].show = val;
        }
      }
      map.scene.requestRender();
    },
    isShowResourceList(val) {
      for (let i = 0; i < map.Billboards._billboards.length; i++) {
        if (map.Billboards._billboards[i]._id.substr(0, 8) === 'resource') {
          map.Billboards._billboards[i].show = val[0];
        }
        else if (map.Billboards._billboards[i]._id.substr(0, 11) === 'weixiaozhan') {
          map.Billboards._billboards[i].show = val[1];
        }
        else if (map.Billboards._billboards[i]._id.substr(0, 11) === 'controlRoom') {
          map.Billboards._billboards[i].show = val[2];
        }
      }
      map.scene.requestRender();
    },
    msgFly1(lon, lat) {
      this.closeDialog();
      const fly = new QMap.Fly(map, {
        complete: () => {}
      });
      // fly.withHeadingPitchRoll(0, -30, 0);
      let gcj02towgs84 = coordtransform.gcj02towgs84(lon, lat);
      // console.log(gcj02towgs84);
      fly.flyTo([gcj02towgs84[0], gcj02towgs84[1]], 1500).play();
    },
    getLocation() {
      let amap = new AMap.Map('', );
      AMap.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000 // 超过10秒后停止定位，默认：5s
        });
        amap.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            this.onsuccess(result);
          }
          else {
            this.onError(result);
          }
        });
      });
    },
    onsuccess(data) {
      console.log('定位结果：' + data.position, '定位类别：' + data.location_type);
      let pos = data.position + '';
      this.currentPosition = pos.split(',');
    },
    onError(data) {
      console.log(data, '定位失败');
    },
    setRouter(val) {
      // 路径规划
      let originPos = coordtransform.gcj02towgs84(this.currentPosition[0], this.currentPosition[1]);
      // console.log(originPos,'000000');
      let destinationPos = coordtransform.gcj02towgs84(val.lng, val.lat);
      if (!this.routePlannig) {
        this.routePlannig = new QMap.RoutePlanning(map);
      }
      this.routes = this.routePlannig.planRoute({
        origin: originPos,
        destination: destinationPos
      });
      // console.log(destinationPos,'destinationPos');
    },
    removeRouter() {
      if (this.routePlannig || this.routes) {
        this.routePlannig.removeAllRoutes();
        this.routePlannig = null;
        this.routes = null;
      }
    },
    getHeatMapData(qMap) {
      this.isHeatSet = true;
      this.$emit('changeIsHeatSet', this.isHeatSet);
      this.$services.get({
        type: 'LARGE',
        url: 'heatMapListGetData',
        params: {
          type: 'heatMapList'
        }
      }).then(({ data }) => {
        // console.log('热力图:', data);
        this.max = 0;
        this.min = 0;
        let html = document.documentElement;
        let wW = html.clientWidth; // 窗口宽度
        let wH = html.clientHeight; // 窗口高度
        let pixel1 = new QMap.Cartesian2(0, wH); // 左下
        let pixel2 = new QMap.Cartesian2(wW, 0); // 右上
        let num = 0;
        let timer = setInterval(() => {
          num++;
          let cartesian1 = map.scene.globe.pick(map.camera.getPickRay(pixel1), map.scene);
          let cartesian2 = map.scene.globe.pick(map.camera.getPickRay(pixel2), map.scene);
          if (cartesian1 && cartesian2) {
            clearInterval(timer);
            let cartographic1 = map.scene.globe.ellipsoid.cartesianToCartographic(cartesian1);
            let latitude1 = Cesium.Math.toDegrees(cartographic1.latitude) - 0.05;
            let longitude1 = Cesium.Math.toDegrees(cartographic1.longitude) - 0.05;
            // console.log(6);
            let cartographic2 = map.scene.globe.ellipsoid.cartesianToCartographic(cartesian2);
            // console.log(7);
            let latitude2 = Cesium.Math.toDegrees(cartographic2.latitude) + 0.05;
            let longitude2 = Cesium.Math.toDegrees(cartographic2.longitude) + 0.05;
            // console.log(1);
            let bounds1 = {
              west: longitude1,
              east: longitude2,
              south: latitude1,
              north: latitude2
            };
            // console.log(2);
            let options1 = {
              radius: 10, // 半径
              maxOpacity: 0.9, // 最大不透明的程度
              minOpacity: 0.3, // 最大透明度 （最小不透明度）
              blur: 0.89, // 模糊值(过度)
              gradient: { // 色表
                0.9: 'red', // 最大值0.9 使用红色
                0.8: 'orange',
                0.7: 'yellow',
                0.5: 'blue',
                0: 'green'
              }
            };
            // console.log(3);
            // let datas1 = [
            //   { x: 110.0308, y: 32.2851, value: 83 },
            //   { x: 115.5491, y: 33.2063, value: 90 },
            //   { x: 109.8505, y: 27.6064, value: 45 },
            //   { x: 115.8692, y: 29.2002, value: 89 }
            // ];
            let datas1 = [];
            for (let i = 0; i < data.length; i++) {
              let option = coordtransform.gcj02towgs84(data[i].longitude, data[i].latitude);
              datas1.push({
                x: option[0],
                y: option[1],
                value: data[i].data
                // value: 70
              });
              if (this.max < data[i].data) {
                this.max = data[i].data;
              }
            }
            // console.log('---------datas1-----------', datas1);
            this.addHeatMap(qMap, bounds1, options1, datas1);
          }
          else if (num >= 10) {
            clearInterval(timer);
            this.getHeatMapData();
          }
        }, 1000);
      });
    },
    heatMapBuildList(qMap) {
      this.isHeatSet = true;
      this.$emit('changeIsHeatSet', this.isHeatSet);
      this.$services.get({
        type: 'LARGE',
        url: 'heatMapBuildList',
        params: {
          type: 'heatMapBuildList'
        }
      }).then(({ data }) => {
        // console.log('热力图:', data);
        this.max = -100;
        this.min = data.length > 0 ? -data[0].data : 0;
        let html = document.documentElement;
        let wW = html.clientWidth; // 窗口宽度
        let wH = html.clientHeight; // 窗口高度
        let pixel1 = new QMap.Cartesian2(0, wH); // 左下
        let pixel2 = new QMap.Cartesian2(wW, 0); // 右上
        let num = 0;
        let timer = setInterval(() => {
          num++;
          let cartesian1 = map.scene.globe.pick(map.camera.getPickRay(pixel1), map.scene);
          let cartesian2 = map.scene.globe.pick(map.camera.getPickRay(pixel2), map.scene);
          if (cartesian1 && cartesian2) {
            clearInterval(timer);
            let cartographic1 = map.scene.globe.ellipsoid.cartesianToCartographic(cartesian1);
            let latitude1 = Cesium.Math.toDegrees(cartographic1.latitude) - 0.05;
            let longitude1 = Cesium.Math.toDegrees(cartographic1.longitude) - 0.05;
            // console.log(6);
            let cartographic2 = map.scene.globe.ellipsoid.cartesianToCartographic(cartesian2);
            // console.log(7);
            let latitude2 = Cesium.Math.toDegrees(cartographic2.latitude) + 0.05;
            let longitude2 = Cesium.Math.toDegrees(cartographic2.longitude) + 0.05;
            // console.log(1);
            let bounds1 = {
              west: longitude1,
              east: longitude2,
              south: latitude1,
              north: latitude2
            };
            // console.log(2);
            let options1 = {
              radius: 10, // 半径
              maxOpacity: 0.9, // 最大不透明的程度
              minOpacity: 0.3, // 最大透明度 （最小不透明度）
              blur: 0.89, // 模糊值(过度)
              gradient: { // 色表
                0.9: 'red', // 最大值0.9 使用红色
                0.8: 'orange',
                0.7: 'yellow',
                0.5: 'blue',
                0: 'green'
                // 0.9: 'green', // 最大值0.9 使用绿色
                // 0.8: 'blue',
                // 0.7: 'yellow',
                // 0.5: 'orange',
                // 0: 'red'
              }
            };
            // console.log(3);
            // let datas1 = [
            //   { x: 110.0308, y: 32.2851, value: 83 },
            //   { x: 115.5491, y: 33.2063, value: 90 },
            //   { x: 109.8505, y: 27.6064, value: 45 },
            //   { x: 115.8692, y: 29.2002, value: 89 }
            // ];
            let datas1 = [];
            for (let i = 0; i < data.length; i++) {
              let option = coordtransform.gcj02towgs84(data[i].longitude, data[i].latitude);
              data[i].data = -data[i].data;
              datas1.push({
                x: option[0],
                y: option[1],
                value: data[i].data
                // value: 70
              });
              if (this.max < data[i].data) {
                this.max = data[i].data;
              }
              if (this.min > data[i].data) {
                this.min = data[i].data;
              }
            }
            // console.log('---------datas1-----------', datas1);
            this.addHeatMap(qMap, bounds1, options1, datas1);
          }
          else if (num >= 10) {
            clearInterval(timer);
            this.heatMapBuildList();
          }
        }, 1000);
      });
    },
    addHeatMap(qMap, bounds, options, datas) {
      getCesiumHeatmap();
      // console.log(CesiumHeatmap);
      this.heatMap = CesiumHeatmap.create(qMap, bounds, options);
      let valueMin = this.min;

      let valueMax = this.max;
      this.heatMap.setWGS84Data(valueMin, valueMax, datas);
      map.scene.requestRender();
      this.isHeatSet = false;
      this.$emit('changeIsHeatSet', this.isHeatSet);
      // console.log('热力图开启!');
    },
    removeHeatmap() {
      if (this.heatMap) {
        this.isHeatSet = true;
        this.$emit('changeIsHeatSet', this.isHeatSet);
        this.heatMap.remove();
        map.scene.requestRender();
        this.heatMap = null;
        this.isHeatSet = false;
        this.$emit('changeIsHeatSet', this.isHeatSet);
      }
    },
    hoverclick(val) {
      if (val === 0) {
        this.getData1(0);
        // this.$emit('buildbim', this.ArchitectureDetail);
      }
      else if (val === 1) {
        this.getData1(1);
        // this.$emit('buildPing', this.ArchitectureDetail);
      }
      else if (val === 2) {
        // this.$emit('yinhuan', this.ArchitectureDetail);
        this.$emit('yinhuan', { id: this.xuanId, latitude: this.latitude, longitude: this.longitude });
      }
      else if (val === 3) {
        // this.$emit('yinhuanAnaly', this.ArchitectureDetail);
        this.$emit('yinhuanAnaly', { latitude: this.latitude, longitude: this.longitude });
      }
      else if (val === 4) {
        // this.$emit('buildshebei', this.ArchitectureDetail);
        this.$emit('buildshebei', { latitude: this.latitude, longitude: this.longitude });
      }
      else if (val === 5) {
        // this.$emit('fireWindow', this.ArchitectureDetail);
        this.$emit('fireWindow', { id: this.xuanId, latitude: this.latitude, longitude: this.longitude });
      }
      else if (val === 6) {
        // this.$emit('fireAnaly', this.ArchitectureDetail);
        this.$emit('fireAnaly', { latitude: this.latitude, longitude: this.longitude });
      }
      else if (val === 7) {
        // this.$emit('buildInfoWindow', this.ArchitectureDetail);
        this.getData(this.buildid);
        // this.$emit('buildInfoWindow', this.buildInfo, this.hoverStyle);
      }
    },
    getData(obj) {
      // console.log('obj', obj);
      this.$services.get({
        type: 'LARGE',
        url: 'getArchitectureByBuildNo',
        params: {

          buildNo: obj + '',
          type: 'map'
        }
      }).then(({ data }) => {
        // console.log('-------------getArchitectureByBuildNo---------------', data);
        // this.latitude = data.architecture.latitude;
        // this.longitude = data.architecture.longitude;
        this.buildInfo = data;
        this.$emit('buildInfoWindow', this.buildInfo, this.hoverStyle);
        // this.getData1();
      });
    },
    getData1(type) {

      this.$services.get({
        type: 'LARGE',
        url: 'getArchitectureDetailData',
        params: {
          lat: this.latitude,
          lng: this.longitude,
          type: 'map'
        }
      }).then(({ data }) => {
        console.log('-------------getArchitectureDetailData---------------', data);
        this.ArchitectureDetail = data;
        if (type === 0) {
          this.$emit('buildbim', this.ArchitectureDetail);
        }
        else {
          this.$emit('buildPing', this.ArchitectureDetail);
        }
        // if (data.eventType === 'blue_print') {
        //   this.isbimbuildshow = false;
        // }
        // else if (data.eventType === 'bim') {
        //   this.isbimbuildshow = true;
        // }
      });
    },
    msgOpenNormalBim(obj) {
      this.bimshow = 1;
      this.isbimShow1 = false;
      this.isbuildbim = true;
      console.log('普通建筑的图层树：', obj.layerConfig);
      this.$services.post({
        type: 'NEWBIM',
        url: 'setLayerCon',
        params: {
          layerConfig:
            JSON.stringify(obj.layerConfig)
        }
      }).then(({ message, url }) => {
        // console.log(message);
        if (message === 'success') {
          // console.log(url);
          // url = 'http://' + url;
          if (!this.openBim) {
            // this.bimViewer.innerHTML = url;
            document.getElementById('loadFrame').src = url;
            this.openBim = true;
            if (_belongs) {
              _belongs.showAll(false); // 隐藏所有图层
              this.$parent.changeResourceCheckList(false);
              this.$parent.changeNormalResourceShow1(false);
              this.$parent.changeImportantShow1(false);
              this.isShowOutdoorEquipment(false);
              this.isShowShexiangtou(false);
              if (map.hydrantCollection) {
                map.hydrantCollection.show = false;
              }
              if (map.BillboardsText) {
                for (let i = 0; i < map.BillboardsText._billboards.length; i++) {
                  map.BillboardsText._billboards[i].show = false;
                }
              }
              if (map.treeBillboards) {
                for (let i = 0; i < map.treeBillboards._billboards.length; i++) {
                  map.treeBillboards._billboards[i].show = false;
                }
              }
              map.scene.requestRender();
            }
          }
        }
      });
    },
    removeById(id) {
      for (let i = 0; i < map.Billboards._billboards.length; i++) {
        if (map.Billboards._billboards[i] && map.Billboards._billboards[i]._id === id) {
          map.Billboards.remove(map.Billboards._billboards[i]);
        }
      }
    },
    removeBoardsText(id) {
      for (let i = 0; i < map.BillboardsText.length; i++) {
        if (map.BillboardsText._billboards[i] && map.BillboardsText._billboards[i]._id === id) {
          map.BillboardsText.remove(map.BillboardsText._billboards[i]);
        }
      }
    },
    setYingJiPoint() {
      // console.log('---------setYingJiPoint-----------');
      /* 应急页面-微消站打点 */
      let params1 = {};
      if (this.yjProductkey && this.yjDeviceName) {
        params1 = {
          productKey: this.yjProductkey,
          deviceName: this.yjDeviceName,
          emId: this.yjEmId,
          type: 'getEmeSupplies'
        };
      }
      else {
        params1 = {
          emId: this.yjEmId,
          type: 'getEmeSupplies'
        };
      }
      this.$services.get({
        type: 'LARGE',
        url: 'getEmeSuppliesGetData',
        params: params1
        // params: {
        //   // deviceName: 'd896e0001c000261',
        //   // emId: '3',
        //   // productKey: 'a1bA1E0trwT',
        //   productKey: this.yjProductkey,
        //   deviceName: this.yjDeviceName,
        //   emId: this.yjEmId,
        //   type: 'getEmeSupplies'
        // }
      }).then(({ data }) => {
        console.log('微消站信息', data);
        data.length > 0 && data.forEach(k => {
          let imagelURL = './img/deviceIcon/miniFireStation.png';
          let position = coordtransform.gcj02towgs84(Number(k.longitude), Number(k.latitude));
          let pos3D = QMap.Cartesian3.fromDegrees(position[0], position[1], 30);
          map.Billboards.add({
            id: 'weixiaozhan,' + k.id + ',' + k.longitude + ',' + k.latitude,
            position: pos3D,
            image: imagelURL,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 20,
            width: 20
          });
          this.weixiaozhanArr.push('weixiaozhan,' + k.id + ',' + k.longitude + ',' + k.latitude);
        });
      });
      /* 应急页面-消控室打点 */
      let params2 = {};
      if (this.yjProductkey && this.yjDeviceName) {
        params2 = {
          productKey: this.yjProductkey,
          deviceName: this.yjDeviceName,
          emId: this.yjEmId,
          type: 'getControlRooms'
        };
      }
      else {
        params2 = {
          emId: this.yjEmId,
          type: 'getControlRooms'
        };
      }
      this.$services.get({
        type: 'LARGE',
        url: 'getControlRooms',
        params: params2
        // params: {
        //   // deviceName: 'd896e0001c000261',
        //   // emId: '4',
        //   // productKey: 'a1bA1E0trwT',
        //   productKey: this.yjProductkey,
        //   deviceName: this.yjDeviceName,
        //   emId: this.yjEmId,
        //   type: 'getControlRooms'
        // }
      }).then(({ data }) => {
        console.log('消控室打点', data);
        // console.log('getControlRooms: ', data);
        data.length > 0 && data.forEach(k => {
          let imagelURL = './img/deviceIcon/controlRoom.png';
          let position = coordtransform.gcj02towgs84(Number(k.longitude), Number(k.latitude));
          let pos3D = QMap.Cartesian3.fromDegrees(position[0], position[1], 30);
          map.Billboards.add({
            id: 'controlRoom,' + k.id + ',' + k.longitude + ',' + k.latitude,
            position: pos3D,
            image: imagelURL,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 20,
            width: 20
          });
          this.controlRoomArr.push('controlRoom,' + k.id + ',' + k.longitude + ',' + k.latitude);
        });
      });
    },
    /* 移除应急打点方法 */
    removeYingJiPoint() {
      this.weixiaozhanArr.length > 0 && this.weixiaozhanArr.forEach(k => {
        this.removeById(k);
      });
      this.weixiaozhanArr = [];
      /* 移除消控室打点 */
      this.controlRoomArr.length > 0 && this.controlRoomArr.forEach(k => {
        this.removeById(k);
      });
      this.controlRoomArr = [];
    },
    initMapInfos() { // 千寻地图
      map = new QMap.Map('mapContainer3', {
        fullscreenButton: true,
        selectionIndicator: false,
        // imageryProvider: new QMap.GoogleImageryProvider()
        imageryProvider: new QMap.TiandituImageryProvider({
          dehaze: false,
          blankTileEliminate: true
        })
      });
      map.imageryLayers.get(0).blankTileEliminate = true; // 注: 默认为false,空白瓦片消除
      // // 天地图影像
      // map.imageryLayers.add(new QMap.ImageryLayer(new QMap.TiandituImageryProvider(), {
      //   dehaze: false,
      //   blankTileEliminate: true
      // }));
      // 高德
      // map.imageryLayers.add(new QMap.ImageryLayer(new QMap.GaodeImageryProvider({
      //   maximumLevel: 18
      // })));
      map.scene.globe.depthTestAgainstTerrain = true;
      map.scene.debugShowFramesPerSecond = true; // 帧率监测
      // CPU功耗优化
      map.clock.shouldAnimate = false;
      map.scene.requestRenderMode = true;
      map.scene.maximumRenderTimeChange = 0.5; // 控制场景刷新率，最⼤渲染间隔时间 单位为秒
      // 2. 飞到演示区
      const fly = new QMap.Fly(map, {
        complete: () => {
          // this.cameraHeight = map.camera.positionCartographic.height;
          // this.setPoint();
          if (this.yingji === 1) {
            this.msgFly(this.ifAlarm.lon, this.ifAlarm.lat, '', '');
          }
          else {
            this.setNormalResourcePoint();
          }

        }
      });
      fly.withHeadingPitchRoll(0, -30, 0);
      let gcj02towgs84 = coordtransform.gcj02towgs84(120.084073, 30.126027);
      fly.flyTo([gcj02towgs84[0], gcj02towgs84[1]], 150).play();
      map.Billboards = map.scene.primitives.add(new QMap.BillboardCollection());
      let handler = new QMap.ScreenSpaceEventHandler(map.scene.canvas);
      // 地图点击事件
      let selectObjectId = null;
      let selectAttributes = null;
      handler.setInputAction(movement => {
        let pick = map.scene.pick(movement.position);
        // console.log('---------单击事件----------');
        console.log('地图点击事件', pick);
        if (QMap.defined(pick)) {
          if (!pick.id && pick._instanceId) { // 点击室外设备点消防栓
            this.$services.get({
              type: 'LARGE',
              url: 'detail',
              params: {
                name: pick._instanceId
              }
            }).then(({ data }) => { // 传参pick.id._id调取设备详情接口，返回值编辑content，deviceProperty
              // console.log('-------------data2---------------', data);
              let rem = parseInt(document.documentElement.style.fontSize);
              let domWidth = 4.5 * rem;
              let windowHeight = document.documentElement.clientHeight;
              gcj02towgs84 = coordtransform.gcj02towgs84(data.device.longitude, data.device.latitude);
              const position = QMap.Cartesian3.fromDegrees(gcj02towgs84[0], gcj02towgs84[1]);
              const result = QMap.SceneTransforms.wgs84ToWindowCoordinates(map.scene, position);
              this.dislogStyle = `left: ${result.x - (domWidth / 2) - 5}px;bottom: ${windowHeight - result.y + 60}px`;
              this.dialogData = data;
              this.dialogShow = 1;
            });
          }
          else if (pick.id && pick.collection && pick.id.substr(0, 16) === 'outdoorEquipment') { // 点击室外设备
            this.$services.get({
              type: 'LARGE',
              url: 'detail',
              params: {
                name: pick.id.substr(16)
              }
            }).then(({ data }) => { // 传参pick.id._id调取设备详情接口，返回值编辑content，deviceProperty
              // console.log('-------------data2---------------', data);
              let rem = parseInt(document.documentElement.style.fontSize);
              let domWidth = 4.5 * rem;
              let windowHeight = document.documentElement.clientHeight;
              gcj02towgs84 = coordtransform.gcj02towgs84(data.device.longitude, data.device.latitude);
              const position = QMap.Cartesian3.fromDegrees(gcj02towgs84[0], gcj02towgs84[1]);
              const result = QMap.SceneTransforms.wgs84ToWindowCoordinates(map.scene, position);
              this.dislogStyle = `left: ${result.x - (domWidth / 2) - 5}px;bottom: ${windowHeight - result.y + 60}px`;
              this.dialogData = data;
              this.dialogShow = 1;
            });
          }
          else if (pick.id && pick.collection && pick.id.substr(0, 11) === 'weixiaozhan') { // 点击微消站
            let str = pick.id.split(',');
            this.$services.get({
              type: 'LARGE',
              url: 'getMiniStationDetailGetData',
              params: {
                // id: '1',
                id: str[1],
                lat: str[3],
                lng: str[2],
                type: 'map'
              }
            }).then(({ data }) => {
              let list = data.architecture;
              this.microInfoData = list;
              this.miniFireStationInfo.name = list.name;
              this.miniFireStationInfo.managementArea = list.managementArea;
              this.miniFireStationInfo.miniFireStationTelephone = list.miniFireStationTelephone;
              this.miniFireStationInfo.administrator = list.administrator;
              this.miniFireStationInfo.administratorTelephone = list.administratorTelephone;
              let rem = parseInt(document.documentElement.style.fontSize);
              let domWidth = 4.5 * rem;
              let windowHeight = document.documentElement.clientHeight;
              gcj02towgs84 = coordtransform.gcj02towgs84(Number(str[2]), Number(str[3]));
              const position = QMap.Cartesian3.fromDegrees(gcj02towgs84[0], gcj02towgs84[1]);
              const result = QMap.SceneTransforms.wgs84ToWindowCoordinates(map.scene, position);
              this.dislogStyle = `left: ${result.x - (domWidth / 2) - 5}px;bottom: ${windowHeight - result.y + 60}px`;
              this.dialogShow = 3;
            });
          }
          else if (pick.id && pick.collection && pick.id.substr(0, 11) === 'controlRoom') { // 点击消控室
            let str = pick.id.split(',');
            this.$services.get({
              type: 'LARGE',
              url: 'mapControlRoomDetail',
              params: {
                // id: '49',
                // lat: '30.129476',
                // lng: '120.087494',
                id: str[1],
                lat: str[3],
                lng: str[2],
                type: 'map'
              }
            }).then(({ data }) => {
              // console.log('mapControlRoomDetail: ', data);
              let list = data.architecture;
              this.controlRoom = list;
              this.controlRoom.name = list.name;
              this.controlRoom.managementArea = list.managementArea;
              this.controlRoom.fireRoomTelephone = list.fireRoomTelephone;
              this.controlRoom.administrator = list.administrator;
              this.controlRoom.administratorTelephone = list.administratorTelephone;
              this.controlRoom.longitude = list.longitude;
              this.controlRoom.latitude = list.latitude;
              let rem = parseInt(document.documentElement.style.fontSize);
              let domWidth = 4.5 * rem;
              let windowHeight = document.documentElement.clientHeight;
              gcj02towgs84 = coordtransform.gcj02towgs84(this.controlRoom.longitude, this.controlRoom.latitude);
              const position = QMap.Cartesian3.fromDegrees(gcj02towgs84[0], gcj02towgs84[1]);
              const result = QMap.SceneTransforms.wgs84ToWindowCoordinates(map.scene, position);
              this.dislogStyle = `left: ${result.x - (domWidth / 2) - 5}px;bottom: ${windowHeight - result.y + 60}px`;
              this.dialogShow = 5;
            });
          }
          else if (pick.id && pick.collection && pick.id.substr(0, 8) === 'resource') { // 点击应急资源
            // console.log('------------resources--------------');
            this.$services.get({
              type: 'LARGE',
              url: 'getSourceDetailGetData',
              params: {
                id: pick.id.substr(8),
                type: 'map'
              }
            }).then(({ data }) => {
              let list = data.architecture;
              this.yingjiResources.resourcesName = list.resourcesName;
              this.yingjiResources.resourcesType = list.resourcesType;
              this.yingjiResources.resourcesAddress = list.resourcesAddress;
              this.yingjiResources.resourcesNumber = list.resourcesNumber;
              this.yingjiResources.chargePerson = list.chargePerson;
              this.yingjiResources.contactTelephone = list.contactTelephone;
              this.yingjiResources.longitude = list.longitude;
              this.yingjiResources.latitude = list.latitude;
              let rem = parseInt(document.documentElement.style.fontSize);
              let domWidth = 4.5 * rem;
              let windowHeight = document.documentElement.clientHeight;
              gcj02towgs84 = coordtransform.gcj02towgs84(this.yingjiResources.longitude, this.yingjiResources.latitude);
              const position = QMap.Cartesian3.fromDegrees(gcj02towgs84[0], gcj02towgs84[1]);
              const result = QMap.SceneTransforms.wgs84ToWindowCoordinates(map.scene, position);
              this.dislogStyle = `left: ${result.x - (domWidth / 2) - 5}px;bottom: ${windowHeight - result.y + 60}px`;
              this.dialogShow = 4;
            });
          }
          else if (pick.id && pick.collection && pick.id.indexOf('_') !== -1) { // 点击摄像头
            let str = pick.id.split(',');
            let deviceName = str[1];
            let productKey = str[2];
            this.$services.get({
              type: 'LARGE',
              url: 'videoShowGetData',
              params: {
                deviceName,
                productKey,
                type: 'videoShow'
              }
            }).then(({ data }) => {
              // this.$emit('setVideoUrl', data.video.url);
              this.$parent.setVideoUrl(data.video.url,deviceName,productKey);
            });
          }
          else if (this.level1 === 1.1 && this.level2 === 1.2 && pick.collection) { // 点击园区点
            this.level1 = 1.2;
            this.level2 = 1.3;
            const fly = new QMap.Fly(map, {
              complete: () => {
                this.setPoint();
              }
            });
            fly.withHeadingPitchRoll(0, -30, 0);
            let gcj02towgs84 = coordtransform.gcj02towgs84(120.084073, 30.126027);
            fly.flyTo([gcj02towgs84[0], gcj02towgs84[1]], 150).play();
          }
          else if (pick.collection) { // 点击建筑点
            this.$message({
              message: '该点不是室外设备哦',
              type: 'warning'
            });
          }
          else { // 点击建筑事件，动画效果
            // 1. 未选中建筑
            if (!QMap.defined(pick) || !QMap.defined(pick.id)) {
              // if (nameOverlay) {
              //   nameOverlay.style.display = 'none';
              // }
              if (selectObjectId && selectAttributes) {
                selectAttributes.color = [255, 0, 0, 0];
                selectObjectId = null;
                selectAttributes = null;
              }
              return;
            }
            // 2.选择相同实体，直接返回
            if (pick.id === selectObjectId) {
              return;
            }
            // 清楚hover结果
            if (pick.id === hoverObjectId) {
              hoverObjectId = null;
              hoverAttributes = null;
            }
            // 3.选择了新的实体
            if (selectObjectId && selectAttributes) {
              selectAttributes.color = [255, 0, 0, 0];
              selectAttributes = null;
            }
            selectObjectId = pick.id;
            selectAttributes = pick.primitive.getGeometryInstanceAttributes(selectObjectId);
            selectAttributes.color = [255, 0, 0, 50];
            // if (nameOverlay) {
            //   nameOverlay.style.display = 'block';
            //   nameOverlay.style.bottom = map.canvas.clientHeight - movement.position.y + 'px';
            //   nameOverlay.style.left = movement.position.x + 'px';
            //   nameOverlay.textContent = selectObjectId;
            // }
          }
        }
      }, QMap.ScreenSpaceEventType.LEFT_CLICK);
      // 添加鼠标滑过事件
      let hoverObjectId = null;
      let hoverAttributes = null;
      // 建筑名称显示
      // const nameOverlay = document.createElement('div');
      // nameOverlay.style.display = 'none';
      // nameOverlay.style.position = 'absolute';
      // nameOverlay.style.bottom = '0';
      // nameOverlay.style.left = '0';
      // nameOverlay.style['pointer-events'] = 'none';
      // nameOverlay.style.padding = '4px';
      // nameOverlay.style.backgroundColor = 'black';
      // nameOverlay.style.color = 'white';
      // map.container.appendChild(nameOverlay);

      handler.setInputAction(movement => {
        const pickedObject = map.scene.pick(movement.endPosition);
        // 1. 未选中
        if (!QMap.defined(pickedObject) || !QMap.defined(pickedObject.id) || !pickedObject || !pickedObject.primitive.getGeometryInstanceAttributes) {
          this.isHover = false;
          if (this.hoverTimer) {
            clearTimeout(this.hoverTimer);
            this.hoverTimer = null;
          }
          // if (nameOverlay) {
          //   nameOverlay.style.display = 'none';
          // }
          if (hoverObjectId && hoverAttributes) {
            hoverAttributes.color = [255, 0, 0, 0];
            hoverObjectId = null;
            hoverAttributes = null;
          }
          return;
        }

        this.buildid = pickedObject.id.substring(pickedObject.id.indexOf('(') + 1, pickedObject.id.indexOf(')'));
        if (!this.hoverTimer) {
          // this.getData(this.buildid);
          this.hoverTimer = setTimeout(() => {
            let build = this.buildArr.find(k => k.buildNo === this.buildid);
            console.log(build);
            if (!build || this.yingji === 1) return;
            this.latitude = build.latitude;
            this.longitude = build.longitude;
            this.xuanId = build.id;
            if (build.type === 'blue_print') {
              this.isbimbuildshow = false;
            }
            else if (build.type === 'bim') {
              this.isbimbuildshow = true;
            }
            if (build.taskNum && build.taskNum > 0) {
              this.isTaskShow = true;
            }
            else {
              this.isTaskShow = false;
            }
            if (build.fireNum && build.fireNum > 0) {
              this.isFireShow = true;
            }
            else {
              this.isFireShow = false;
            }
            // this.isbimbuildshow = false;
            let rem = parseFloat(document.documentElement.style.fontSize);
            let domWidth = 5.5 * rem;
            let domHeight = 4 * rem;
            let windowHeight = document.documentElement.clientHeight;
            let windowWidth = document.documentElement.clientWidth;
            // this.hoverStyle = `left: ${movement.endPosition.x - (domWidth / 2)}px;bottom: ${windowHeight - movement.endPosition.y + 10}px`;
            let oLeft = movement.endPosition.x - (domWidth / 2);
            let oTop = movement.endPosition.y - (domHeight / 2);
            if (oLeft < windowWidth * 0.2) {
              oLeft = windowWidth * 0.2;
            }
            else if (oLeft > windowWidth * 0.8 - domWidth) {
              oLeft = windowWidth * 0.8 - domWidth;
            }
            if (oTop < 4.7 * rem) {
              oTop = 4.7 * rem;
            }
            else if (oTop > windowHeight * 0.8 - domHeight) {
              oTop = windowHeight * 0.8 - domHeight;
            }
            this.hoverStyle = `left: ${oLeft}px;top: ${oTop}px`;
            this.isHover = true;
          }, 500);
        }
        // 2. 选中单击的实体或者之前已经选了的实体
        if (selectObjectId === pickedObject.id || hoverObjectId === pickedObject.id) {
          return;
        }
        // 3. 选中其它实体
        if (hoverObjectId && hoverAttributes) {
          this.isHover = false;
          if (this.hoverTimer) {
            clearTimeout(this.hoverTimer);
            this.hoverTimer = null;
          }
          hoverAttributes.color = [255, 0, 0, 0];
          hoverAttributes = null;
        }
        hoverObjectId = pickedObject.id;
        hoverAttributes = pickedObject.primitive.getGeometryInstanceAttributes(hoverObjectId);
        hoverAttributes.color = [0, 255, 0, 50];
        // 更新nameOverlay
        // if (nameOverlay) {
        //   nameOverlay.style.display = 'block';
        //   nameOverlay.style.bottom = map.canvas.clientHeight - movement.endPosition.y + 'px';
        //   nameOverlay.style.left = movement.endPosition.x + 'px';
        //   nameOverlay.textContent = hoverObjectId;
        // }
      }, QMap.ScreenSpaceEventType.MOUSE_MOVE);
      console.log(map.camera.positionCartographic.height, '初始化为flyTo的150');
      map.camera.moveStart.addEventListener(this.mapMoveEvent);
      this.setBelongs();
      handler.setInputAction(movement => {
        // console.log(movement, map.camera.positionCartographic.height, '缩放事件');
        this.changeMapLevel();
      }, QMap.ScreenSpaceEventType.WHEEL);
    },
    mapMoveEvent(e) { // 地图缩放时会先触发缩放事件再触发拖拽事件。绑定拖拽事件关闭各种弹窗
      this.closeDialog();
      this.dialogShow = 0;
      this.$emit('closeAllWindow');
    },
    msgFly(lon, lat, deviceName, type) {
      this.closeDialog();
      const fly = new QMap.Fly(map, {
        complete: () => {
          if (type === 'hiddenWarn') {
            this.$services.get({
              type: 'LARGE',
              url: 'detail',
              params: {
                name: deviceName
              }
            }).then(({ data }) => { // 传参pick.id._id调取设备详情接口，返回值编辑content，deviceProperty
              // console.log('-------------data2---------------', data);
              let rem = parseInt(document.documentElement.style.fontSize);
              let domWidth = 4.5 * rem;
              let windowHeight = document.documentElement.clientHeight;
              const position = QMap.Cartesian3.fromDegrees(gcj02towgs84[0], gcj02towgs84[1]);
              const result = QMap.SceneTransforms.wgs84ToWindowCoordinates(map.scene, position);
              this.dislogStyle = `left: ${result.x - (domWidth / 2) - 5}px;bottom: ${windowHeight - result.y + 60}px`;
              this.dialogData = data;
              this.dialogShow = 1;
            });
          }
        }
      });
      // fly.withHeadingPitchRoll(0, -30, 0);
      let gcj02towgs84 = coordtransform.gcj02towgs84(lon, lat);
      // console.log(gcj02towgs84);
      fly.flyTo([gcj02towgs84[0], gcj02towgs84[1]], this.cameraHeight).play();
      // let center = QMap.Cartesian3.fromDegrees(gcj02towgs84[0], gcj02towgs84[1]);
      // let heading = QMap.Math.toRadians(50.0);
      // let pitch = QMap.Math.toRadians(-30.0);
      // let range = 500.0;
      // map.camera.lookAt(center, new QMap.HeadingPitchRange(heading, pitch, range));
      // map.camera.lookAtTransform(QMap.Matrix4.IDENTITY);
    },
    msgOpenBim(obj) {
      this.bimshow = 1;
      this.isbimShow1 = true;
      if (obj.warn) {
        obj.warn.created_at = this.$utils.renderTime(obj.warn.created_at, 'YYYY/MM/DD hh:mm:ss');
        // obj.warn.Desc = obj.warn.Desc ? obj.warn.Desc : '';
        // obj.warn.device_time = obj.warn.device_time ? obj.warn.device_time : obj.warn.created_at;
        // obj.warn.Id = Number(this.yjEmId);
        console.log('bimdata:', obj);
        this.$services.post({
          type: 'NEWBIM',
          url: 'setLayerCon',
          params: {
            warn:
              JSON.stringify(obj.warn)
            //   JSON.stringify({

            //     Type: 'Warning',
            //     deviceId: 'ZJHZ_YXXZGJHZZX3972',
            //     deviceName: '室内消火栓水压监测装置',
            //     deviceTypeName: '室内消火栓水压监测装置',
            //     deviceAddress: '一期中展区2层西侧',
            //     unitId: 'ZJHZ_YXXZGJHZZX_20180522',
            //     unitName: '云栖小镇国际会展中心',
            //     unitAddress: '浙江省杭州市西湖区河山路1号',
            //     device_time: '2018/6/28 14:08:47',
            //     Desc: '设备发现水压上限异常,水压8.08MPa',
            //     Id: 1,
            //     created_at: '2018/6/28 14:08:47'

            //   }),
            // layerConfig:
            //   JSON.stringify(obj.layerConfig)

          }
        }).then(({ message, url }) => {
          console.log(message);
          if (message === 'success') {
            console.log(url);
            // url = 'http://' + url;
            if (!this.openBim) {
              // this.bimViewer.innerHTML = url;
              document.getElementById('loadFrame').src = url;
              this.openBim = true;
              if (_belongs) {
                _belongs.showAll(false); // 隐藏所有图层
                this.$parent.changeResourceCheckList(false);
                this.$parent.changeNormalResourceShow1(false);
                this.$parent.changeImportantShow1(false);
                this.isShowOutdoorEquipment(false);
                this.isShowShexiangtou(false);
                if (map.hydrantCollection) {
                  map.hydrantCollection.show = false;
                }
                if (map.BillboardsText) {
                  for (let i = 0; i < map.BillboardsText._billboards.length; i++) {
                    map.BillboardsText._billboards[i].show = false;
                  }
                }
                if (map.treeBillboards) {
                  for (let i = 0; i < map.treeBillboards._billboards.length; i++) {
                    map.treeBillboards._billboards[i].show = false;
                  }
                }
                map.scene.requestRender();
              }
            }
          }
        });
      }
      else {
        this.$services.post({
          type: 'NEWBIM',
          url: 'setLayerCon',
          params: {

            layerConfig:
              JSON.stringify(obj.layerConfig)

          }
        }).then(({ message, url }) => {
          console.log(message);
          if (message === 'success') {
            console.log(url);
            // url = 'http://' + url;
            if (!this.openBim) {
              // this.bimViewer.innerHTML = url;
              document.getElementById('loadFrame').src = url;
              this.openBim = true;
              if (_belongs) {
                _belongs.showAll(false); // 隐藏所有图层
                this.$parent.changeResourceCheckList(false);
                this.$parent.changeNormalResourceShow1(false);
                this.$parent.changeImportantShow1(false);
                this.isShowOutdoorEquipment(false);
                this.isShowShexiangtou(false);
                if (map.hydrantCollection) {
                  map.hydrantCollection.show = false;
                }
                if (map.BillboardsText) {
                  for (let i = 0; i < map.BillboardsText._billboards.length; i++) {
                    map.BillboardsText._billboards[i].show = false;
                  }
                }
                if (map.treeBillboards) {
                  for (let i = 0; i < map.treeBillboards._billboards.length; i++) {
                    map.treeBillboards._billboards[i].show = false;
                  }
                }
                map.scene.requestRender();
              }
            }
          }
        });
      }

    },
    setBelongs() {
      // const options = {
      //   prjType: 'gcj02', // 用来数据的坐标类型 默认不加为wgs84的数据 gcj02为火星坐标数据
      //   lamp: {
      //     url: 'data/Belongs/Geojson/lamp.geojson'// 可自定义数据地址，没有指定则使用按目录组织的默认地址
      //   }
      // };
      const options = {
        // // tree: {}, // 树木
        // cross: {}, // 绿地
        // HDMap: {
        //   url: 'http://mapinner-test.wz-inc.com/mapcache/gmaps/futurecity_yunxi_source_light@g_hd/{z}/{x}/{y}.png',
        // }, // 高精地图
        // building: { // 建筑粗模
        //   showLabel: false // 是否显示建筑物名称标签
        // },
        // detail3DModel: {}, // 建筑精模
        // water: {} // 水
        cross: {}, // 绿地
        HDMap: { 
          url: "https://hdmap.citylink.hzcloudtown.com/mapcache/gmaps/futurecity_yunxi_source_dark@g_hd/{z}/{x}/{y}.png"
        }, // 高精地图
        lamp: {}, // 路灯
        camera: {}, // 摄像头
        signal: {}, // 信号灯
        roadSign: {}, // 路牌
        trafficSign: {}, // 交通牌
        roughBuildings: { // 建筑粗模
          showLabel: false // 是否显示建筑物名称标签
        },
        detailBuildings: {}, // 建筑精模
        water: {}, // 水
        // hydrant: {}, // 消防栓
        buildSelectControl: // 建筑单体化选择控制
        {
          hoverOptions: {
            open: true, // 打开鼠标滑过选取功能
            color: [0, 255, 0, 50], // 高亮显示颜色
            callback(name) { // 返回建筑ID
              console.log('hover=>' + name);
            }
          },
          selectOptions: {
            open: true, // 打开鼠标左键单击选取功能
            color: [255, 0, 0, 50], // 高亮显示颜色
            callback(name) { // 返回建筑ID
              console.log('select=>' + name);
            }
          },
          showLabel: true // 打开建筑名称显示label
        }
      };
      if (!_belongs) {
        _belongs = new Belongs(map.entities, map);
      }
      _belongs.addAll(options, false);
      // _belongs.addHDMap3D();

      // 鼠标点击和滑过建筑动画，有问题，通过给地图绑定点击和滑动事件实现效果
      // const moveoverOptions = {
      //   open: true,
      //   color: [255, 0, 0, 50],
      //   callback : function(name)
      //   {
      //     console.log('鼠标', name);
      //   }
      // };
      // const selectOptions = {
      //   open: true,
      //   color: [0, 255, 0, 50],
      //   callback: function(name)
      //   {
      //     console.log('鼠标', name);
      //   }
      // };
      // _belongs.addSingle3DTiles(moveoverOptions, selectOptions, true);

      // _belongs.addBuildings();
      const poslist = [
        Cesium.Cartesian3.unpackArray(treePos1),
        Cesium.Cartesian3.unpackArray(treePos2),
        Cesium.Cartesian3.unpackArray(treePos3),
        Cesium.Cartesian3.unpackArray(treePos4),
        Cesium.Cartesian3.unpackArray(treePos5),
        Cesium.Cartesian3.unpackArray(treePos6),
        Cesium.Cartesian3.unpackArray(treePos7),
        Cesium.Cartesian3.unpackArray(treePos8),
        Cesium.Cartesian3.unpackArray(treePos9)
      ];
      function addTree2(treeBillboards, i) {
        let pl = poslist[i];
        const getRand = num => parseInt(Math.random() * num);
        let scale = 0.8;
        const step = 5;
        for (let j = 0; j < pl.length; ++j) {
          if (j % step !== 0) {
            continue;
          }
          let index = getRand(10);
          index = index === 0 ? 10 : index;
          let treeHeight = getRand(8);
          treeHeight = treeHeight < 6 ? 6 : treeHeight;
          const imagelURL = `./data/Belongs/Images/tree/tree${index}.png`;
          treeBillboards.add({
            position: pl[j],
            image: imagelURL,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: treeHeight * scale,
            width: treeHeight * scale
          });
        }
      }
      const addTreeJSon = () => {
        if (!map.treeBillboards) {
          map.treeBillboards = map.scene.primitives.add(new QMap.BillboardCollection());
        }
        for (let i = 0; i < 9; ++i) {
          addTree2(map.treeBillboards, i);
        }
      };
      addTreeJSon();
    },
    setEffect(lon, lat, setMap) {
      let scanEffect = new QMap.ScanEffect(setMap);
      scanEffect.add(lon, lat, 20, {
        color: QMap.Color.CORNFLOWERBLUE,
        radius: 20,
        duration: 5000
      });
    },
    getCenterPoint(path) {
      let x = 0.0;
      let y = 0.0;
      for (let i = 0; i < path.geometry.coordinates[0][0].length; i++) {
        let item = path.geometry.coordinates[0][0][i];
        x += parseFloat(item[0]);
        y += parseFloat(item[1]);
      }
      let lon = x / path.geometry.coordinates[0][0].length;
      let lat = y / path.geometry.coordinates[0][0].length;
      return { lon, lat };
    },
    initMapAmap() { // 高德地图
      this.map = new AMap.Map('mapContainer3', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 18, // 初始化地图层级
        center: [120.079918, 30.130483], // 初始化地图中心点
        pitch: 55, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: '3D', // 地图模式
        mapStyle: 'amap://styles/darkblue' // 设置地图的显示样式
      });
      let marker = new AMap.Marker({
        icon: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: [120.079918, 30.130483],
        offset: new AMap.Pixel(-13, -30)
      });
      marker.setMap(this.map);
    },
    aboutBim(obj) {
      this.isBox3Click = !this.isBox3Click;
      // if (this.isBox3Click) {
      //   this.box3Content = '关闭bim';
      // }
      // else {
      //   this.box3Content = '打开bim';
      // }
      if (!this.openBim) {
        this.msgOpenBim(this.isbimData);
      }
      else {
        this.bimshow = 0;
        this.openBim = false;
        if (_belongs) {
          _belongs.showAll(true); // 显示所有图层
          this.$parent.changeResourceCheckList(true);
          this.$parent.changeNormalResourceShow1(true);
          this.$parent.changeImportantShow1(true);
          this.isShowOutdoorEquipment(true);
          this.isShowShexiangtou(true);
          if (map.treeBillboards) {
            for (let i = 0; i < map.treeBillboards._billboards.length; i++) {
              map.treeBillboards._billboards[i].show = true;
            }
          }
          map.scene.requestRender();
        }
        if (this.yingji === 1) {
          this.isbimShow1 = true;
        }
        else {
          this.isbimShow1 = false;
        }
      }
    },
    closebuildBim() {
      if (!this.openBim) {
        this.msgOpenBim(this.isbimData);
      }
      else {
        this.bimshow = 0;
        this.openBim = false;
        this.isbuildbim = false;
        if (_belongs) {
          _belongs.showAll(true); // 显示所有图层
          this.mapHeightChange(this.mapLevel);
          if (map.treeBillboards) {
            for (let i = 0; i < map.treeBillboards._billboards.length; i++) {
              map.treeBillboards._billboards[i].show = true;
            }
          }
          map.scene.requestRender();
        }
      }
    },
    closeDialog() {
      this.dialogShow = 0;
      this.dialogData = {
        device: {
          categoryName: '',
          deviceName: '',
          status: -1,
          address: '',
          activeTime: '',
          longitude: 0,
          latitude: 0,
          altitude: 0
        },
        property: {}
      };
    },
    changeDialog() {
      this.dialogShow = 2;
    },
    changeDialog2() {
      this.dialogShow = 0;
      this.$emit('setMicroInfoData', this.microInfoData);
      this.$emit('showInfoWindow');
    },
    setAddHydrant(lng, lat, height, id) {
      // console.log('消防栓');
      let url = './data/Belongs/Model/hydrant.glb';
      let position = QMap.Cartesian3.fromDegrees(lng, lat, height);
      let heading = QMap.Math.toRadians(135);
      let pitch = 0;
      let roll = 0;
      let hpr = new QMap.HeadingPitchRoll(heading, pitch, roll);
      let orientation = QMap.Transforms.headingPitchRollQuaternion(position, hpr);

      let entity = map.entities.add({
        name: '消防栓',
        id,
        position,
        orientation,
        model: {
          uri: url,
          minimumPixelSize: 50,
          maximumScale: 20000
        }
      });
    },
    addHydrants(lonlats) {
      // const lonlats=[];
      let _instances = [];
      lonlats.forEach((lonlat, i) => {
        if (lonlat.type === '云栖智慧消防摄像头new') {
          let imagelURL = './img/videoSurveillance.png';
          let pos3D = QMap.Cartesian3.fromDegrees(lonlat.position[0], lonlat.position[1], lonlat.height ? lonlat.height : 0);
          map.Billboards.add({
            id: 'shexiangtou_' + i + ',' + lonlat.id + ',' + lonlat.name,
            position: pos3D,
            image: imagelURL,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 10,
            width: 10
          });
          this.equipmentArr.push('shexiangtou_' + i + ',' + lonlat.id + ',' + lonlat.name);
        }
        else if (lonlat.type === '电气火灾') {
          let imagelURL = './img/deviceIcon/electricalFire.png';
          let pos3D = QMap.Cartesian3.fromDegrees(lonlat.position[0], lonlat.position[1], lonlat.height ? lonlat.height : 0);
          map.Billboards.add({
            id: 'outdoorEquipment' + lonlat.id,
            position: pos3D,
            image: imagelURL,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 5,
            width: 5
          });
          this.equipmentArr.push('outdoorEquipment' + lonlat.id);
        }
        else if (lonlat.type === '独立式可燃气体探测器') {
          let imagelURL = './img/deviceIcon/independentFlammableGasDetector.png';
          let pos3D = QMap.Cartesian3.fromDegrees(lonlat.position[0], lonlat.position[1], lonlat.height ? lonlat.height : 0);
          map.Billboards.add({
            id: 'outdoorEquipment' + lonlat.id,
            position: pos3D,
            image: imagelURL,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 5,
            width: 5
          });
          this.equipmentArr.push('outdoorEquipment' + lonlat.id);
        }
        else if (lonlat.type === '独立式烟感探测器') {
          let imagelURL = './img/deviceIcon/independentSmokeDetector.png';
          let pos3D = QMap.Cartesian3.fromDegrees(lonlat.position[0], lonlat.position[1], lonlat.height ? lonlat.height : 0);
          map.Billboards.add({
            id: 'outdoorEquipment' + lonlat.id,
            position: pos3D,
            image: imagelURL,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 5,
            width: 5
          });
          this.equipmentArr.push('outdoorEquipment' + lonlat.id);
        }
        else if (lonlat.type === '消防水池水位检测仪') {
          let imagelURL = './img/deviceIcon/firePoolWaterLevelDetector.png';
          let pos3D = QMap.Cartesian3.fromDegrees(lonlat.position[0], lonlat.position[1], lonlat.height ? lonlat.height : 0);
          map.Billboards.add({
            id: 'outdoorEquipment' + lonlat.id,
            position: pos3D,
            image: imagelURL,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 5,
            width: 5
          });
          this.equipmentArr.push('outdoorEquipment' + lonlat.id);
        }
        // else if (lonlat.type === '室外消火栓水压监测仪') {
        //   let imagelURL = './img/deviceIcon/emergencyResources.png';
        //   let pos3D = QMap.Cartesian3.fromDegrees(lonlat.position[0], lonlat.position[1], 10);
        //   map.Billboards.add({
        //     id: 'outdoorEquipment' + lonlat.id,
        //     position: pos3D,
        //     image: imagelURL,
        //     scale: 5,
        //     sizeInMeters: true,
        //     height: 5,
        //     width: 5
        //   });
        // this.equipmentArr.push('outdoorEquipment' + lonlat.id);
        // }
        else {
          let origin = Cesium.Cartesian3.fromDegrees(lonlat.position[0], lonlat.position[1], lonlat.height ? lonlat.height : 0);
          let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin);
          // let scaleMatrix = QMap.Matrix4.fromUniformScale(50.0); // 消防栓缩放比例
          let scaleMatrix = QMap.Matrix4.fromUniformScale(5.0); // 消防栓缩放比例
          modelMatrix = Cesium.Matrix4.multiply(modelMatrix, scaleMatrix, modelMatrix);
          _instances.push({
            modelMatrix,
            batchId: lonlat.id
          });
        }
      });
      let hydrantCollection = new QMap.ModelInstanceCollection({
        url: './data/Belongs/Model/hydrant.glb',
        instances: _instances
      });
      // console.log('-----------hydrantCollection------------', hydrantCollection);
      map.scene.primitives.add(hydrantCollection);
      map.hydrantCollection = hydrantCollection; // 保存这个图层
    },
    // 删除消防栓
    removeHydrants() {
      if (this.lnglatsHydrants.length > 0) {
        map.scene.primitives.remove(map.hydrantCollection);
        map.hydrantCollection = null;
        this.lnglatsHydrants = [];
        this.equipmentArr.length > 0 && this.equipmentArr.forEach(k => {
          this.removeById(k);
        });
        this.equipmentArr = [];
      }
    },
    billboardText(imgUrl, data, height, index, idName) {
      if (!map.BillboardsText) {
        map.BillboardsText = map.scene.primitives.add(new QMap.BillboardCollection({
          scene: map.scene
        }));
      }
      // 原始标签图片的地址
      // let url = './data/label.png';
      // 生成图片
      let canvas = document.createElement('canvas');
      let img = new Image();
      img.src = imgUrl;
      // 图片加载完成，才可处理
      img.onload = () => {
        let text = data.total ? data.total + '' : '0'; // text: data[i].total ? data[i].total + '' : '0',
        canvas.width = img.width;
        canvas.height = img.height;
        let cxt = canvas.getContext('2d');
        // 画图(这里画布与图片等宽高)
        cxt.drawImage(img, 0, 0);
        // 设置字体大小
        // if (idName === 'yuanqu') {
        //   cxt.font = data.total < 100 ? '46px Microsoft YaHei' : '40px Microsoft YaHei';
        // }
        // else {
        //   cxt.font = data.total < 100 ? '18px Microsoft YaHei' : '16px Microsoft YaHei';
        // }
        cxt.font = data.total < 100 ? '18px Microsoft YaHei' : '16px Microsoft YaHei';
        // 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
        cxt.textBaseline = 'middle';
        cxt.textAlign = 'center';
        // 距离左边的位置
        let left = canvas.width / 2;
        // 距离上边的位置
        let top = canvas.height / 3 + 2;
        // 文字颜色
        cxt.fillStyle = '#fff';
        // 文字在画布的位置
        cxt.fillText(text, left, top);
        // console.log(height);

        let position = QMap.Cartesian3.fromDegrees(data.position[0], data.position[1], height);
        let obj = {};
        if (height === 0) {
          obj = {
            id: idName + index,
            name: data.type ? data.type : '无名称',
            position,
            image: canvas,
            scale: 1,
            width: 45,
            height: 45,
            horizontalOrigin: QMap.HorizontalOrigin.CENTER,
            verticalOrigin: QMap.VerticalOrigin.CENTER,
            heightReference: QMap.HeightReference.CLAMP_TO_GROUND
          };
        }
        else {
          obj = {
            id: idName + index,
            name: data.type,
            position,
            image: canvas,
            scale: 1,
            width: 45,
            height: 45,
            horizontalOrigin: QMap.HorizontalOrigin.CENTER,
            verticalOrigin: QMap.VerticalOrigin.CENTER
          };
        }
        map.BillboardsText.add(obj);
        obj.total = data.total;
        obj.position = data.position;
        this.pointArr.push(obj);
      };
    },
    updateHiddenPoint(obj) { // 消息有隐患推送时，更新地图上的隐患打点
      if (this.mapLevel === 1) {
        for (let i = 0; i < this.pointArr.length; i++) {
          let item = this.pointArr[i];
          let gcj02towgs84 = coordtransform.gcj02towgs84(obj.longitude, obj.latitude);
          if (gcj02towgs84[0] === item.position[0] && gcj02towgs84[1] === item.position[1]) {
            // let billentities = map.dataSourceDisplay.defaultDataSource.entities;
            let idName = '';
            let index = '';
            if (item.id.indexOf('hiddenBuild') !== -1) {
              idName = 'hiddenBuild';
              index = item.id.slice(11);
              this.buildArr.length > 0 && this.buildArr.forEach(k => {
                if (k.longitude === obj.longitude && k.latitude === obj.latitude) {
                  k.fireNum = obj.fireNum;
                  k.taskNum = obj.taskNum;
                }
              });
            }

            else if (item.id.indexOf('hiddenOut') !== -1) {
              idName = 'hiddenOut';
              index = item.id.slice(9);
            }
            else {
              idName = 'yuanqu';
              index = item.id.slice(6);
            }
            // billentities.removeById(item.id);
            this.removeBoardsText(item.id);
            this.pointArr.splice(i, 1);
            let url = obj.fireNum && k.fireNum !== '0' ? './img/firePoint.png' : './img/hidden.png'; // 如果有火警数量就显示火警数量，用火警数量图标。等ui提供图标后改图片url
            let pointObj = {
              position: gcj02towgs84,
              type: obj.build,
              total: obj.fireNum && k.fireNum !== '0' ? obj.fireNum : obj.taskNum,
              height: obj.height ? obj.height : 0
            };
            if (pointObj.total > 0) this.billboardText(url, pointObj, obj.height ? obj.height : 26, index, idName);
            break;
          }
        }
      }
    },
    setHiddenPoint() {
      this.$services.get({
        type: 'LARGE',
        url: 'getBuildingTaskWarnList',
        params: {
          type: 'map'
        }
      }).then(({ data }) => {
        console.log(data);
        this.buildArr = data.buildList;
        data.buildList.length > 0 && data.buildList.forEach((k, i) => {
          let url = k.fireNum && k.fireNum !== '0' ? './img/firePoint.png' : './img/hidden.png'; // 如果有火警数量就显示火警数量，用火警数量图标。等ui提供图标后改图片url
          let gcj02towgs84 = coordtransform.gcj02towgs84(k.longitude, k.latitude);
          let obj = {
            position: [gcj02towgs84[0], gcj02towgs84[1]],
            type: k.build,
            total: k.fireNum && k.fireNum !== '0' ? k.fireNum : k.taskNum,
            height: k.height ? k.height : 0
          };
          if (obj.total > 0) this.billboardText(url, obj, k.height ? k.height : 30, i, 'hiddenBuild');
        });
        data.outDoorlist.length > 0 && data.outDoorlist.forEach((k, i) => {
          let url = k.fireNum && k.fireNum !== '0' ? './img/firePoint.png' : './img/hidden.png'; // 如果有火警数量就显示火警数量，用火警数量图标。等ui提供图标后改图片url
          let gcj02towgs84 = coordtransform.gcj02towgs84(k.longitude, k.latitude);
          let obj = {
            position: [gcj02towgs84[0], gcj02towgs84[1]],
            type: k.build,
            total: k.fireNum && k.fireNum !== '0' ? k.fireNum : k.taskNum,
            height: k.height ? k.height : 0
          };
          if (obj.total > 0) this.billboardText(url, obj, k.height ? k.height : 0, i, 'hiddenOut');
        });
        this.mapHeightChange(this.mapLevel);
      });
    },
    setPoint() {
      this.cameraHeight = map.camera.positionCartographic.height;
      this.requestTime = performance.now();
      // let billentities = map.dataSourceDisplay.defaultDataSource.entities;
      this.pointArr.length > 0 && this.pointArr.forEach(k => {
        // billentities.removeById(k.id);
        this.removeBoardsText(k.id);
      });
      this.pointArr = [];
      this.lnglats = [];
      this.removeHydrants();
      this.setHiddenPoint();
      // if (this.lnglats.length > 0) {
      //   this.lnglats = [];
      //   this.pointArr.length > 0 && this.pointArr.forEach(k => {
      //     billentities.removeById(k);
      //     this.removeById(k);
      //   });
      //   // billentities.removeAll();
      //   // map.entities.removeAll();
      //   this.removeHydrants();
      // }
      let html = document.documentElement;
      let wW = html.clientWidth; // 窗口宽度
      let wH = html.clientHeight; // 窗口高度
      let pixel1 = new QMap.Cartesian2(0, wH);
      let pixel2 = new QMap.Cartesian2(wW, 0);
      let num = 0;

      let timer = setInterval(() => {
        num++;
        let cartesian1 = map.scene.globe.pick(map.camera.getPickRay(pixel1), map.scene);
        let cartesian2 = map.scene.globe.pick(map.camera.getPickRay(pixel2), map.scene);
        if (cartesian1 && cartesian2) {
          clearInterval(timer);
          let cartographic1 = map.scene.globe.ellipsoid.cartesianToCartographic(cartesian1);
          let latitude1 = Cesium.Math.toDegrees(cartographic1.latitude) - 0.05;
          let longitude1 = Cesium.Math.toDegrees(cartographic1.longitude) - 0.05;
          let cartographic2 = map.scene.globe.ellipsoid.cartesianToCartographic(cartesian2);
          let latitude2 = Cesium.Math.toDegrees(cartographic2.latitude) + 0.05;
          let longitude2 = Cesium.Math.toDegrees(cartographic2.longitude) + 0.05;
          console.log(latitude1, latitude2, longitude1, longitude2);
          this.$services.get({
            type: 'LARGE',
            url: 'range',
            params: {
              latitude1,
              latitude2,
              level1: this.level1,
              level2: this.level2,
              longitude1,
              longitude2
            }
          }).then(({ data }) => {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
              let gcj02towgs84 = coordtransform.gcj02towgs84(data[i].longitude, data[i].latitude);
              if (data[i].type !== '机构' && data[i].type !== '园区' && data[i].type !== '建筑') {
                this.lnglatsHydrants.push({
                  position: [gcj02towgs84[0], gcj02towgs84[1]],
                  name: data[i].name,
                  type: data[i].type,
                  id: data[i].id,
                  total: data[i].total,
                  height: data[i].height
                });
              }
              else if (data[i].height) {
                this.lnglats.push({
                  position: [gcj02towgs84[0], gcj02towgs84[1]],
                  name: data[i].name,
                  type: data[i].type,
                  id: data[i].id,
                  total: data[i].fireTotal && data[i].fireTotal !== 0 ? data[i].fireTotal : data[i].taskTotal,
                  taskTotal: data[i].taskTotal ? data[i].taskTotal : null,
                  fireTotal: data[i].fireTotal ? data[i].fireTotal : null,
                  height: data[i].height
                });
              }
            }
            console.log(this.level1);
            this.addHydrants(this.lnglatsHydrants);
            for (let i = 0; i < this.lnglats.length; i++) {
              console.log(this.lnglats[i].fireTotal, this.lnglats[i].fireTotal ? './img/firePoint.png' : './img/hidden.png');
              let url = this.lnglats[i].fireTotal ? './img/firePoint.png' : './img/hidden.png';
              if (this.lnglats[i].total > 0) this.billboardText(url, this.lnglats[i], this.lnglats[i].height, i, 'yuanqu');
            }
            this.mapHeightChange(this.mapLevel);
          });
        }
        else if (num >= 10) {
          clearInterval(timer);
          this.setPoint();
        }
      }, 1000);
    },
    setNormalResourcePoint() {
      this.setPoint();
      this.setImportDeptList();
      let billentities = map.dataSourceDisplay.defaultDataSource.entities;
      this.resourceArr.length > 0 && this.resourceArr.forEach(k => {
        billentities.removeById(k);
        this.removeById(k);
      });
      this.resourceArr = [];
      this.$services.get({
        type: 'LARGE',
        url: 'getResourceList',
        params: {
          type: 'resourceList'
        }
      }).then(({ data }) => {
        console.log('普通模式应急资源', data.data);
        let list = data.data;
        list.length > 0 && list.forEach((k, i) => {
          let imgUrl = '';
          if (k.resourcesName === '医院') {
            imgUrl = './img/yiyuan.png';
          }
          else {
            imgUrl = './img/deviceIcon/emergencyResources.png';
          }
          let position = coordtransform.gcj02towgs84(Number(k.longitude), Number(k.latitude));
          let pos3D = QMap.Cartesian3.fromDegrees(position[0], position[1], 30);
          map.Billboards.add({
            id: 'resource' + k.id,
            position: pos3D,
            image: imgUrl,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 20,
            width: 20
          });
          this.resourceArr.push('resource' + k.id);
        });
      });
    },
    setYingjiResourcePoint(lon, lat) {
      let billentities = map.dataSourceDisplay.defaultDataSource.entities;
      this.resourceArr.length > 0 && this.resourceArr.forEach(k => {
        billentities.removeById(k);
        this.removeById(k);
      });
      this.pointArr.length > 0 && this.pointArr.forEach(k => {
        // billentities.removeById(k.id);
        this.removeBoardsText(k.id);
      });
      this.importDeptListArr.length > 0 && this.importDeptListArr.forEach(k => {
        this.removeById(k);
      });
      this.pointArr = [];
      this.lnglats = [];
      this.removeHydrants();
      this.resourceArr = [];
      this.importDeptListArr = [];
      this.$services.get({
        type: 'LARGE',
        url: 'getResourceByLatLonList',
        params: {
          type: 'resourceList',
          lat,
          lng: lon
        }
      }).then(({ data }) => {
        let list = data.data;
        console.log('应急模式应急资源', data.data);
        list.length > 0 && list.forEach(k => {
          let imgUrl = '';
          if (k.resourcesName === '医院') {
            imgUrl = './img/yiyuan.png';
          }
          else {
            imgUrl = './img/deviceIcon/emergencyResources.png';
          }
          let position = coordtransform.gcj02towgs84(Number(k.longitude), Number(k.latitude));
          let pos3D = QMap.Cartesian3.fromDegrees(position[0], position[1], 30);
          map.Billboards.add({
            id: 'resource' + k.id,
            position: pos3D,
            image: imgUrl,
            scale: 1,
            // sizeInMeters: true,
            scaleByDistance: new QMap.NearFarScalar(1.0e3, 1.0, 5.0e6, 0.0),
            height: 20,
            width: 20
          });
          this.resourceArr.push('resource' + k.id);
        });
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      try {
        this.initMapInfos();
      }
      catch (e) {
        let url = './qmap.js';
        let jsapi = document.createElement('script');
        jsapi.type = 'text/javascript';
        jsapi.src = url;
        document.head.appendChild(jsapi);
        if (document.all) {
          // ie6, ie7不支持onload的情况
          jsapi.onreadystatechange = () => {
            if (jsapi.readyState === 'loaded' || jsapi.readyState === 'complete') {
              this.initMapInfos();
            }
          };
        }
        else {
          jsapi.onload = () => {
            this.initMapInfos();
          };
        }
      }
      this.getLocation();
      // this.initMapAmap();
    });
  },
  beforeDestroy() {
    let handler = new QMap.ScreenSpaceEventHandler(map.scene.canvas);
    handler.removeInputAction(QMap.ScreenSpaceEventType.WHEEL);
    // map.camera.moveStart.removeEventListener(this.mapMoveEvent);
    // let billentities = map.dataSourceDisplay.defaultDataSource.entities;
    this.pointArr.length > 0 && this.pointArr.forEach(k => {
      // billentities.removeById(k.id);
      this.removeBoardsText(k.id);
    });
    this.pointArr = [];
    this.lnglats = [];
    this.removeHydrants();
    // if (this.lnglats.length > 0) {
    //   this.lnglats = [];
    //   billentities.removeAll();
    //   // map.entities.removeAll();
    //   this.removeHydrants();
    // }
    map = null;
  }
};
</script>

<style lang="scss" scoped>
  #mapContainer3{
    width: 100%;
    height: 100%;
    position: relative;

    .leftBox3 {
      transition: all 0.5s;
      text-align: center;
      width: 6%;
      // height: ;
      position: absolute;
      top: 1.28rem;
      left: 20.5%;
      cursor: pointer;
      border-radius: .2rem;
      z-index: 9;
    }
    .leftBox3:hover{
      color:#3091FA !important;
      transition: all 0.5s;
    }
    .box3Click{
      color:#3091FA !important;
      transition: all 0.5s;
    }
    .leftBox4 {
      transition: all 0.5s;
      text-align: center;
      // width: 9%;
      // height: ;
      position: absolute;
      top: 1.28rem;
      left: 33.5%;
      cursor: pointer;
      border-radius: .1rem;
      z-index: 9;
    }
    // .leftBox4:hover{
    //   color:#3091FA !important;
    //   transition: all 0.5s;
    // }
    .box4Click{
      color:#3091FA !important;
      transition: all 0.5s;
    }
    .btn{
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 999;
    }
    .bimclass{
      position: absolute;
      width: 90%;
      height: 83%;
      margin: 5%;
      margin-top: 8%;
      z-index: 999;
    }

    .dialogBox{
      position: absolute;
      z-index: 999;
      font-size: .3rem;
      text-align: left;
      // width: 4.5rem;
      color: white;
      background-color: rgb(57, 72, 84);
      padding: 0 0 0 0;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(99, 116, 141, 0.3);
      border-radius: .2rem;
      box-shadow: 0 0 8px rgba(99, 116, 141, 1);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      animation: animatename 1s;
      .infoTitle{
        // background-image: -webkit-linear-gradient(left , rgb(43, 141, 250), rgb(82, 190, 254));
        background-image: -webkit-linear-gradient(left, rgb(11, 35, 56), rgb(56, 70, 83));
        position: relative;
        border-radius: .2rem .2rem 0 0;
        border-bottom: 0.01rem solid #7F8A92;
        padding: 0.1rem .3rem !important;
        .h6{
          padding: .18rem;
          font-size: .33rem;
        }
        .closeSpan{
          display: block;
          position: absolute;
          top: .09rem;
          right: 0.319205rem;
          font-size: 0.605298rem;
          color: #fff;
          font-weight: 100;
          cursor: pointer;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
      .Content{
        font-size: .26rem !important;
        // color: black;
        line-height: 0.5rem;
        padding: .15rem .3rem;
        display: flex;
        flex-direction: column;
        overflow: auto;
        background-color: rgb(57, 72, 84);
        border-radius: .2rem;
        table {
          width: 100%;
          tr{
            height: .34rem;
          };
          td {
            flex-direction: row;
          }
        }
      }
      .row{
        padding:2px 0px;
        .img{
          background: url('../../../assets/img/new/point.jpg') no-repeat center center;
          width: .2rem;
          height: .25rem;
          float: left;
          /* padding: .1rem .1rem; */
          /* margin: .1rem; */
          margin-top: .12rem;
          margin-left: .05rem;
          background-size: 100% 100%;
        }
      }
      .left{
        float:left;
        // width: 41%;
        // padding-left: 0.2rem;
      }
      .right{
        float:left;
        padding-left: .2rem;
      }
      .right1{
        float:left;
        padding-left: .15rem;
      }
      .right2{
        float:left;
        // width: calc(59% - .15rem);
        padding-left: .05rem;
      }
      .bot {
        color: white;
        margin: 7%;
        font-size: .24rem;
        padding: .1rem 0px;
        width: 85%;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(99, 116, 141, 0.3);
        border-radius: 13px;
        box-shadow: 0 0 8px rgba(99, 116, 141, 1);
        background-image: -webkit-linear-gradient(left, #2b8dfa, #52befe);
        white-space: nowrap;
        display: inline-block;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-appearance: button;
        cursor:pointer;
      }
      .bot:hover {
        animation: rubberBand 1s;
      }

      &::after {
        display: block;
        content: '';
        position: absolute;
        left: 48%;
        bottom: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid rgb(57, 72, 84);
      }
    }
    .hoverBox{
      position: absolute;
      z-index: 99;
      font-size: .3rem;
      text-align: left;
      width: 5.5rem;
      height: 4rem;
      color: white;
      // background: #fff;
      .hoverIconBox {
        float: left;
        width: 25%;
        height: 50%;
        .hoverIcon {
          width: calc(100% - 0.2rem);
          height: 1.2rem;
          background-size: 100%;
          background-repeat: no-repeat;
          box-sizing: border-box;
          margin: 0.1rem;
          margin-bottom: -0.2rem;
          cursor: pointer;
          animation: animatename 0.3s;
          transition: scale 0.5s;
        }
        .hoverIcon:hover {
          transform: scale(1.1);
        }
        .iconText {
          display: block;
          width: 100%;
          line-height: 0.5rem;
          text-align: center;
          font-size: .2rem;
          color: #fff;
          animation: animatename 0.3s;
        }
        .leaveAnimated {
          animation: animatename 0.3s reverse;
        }
        .hoverIcon1 {
          background-image: url("../../../assets/img/hoverIcon/buildingInformation.png");
        }
        .hoverIcon2 {
          background-image: url("../../../assets/img/hoverIcon/planeDrawing.png");
        }
        .hoverIcon3 {
          background-image: url("../../../assets/img/hoverIcon/hiddenDanger.png");
        }
        .hoverIcon4 {
          background-image: url("../../../assets/img/hoverIcon/hiddenDangerAnalysis.png");
        }
        .hoverIcon5 {
          background-image: url("../../../assets/img/hoverIcon/equipment.png");
        }
        .hoverIcon6 {
          background-image: url("../../../assets/img/hoverIcon/fireAlarm.png");
        }
        .hoverIcon7 {
          background-image: url("../../../assets/img/hoverIcon/fireAlarmAnalysis.png");
        }
      }
    }
  }
@keyframes animatename {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
