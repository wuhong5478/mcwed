<template>
  <div id="mapContainer">
    <el-button @click="aboutBim" class="btn">bim</el-button>
  </div>
</template>

<script>
let map = null;

export default {
  name: 'large1Map',
  data() {
    return {
      map: null,
      bimViewer: null,
      openBim: false
    };
  },
  methods: {
    initMapInfos() { // 千寻地图
      map = new QMap.Map('mapContainer', {
        fullscreenButton: true,
        selectionIndicator: false
        // imageryProvider: new QMap.GoogleImageryProvider()
      });
      map.scene.globe.depthTestAgainstTerrain = true;

      // 2. 飞到演示区
      const fly = new QMap.Fly(map, {
        complete: () => {}
      });
      fly.withHeadingPitchRoll(0, -30, 0);
      fly.flyTo([120.079822, 30.127429], 150).play();

      let effectLnglat = [
        { type: 'Feature', properties: { id: '1000', floor_num: 1.0, name: '水利部产品质量标志研', build_area: 171.72 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.082318061000024, 30.140308454000035], [120.08231076800007, 30.140379331000076], [120.082504611000104, 30.140404584000066], [120.08251508, 30.140336055000034], [120.082318061000024, 30.140308454000035]]]] } },
        { type: 'Feature', properties: { id: '1017', floor_num: 1.0, name: '杭州云计算产业园', build_area: 1170.11 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.078727023000056, 30.13661439200007], [120.078830139000047, 30.136913669000023], [120.079229508000026, 30.136805165000055], [120.079182783000078, 30.136648082000079], [120.078936462000115, 30.136709377000045], [120.078893989000107, 30.136573827000063], [120.078727023000056, 30.13661439200007]]]] } },
        { type: 'Feature', properties: { id: '1024', floor_num: 1.0, name: null, build_area: 88.282 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.077303059000087, 30.136957866000046], [120.077274806000105, 30.136878026000034], [120.077227959000084, 30.136890547000064], [120.077249055000038, 30.136949770000058], [120.077273747000049, 30.136948326000038], [120.07723498599999, 30.136966107000035], [120.077237666000087, 30.137005792000025], [120.07726596100008, 30.137019257000077], [120.077296273000115, 30.137010976000056], [120.077303059000087, 30.136957866000046]]]] } },
        { type: 'Feature', properties: { id: '1058', floor_num: 0.0, name: '杭州卷烟厂', build_area: 35358.154 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.083553326000015, 30.12890946300007], [120.084500352000077, 30.128828561000034], [120.084191163000014, 30.125829800000076], [120.083253655000021, 30.125901183000053], [120.083553326000015, 30.12890946300007]]]] } },
        { type: 'Feature', properties: { id: '1079', floor_num: 0.0, name: '大麦本草博物馆', build_area: 1627.844 }, geometry: { type: 'MultiPolygon', coordinates: [[[[120.088787059000083, 30.131849878000025], [120.088724504000083, 30.131211629000063], [120.088364848000083, 30.131233026000075], [120.088381862, 30.131385330000057], [120.088581181000109, 30.131367854000075], [120.088631919000022, 30.131864059000065], [120.088787059000083, 30.131849878000025]]]] } }
      ];
      let effectArr = [];
      let effectIds = [];
      effectLnglat.forEach(k => {
        effectArr.push(this.getCenterPoint(k));
        effectIds.push(k.properties.id);
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
      let json = require('../../../../public/js/YX_building.json');
      let entityCollection = map.dataSourceDisplay.defaultDataSource.entities;
      QMap.GeoJsonDataSource.load('./js/YX_building.json', {
        clampToGround: true
      }).then(data => {
        const entities = data.entities.values;
        entities.forEach((entity, index) => {
          // entity.polygon.extrudedHeight = Math.floor(Math.random() * 50 + 5);
          entity.polygon.extrudedHeight = (json.features[index].properties.floor_num + 1) * 8;
          entity.polygon.shadows = QMap.ShadowMode.ENABLED;
          if (effectIds.indexOf(json.features[index].properties.id) !== -1) {
            console.log(entity);
            entity.polygon.material = new QMap.ImageMaterialProperty({
              image: this.getVideo(),
              repeat: new QMap.Cartesian2(5, 5)
            });
          }
          else {
            entity.polygon.material = new QMap.Color(0.25, 0.5, 0.8, 0.6);
          }
          entity.polygon.outline = false;
          entityCollection.add(entity);
        });
      });
      // 换瓦片
      map.imageryLayers.addImageryProvider(new QMap.UrlTemplateImageryProvider({
        maximumLevel: 21,
        // url: '/imgApi/mapcache/gmaps/futurecity_yunxi_source_light@g_hd/{z}/{x}/{y}.png', // 亮
        // url: '/imgApi/mapcache/gmaps/futurecity_yunxi_source_dark@g_hd/{z}/{x}/{y}.png' // 暗
        url: 'http://mapinner-test.wz-inc.com/mapcache/gmaps/futurecity_yunxi_source_dark@g_hd/{z}/{x}/{y}.png' // 暗
      }));

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
      // });

      console.log(map.camera.positionCartographic.height, '初始化为flyTo的150');
      let handler = new QMap.ScreenSpaceEventHandler(map.scene.canvas);
      handler.setInputAction(movement => {
        console.log(movement, map.camera.positionCartographic.height);
      }, QMap.ScreenSpaceEventType.WHEEL);
    },
    getVideo() {
      let video = document.createElement('video');
      video.src = './img/test.mp4';
      video.autoplay = true;
      return video;
    },
    setEffect(lon, lat, setMap) {
      let scanEffect = new QMap.ScanEffect(setMap);
      scanEffect.add(lon, lat, 20, {
        color: QMap.Color.CORNFLOWERBLUE,
        radius: 50,
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
    aboutBim() {
      if (!this.openBim) {
        if (!this.bimViewer) {
          this.bimViewer = new QMap.BIMViewer();
        }
        this.bimViewer.openViewer('mapContainer');
        this.openBim = true;
      }
      else {
        this.bimViewer.closeViewer();
        this.openBim = false;
      }
    },
    initMapAmap() { // 高德地图
      this.map = new AMap.Map('mapContainer', {
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
    }
  },
  mounted() {
    this.$services.get({
      type: 'LARGE',
      url: 'range',
      params: {
        latitude1: 30.128168,
        latitude2: 30.12933,
        level1: 1.1,
        level2: 1.3,
        longitude1: 119.081200,
        longitude2: 120.081476
      }
    }).then(({ data }) => {
      console.log(data);
    });
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
  }
};
</script>

<style lang="scss" scoped>
  #mapContainer{
    width: 100%;
    height: 100%;
    position: relative;
    .btn{
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 999;
    }
  }
</style>
