<template>
  <div id="mapContainer2">
    <el-button @click="aboutBim" class="btn">bim</el-button>
    <!-- <el-button @click="aboutDark" class="btn" style="top: 60px">暗色瓦片</el-button>
    <el-button @click="aboutLight" class="btn" style="top: 110px">亮色瓦片</el-button> -->
    <el-button @click="aboutBuilding" class="btn" style="top: 60px">建筑物模型</el-button>
    <div class="bimclass" v-if="bimshow === 1"><iframe id="loadFrame" style="width: 100%;height:100%"  ></iframe></div>
  </div>
</template>

<script>
// let video = require('../../../../public/media/test.mp4');
import video from '../../../../public/img/test.gif';


console.log(video);
// let map = null;
export default {
  name: 'large1Map',
  props: {
    ifAlarm: Boolean,
    yingji: Number
  },
  data() {
    return {
      map: null,
      bimViewer: null,
      openBim: false,
      layerDark: null,
      isDark: false,
      layerLight: null,
      isLight: true,
      object3Dlayer: null,
      socket: null,
      lnglats: [],
      level1: 1.3, // level区间最小值,初始查询的级别为'位置'
      level2: 1.3, // level区间最大值,初始查询的级别为'位置'
      deviceProperty: '',
      pos: [], // 点击point后存储第二提示框的位置
      Name: [], // 区域内所有点的名称数组
      numFlag: 0, // 记录点击了区域内第几个点,用于查询name
      bimshow: 0 // 用于判断打不打开bim
    };
  },
  watch: {
    yingji(val) {
      if (val === 1) {
        if (this.openBim) {
          this.bimshow = 0;
          this.openBim = false;
        }
      }
    },
    ifAlarm(val) {
      if (val) {
        this.bimshow = 1;
        this.$services.post({
          type: 'NEWBIM',
          url: 'setLayerCon',
          params: {
            warn:
              JSON.stringify({

                Type: 'Warning',
                deviceId: 'ZJHZ_YXXZGJHZZX3972',
                deviceName: '室内消火栓水压监测装置',
                deviceTypeName: '室内消火栓水压监测装置',
                deviceAddress: '一期中展区2层西侧',
                unitId: 'ZJHZ_YXXZGJHZZX_20180522',
                unitName: '云栖小镇国际会展中心',
                unitAddress: '浙江省杭州市西湖区河山路1号',
                device_time: '2018/6/28 14:08:47',
                Desc: '设备发现水压上限异常,水压8.08MPa',
                Id: 1,
                created_at: '2018/6/28 14:08:47'


              }),
            layerConfig:
              JSON.stringify(
                [{
                  name: '1F',
                  visible: true
                }, {
                  name: '2F',
                  visible: true
                }, {
                  name: '3F',
                  visible: true
                }, {
                  name: 'B1',
                  visible: true
                }, {
                  name: 'B2',
                  visible: true
                }, {
                  name: 'F1消防设备',
                  visible: true
                }, {
                  name: 'F2消防设备',
                  visible: true
                }, {
                  name: 'F3消防设备',
                  visible: true
                }, {
                  name: 'B1消防设备',
                  visible: false
                }, {
                  name: 'B2消防设备',
                  visible: false
                }, {
                  name: '国际会展中心二期外层',
                  visible: false
                }, {
                  name: '云栖小镇高清影像',
                  visible: true
                }]
              )

          }
        }).then(({ message, url }) => {
          console.log(message);
          if (message === 'success') {
            console.log(url);
            url = 'http://' + url;
            if (!this.openBim) {
              // this.bimViewer.innerHTML = url;
              document.getElementById('loadFrame').src = url;
              this.openBim = true;
            }
          }
        });
      }
    }
  },
  methods: {
    setPoint() {
      if (this.lnglats.length > 0) {
        this.lnglats = [];
        this.map.clearMap();
      }
      // let html = document.documentElement;
      // let wW = html.clientWidth; // 窗口宽度
      // let wH = html.clientHeight; // 窗口高度
      // let pixel1 = new AMap.Pixel(0, wH);
      // let lnglat1 = this.map.containerToLngLat(pixel1);
      // let pixel2 = new AMap.Pixel(wW, 0);
      // let lnglat2 = this.map.containerToLngLat(pixel2);
      this.$services.get({
        type: 'LARGE',
        url: 'range',
        params: {
          // latitude1: lnglat1.lat,
          // latitude2: lnglat2.lat,
          latitude1: 30.120928,
          latitude2: 30.140674,
          level1: this.level1,
          level2: this.level2,
          // longitude1: lnglat1.lng,
          // longitude2: lnglat2.lng
          longitude1: 120.075842,
          longitude2: 120.104553
        }
      }).then(({ data }) => {
        console.log(data);
        this.Name = []; // 每次查询都要清空区域内名称数组
        for (let i = 0; i < data.length; i++) {
          this.lnglats.push({
            position: [data[i].longitude, data[i].latitude],
            name: data[i].name,
            type: data[i].type,
            id: data[i].id
          });
        }
        for (let i = 0; i < this.lnglats.length; i++) {
          let url = this.lnglats[i].type === '室外消火栓' ? './img/fire.png' : './img/P3.png';
          if (this.lnglats[i].type === '室外消火栓') {
            url = './img/fire.png';
          }
          else if (this.lnglats[i].type === '机构') {
            url = './img/P1.png';
          }
          else if (this.lnglats[i].type === '园区') {
            url = './img/P2.png';
          }
          else {
            url = './img/P3.png';
          }
          let marker = new AMap.Marker({
            icon: new AMap.Icon({
              image: url,
              size: new AMap.Size(60, 60),
              imageSize: new AMap.Size(60, 60)
            }),
            position: this.lnglats[i].position,
            anchor: 'bottom-center'
          });
          marker.content = this.lnglats[i].id;
          this.Name[i] = data[i].name; // 存储所有点的名称
          marker.on('click', () => { this.numFlag = i; }); // 当前地图上,用户点的是第i个点
          marker.on('click', this.markerClick);
          // marker.emit('click', { target: marker }); // 初始化页面时,默认打开信息窗体
          let t = ''; // 点标记的title
          t += data[i].type;
          if (data[i].name != null) {
            t += ' :  ';
            t += data[i].name;
          }
          let num = ''; // 点标记里面的label字符串
          if (this.lnglats[i].type === '机构' || this.lnglats[i].type === '园区') {
            num += data[i].total;
          }
          else {
            num += i;
          }
          marker.setMap(this.map);
          marker.setTitle(t); // 鼠标悬浮在点标记上时,弹出标题
          marker.setLabel({
            offset: new AMap.Pixel(0, 35), // 设置文本标注偏移量
            content: num, // 设置文本标注内容
            direction: 'top' // 设置文本标注方位
          });
        }
      });
    },
    markerClick(e) {
      let p = e.target.getPosition();
      let d = (18 - this.map.getZoom()) * 1.5; // d为偏差值,没有警告通知时,乘1;有通知时,乘1.5
      let x = p.lng;
      let y = p.lat + 0.0015 * (1 + d); // 点击'位置'或'设备'后的panto偏移调整
      let y1 = p.lat + 0.001 * (1 + d); // 点击机构后的panto偏移调整
      let y2 = p.lat + 0.0003 * (1 + d); // 点击园区后的panto偏移调整
      this.pos = p; // pos用于保存第二个按钮的提示框的位置,
      if (!e.target.content) {
        this.$message({
          message: '该点不是室外设备哦',
          type: 'warning'
        });
        this.map.panTo([x, y1]);
        return;
      }
      if (this.level1 === 1.1) { // 防报错,机构级打点,以后修改
        this.$message({
          message: '这里是' + this.Name[this.numFlag] + '[机构]哦',
          type: 'warning'
        });
        this.map.panTo([x, y1]);
        return;
      }
      if (this.level1 === 1.2) { // 防报错,园区级打点,以后修改
        this.map.setZoom(21);
        this.map.panTo([x, y2]);
        return;
      }
      this.$services.get({
        type: 'LARGE',
        url: 'detail',
        params: {
          name: e.target.content
        }
      }).then(({ data }) => { // 传参e.target.content调取设备详情接口，返回值编辑content，deviceProperty
        let content = `<div class="infoTitle"><p class="h6">${data.device.categoryName}</p></div><div class="Content">`
        + `<div class="row"><p class="left">设备ID:</p><p class="right2">${data.device.deviceName}</p></div>`;
        if (data.status === 1) {
          content += '<div class="row"><p class="left">设备状态:</p><p class="right2">在线</p></div>';
        }
        else if (data.status === 0) {
          content += '<div class="row"><p class="left">设备状态:</p><p class="right2">离线</p></div>';
        }
        else {
          content += '<div class="row"><p class="left">设备状态:</p><p class="right2">未激活</p></div>';
        }
        content += `<div class="row"><p class="left">设备类型:</p><p class="right2">${data.device.categoryName}</p></div>`
        + `<div class="row"><span class="left">部署位置:</span><span class="right2">${data.device.address}</span></div>`
        + `<div class="row"><span class="left">最后上线时间:</span><span class="right2">${this.$utils.renderTime(new Date(data.device.activeTime))}</span></div></div>`
        + '<input id="lnglat2container" type="button" class="bot" value="查看设备状态"/>';
        this.deviceProperty = '<div class="infoTitle"><p class="h6">查看设备状态</p></div><div class="Content">'
        + '<table class="status" border="0" cellspacing="0" cellpadding="0">'
        + `<tr><td><div class="left">经度</div><div class="right">${data.device.longitude}</div></td></tr>`
        + `<tr><td><div class="left">纬度</div><div class="right">${data.device.latitude}</div></td></tr>`
        + `<tr><td><div class="left">高度</div><div class="right">${data.device.altitude}m</div></td></tr>`;
        for (let key in data.property) {
          if (key != null) {
            this.deviceProperty += `<tr><td><div class="left">${key}</div><div class="right">${data.property[key]}</div></td></tr>`;
          }
        }
        this.deviceProperty += '</table></div>';
        let infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(-9, -100),
          closeWhenClickMap: true
        });
        infoWindow.setContent(content);
        infoWindow.open(this.map, e.target.getPosition());
        this.map.panTo([x, y]);
      });
    },
    infoWindowClick(e) {
      // console.log(e.target);
      // console.log(this.pos);
      if (e.target.id === 'lnglat2container') {
        let infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(-10, -120),
          closeWhenClickMap: true
        });
        infoWindow.setContent(this.deviceProperty);
        infoWindow.open(this.map, this.pos);
      }
    },
    aboutBim() {
      if (!this.openBim) {
        this.bimshow = 1;
        this.$services.post({
          type: 'NEWBIM',
          url: 'setLayerCon',
          params: {
          }
        }).then(({ message, url }) => {
          console.log(message);
          if (message === 'success') {
            console.log(url);
            url = 'http://' + url;
            if (!this.openBim) {
              // this.bimViewer.innerHTML = url;
              document.getElementById('loadFrame').src = url;
              this.openBim = true;
            }
          }
        });
      }
      else {
        this.bimshow = 0;
        this.openBim = false;
      }
    },
    aboutDark() {
      if (!this.isDark) {
        if (this.isLight) {
          this.layerLight.hide();
          this.isLight = false;
        }
        this.layerDark.show();
        this.isDark = true;
      }
      else {
        this.layerDark.hide();
        this.isDark = false;
      }
    },
    aboutLight() {
      if (!this.isLight) {
        if (this.isDark) {
          this.layerDark.hide();
          this.isDark = false;
        }
        this.layerLight.show();
        this.isLight = true;
      }
      else {
        this.layerLight.hide();
        this.isLight = false;
      }
    },
    aboutBuilding() {
      if (this.object3Dlayer) {
        this.object3Dlayer.clear();
        this.object3Dlayer = null;
      }
      else {
        this.object3Dlayer = new AMap.Object3DLayer();
        this.map.add(this.object3Dlayer);
        let json = require('../../../../public/js/YX_building.json');
        let color = '#0088ffcc';
        for (let i = 0, length1 = json.features.length; i < length1; i++) {
          let feature = json.features[i];
          let bounds = [];
          for (let j = 0, length2 = feature.geometry.coordinates[0][0].length; j < length2; j++) {
            let coord = feature.geometry.coordinates[0][0][j];
            let lnglat = new AMap.LngLat(coord[0], coord[1]);
            bounds.push(lnglat);
          }
          AMap.convertFrom(bounds, 'gps', (status, result) => {
            if (result.info === 'ok') {
              let path = result.locations;
              let prism = new AMap.Object3D.Prism({
                path,
                height: feature.properties.floor_num * 8,
                color
              });
              prism.id = feature.properties.id;
              prism.name = feature.properties.name;
              // prism.setid(feature.properties.id)
              // 使用了透明颜色,进行颜色混合
              prism.transparent = true;
              this.object3Dlayer.add(prism);
            }
          });
          // let prism = new AMap.Object3D.Prism({
          //   path: bounds,
          //   height: feature.properties.floor_num * 8,
          //   color
          // });
          // prism.id = feature.properties.id;
          // prism.name = feature.properties.name;
          // // prism.setid(feature.properties.id)
          // // 使用了透明颜色,进行颜色混合
          // prism.transparent = true;
          // this.object3Dlayer.add(prism);
        }
      }
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
    amapZoomEnd() {
      console.log(this.map.getZoom());
      let zoom = this.map.getZoom();
      if (zoom <= 16.3) {
        this.level1 = 1.1;
        this.level2 = 1.1;
      }
      else if (zoom <= 17.3) {
        this.level1 = 1.2;
        this.level2 = 1.2;
      }
      else {
        this.level1 = 1.3;
        this.level2 = 1.3;
      }
      this.setPoint();
    },
    initMapAmap() { // 高德地图
      this.map = new AMap.Map('mapContainer2', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 21, // 初始化地图层级
        center: [120.081818, 30.129583], // 初始化地图中心点
        pitch: 55, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: '3D', // 地图模式
        mapStyle: 'amap://styles/whitesmoke' // 设置地图的显示样式
      });
      // 打点
      // let marker = new AMap.Marker({
      //   icon: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      //   position: [120.079918, 30.130483],
      //   offset: new AMap.Pixel(-13, -30)
      // });
      // marker.setMap(this.map);
      // let marker = new AMap.Marker({ // 测试用点
      //   icon: new AMap.Icon({
      //     image: 'Assets/Images/poin1.png',
      //     size: new AMap.Size(80, 80),
      //     imageSize: new AMap.Size(80, 80)
      //   }),
      //   position: [120.079918, 30.130483],
      //   anchor: 'bottom-center'
      // });
      // marker.content = '<div class="infoTitle"><p class="h6">电器火灾</p></div><div class="Content">'
      // + '<div class="row"><p class="left">设备ID:</p><p class="right">123456</p></div>'
      // + '<div class="row"><p class="left">设备状态:</p><p class="right">在线</p></div>'
      // + '<div class="row"><p class="left">设备类型:</p><p class="right">在用电安全探测器线</p></div>'
      // + '<div class="row"><span class="left">部署位置:</span><span class="right1">中大产业园1号楼通道北小平房</span></div>'
      // + '<div class="row"><span class="left">最后上线时间:</span><span class="right2">2019-08-01 16:00:00</span></div></div>'
      // + '<input id="lnglat2container" type="button" class="bot" value="查看设备状态"/>';
      // marker.on('click', this.markerClick);
      // marker.emit('click', { target: marker });
      // marker.setMap(this.map);
      this.setPoint();
      // 光照
      /* this.map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5); */
      this.map.DirectionLight = new AMap.Lights.DirectionLight([1, -1, 1], [1, 1, 1], 1);
      // 3D建筑模型
      this.object3Dlayer = new AMap.Object3DLayer();
      this.map.add(this.object3Dlayer);
      let json = require('../../../../public/js/YX_building.json');
      let color = '#0088ffcc';
      for (let i = 0, length1 = json.features.length; i < length1; i++) {
        let feature = json.features[i];
        let bounds = [];
        for (let j = 0, length2 = feature.geometry.coordinates[0][0].length; j < length2; j++) {
          let coord = feature.geometry.coordinates[0][0][j];
          let lnglat = new AMap.LngLat(coord[0], coord[1]);
          bounds.push(lnglat);
        }
        AMap.convertFrom(bounds, 'gps', (status, result) => {
          if (result.info === 'ok') {
            let path = result.locations;
            let prism = new AMap.Object3D.Prism({
              path,
              height: feature.properties.floor_num * 8,
              color
            });
            prism.id = feature.properties.id;
            prism.name = feature.properties.name;
            // prism.setid(feature.properties.id)
            // 使用了透明颜色,进行颜色混合
            prism.transparent = true;
            this.object3Dlayer.add(prism);
          }
        });
        // let prism = new AMap.Object3D.Prism({
        //   path: bounds,
        //   height: feature.properties.floor_num * 8,
        //   color
        // });
        // prism.id = feature.properties.id;
        // prism.name = feature.properties.name;
        // // prism.setid(feature.properties.id)
        // // 使用了透明颜色,进行颜色混合
        // prism.transparent = true;
        // this.object3Dlayer.add(prism);
      }
      // 建筑物拾取
      this.map.on('click', ev => {
        let { pixel } = ev;
        let px = new AMap.Pixel(pixel.x, pixel.y);
        let obj = this.map.getObject3DByContainerPos(px, [this.object3Dlayer], false) || {};
        // 选中的 face 所在的索引index
        // 选中的 object3D 对象object，这里为当前 Mesh
        // 被拾取到的对象和拾取射线的交叉点的3D坐标point
        // 交叉点距透视原点的距离distance
        let { index, object, point, distance } = obj;
        console.log(index);
        console.log(object);
        console.log(point);
        console.log(distance);
      });
      // 换瓦片
      // let blackBg = new AMap.TileLayer.Flexible({
      //   opacity: 1,
      //   zIndex: 195,
      //   createTile: (x, y, z, success, fail) => {
      //     let img = document.createElement('img');
      //     img.src = './img/writeBg.png';
      //     img.onload = () => {
      //       success(img);
      //     };
      //     img.onerror = () => {
      //       fail();
      //     };
      //   }
      // });
      // blackBg.setMap(this.map);
      // this.layerDark = new AMap.TileLayer.Flexible({
      //   opacity: 1,
      //   zIndex: 200,
      //   createTile: (x, y, z, success, fail) => {
      //     let img = document.createElement('img');
      //     img.crossOrigin = "Anonymous";
      //     img.src = `http://mapinner-test.wz-inc.com/mapcache/gmaps/futurecity_yunxi_source_dark@g_hd/${z}/${x}/${y}.png`;
      //     img.onload = () => {
      //       success(img);
      //     };
      //     img.onerror = () => {
      //       fail();
      //     };
      //   }
      // });
      // this.layerDark.setMap(this.map);
      // this.layerLight = new AMap.TileLayer.Flexible({
      //   opacity: 1,
      //   zIndex: 200,
      //   createTile: (x, y, z, success, fail) => {
      //     let img = document.createElement('img');
      //     img.crossOrigin = "Anonymous";
      //     img.src = `http://mapinner-test.wz-inc.com/mapcache/gmaps/futurecity_yunxi_source_light@g_hd/${z}/${x}/${y}.png`;
      //     img.onload = () => {
      //       success(img);
      //     };
      //     img.onerror = () => {
      //       fail();
      //     };
      //   }
      // });
      // this.layerLight.setMap(this.map);
      // this.layerDark.hide();
      // this.layerLight.show();

      // 呼吸
      let canvas = document.createElement('canvas');
      canvas.width = canvas.height = 200;

      let context = canvas.getContext('2d');
      context.fillStyle = 'rgb(0,100,255)';
      context.strokeStyle = 'white';
      context.globalAlpha = 1;
      context.lineWidth = 2;
      let effectLnglat = [
        { type: 'Feature', properties: { id: '1000', floor_num: 1.0, name: '水利部产品质量标志研', build_area: 171.72 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.082318061000024, 30.140308454000035], [120.08231076800007, 30.140379331000076], [120.082504611000104, 30.140404584000066], [120.08251508, 30.140336055000034], [120.082318061000024, 30.140308454000035]]]] } },
        { type: 'Feature', properties: { id: '1017', floor_num: 1.0, name: '杭州云计算产业园', build_area: 1170.11 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.078727023000056, 30.13661439200007], [120.078830139000047, 30.136913669000023], [120.079229508000026, 30.136805165000055], [120.079182783000078, 30.136648082000079], [120.078936462000115, 30.136709377000045], [120.078893989000107, 30.136573827000063], [120.078727023000056, 30.13661439200007]]]] } },
        { type: 'Feature', properties: { id: '1024', floor_num: 1.0, name: null, build_area: 88.282 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.077303059000087, 30.136957866000046], [120.077274806000105, 30.136878026000034], [120.077227959000084, 30.136890547000064], [120.077249055000038, 30.136949770000058], [120.077273747000049, 30.136948326000038], [120.07723498599999, 30.136966107000035], [120.077237666000087, 30.137005792000025], [120.07726596100008, 30.137019257000077], [120.077296273000115, 30.137010976000056], [120.077303059000087, 30.136957866000046]]]] } },
        { type: 'Feature', properties: { id: '1058', floor_num: 0.0, name: '杭州卷烟厂', build_area: 35358.154 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.083553326000015, 30.12890946300007], [120.084500352000077, 30.128828561000034], [120.084191163000014, 30.125829800000076], [120.083253655000021, 30.125901183000053], [120.083553326000015, 30.12890946300007]]]] } },
        { type: 'Feature', properties: { id: '1079', floor_num: 0.0, name: '大麦本草博物馆', build_area: 1627.844 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.088787059000083, 30.131849878000025], [120.088724504000083, 30.131211629000063], [120.088364848000083, 30.131233026000075], [120.088381862, 30.131385330000057], [120.088581181000109, 30.131367854000075], [120.088631919000022, 30.131864059000065], [120.088787059000083, 30.131849878000025]]]] } }
      ];
      effectLnglat.forEach(k => {
        let lnglat = this.getCenterPoint(k);
        let radious = 0;
        let CanvasLayer = new AMap.CanvasLayer({
          canvas,
          bounds: new AMap.Bounds(
            [lnglat.lon - 0.0004, lnglat.lat - 0.0004],
            [lnglat.lon + 0.0004, lnglat.lat + 0.0004]
          ),
          zIndex: 299
        });
        CanvasLayer.setMap(this.map);
        let draw = () => {
          context.clearRect(0, 0, 200, 200);
          context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1;
          radious = (radious + 1) % 100;

          context.beginPath();
          context.arc(100, 100, radious, 0, 2 * Math.PI);
          context.fill();
          context.stroke();

          // 2D视图时可以省略
          CanvasLayer.reFresh();

          AMap.Util.requestAnimFrame(draw);
        };
        draw();
      });
      this.map.on('zoomend', this.amapZoomEnd);
      // this.map.on('dragend', this.setPoint);
      let infoWindowBox = document.getElementsByClassName('amap-overlays')[0]; // 根据弹窗内按钮的ClassName,绑定点击事件
      infoWindowBox.onclick = this.infoWindowClick;
    },
    initWebsocket() {
      if (typeof (WebSocket) === 'undefined') {
        console.log('您的浏览器不支持socket');
      }
      else {
        // 实例化socket
        let params = {
          type: 'Warning',
          deviceId: 'ZJHZ_YXXZGJHZZX3972',
          deviceName: '室内消防栓水压检测装置',
          deviceTypeName: '室内消防栓水压检测装置',
          deviceAddress: '一期中展区2层西侧',
          unitId: 'ZJHZ_YXXZGJHZZX_20180522',
          unitName: '云栖小镇国际会展中心',
          unitAddress: '浙江省杭州市西湖区河山路1号',
          device_time: '2018/6/28 14:08:47',
          Desc: '设备发现水压上仙异常，水压1.08MPa',
          Id: 1,
          create_at: '2018/06/28 14:08:47'
        };
        // this.socket = new WebSocket('wss://121.40.88.73');
        this.socket = new WebSocket('ws://121.40.88.73/hangzhou/AliCloudApi/api/Warn/publishWarn');

        // 监听socket连接
        this.socket.onopen = () => {
          console.log('socket连接成功');
          this.socket.send(params);
        };
        // 监听socket错误信息
        this.socket.onerror = () => {
          console.log('连接错误');
        };
        // 监听socket消息
        this.socket.onmessage = msg => {
          console.log(msg.data);
        };
      }
    }


  },
  mounted() {

    // this.initWebsocket();
    this.$nextTick(() => {
      let url = './qmap.js';
      let jsapi = document.createElement('script');
      jsapi.type = 'text/javascript';
      jsapi.src = url;
      document.head.appendChild(jsapi);
      this.initMapAmap();
      // try {
      //   this.initMapInfos();
      // }
      // catch (e) {
      //   let url = './qmap.js';
      //   let jsapi = document.createElement('script');
      //   jsapi.type = 'text/javascript';
      //   jsapi.src = url;
      //   document.head.appendChild(jsapi);
      //   if (document.all) {
      //     // ie6, ie7不支持onload的情况
      //     jsapi.onreadystatechange = () => {
      //       if (jsapi.readyState === 'loaded' || jsapi.readyState === 'complete') {
      //         this.initMapInfos();
      //       }
      //     };
      //   }
      //   else {
      //     jsapi.onload = () => {
      //       this.initMapInfos();
      //     };
      //   }
      // }
    });
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.map.off('zoomend', this.amapZoomEnd);
    this.map.off('dragend', this.setPoint);
  }
};
</script>

