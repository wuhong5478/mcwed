<template>
  <div id="mapContainer">
    <el-button @click="aboutBim" class="btn" v-show="yingji == 0 || yingji == 2">bim</el-button>
  </div>
</template>
<script type="text/javascript">
import NC_data from '../../../assets/js/NC_data.json';
import adress from '../../../assets/js/adress_data.js';
import fire from '../../../assets/js/fire_data.js';
import safe from '../../../assets/js/safe_data.js';
import photos from '../../../assets/js/photo_data.js';

let CanvasLayer = new AMap.CanvasLayer(); // 定义成全局变量防止只能对其修改一次
let CanvasLayer1 = new AMap.CanvasLayer(); // 定义成全局变量防止只能对其修改一次
export default {
  name: 'large1Map',
  props: {
    yingji: Number,
    AlarmShow: Boolean,
    TypeName: Number
  },
  data() {
    return {
      map: null,
      bimViewer: null,
      openBim: false,
      buildingLayer: null,
      optionss: [],
      ischange: 0,
      timer: null
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
    },
    AlarmShow(val) {
      if (val) { // 发生火灾后,不管页面切换几次,只重新画图一次
        let options = {
          hideWithoutStyle: false, // 是否隐藏设定区域外的楼块
          areas: [
            { // 围栏
              color1: 'e0EF5729',
              color2: 'c0EF5729',
              path:
               [
                 [107.097701, 29.155191],
                 [107.097896, 29.155612],
                 [107.09759, 29.15574],
                 [107.097383, 29.155245]
               ]
            }
          ]
        };
        this.buildingLayer.setStyle(options);
        this.optionss = [];
        for (let i = 0; i < 37; i++) {
          let color1 = ['e0A30101', 'e0A80101', 'e0AD0101', 'e0B20101', 'e0B80101', 'e0BD0101',
            'e0C20101', 'e0C80101', 'e0CD0101', 'e0D20101', 'e0D80101', 'e0DD0101', 'e0E20101',
            'e0E80101', 'e0ED0101', 'e0F20101', 'e0F80101', 'e0FD0101', 'e0FF0101', 'e0FF0101', 'e0FF0101',
            'e0F80101', 'e0F20101', 'e0ED0101', 'e0E80101', 'e0E20101', 'e0DD0101', 'e0D80101', 'e0D20101',
            'e0CD0101', 'e0C80101', 'e0C20101', 'e0BD0101', 'e0B80101', 'e0B20101', 'e0AD0101', 'e0A80101'];
          let color2 = ['e0A30101', 'e0A80101', 'e0AD0101', 'e0B20101', 'e0B80101', 'e0BD0101',
            'e0C20101', 'e0C80101', 'e0CD0101', 'e0D20101', 'e0D80101', 'e0DD0101', 'e0E20101',
            'e0E80101', 'e0ED0101', 'e0F20101', 'e0F80101', 'e0FD0101', 'e0FF0101', 'e0FF0101', 'e0FF0101',
            'e0F80101', 'e0F20101', 'e0ED0101', 'e0E80101', 'e0E20101', 'e0DD0101', 'e0D80101', 'e0D20101',
            'e0CD0101', 'e0C80101', 'e0C20101', 'e0BD0101', 'e0B80101', 'e0B20101', 'e0AD0101', 'e0A80101'];
          this.optionss[i] = {
            hideWithoutStyle: false, // 是否隐藏设定区域外的楼块
            areas: [
              { // 围栏1
                color1: color1[i],
                color2: color2[i],
                path:
                [
                  [107.097701, 29.155191],
                  [107.097896, 29.155612],
                  [107.09759, 29.15574],
                  [107.097383, 29.155245]
                ]
              }
            ]
          };
        }
        if (this.timer != null) {
          clearInterval(this.timer);
          this.timer = null;
        }
        // 楼层的颜色渐变
        this.timer = setInterval(() => {
          if (this.ischange < 36) {
            this.buildingLayer.setStyle(this.optionss[this.ischange]);
            this.ischange++;
          }
          else {
            this.buildingLayer.setStyle(this.optionss[this.ischange]);
            this.ischange = 0;
          }
        }, 37);
        this.map.setZoom(19);
        this.map.setRotation(15);
        this.map.panTo([107.097801, 29.155891]);
        this.buildingLayer.setMap(this.map);
        /* 绘制波浪警示效果 */
        let canvas = document.createElement('canvas');
        canvas.width = canvas.height = 200;
        let context = canvas.getContext('2d');
        context.fillStyle = 'red';
        context.strokeStyle = 'white';
        context.globalAlpha = 1;
        context.lineWidth = 2;
        let radious = 0;
        let draw = () => {
          context.clearRect(0, 0, 200, 200);
          context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1;
          radious = (radious + 1) % 100;
          context.beginPath();
          context.arc(100, 100, radious, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
          CanvasLayer.reFresh();
          AMap.Util.requestAnimFrame(draw);
        };
        CanvasLayer = new AMap.CanvasLayer({
          bounds: new AMap.Bounds(
            [107.096724, 29.154791],
            [107.098666, 29.156215]
          ),
          zooms: [3, 20]
        });
        CanvasLayer.setCanvas(canvas);
        CanvasLayer.setMap(this.map);
        draw();
        setTimeout(() => {
          let canvas1 = document.createElement('canvas');
          canvas1.width = canvas1.height = 200;
          let context1 = canvas1.getContext('2d');
          context1.fillStyle = '#FF6666';
          context1.strokeStyle = 'white';
          context1.globalAlpha = 1;
          context1.lineWidth = 2;
          let radious1 = 0;
          let draw1 = () => {
            context1.clearRect(0, 0, 200, 200);
            context1.globalAlpha = (context1.globalAlpha - 0.01 + 1) % 1;
            radious1 = (radious1 + 1) % 100;
            context1.beginPath();
            context1.arc(100, 100, radious1, 0, 2 * Math.PI);
            context1.fill();
            context1.stroke();
            CanvasLayer1.reFresh();
            AMap.Util.requestAnimFrame(draw1);
          };
          CanvasLayer1 = new AMap.CanvasLayer({
            bounds: new AMap.Bounds(
              [107.096724, 29.154791],
              [107.098666, 29.156215]
            ),
            zooms: [3, 20]
          });
          CanvasLayer1.setCanvas(canvas1);
          CanvasLayer1.setMap(this.map);
          draw1();
        }, 2000);
      }
      else {
        if (this.timer != null) {
          clearInterval(this.timer);
          this.timer = null;
        }
        let options = {
          hideWithoutStyle: false, // 是否隐藏设定区域外的楼块
          areas: [
            { // 围栏1
              color1: 'e03CB6EF',
              color2: 'c03CB6EF',
              path:
               [
                 [107.401581, 29.184701],
                 [107.394435, 28.859675],
                 [107.136562, 28.887543],
                 [106.973714, 29.056609],
                 [106.923301, 29.403951],
                 [107.39591, 29.204838]
               ]
            }
          ]
        };
        this.buildingLayer.setStyle(options);
        this.map.setZoom(19);
        this.map.setRotation(-15);
        this.map.panTo([107.099266, 29.15789]);
        this.buildingLayer.setMap(this.map);
        CanvasLayer.setMap(null); // 清除火灾实例的波浪动画
        CanvasLayer1.setMap(null); // 清除火灾实例的波浪动画
      }
    }
  },
  methods: {
    initMapInfos() { // 千寻地图
      let map = new QMap.Map('mapContainer', {
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
      fly.flyTo([107.099266, 29.15789], 150).play();
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
      this.buildingLayer = new AMap.Buildings({
        zIndex: 130,
        merge: false,
        sort: false,
        zooms: [3, 20]
      });
      let options = {
        hideWithoutStyle: false, // 是否隐藏设定区域外的楼块
        areas: [
          { // 围栏1
            color1: 'e03CB6EF',
            color2: 'c03CB6EF',
            path:
             [
               [107.401581, 29.184701],
               [107.394435, 28.859675],
               [107.136562, 28.887543],
               [106.973714, 29.056609],
               [106.923301, 29.403951],
               [107.39591, 29.204838]
             ]
          }
          // { // 围栏2
          //   color1: 'e0EF5729',
          //   color2: 'c0EF5729',
          //   path:
          //    [
          //      [107.097701, 29.155191],
          //      [107.097896, 29.155612],
          //      [107.09759, 29.15574],
          //      [107.097383, 29.155245],
          //    ]
          // }
        ]
      };
      this.buildingLayer.setStyle(options);
      this.map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        showLabel: false,
        mapStyle: 'amap://styles/darkblue',
        zoom: 19,
        pitch: 50,
        rotation: -15,
        layers: [
          new AMap.TileLayer({})
          // this.buildingLayer
        ],
        viewMode: '3D', // 开启3D视图,默认为关闭
        buildingAnimation: true, // 楼块出现是否带动画
        expandZoomRange: true,
        zooms: [3, 20],
        center: [107.099266, 29.15789]
      });
      this.buildingLayer.setMap(this.map);
      let polygon = new AMap.Polygon({
        bubble: true,
        fillOpacity: 0.1,
        fillColor: '#338EC9',
        strokeWeight: 1,
        path: [NC_data]
      });
      polygon.setMap(this.map);
      let layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        // 开启标注避让，默认为开启，v1.4.15 新增属性
        collision: true,
        // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
        animation: true
      });
      this.map.add(layer);
      for (let i = 0; i < safe.safe.length; i++) { // 急救站打点
        let curData = safe.safe[i];
        curData.extData = {
          index: i
        };
        let labelMarker = new AMap.LabelMarker(curData);
        labelMarker.content = curData.info;
        labelMarker.on('click', this.markerClick);
        labelMarker.emit('click', { target: labelMarker });
        layer.add(labelMarker);
      }
      for (let i = 0; i < fire.fire.length; i++) { // 消防栓打点
        let curData = fire.fire[i];
        curData.extData = {
          index: i
        };
        let labelMarker = new AMap.LabelMarker(curData);
        labelMarker.content = curData.info;
        labelMarker.on('click', this.markerClick);
        labelMarker.emit('click', { target: labelMarker });
        layer.add(labelMarker);
      }
      for (let i = 0; i < adress.adress.length; i++) { // 建筑打点
        let curData = adress.adress[i];
        curData.extData = {
          index: i
        };
        let labelMarker = new AMap.LabelMarker(curData);
        labelMarker.content = curData.info;
        labelMarker.on('click', this.markerClick);
        labelMarker.emit('click', { target: labelMarker });
        layer.add(labelMarker);
      }
      for (let i = 0; i < photos.photos.length; i++) { // 图片
        let marker = new AMap.Marker({
          position: photos.photos[i].position,
          zooms: [19, 20],
          offset: new AMap.Pixel(-100, -300),
          icon: new AMap.Icon({
            image: photos.photos[i].image,
            size: new AMap.Size(200, 200),
            imageSize: new AMap.Size(200, 200),
            anchor: 'bottom-center'
          })
        });
        marker.setMap(this.map);
      }
    },
    markerClick(e) {
      let infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -100),
        closeWhenClickMap: true
      });
      infoWindow.setContent(e.target.content);
      infoWindow.open(this.map, e.target.getPosition());
      this.map.panTo(e.target.getPosition());
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
<style lang="scss">
.largeNC-warp{
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
  .amap-marker-label{
    color: #338EC9;
    border:0 none;
    background-color: transparent;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.3);
    border-radius: 5px;
    text-shadow: 0 0 0.1px #fff;
  }
  .amap-info-content{
    font-size: 20px;
    width: auto;
    color: #3CB6EF;
    padding: 10px;
    overflow: hidden;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(99, 116, 141, 0.3);
    border-radius: 13px;
    box-shadow: 0 0 8px rgba(99, 116, 141, 1);
    background: linear-gradient(45deg, transparent 0px, rgba(3, 13, 23, 0.9) 0) top center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    animation: animatename 1s;
    .smoke {
      border-top: #3CB6EF;
      border-style: dashed;
      border-width: 1px 0 0 0;
      >p {
        margin-top: 15px;
        text-align: center;
      }
    }
  }
  .amap-info-content .h6{
    margin: 15px 0;
    font-size: 30px;
    font-weight: bold;
  }
  .amap-info-content p{
    margin: 5px 0px;
    font-size: 26px;
  }
  .safeInfo {
    width: 360px;
    padding: 10px;
    .shortInfo {
      width: 50%;
      padding-bottom: 10px;
      float: left;
    }
    .videoBox {
      width: 170px;
      height: 150px;
      float: left;
      padding-bottom: 20px;
      .safevedioplayer {
        width: 100%;
        height: 100%;
      }
    }
    .longInfo {
      width: 100%;
      padding-top: 10px;
      float: left;
      border-top:1px solid #3CB6EF;
      box-sizing: border-box;
    }
  }
  .fireInfo {
    width: 360px;
    padding: 10px;
    .shortInfo {
      width: 50%;
      padding-bottom: 10px;
      float: left;
    }
    .imgBox {
      width: 50%;
      float: left;
      >img {
        width: 34%;
        margin: 0px 33%;
      }
    }
    .longInfo {
      width: 100%;
      padding-top: 10px;
      float: left;
      border-top:1px solid #3CB6EF;
      box-sizing: border-box;
    }
  }
  .info {
    table {
      font-size: 20px;
      width: 820px;
      margin: 15px 0px 10px;
      border-right:1px solid #3CB6EF;
      border-bottom:1px solid #3CB6EF;
      td {
        width: 3rem;
        border-left: 1px solid #3CB6EF;
        border-top: 1px solid #3CB6EF;
      }
    }
    span {
      margin: 10px 10px 0px;
    }
    .uppage {
      margin-left: 170px;
    }
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
