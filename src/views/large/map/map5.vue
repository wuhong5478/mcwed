<template>
  <div id="mapContainer5">
    <el-button @click="aboutBim" class="btn" v-show="yingji == 0 || yingji == 2">bim</el-button>
    <div class="dialogBox" v-if="dialogShow === 1" :style="dislogStyle">
      <div class="infoTitle">
        <p class="h6">{{dialogData.device.categoryName}}</p>
        <span class="closeSpan" @click="closeDialog">+</span>
      </div>
      <div class="Content">
        <div class="row"><p class="left">设备ID:</p><p class="right2">{{dialogData.device.deviceName}}</p></div>
        <div class="row">
          <p class="left">设备状态:</p>
          <p class="right2"><span v-if="dialogData.device.status === 1">在线</span><span v-else-if="dialogData.device.status === 0">离线</span><span v-else>未激活</span></p>
        </div>
        <div class="row"><p class="left">设备类型:</p><p class="right2">{{dialogData.device.categoryName}}</p></div>
        <div class="row"><span class="left">部署位置:</span><span class="right2">{{dialogData.device.address}}</span></div>
        <div class="row"><span class="left">最后上线时间:</span><span class="right2">{{this.$utils.renderTime(new Date(dialogData.device.activeTime))}}</span></div></div>
        <input id="lnglat2container" type="button" class="bot" value="查看设备状态" @click="changeDialog"/>
    </div>
    <div class="dialogBox" v-if="dialogShow === 2" :style="dislogStyle">
      <div class="infoTitle">
        <p class="h6">查看设备状态</p>
        <span class="closeSpan" @click="closeDialog">+</span>
      </div>
      <div class="Content">
        <table class="status" border="0" cellspacing="0" cellpadding="0">
          <tr><td><div class="left">经度</div><div class="right">{{dialogData.device.longitude}}</div></td></tr>
          <tr><td><div class="left">纬度</div><div class="right">{{dialogData.device.latitude}}</div></td></tr>
          <tr><td><div class="left">高度</div><div class="right">{{dialogData.device.altitude}}m</div></td></tr>
          <tr v-for="(item, index) in dialogData.property" :key="index"><td><div class="left">{{item.funName}}</div><div class="right">{{item.value}}</div></td></tr>
        </table>
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
    yingji: Number
  },

  data() {
    return {
      // map: null,
      bimViewer: null,
      openBim: false,
      lnglats: [],
      lnglatsHydrants: [],
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
      heatMap: null
    };
  },
  watch: {
    yingji(val) {
      if (val === 1) {
        if (this.openBim) {
          this.bimViewer.closeViewer();
          this.openBim = false;
        }
      }
    }
  },
  methods: {
    getHeatMapData(qMap) {
      this.$services.get({
        type: 'LARGE',
        url: 'heatMapListGetData',
        params: {
          type: 'heatMapList'
        }
      }).then(({ data }) => {
        let html = document.documentElement;
        let wW = html.clientWidth; // 窗口宽度
        let wH = html.clientHeight; // 窗口高度
        let pixel1 = new QMap.Cartesian2(0, wH); // 左下
        let cartesian1 = map.scene.globe.pick(map.camera.getPickRay(pixel1), map.scene);
        let pixel2 = new QMap.Cartesian2(wW, 0); // 右上
        let cartesian2 = map.scene.globe.pick(map.camera.getPickRay(pixel2), map.scene);
        let cartographic1 = map.scene.globe.ellipsoid.cartesianToCartographic(cartesian1);
        let latitude1 = Cesium.Math.toDegrees(cartographic1.latitude) - 0.05;
        let longitude1 = Cesium.Math.toDegrees(cartographic1.longitude) - 0.05;
        let cartographic2 = map.scene.globe.ellipsoid.cartesianToCartographic(cartesian2);
        let latitude2 = Cesium.Math.toDegrees(cartographic2.latitude) + 0.05;
        let longitude2 = Cesium.Math.toDegrees(cartographic2.longitude) + 0.05;

        let bounds1 = {
          west: longitude1,
          east: longitude2,
          south: latitude1,
          north: latitude2
        };
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
        }
        console.log('---------datas1-----------', datas1);
        this.addHeatMap(qMap, bounds1, options1, datas1);
      });
    },
    addHeatMap(qMap, bounds, options, datas) {
      getCesiumHeatmap();
      // console.log(CesiumHeatmap);
      this.heatMap = CesiumHeatmap.create(qMap, bounds, options);
      let valueMin = 0;
      let valueMax = 100;
      this.heatMap.setWGS84Data(valueMin, valueMax, datas);
    },
    removeHeatmap() {
      if (this.heatMap) {
        this.heatMap.remove();
      }
    },
    initMapInfos() { // 千寻地图
      map = new QMap.Map('mapContainer5', {
        fullscreenButton: true,
        selectionIndicator: false
        // imageryProvider: new QMap.GoogleImageryProvider()
      });
      map.imageryLayers.blankTileEliminate = true; // 注: 默认为false
      // 天地图影像
      map.imageryLayers.add(new QMap.ImageryLayer(new QMap.TiandituImageryProvider(), {
        dehaze: false,
        blankTileEliminate: true
      }));
      // 高德
      // map.imageryLayers.add(new QMap.ImageryLayer(new QMap.GaodeImageryProvider({
      //   maximumLevel: 18
      // })));
      map.scene.globe.depthTestAgainstTerrain = true;
      map.scene.debugShowFramesPerSecond = true; // 帧率监测
      // 2. 飞到演示区
      const fly = new QMap.Fly(map, {
        complete: () => {
          // this.cameraHeight = map.camera.positionCartographic.height;
          this.setPoint();
          this.getHeatMapData(map);
        }
      });
      fly.withHeadingPitchRoll(0, -30, 0);
      let gcj02towgs84 = coordtransform.gcj02towgs84(120.079822, 30.127429);
      fly.flyTo([gcj02towgs84[0], gcj02towgs84[1]], 150).play();

      // this.getHeatMapData(map);

      let handler = new QMap.ScreenSpaceEventHandler(map.scene.canvas);
      // 地图点击事件
      let currentObjectId = null;
      let attributes = null;
      handler.setInputAction(movement => {
        let pick = map.scene.pick(movement.position);
        // console.log('---------单击事件----------');
        console.log('地图点击事件', pick);
        if (QMap.defined(pick)) {
          if (!pick.id && pick._instanceId) { // 点击室外设备点
            this.$services.get({
              type: 'LARGE',
              url: 'detail',
              params: {
                name: pick._instanceId
              }
            }).then(({ data }) => {
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
          else if (this.level1 === 1.1 && this.level2 === 1.2 && pick.collection) { // 点击园区点
            this.level1 = 1.2;
            this.level2 = 1.3;
            const fly = new QMap.Fly(map, {
              complete: () => {
                this.setPoint();
              }
            });
            fly.withHeadingPitchRoll(0, -30, 0);
            gcj02towgs84 = coordtransform.gcj02towgs84(120.079822, 30.127429);
            fly.flyTo([gcj02towgs84[0], gcj02towgs84[1]], 150).play();
          }
          else if (pick.collection) { // 点击建筑点
            this.$message({
              message: '该点不是室外设备哦',
              type: 'warning'
            });
          }
          else { // 点击建筑事件，动画效果和鼠标移入建筑有些冲突，暂时注释
            // if (!QMap.defined(pick) || !QMap.defined(pick.id)) {
            //   // 未选中
            //   if (currentObjectId && attributes)
            //   {
            //     attributes.color = [255,0,0,0];
            //     currentObjectId = null;
            //     attributes = null;
            //   }
            //   return;
            // }
            // // 选择相同实体，直接返回
            // if (pick.id === currentObjectId) {
            //   return;
            // }
            // // 先释放当前实体
            // if (currentObjectId && attributes) {
            //   attributes.color = [0, 255, 0, 0];;
            //   attributes=null;
            // }
            // currentObjectId = pick.id;
            // attributes = pick.primitive.getGeometryInstanceAttributes(currentObjectId);
            // attributes.color = [0,255,0,50];
          }
        }
      }, QMap.ScreenSpaceEventType.LEFT_CLICK);
      // 添加鼠标滑过事件
      let currentIdHover = null;
      let attributesHover = null;
      const scene = map.scene;
      // 建筑名称显示
      const nameOverlay = document.createElement('div');
      nameOverlay.style.display = 'none';
      nameOverlay.style.position = 'absolute';
      nameOverlay.style.bottom = '0';
      nameOverlay.style.left = '0';
      nameOverlay.style['pointer-events'] = 'none';
      nameOverlay.style.padding = '4px';
      nameOverlay.style.backgroundColor = 'black';
      nameOverlay.style.color = 'white';
      map.container.appendChild(nameOverlay);

      handler.setInputAction(movement => {
        const pickedObject = scene.pick(movement.endPosition);
        if (!QMap.defined(pickedObject) || !QMap.defined(pickedObject.id)) {
          // 未选中
          if (nameOverlay) {
            nameOverlay.style.display = 'none';
          }
          if (currentIdHover && attributesHover) {
            attributesHover.color = [255, 0, 0, 0];
            currentIdHover = null;
            attributesHover = null;
          }
          return;
        }

        // 选择相同实体，直接返回
        if (pickedObject.id === currentIdHover || currentObjectId === pickedObject.id) {
          return;
        }

        // 先释放当前实体
        if (currentIdHover && attributesHover) {
          attributesHover.color = [255, 0, 0, 0];
          attributesHover = null;
        }

        currentIdHover = pickedObject.id;
        attributesHover = pickedObject.primitive.getGeometryInstanceAttributes(currentIdHover);
        attributesHover.color = [0, 255, 0, 60];

        // 更新nameOverlay
        if (nameOverlay) {
          nameOverlay.style.display = 'block';
          nameOverlay.style.bottom = map.canvas.clientHeight - movement.endPosition.y + 'px';
          nameOverlay.style.left = movement.endPosition.x + 'px';
          nameOverlay.textContent = currentIdHover;
        }
      }, QMap.ScreenSpaceEventType.MOUSE_MOVE);
      // 换瓦片
      // map.imageryLayers.addImageryProvider(new QMap.UrlTemplateImageryProvider({
      //   maximumLevel: 21,
      //   // url: '/imgApi/mapcache/gmaps/futurecity_yunxi_source_light@g_hd/{z}/{x}/{y}.png', // 亮
      //   // url: '/imgApi/mapcache/gmaps/futurecity_yunxi_source_dark@g_hd/{z}/{x}/{y}.png' // 暗
      //   // url: 'http://mapinner-test.wz-inc.com/mapcache/gmaps/futurecity_yunxi_source_dark@g_hd/{z}/{x}/{y}.png' // 暗
      //   url: 'http://mapinner-test.wz-inc.com/mapcache/gmaps/futurecity_yunxi_mars_light@g_hd/{z}/{x}/{y}.png' // 匹配高德
      // }));

      // 3D精细模型-全部3D
      // const tilesUrl1 = '/jsonApi/3dtiles/yx_3dtiles/3D2-1/Scene/3d2m2m1.json';
      // map.scene.primitives.add(new QMap.QMap3DTileset({
      //   url: tilesUrl1,
      //   maximumScreenSpaceError: 2
      // }));

      // 3D精细模型-楼块3D
      // let build3DLayer1 = null;
      // const tilesUrl1 = 'http://mapinner-test.wz-inc.com/hdmap/examples/Assets/YX_3DTiles/tileset.json';
      // build3DLayer1 = map.scene.primitives.add(new QMap.QMap3DTileset({
      //   url: tilesUrl1
      //   // maximumScreenSpaceError:2
      // }));
      // build3DLayer1.readyPromise.then(_tileset => {
      //   const { boundingSphere } = _tileset;
      //   const cartographic = QMap.Cartographic.fromCartesian(boundingSphere.center);
      //   const surface = QMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
      //   const offset = QMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -16);
      //   const translation = QMap.Cartesian3.subtract(offset, surface, new QMap.Cartesian3());
      //   _tileset.modelMatrix = QMap.Matrix4.fromTranslation(translation);
      // });

      // 3D精细模型-倾斜摄影
      // let build3DLayer1 = null;
      // let build3DLayer2 = null;
      // let build3DLayer3 = null;
      // const tilesUrl1 = 'http://mapinner-test.wz-inc.com/3dtiles/yx_3dtiles/3D2-1/Scene/3d2m2m1.json';
      // const tilesUrl2 = 'http://mapinner-test.wz-inc.com/3dtiles/yx_3dtiles/3D2-2-1/Scene/3D2m2m1(2m2m1).json';
      // const tilesUrl3 = 'http://mapinner-test.wz-inc.com/3dtiles/yx_3dtiles/3D2-2-2/Scene/3D2m2m2.json';
      // let coordTransform = new QMap.CoordTransform();
      // build3DLayer1 = map.scene.primitives.add(new QMap.QMap3DTileset({
      //   url: tilesUrl1,
      //   maximumScreenSpaceError: 2
      // }));
      // build3DLayer1.readyPromise.then(_tileset => {
      //   const { boundingSphere } = _tileset;
      //   const cartographic = QMap.Cartographic.fromCartesian(boundingSphere.center);
      //   const surface = QMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
      //   const offset = QMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -16);
      //   const translation = QMap.Cartesian3.subtract(offset, surface, new QMap.Cartesian3());
      //   _tileset.modelMatrix = QMap.Matrix4.fromTranslation(translation);
      //   // coordTransform.transformLayer('wgs84togcj02', _tileset, -16);
      // });
      // build3DLayer2 = map.scene.primitives.add(new QMap.QMap3DTileset({
      //   url: tilesUrl2,
      //   maximumScreenSpaceError: 2
      // }));
      // build3DLayer2.readyPromise.then(_tileset => {
      //   const { boundingSphere } = _tileset;
      //   const cartographic = QMap.Cartographic.fromCartesian(boundingSphere.center);
      //   const surface = QMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
      //   const offset = QMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -16);
      //   const translation = QMap.Cartesian3.subtract(offset, surface, new QMap.Cartesian3());
      //   _tileset.modelMatrix = QMap.Matrix4.fromTranslation(translation);
      //   // coordTransform.transformLayer('wgs84togcj02', _tileset, -16);
      // });
      // build3DLayer3 = map.scene.primitives.add(new QMap.QMap3DTileset({
      //   url: tilesUrl3,
      //   maximumScreenSpaceError: 2
      // }));
      // build3DLayer3.readyPromise.then(_tileset => {
      //   const { boundingSphere } = _tileset;
      //   const cartographic = QMap.Cartographic.fromCartesian(boundingSphere.center);
      //   const surface = QMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);
      //   const offset = QMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -16);
      //   const translation = QMap.Cartesian3.subtract(offset, surface, new QMap.Cartesian3());
      //   _tileset.modelMatrix = QMap.Matrix4.fromTranslation(translation);
      //   // coordTransform.transformLayer('wgs84togcj02', _tileset, -16);
      // });

      // 呼吸扫描线
      // let effectLnglat = [
      //   [[ 120.082318061000024, 30.140308454000035 ], [ 120.08231076800007, 30.140379331000076 ], [ 120.082504611000104, 30.140404584000066 ], [ 120.08251508, 30.140336055000034 ], [ 120.082318061000024, 30.140308454000035 ]],
      //   [[ 120.076570430000061, 30.134359773000028 ], [ 120.07649536800011, 30.13438110900006 ], [ 120.076510806000101, 30.134420108000029 ], [ 120.076438478000114, 30.134443392000037 ], [ 120.076573255000085, 30.134803325000064 ], [ 120.076723901000037, 30.134753767000063 ], [ 120.076570430000061, 30.134359773000028 ]],
      //   [[120.079179270000054, 30.136144930000057], [120.079151932000059, 30.136064142000066], [120.078593810000029, 30.136212745000023], [120.078670551000073, 30.136435678000055], [120.078832372000079, 30.136394540000026], [120.078808830000071, 30.136325690000035], [120.079126672000029, 30.136243120000074], [120.079100016000098, 30.136165535000032], [120.079179270000054, 30.136144930000057]],
      //   [[120.079380419000017, 30.135521247000042], [120.07917102600004, 30.135081521000075], [120.0787179780001, 30.135245705000045], [120.07892280100009, 30.135685799000044], [120.079380419000017, 30.135521247000042]],
      //   [[120.078675372000021, 30.135083621000035], [120.078749883000114, 30.135054655000033], [120.078732459000094, 30.135008163000066], [120.078616491000048, 30.135031545000061], [120.078639780000117, 30.135093700000027], [120.078675372000021, 30.135083621000035]]
      // ];
      let effectLnglat = [
        { type: 'Feature', properties: { id: '1000', floor_num: 1.0, name: '水利部产品质量标志研', build_area: 171.72 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.082318061000024, 30.140308454000035], [120.08231076800007, 30.140379331000076], [120.082504611000104, 30.140404584000066], [120.08251508, 30.140336055000034], [120.082318061000024, 30.140308454000035]]]] } },
        { type: 'Feature', properties: { id: '1017', floor_num: 1.0, name: '杭州云计算产业园', build_area: 1170.11 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.078727023000056, 30.13661439200007], [120.078830139000047, 30.136913669000023], [120.079229508000026, 30.136805165000055], [120.079182783000078, 30.136648082000079], [120.078936462000115, 30.136709377000045], [120.078893989000107, 30.136573827000063], [120.078727023000056, 30.13661439200007]]]] } },
        { type: 'Feature', properties: { id: '1024', floor_num: 1.0, name: null, build_area: 88.282 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.077303059000087, 30.136957866000046], [120.077274806000105, 30.136878026000034], [120.077227959000084, 30.136890547000064], [120.077249055000038, 30.136949770000058], [120.077273747000049, 30.136948326000038], [120.07723498599999, 30.136966107000035], [120.077237666000087, 30.137005792000025], [120.07726596100008, 30.137019257000077], [120.077296273000115, 30.137010976000056], [120.077303059000087, 30.136957866000046]]]] } },
        { type: 'Feature', properties: { id: '1058', floor_num: 0.0, name: '杭州卷烟厂', build_area: 35358.154 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.083553326000015, 30.12890946300007], [120.084500352000077, 30.128828561000034], [120.084191163000014, 30.125829800000076], [120.083253655000021, 30.125901183000053], [120.083553326000015, 30.12890946300007]]]] } },
        { type: 'Feature', properties: { id: '1079', floor_num: 0.0, name: '大麦本草博物馆', build_area: 1627.844 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.088787059000083, 30.131849878000025], [120.088724504000083, 30.131211629000063], [120.088364848000083, 30.131233026000075], [120.088381862, 30.131385330000057], [120.088581181000109, 30.131367854000075], [120.088631919000022, 30.131864059000065], [120.088787059000083, 30.131849878000025]]]] } }
      ];
      let effectArr = [];
      effectLnglat.forEach(k => {
        effectArr.push(this.getCenterPoint(k));
      });
      effectArr.push(
        {
          lon: 120.078675372000021,
          lat: 30.130083621000035
        }
      );
      effectArr.forEach(k => {
        this.setEffect(k.lon, k.lat, map);
      });

      console.log(map.camera.positionCartographic.height, '初始化为flyTo的150');
      handler = new QMap.ScreenSpaceEventHandler(map.scene.canvas);
      handler.setInputAction(movement => {
        // console.log(movement, map.camera.positionCartographic.height);
        this.closeDialog();
        this.isZoom = true;
        let diff = this.cameraHeight - map.camera.positionCartographic.height;
        let diffTime = performance.now() - this.requestTime;
        if (diff > -100 && diff < 100) return;
        if (diffTime <= 500) return;
        if (map.camera.positionCartographic.height >= 400) {
          this.level1 = 1.1;
          this.level2 = 1.2;
        }
        else {
          this.level1 = 1.2;
          this.level2 = 1.3;
        }
        this.setPoint();
        console.log('suofang');
      }, QMap.ScreenSpaceEventType.WHEEL);
      map.camera.moveStart.addEventListener(this.mapMoveEvent);
      this.setBelongs();

      // const handler = new QMap.ScreenSpaceEventHandler(map.scene.canvas);
      // handler.setInputAction(movement => {
      //   const pick = map.scene.pick(movement.position);
      //   console.log(pick);
      //   if (QMap.defined(pick) && (pick.id.id)) {
      //   // 处理当前建筑信息
      //   } else {
      //   // 当前不在建筑上
      //   }
      // }, QMap.ScreenSpaceEventType.MOUSE_MOVE);
    },
    mapMoveEvent(e) {
      if (!this.isZoom) { // 地图缩放时会先触发缩放事件再触发拖拽事件。判断一下当前是缩放还是拖拽
        this.closeDialog();
        // this.setPoint();
        // console.log('tuozhuai', this.cameraHeight - map.camera.positionCartographic.height);
      }
      this.isZoom = false;
    },
    setBelongs() {
      // const options = {
      //   prjType: 'gcj02', // 用来数据的坐标类型 默认不加为wgs84的数据 gcj02为火星坐标数据
      //   lamp: {
      //     url: 'data/Belongs/Geojson/lamp.geojson'// 可自定义数据地址，没有指定则使用按目录组织的默认地址
      //   }
      // };
      const options = {
        // tree:{}, // 树木
        cross: {}, // 绿地
        HDMap: {
          url: 'http://mapinner-test.wz-inc.com/mapcache/gmaps/futurecity_yunxi_source_light@g_hd/{z}/{x}/{y}.png'
        }, // 高精地图
        building: { // 建筑粗模
          showLabel: false // 是否显示建筑物名称标签
        },
        detail3DModel: {}, // 建筑精模
        water: {} // 水
      };
      if (!_belongs) {
        _belongs = new Belongs(map.entities, map);
      }
      _belongs.addAll(options, false);

      // 鼠标点击和滑过建筑动画，有问题，通过给地图绑定点击和滑动事件实现效果
      const moveoverOptions = {
        open: true,
        color: [255, 0, 0, 50],
        callback(name) {
          console.log('鼠标', name);
        }
      };
      const selectOptions = {
        open: true,
        color: [0, 255, 0, 50],
        callback(name) {
          console.log('鼠标', name);
        }
      };
      _belongs.addSingle3DTiles(moveoverOptions, selectOptions, true);

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
            sizeInMeters: true,
            height: treeHeight * scale,
            width: treeHeight * scale
          });
        }
      }
      const addTreeJSon = () => {
        let treeBillboards = map.scene.primitives.add(new QMap.BillboardCollection());
        for (let i = 0; i < 9; ++i) {
          addTree2(treeBillboards, i);
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
    aboutBim() {
      if (!this.openBim) {
        if (!this.bimViewer) {
          this.bimViewer = new QMap.BIMViewer();
        }
        this.bimViewer.openViewer('mapContainer3');
        this.openBim = true;
      }
      else {
        this.bimViewer.closeViewer();
        this.openBim = false;
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
    setAddHydrant(lng, lat, height, id) {
      console.log('消防栓');
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
    addHydrants(qMap, lonlats) {
      // const lonlats=[];
      const _instances = [];
      lonlats.forEach(lonlat => {
        const origin = Cesium.Cartesian3.fromDegrees(lonlat.position[0], lonlat.position[1], 0.0);
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin);
        let scaleMatrix = QMap.Matrix4.fromUniformScale(5.0); // 消防栓缩放比例
        modelMatrix = Cesium.Matrix4.multiply(modelMatrix, scaleMatrix, modelMatrix);
        _instances.push({
          modelMatrix,
          batchId: lonlat.id
        });
      });
      const hydrantCollection = new QMap.ModelInstanceCollection({
        url: './data/Belongs/Model/hydrant.glb',
        instances: _instances
      });
      qMap.scene.primitives.add(hydrantCollection);
      qMap.hydrantCollection = hydrantCollection; // 保存这个图层
    },
    // 删除消防栓
    removeHydrants(qMap) {
      if (this.lnglatsHydrants.length > 0) {
        qMap.scene.primitives.remove(qMap.hydrantCollection);
        qMap.hydrantCollection = null;
        this.lnglatsHydrants = [];
      }
    },
    billboardText(imgUrl, data, height, index, idName) {
      let billentities = map.dataSourceDisplay.defaultDataSource.entities;
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
        cxt.font = data.total < 1000 ? '48px Microsoft YaHei' : '40px Microsoft YaHei';
        // 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
        cxt.textBaseline = 'middle';
        cxt.textAlign = 'center';
        // 距离左边的位置
        let left = canvas.width / 2;
        // 距离上边的位置
        let top = canvas.height / 3;
        // 文字颜色
        cxt.fillStyle = '#fff';
        // 文字在画布的位置
        cxt.fillText(text, left, top);
        console.log(height);

        let position = QMap.Cartesian3.fromDegrees(data.position[0], data.position[1], height);

        billentities.add({
          id: idName + index,
          name: data.type,
          position: new QMap.ConstantPositionProperty(position),
          billboard: new QMap.BillboardGraphics({
            image: canvas,
            scale: 0.3,
            width: 150,
            height: 150,
            horizontalOrigin: QMap.HorizontalOrigin.CENTER,
            verticalOrigin: QMap.VerticalOrigin.CENTER
            // heightReference: QMap.HeightReference.CLAMP_TO_GROUND
          })
        });
      };
    },
    setPoint() {
      this.cameraHeight = map.camera.positionCartographic.height;
      this.requestTime = performance.now();
      let billentities = map.dataSourceDisplay.defaultDataSource.entities;
      if (this.lnglats.length > 0) {
        this.lnglats = [];
        billentities.removeAll();
        // map.entities.removeAll();
        this.removeHydrants(map);
      }
      let html = document.documentElement;
      let wW = html.clientWidth; // 窗口宽度
      let wH = html.clientHeight; // 窗口高度
      let pixel1 = new QMap.Cartesian2(0, wH);
      let cartesian1 = map.scene.globe.pick(map.camera.getPickRay(pixel1), map.scene);
      let pixel2 = new QMap.Cartesian2(wW, 0);
      let cartesian2 = map.scene.globe.pick(map.camera.getPickRay(pixel2), map.scene);
      let num = 0;

      let timer = setInterval(() => {
        num++;
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
                  total: data[i].total
                });
              }
              else if (data[i].height) {
                this.lnglats.push({
                  position: [gcj02towgs84[0], gcj02towgs84[1]],
                  name: data[i].name,
                  type: data[i].type,
                  id: data[i].id,
                  total: data[i].total,
                  height: data[i].height
                });
              }
            }
            console.log(this.level1);
            this.addHydrants(map, this.lnglatsHydrants);
            if (this.level1 === 1.2 && this.level2 === 1.3) {
              for (let i = 0; i < this.lnglats.length; i++) {
                // if (this.lnglats[i].type !== '园区' && this.lnglats[i].type !== '建筑') {
                //   this.setAddHydrant(this.lnglats[i].position[0], this.lnglats[i].position[1], 0, this.lnglats[i].id);
                // }
                // else {
                this.billboardText('./img/test3.png', this.lnglats[i], this.lnglats[i].height, i, 'jianzhu');
                // let style = data[i].total < 1000 ? '140px sans-serif' : '100px sans-serif';
                // billentities.add({
                //   id: 'jianzhu' + i,
                //   name: data[i].type,
                //   position: new QMap.ConstantPositionProperty(QMap.Cartesian3.fromDegrees(this.lnglats[i].position[0], this.lnglats[i].position[1]), QMap.ReferenceFrame.FIXED),
                //   billboard: new QMap.BillboardGraphics({
                //     image: './img/test3.png',
                //     scale: 0.3,
                //     width: 150,
                //     height: 150,
                //     horizontalOrigin: QMap.HorizontalOrigin.CENTER,
                //     verticalOrigin: QMap.VerticalOrigin.CENTER,
                //     heightReference: QMap.HeightReference.CLAMP_TO_GROUND,
                //     // distanceDisplayCondition: new QMap.DistanceDisplayCondition(0.0, Number.MAX_VALUE)
                //   }),
                //   label: new QMap.LabelGraphics({
                //     text: data[i].total ? data[i].total + '' : '0',
                //     scale: 0.1,
                //     font: style,
                //     // fillColor: QMap.Color.DODGERBLUE,
                //     heightReference: QMap.HeightReference.CLAMP_TO_GROUND,
                //     // distanceDisplayCondition: new QMap.DistanceDisplayCondition(0.0, Number.MAX_VALUE),
                //     pixelOffset: new QMap.Cartesian2(0, -9),
                //     style: QMap.LabelStyle.FILL_AND_OUTLINE
                //   })
                // });
                // }
              }
            }
            else {
              for (let i = 0; i < this.lnglats.length; i++) {
                // if (this.lnglats[i].type === '园区') {
                this.billboardText('./img/test3.png', this.lnglats[i], this.lnglats[i].height, i, 'yuanqu');
                // let style = data[i].total < 1000 ? '140px sans-serif' : '100px sans-serif';
                // billentities.add({
                //   id: 'yuanqu' + i,
                //   name: this.lnglats[i].type,
                //   position: new QMap.ConstantPositionProperty(QMap.Cartesian3.fromDegrees(this.lnglats[i].position[0], this.lnglats[i].position[1]), QMap.ReferenceFrame.FIXED),
                //   billboard: new QMap.BillboardGraphics({
                //     image: './img/test3.png',
                //     scale: 0.3,
                //     width: 150,
                //     height: 150,
                //     horizontalOrigin: QMap.HorizontalOrigin.CENTER,
                //     verticalOrigin: QMap.VerticalOrigin.CENTER,
                //     heightReference: QMap.HeightReference.CLAMP_TO_GROUND,
                //     distanceDisplayCondition: new QMap.DistanceDisplayCondition(0.0, Number.MAX_VALUE)
                //   }),
                //   label: new QMap.LabelGraphics({
                //     text: data[i].total ? data[i].total + '' : '0',
                //     scale: 0.1,
                //     font: style,
                //     // fillColor: QMap.Color.DODGERBLUE,
                //     heightReference: QMap.HeightReference.CLAMP_TO_GROUND,
                //     distanceDisplayCondition: new QMap.DistanceDisplayCondition(0.0, Number.MAX_VALUE),
                //     pixelOffset: new QMap.Cartesian2(0, -9),
                //     style: QMap.LabelStyle.FILL_AND_OUTLINE
                //   })
                // });
                // }
              }
            }
          });
        }
        else if (num >= 10) {
          clearInterval(timer);
          this.setPoint();
        }
      }, 500);
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
      // this.initMapAmap();
    });
  },
  beforeDestroy() {
    let handler = new QMap.ScreenSpaceEventHandler(map.scene.canvas);
    handler.removeInputAction(QMap.ScreenSpaceEventType.WHEEL);
    map.camera.moveStart.removeEventListener(this.mapMoveEvent);
    let billentities = map.dataSourceDisplay.defaultDataSource.entities;
    if (this.lnglats.length > 0) {
      this.lnglats = [];
      billentities.removeAll();
      // map.entities.removeAll();
      this.removeHydrants(map);
    }
    map = null;
  }
};
</script>

<style lang="scss" scoped>
  #mapContainer5{
    width: 100%;
    height: 100%;
    position: relative;
    .btn{
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 999;
    }

    .dialogBox{
      position: absolute;
      z-index: 999;
      font-size: .3rem;
      text-align: left;
      width: 4.5rem;
      color: white;
      background: #fff;
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
        background-image: -webkit-linear-gradient(left , rgb(43, 141, 250), rgb(82, 190, 254));
        position: relative;
        border-radius: .2rem .2rem 0 0;
        .h6{
          padding: .22rem 26px .28rem;
          font-size: .3rem;
        }
        .closeSpan{
          display: block;
          position: absolute;
          top: .119205rem;
          right: .119205rem;
          font-size: .405298rem;
          color: #fff;
          cursor: pointer;
          transform: rotate(45deg);
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
        border-top: 10px solid #fff;
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