<style lang="scss">
#mapContainer2{
  width: 100%;
  height: 100%;
  position: relative;
  .btn{
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
    margin-left: 0;
  }
  .bimclass{
    position: absolute;
    width: 90%;
    height: 90%;
    margin: 5%;
    z-index: 999;
  }

  .amap-marker-label{
    border:0 none;
    background-color: rgba(0,0,0,0);
    transform: scale(0.9);
    cursor:pointer;
  }
  .el-message .el-icon-warning{
    font-size: 14px!important;
  }
  .amap-info-content{
    font-size: .3rem;
    width: 4.5rem;
    color: white;
    padding: 0 0 0 0;
    overflow: hidden;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(99, 116, 141, 0.3);
    border-radius: .2rem;
    box-shadow: 0 0 8px rgba(99, 116, 141, 1);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    animation: animatename 1s;
  }
  .amap-info-content .infoTitle{
    background-image: -webkit-linear-gradient(left , rgb(43, 141, 250), rgb(82, 190, 254));
    .h6{
      padding: .22rem 26px .28rem;
      font-size: .3rem;
    }
  }
  .amap-info-close{
    color: white;
    margin-right: .45rem;
    font: 29px/43px Tahoma,Verdana,sans-serif;
  }
  .amap-info-close:hover {
    animation: rubberBand 1s;
  }
  .info {
    span {
      margin: 10px 10px 0px;
    }
    .uppage {
      margin-left: 2.57rem;
    }
  }
  .Content{
    font-size: .22rem;
    color: black;
    padding: .25rem .3rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
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
  }
  .left{
    float:left;
    width: 40%;
  }
  .right{
    float:left;
    padding-left: .3rem;
  }
  .right1{
    float:left;
    padding-left: .15rem;
  }
  .right2{
    float:left;
    width: calc(60% - .15rem);
    padding-left: .15rem;
  }
  .bot {
    color: white;
    margin: 7%;
    font-size: .22rem;
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
  .amap-marker{
    animation: animatename 1s;
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
}

</style>
