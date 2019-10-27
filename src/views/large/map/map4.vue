<template>
  <div id="mapContainer4">
    <el-button @click="aboutBim" class="btn" v-show="yingji == 0 || yingji == 2">bim</el-button>
  </div>
</template>

<script type="text/javascript">
let map = null;

export default {
  name: 'large1Map',
  props: {
    yingji: Number
  },

  data() {
    return {
      map: null,
      bimViewer: null,
      openBim: false
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
    initMapInfos() { // 千寻地图
      map = new QMap.Map('mapContainer4', {
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

      let entityCollection = map.dataSourceDisplay.defaultDataSource.entities;
      QMap.GeoJsonDataSource.load('./js/YX_building.json', {
        clampToGround: true
      }).then(data => {
        const entities = data.entities.values;
        entities.forEach(entity => {
          entity.polygon.extrudedHeight = Math.floor(Math.random() * 50 + 5);
          entity.polygon.shadows = QMap.ShadowMode.ENABLED;
          entity.polygon.material = new QMap.Color(0.25, 0.5, 0.8, 0.6);
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
    },
    aboutBim() {
      if (!this.openBim) {
        if (!this.bimViewer) {
          this.bimViewer = new QMap.BIMViewer();
        }
        this.bimViewer.openViewer('mapContainer4');
        this.openBim = true;
      }
      else {
        this.bimViewer.closeViewer();
        this.openBim = false;
      }
    },
    initMapAmap() { // 高德地图
      this.map = new AMap.Map('mapContainer4', {
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 21, // 初始化地图层级
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
      for (let i = 0; i < 10000; i++) {
        let a = 120.0 + Math.random();
        let b = 30.1 + Math.random();
        let marker1 = new AMap.Marker({
          icon: 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          position: [a, b],
          offset: new AMap.Pixel(-13, -30)
        });
        marker1.setMap(this.map);
      }
      this.map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5);
      this.map.DirectionLight = new AMap.Lights.DirectionLight([1, -1, 1], [1, 1, 1], 1);
      let object3Dlayer = new AMap.Object3DLayer();
      this.map.add(object3Dlayer);
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
        let prism = new AMap.Object3D.Prism({
          path: bounds,
          height: 1200,
          color
        });
        prism.transparent = true;
        object3Dlayer.add(prism);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let url = './qmap.js';
      let jsapi = document.createElement('script');
      jsapi.type = 'text/javascript';
      jsapi.src = url;
      document.head.appendChild(jsapi);
      /*      try {
        this.initMapInfos();
      }catch(e) {
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
      } */
      this.initMapAmap();
    });
  }
};
</script>

<style lang="scss" scoped>
  #mapContainer4{
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
