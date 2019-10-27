<template>
  <div class="large3-warp">
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="floorInfo-warp" v-if="isFloorInfoShow">

        <newsfloor :isbimData="isbimData" :yjEmId="yjEmId" :yingji="yingji" :type="type"></newsfloor>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="buildfloor-warp" v-if="isbuildsShow">
        <buildsfloor :buildsData="buildsData"></buildsfloor>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="microInfo-warp" v-show="isMicroInfoShow">
        <microInfo :Close="isMicroInfoShow" ref="microInfoWindow" @transferClose="getClose"></microInfo>
      </div>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="deviceInfo-warp" v-show="showDetail === false && isDeviceInfoShow === true" key="aa">
        <deviceInfo :isbeiData="isbeiData"></deviceInfo>
      </div>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">

      <div class="detailInfo-warp1" v-show="showDetail === true" key="bb">
        <detailInfo :builddetail="builddetail"></detailInfo>
      </div>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="regionalHDInfo-warp" v-show="isRegionalHDInfoShow" key="ee">
        <regionalHDInfo ref="regionalHDInfo"></regionalHDInfo>
      </div>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="hiddenDInfo-warp" v-show="isHiddenDInfoShow" key="cc">
        <hiddenDInfo ref="hiddenDInfo"></hiddenDInfo>
      </div>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="fireAlarmInfo-warp" v-show="isFireAlarmInfoShow" key="dd">
        <fireAlarmInfo ref="fireAlarmInfo"></fireAlarmInfo>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="videoInfo-warp" v-if="isVideoInfoShow" :yjProductkey="yjProductkey" :yjDeviceName="yjDeviceName">
        <videoInfo :videoUrl="videoUrl" :videoDeviceName="videoDeviceName" :videoProductKey="videoProductKey"></videoInfo>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="picInfo-warp" v-if="isPicInfoShow">
        <picInfo :picObj="picObj"></picInfo>
      </div>
    </transition>
    <div class="mapWarp">
      <large1Map :yingji="yingji" :ifAlarm="ifAlarm" :isbimShow="isbimShow" :isbimData="isbimData" ref="map" :wsData="fireMsg"
        :yjProductkey="yjProductkey" :yjDeviceName="yjDeviceName" :yjEmId="yjEmId" @setVideoUrl="setVideoUrl"
        @showInfoWindow="showInfoWindow" @setMicroInfoData="setMicroInfoData" @buildPing="buildPing" @buildbim="buildbim"
        @buildshebei="buildshebei" @fireAnaly="closefireAnaly" @fireWindow="changeFireAlarmInfoShow" @yinhuan="changeHiddenDInfoShow"
        @yinhuanAnaly="changeRegionalHDInfoShow" @buildInfoWindow="changeBuildInfoShow" :isHeatLayerShow="isHeatLayerShow"
        @closeAllWindow="closeAllWindow" :type="type" @changeIsHeatSet="changeIsHeatSet"></large1Map>
    </div>
    <transition name="custom-classes-transition" enter-active-class="animated  fadeIn" leave-active-class="animated  fadeOut">
      <myMask v-if="this.typeName === 0 && showmain !==0"></myMask>
    </transition>
    <header>
      <!-- <span>云栖小镇智慧消防</span> -->
      <!-- <el-button style="margin-left: 10px;" type="primary" id="abu" @click="action()">主页1</el-button> -->
      <!-- <el-button style="margin-left: 10px;" type="primary" id="stop" @click="stop()">停止自动切换</el-button> -->
      <!-- <el-button style="margin-left: 10px;" type="primary" id="back" @click="back()" v-show="backshow">返回主页1</el-button> -->
      <!-- <el-button style="margin-left: 10px;" type="primary" id="stop" @click="alarmShow()" v-show="alarmshow">应急警报</el-button> -->
      <div class="left" @click="changePicSearchShow()">云栖小镇数字化建设</div>
      <div class="center">
        智慧消防
        <!-- <el-button @click="qiehuan()" v-if="yingji === 0">切换到应急</el-button> -->
        <!-- <el-button @click="qiehuan()" v-else>切换到普通</el-button>
        <el-dropdown style="padding-left: .2rem;">
          <el-button type="primary"> 静态弹窗<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="popEvent(index)" :disabled="popUp[index]" v-for="(item, index) in popUpName"
              :key="index">{{item}}
            </el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>

       <div class="VIDEO" @click="changeVideoInfoShow()"></div> -->
        <!-- <el-button @click="changeFloorInfoShow() " v-show="isfloorShow">楼层信息弹窗</el-button> -->
      </div>
      <div class="right">
        <div>{{time}}</div>
        <div>
          <span>{{data}}</span>
          <span>{{day}}</span>
        </div>
      </div>
    </header>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="searchBox" id="searBox" v-show="iftopClick">
        <search @searchClick="searchClick" @emelatlon="emelatlon" @cleanemeRouter="cleanemeRouter" @shehuifly="shehuifly" ref="search"></search>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="picSearchBox" id="picSearBox" v-show="ifLogoClick">
        <picSearch :isHeatSet="isHeatSet"></picSearch>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated flipInY-l" leave-active-class="animated fadeOutLeft"
      mode="out-in">
      <div class=" leftBox" v-if="this.typeName  ===0&&showmain  ===0" key="aa">
        <div class="comprehensiveEvaluation-warp">
          <comprehensiveEvaluation :wsData="normalWsLeftTop"></comprehensiveEvaluation>
        </div>
        <div class="equipmentCondition-warp">
          <equipmentCondition :wsData="normalWsRightUp" :update="noRightUpUpdate"></equipmentCondition>
          <!-- <fireAlarm :update="noLeftDownUpdate"></fireAlarm> -->
        </div>
        <!-- <div class="emergencyAssessment-warp">
          <emergencyAssessment></emergencyAssessment>
        </div> -->
      </div>
      <div class=" leftBox1" v-else-if="this.typeName  ===1&&showmain  ===0" key="b">
        <div class="controlroomInfo-warp">

          <controlroomInfo :wsData="yingjiWsLeftTop1" :update="yjLeftTop1Update" :yjProductkey="yjProductkey"
            :yjDeviceName="yjDeviceName" :yjEmId="yjEmId"></controlroomInfo>
        </div>
        <div class="microFireStationInfo-warp">

          <microFireStationInfo :wsData="yingjiWsLeftTop2" :yjProductkey="yjProductkey" :yjDeviceName="yjDeviceName"
            :yjEmId="yjEmId"></microFireStationInfo>
        </div>
        <!-- <div class="emergencyFireStation-warp">
          <emergencyFireStation :yjProductkey="yjProductkey" :yjDeviceName="yjDeviceName" :yjEmId="yjEmId"></emergencyFireStation>
        </div> -->
        <div class="emergencyGroupInfo-warp">

          <emergencyGroupInfo :wsData="yingjiWsLeftBottom" :yjProductkey="yjProductkey" :yjDeviceName="yjDeviceName"
            :yjEmId="yjEmId"></emergencyGroupInfo>
        </div>
      </div>
      <!-- <div class=" leftBox" v-else-if="this.typeName  ===2&&showmain  ===0" key="cc">
        <div class="comprehensiveEvaluation-warp">
          <comprehensiveEvaluation></comprehensiveEvaluation>
        </div>
        <div class="equipmentCondition-warp">
          <equipmentCondition></equipmentCondition>
        </div>
        <div class="emergencyAssessment-warp">
          <emergencyAssessment></emergencyAssessment>
        </div>
      </div> -->
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated slideInDown" leave-active-class="animated fadeOutUp"
      mode="out-in">
      <div class="centerTopBox" v-if="this.typeName  ===0&&showmain  ===0" key="ct1">
        <div class="topData-warp">
          <topData :update="noTopDataUpdate" @topclick="topclick"></topData>
        </div>
        <transition name="alarmAnimated" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp"
          mode="in-out">
          <div class="alarmInfo-warp" v-if="this.isAlarmShow" key="alar">
            <alarmInfo :alarmMsg="alarmMsg"></alarmInfo>
          </div>
        </transition>
      </div>

      <!-- <div class="centerTopBox2" v-else-if="this.typeName  ===1&&showmain  ===0" key="ct2">
          <importantData></importantData>
      </div> -->
      <div class="centerTopBox1" v-else-if="this.typeName  ===1&&showmain  ===0" key="ct3">
        <div class="topTime-warp">
          <topTime :yjProductkey="yjProductkey" :yjDeviceName="yjDeviceName" :yjEmId="yjEmId"></topTime>
        </div>
      </div>
      <!-- <div class="centerTopBox" v-else-if="this.typeName  ===2&&showmain  ===0" key="ct4">
        <topData></topData>
      </div> -->
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut"
      mode="out-in">
      <div v-if="this.typeName  ===0" key="cc1"></div>
      <!-- <div class="video-warp" v-else-if="this.typeName  ===1&&this.viedoshow  ===0" key="cc2">
        <videoScreen></videoScreen>
      </div> -->
      <div v-else-if="this.typeName  ===2" key="cc3"></div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown"
      mode="out-in">
      <!-- <home1Menu @transferNum1="getNum1" v-if="this.typeName  ===0&&showmain  ===0" key="cd1"></home1Menu> -->


      <alarmList v-show="this.typeName  ===0&&showmain  ===0" key="cd1" :wsData="normalWsBottom" @msgNormal="msgNormal"
        @msgClick="msgClick" @msgAction="msgAction" @msgAlarmFirst="msgAlarmFirst" @changeDaPingFubenShow="changeDaPingFubenShow"
        @daPingData="daPingData" @closeshebeideatil="closeshebeideatil" :yingji="yingji" :yjEmId="yjEmId" @toNormal="back" @updateHiddenPoint="updateHiddenPoint"></alarmList>
      <div class="centerDownBox1" v-if="this.typeName  ===0&&showmain  ===1" key="cd2">
        <alert></alert>
      </div>
      <div class="centerDownBox1" v-else-if="this.typeName  ===0&&showmain  ===2" key="cd3">
        <equipment></equipment>
      </div>
      <div class="centerDownBox1" v-else-if="this.typeName  ===0&&showmain  ===3" key="cd4">
        <parkScore></parkScore>
      </div>
      <!-- <div class="centerDownBox" v-else-if="this.typeName  ===1" key="d2">
        <div class="option-warp">
          <parkClassification @isVideoShow="getNum3"></parkClassification>
        </div>
      </div> -->
      <!-- <animation @transferPage="getPage" v-else-if="this.typeName  ===2" key="d3" :Flag1="flag1" :IsDisable="isDisable"
       @transferIs="getNum2"  @transferFlag1="getFlag1"></animation> -->
    </transition>
    <transition name="Point1" mode="out-in">
      <div v-if="page  ===true&&temp  ===true" class="first" @click="changePage()"></div>
    </transition>
    <transition name="Point1" mode="out-in">

      <div v-if="page  ===true&&temp  ===true" class="first1"></div> <!-- 暂时没做提示框 -->
    </transition>
    <transition name="Point1" mode="out-in">

      <div v-if="page  ===true&&temp  ===true" class="first2"></div> <!-- 暂时没做提示框 -->
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated flipInY-r" leave-active-class="animated fadeOutRight"
      mode="out-in">
      <div class=" rightBox" v-if="this.typeName  ===0&&showmain  ===0" key="rr1">
        <div class="alarmConditions-warp">
          <!-- <alarmConditions></alarmConditions> -->
          <!-- <equipmentCondition :wsData="normalWsRightUp" :update="noRightUpUpdate"></equipmentCondition> -->
          <workingSituation :wsData="normalWsRightDown" :update="noRightDownUpdate"></workingSituation>
        </div>
        <div class="workingSituation-warp">
          <!-- <workingSituation :wsData="normalWsRightDown" :update="noRightDownUpdate"></workingSituation> -->
          <fireAlarm :update="noLeftDownUpdate"></fireAlarm>
        </div>
        <!-- <div class="examine-warp">
          <examine></examine>
        </div> -->
      </div>
      <div class=" rightBox1" v-else-if="this.typeName  ===1&&showmain  ===0" key="rr2">
        <div class="fireScene-warp">

          <fireScene :wsData="yingjiWsRight" :yjProductkey="yjProductkey" :yjDeviceName="yjDeviceName" :yjEmId="yjEmId"
            @toNormal="back"></fireScene>
        </div>
      </div>
      <!-- <div class=" rightBox" v-else-if="this.typeName  ===2&&showmain  ===0" key="rr3">
        <div class="alarmConditions-warp">
          <alarmConditions></alarmConditions>
        </div>
        <div class="workingSituation-warp">
          <workingSituation></workingSituation>
        </div>
      </div> -->
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class=" rightBox2" v-if="this.later === true">
        <div class="videoList-warp">
          <videoList :yjProductkey="yjProductkey" :yjDeviceName="yjDeviceName"></videoList>
        </div>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="analyBox" v-show="isShowFireAnaly">
        <fireAnaly @closefireAnaly="closefireAnaly" :isfireAnaly="isfireAnaly"></fireAnaly>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="buildInfoBox" :style="buildInfoPosition" v-show="isBuildInfoShow">
        <buildInfo ref="buildInfo" @closeBuildInfoShow="changeBuildInfoShow"></buildInfo>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="dapingfubenBox" v-show="isDaPingShow">
        <dapingfuben :fireReportData="fireReportData" @closeDapingfubenShow="changeDaPingFubenShow"></dapingfuben>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="shebeiDetailBox" v-show="isshebeidetailShow">
        <shebeiDetail @closeshebeideatil1="closeshebeideatil1" :shebeidetailData="shebeidetailData"></shebeiDetail>
      </div>
    </transition>
    <!-- <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="title leftBox3" v-show="later" :class="{box3Click:isBox3Click}" @click="box3Click()">{{box3Content}}</div>
    </transition> -->
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="btnBox leftBox6" v-show="isfloorShow" :class="{box4Click:isBox4Click}" @click="changeFloorInfoShow()"><span
          class="btnBg2"></span><span>{{box4Content}}</span></div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="btnBox leftBox5" v-show="yingji" :class="{box4Click:isBox5Click}" @click="changeResourceShow()"><span
          class="btnBg3"></span><span>{{box5Content}}</span></div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="btnBox1 leftBox7" style="text-align: left;" v-show="isCheckBoxShow && yingji">
        <el-checkbox v-model="ResourceCheckList[0]"><span class="btnBg1" :class="{btnBg1_2:!ResourceCheckList[0]}"></span><span>应急资源</span></el-checkbox>
        <el-checkbox v-model="ResourceCheckList[1]"><span class="btnBg2" :class="{btnBg2_2:!ResourceCheckList[1]}"></span><span>微型消防站</span></el-checkbox>
        <el-checkbox v-model="ResourceCheckList[2]"><span class="btnBg3" :class="{btnBg3_2:!ResourceCheckList[2]}"></span><span>消控室</span></el-checkbox>
      </div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="btnBox leftBox5 btnBg" v-show="!yingji" style="top: 2.9rem;" :class="{box4Click:isResourceShow}" @click="changeNormalResourceShow()"><span
          class="btnBg3"></span><span>{{box5Content}}</span></div>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      mode="out-in">
      <div class="btnBox leftBox5 btnBg" v-show="!yingji" style="top: 3.8rem;" :class="{box4Click:isImportantShow}" @click="changeImportantShow()"><span
          class="btnBg4"></span><span>{{box6Content}}</span></div>
    </transition>
    <div class="btnBox2 zoomBox">
      <span class="fangda" @click="toZoom('in')"></span>
      <span class="suoxiao" @click="toZoom('out')"></span>
    </div>
  </div>
</template>
<script>
import {
  Message,
  Loading
} from 'element-ui';
//  主页2中间和下面组件（标记点、按钮、最近报警信息）
// import animation from './zhuye2/animation';
//  地图组件
import large1Map from './map/map3.vue';
//  小镇综合评估
import comprehensiveEvaluation from './white/zhuye1/comprehensiveEvaluation';
//  小镇设备状况
import equipmentCondition from './white/zhuye1/equipmentCondition';
//  小镇应急评估
// import emergencyAssessment from './white/zhuye1/emergencyAssessment';
//  火灾报警
import fireAlarm from './white/zhuye1/fireAlarm';
//  小镇报警情况
// import alarmConditions from './white/zhuye1/alarmConditions';
//  小镇工作情况
import workingSituation from './white/zhuye1/workingSituation';
//  园区巡检
// import examine from './white/zhuye1/examine';
//  地图上方数据展示
import topData from './white/zhuye1/topData';
//  地图实时滚动条展示
import alarmInfo from './white/zhuye1/alarmInfo';
//  主页1菜单
// import home1Menu from './white/zhuye1/home1Menu';
//  主页1菜单
import alarmList from './white/zhuye1/alarmList';
//  微型消防站信息
import microFireStationInfo from './white/yingji/microFireStationInfo';
//  应急消防站信息
// import emergencyFireStation from './white/yingji/emergencyFireStation';
//  应急组信息
import emergencyGroupInfo from './white/yingji/emergencyGroupInfo';
//  消控室信息
import controlroomInfo from './white/yingji/controlroomInfo';
//  重要数据
// import importantData from './white/yingji/importantData';
//  火灾现场
import fireScene from './white/yingji/fireScene';
//  视频列表
import videoList from './white/yingji/videoList';
//  园区分类
// import parkClassification from './white/yingji/parkClassification';
//  视频画面

// import videoScreen from './white/yingji/videoScreen';
//  地图上方数据展示
import topTime from './white/yingji/topTime';
//  最近报警信息
//  import recentAlarmInformation from './white/zhuye2/recentAlarmInformation';
//  超时页面
//  import overTime from './white/zhuye2/overTime';
//  import vediocam from './white/zhuye2/vediocam';
import parkScore from './white/defen/parkScore.vue';
import equipment from './white/defen/equipment.vue';
import alert from './white/defen/alert.vue';
import myMask from './white/zhuye1/myMask.vue';
import newsfloor from './white/zhuye1/newsfloor';
import microInfo from './white/zhuye1/microInfo.vue';
import deviceInfo from './white/zhuye1/deviceInfo.vue';
import detailInfo from './white/zhuye1/detailInfo.vue';
import videoInfo from './white/zhuye1/videoInfo.vue';
import picInfo from './white/zhuye1/picInfo.vue';
import search from './white/zhuye1/search.vue';
import picSearch from './white/zhuye1/picSearch.vue';
import fireAnaly from './white/zhuye1/fireAnaly.vue';
import buildsfloor from './white/zhuye1/buildsfloor.vue';
import hiddenDInfo from './white/zhuye1/hiddenDInfo.vue';
import fireAlarmInfo from './white/zhuye1/fireAlarmInfo.vue';
import regionalHDInfo from './white/zhuye1/regionalHDInfo.vue';
import buildInfo from './white/zhuye1/buildInfo.vue';
import dapingfuben from './white/zhuye1/dapingfuben.vue';
import shebeiDetail from './white/zhuye1/shebeiDetail.vue';

export default {
  name: 'large3',

  data() {
    return {
      ResourceCheckList: [true, true, true],
      box4Content: '平面图纸',
      box5Content: '应急资源',
      box6Content: '重点单位',
      isResourceShow: true,
      isImportantShow: true,
      isBox4Click: false,
      isBox5Click: false,
      isCheckBoxShow: false,
      later: false,
      buildInfoPosition: 'left:40%;bottom:40%',
      isBuildInfoShow: false,
      isShowFireAnaly: false,
      showDetail: false,
      popUp: [false, false, false, false, false, false],
      popUpName: ['设备列表', '隐患列表', '隐患分析', '火情列表', '火警报告', '微型消防'],
      showmain: 0,
      view: 'child',
      alarmMsg: '',
      active: 0,
      index: 8,
      typeName: 0, //  0:大屏；1:应急
      divname: '',
      actionname: '',
      moveOut: '',
      moveIn: '',
      show: true,
      showFlag: true,
      flag1: false, //  控制第一个提示框
      flag2: false, //  控制第二个提示框
      flag3: false, //  多个按钮中点击了哪一个的判断条件
      isDisable: false, //  防止同时出现两个提示框
      page: true,
      viedoshow: 0,
      backshow: false,
      isAlarmShow: false,
      temp: false, //  控制铃铛延迟出现
      yingji: 0, // 判断是不是应急 0不是1是 2刚开始状态
      time: '',
      data: '',
      day: '',
      timer0: null,
      timer: null,
      timer1: null,
      timer2: null,
      timer3: null,
      timer4: null,
      timer5: null,
      fireMsg: {},
      normalWsRightUp: {},
      noRightUpUpdate: false,
      normalWsRightDown: {},
      normalWsBottom: {},
      normalWsLeftTop: {},
      noRightDownUpdate: false,
      noTopDataUpdate: false,
      noLeftDownUpdate: false,
      yingjiWsLeftTop1: {},
      yjLeftTop1Update: false,
      yingjiWsLeftTop2: {},
      yingjiWsRight: {},
      yingjiWsLeftBottom: {},
      isFloorInfoShow: false,
      isMicroInfoShow: false,
      isVideoInfoShow: false,
      isPicInfoShow: false,
      isDeviceInfoShow: false,
      isFireAlarmInfoShow: false,
      isHiddenDInfoShow: false,
      isRegionalHDInfoShow: false,
      yjProductkey: '',
      yjDeviceName: '',
      yjEmId: '',
      ifAlarm: {}, // 页面加载时有火警正在处理中经纬度
      isfloorShow: false,
      isbimShow: false, // 判断是不是应急模式下的bim按钮
      isbimData: null,
      videoUrl: '',
      videoDeviceName: '',
      videoProductKey: '',
      pic: null,
      objId: null,
      iftopClick: false,
      ifLogoClick: false,
      isbuildsShow: false,
      buildsData: null,
      builddetail: null,
      isbeiData: null,
      isHeatLayerShow: -1,
      isDaPingShow: false,
      fireReportData: null,
      isfireAnaly: null,
      isshebeidetailShow: false,
      shebeidetailData: null,
      type: '',
      picObj: '',
      isHeatSet: false
    };
  },
  watch: {
    ResourceCheckList(val) {
      this.$refs.map.isShowResourceList(val);
    },
    typeName(val) { // 视频列表等待一会之后再出现
      if (val === 1) {
        // this.later = true;
        let timer1 = setTimeout(() => {
          this.later = true;
          clearTimeout(timer1);
        }, 2000);
      }
      if (val === 0) {
        this.later = false;
      }
    },
    yingji(val) {
      this.closeAllWindow();
      if (val === 0) {
        // this.action();
        // let timer1 = setTimeout(() => {
        //   this.isAlarmShow = true;
        //   clearTimeout(timer1);
        // }, 4000);
        // let timer2 = setTimeout(() => {
        //   this.action();
        //   clearTimeout(timer2);
        // }, 5 * 60 * 1000);
      }
      if (val === 1) {
        this.action2();
        // let timer3 = setTimeout(() => {
        //   this.action2();
        //   clearTimeout(timer3);
        // }, 3 * 60 * 1000);
      }
    }
  },
  components: {
    videoList,
    regionalHDInfo,
    hiddenDInfo,
    fireAlarmInfo,
    fireAnaly,
    microInfo,
    detailInfo,
    deviceInfo,
    videoInfo,
    picInfo,
    large1Map,
    comprehensiveEvaluation,
    equipmentCondition,
    fireAlarm,
    // emergencyAssessment,
    // alarmConditions,
    workingSituation,
    // examine,
    topData,
    alarmInfo,
    microFireStationInfo,
    // emergencyFireStation,
    emergencyGroupInfo,
    controlroomInfo,
    fireScene,
    // parkClassification,
    // videoScreen,
    topTime,
    //  recentAlarmInformation,
    //  overTime,
    //  vediocam,
    parkScore,
    equipment,
    alert,
    // home1Menu,
    alarmList,
    myMask,
    // importantData,
    // animation
    newsfloor,
    search,
    picSearch,
    buildsfloor,
    buildInfo,

    dapingfuben,
    shebeiDetail
  },
  methods: {
    changeIsHeatSet(val) {
      this.isHeatSet = val;
    },
    changeResourceCheckList(val) {
      this.ResourceCheckList = [val, val, val];
    },
    shehuifly(val) {
      this.$refs.map.msgFly(val.lng, val.lat);
    },
    toZoom(val) {
      this.$refs.map.toZoom(val);
    },
    changeNormalResourceShow() {
      this.$refs.map.isShowNormalResource();
      // this.isBox5Click = !this.isBox5Click;
      // this.isCheckBoxShow = !this.isCheckBoxShow;
      this.isResourceShow = !this.isResourceShow;
    },
    changeNormalResourceShow1(val) {
      this.$refs.map.isShowNormalResource1(val);
      // this.isBox5Click = !this.isBox5Click;
      // this.isCheckBoxShow = !this.isCheckBoxShow;
      this.isResourceShow = val;
    },
    changeImportantShow() {
      this.$refs.map.isShowImportant();
      // this.isBox5Click = !this.isBox5Click;
      // this.isCheckBoxShow = !this.isCheckBoxShow;
      this.isImportantShow = !this.isImportantShow;
    },
    changeImportantShow1(val) {
      this.$refs.map.isShowImportant1(val);
      // this.isBox5Click = !this.isBox5Click;
      // this.isCheckBoxShow = !this.isCheckBoxShow;
      this.isImportantShow = val;
    },
    changeResourceShow() {
      // this.$refs.map.isShowResourceList();
      // this.isBox5Click = !this.isBox5Click;
      this.isCheckBoxShow = !this.isCheckBoxShow;
    },
    box3Click() {
      this.isBox3Click = !this.isBox3Click;
      if (this.isBox3Click === true) {
        this.box3Content = '关闭BIM图';
      }
      else {
        this.box3Content = '打开BIM图';
      }
    },

    closeshebeideatil(obj) {
      this.shebeidetailData = obj;
      this.isshebeidetailShow = !this.isshebeidetailShow;
    },
    closeshebeideatil1() {
      this.isshebeidetailShow = false;
    },
    closeAllWindow() {
      this.isBuildInfoShow = false;
      this.isFloorInfoShow = false;
      this.showDetail = false;
      this.isbuildsShow = false;
      this.isShowFireAnaly = false;
      this.isMicroInfoShow = false;
      this.isDeviceInfoShow = false;
      this.isHiddenDInfoShow = false;
      this.isRegionalHDInfoShow = false;
      this.isFireAlarmInfoShow = false;
      this.isshebeidetailShow = false;
      this.isVideoInfoShow = false;
    },
    emelatlon(val) {
      this.$refs.map.msgFly1(val.lng, val.lat);
      this.$refs.map.removeRouter(val);
      this.$refs.map.setRouter(val);
    },
    cleanemeRouter() {
      // 如果关掉查询按钮 清除路线
      this.$refs.map.removeRouter();

    },
    daPingData(val) {
      this.fireReportData = val;
      this.isDaPingShow = !this.isDaPingShow;
    },
    changeDaPingFubenShow() {
      this.isDaPingShow = !this.isDaPingShow;
    },
    changeHeatLayer(val) {
      this.isHeatLayerShow = val;
    },
    changeBuildInfoShow(val, addr) {
      if (addr) this.buildInfoPosition = addr;
      this.$refs.buildInfo.setData(val);
      this.isBuildInfoShow = !this.isBuildInfoShow;
    },
    changeFloorInfoShow() {
      this.isFloorInfoShow = !this.isFloorInfoShow;
      if (this.yingji === 1) {
        this.isfloorShow = true;
      }
      else {
        this.isfloorShow = false;
      }
      // if(this.isFloorInfoShow ){
      //   this.box4Content = '关闭楼层平面图';
      // }else{
      //   this.box4Content = '打开楼层平面图';
      // }
    },
    changeDetailInfoShow(val) {
      // console.log('detail', val);
      this.builddetail = val;
      this.showDetail = !this.showDetail;
      // console.log('this.showDetail:', this.showDetail);
    },
    changebulidInfoShow() {
      this.isbuildsShow = !this.isbuildsShow;
    },
    closefireAnaly(obj) {
      this.isfireAnaly = obj;
      // console.log(this.isfireAnaly, '///////////////////');
      this.isShowFireAnaly = !this.isShowFireAnaly;
    },
    buildshebei(obj) {
      this.isbeiData = obj;
      this.isDeviceInfoShow = !this.isDeviceInfoShow;
    },
    buildPing(obj) {
      // this.isfloorShow = true;
      this.buildsData = obj;
      // console.log('=====' + obj);
      this.isbuildsShow = !this.isbuildsShow;
    },
    buildbim(obj) {
      // console.log('obj', obj);
      this.type = 'build';
      this.isbimShow = true;
      this.$refs.map.msgOpenNormalBim(obj);
    },
    setMicroInfoData(data) {
      this.$refs.microInfoWindow.setWindowData(data);
    },
    topclick(obj) {
      console.log('222', obj);
      this.iftopClick = obj;
      if (!this.ifLogoClick) {
        // 如果关掉查询按钮 清除路线
        this.$refs.map.removeRouter();
        this.$refs.search.cleansear();
      }
    },
    searchClick(obj) {
      // console.log(obj);
      this.iftopClick = true;
      // if (obj) {
      //   document.getElementsByClassName('searchBox')[0].style.width = '23%';
      // }
      // else {
      //   document.getElementsByClassName('searchBox')[0].style.width = '21%';
      // }

    },
    showInfoWindow() {
      this.isMicroInfoShow = !this.isMicroInfoShow;
    },
    popEvent(val) {
      // console.log('pop: ', val);
      if (val === 0) {
        this.isDeviceInfoShow = true;
      }
      else if (val === 1) {
        this.isHiddenDInfoShow = true;
      }
      else if (val === 2) {

        this.isRegionalHDInfoShow = true;
      }
      else if (val === 3) {

        this.isFireAlarmInfoShow = true;
      }
      else if (val === 4) {
        this.changeDaPingFubenShow();
      }
      else if (val === 5) {
        this.showInfoWindow();
      }
    },

    setVideoUrl(url, deviceName, productKey) {
      this.videoUrl = url;
      this.videoDeviceName = deviceName;
      this.videoProductKey = productKey;
      this.changeVideoInfoShow();
    },
    getClose(val) {
      this.isMicroInfoShow = val;
      // console.log('isMicroInfoShow:' + this.isMicroInfoShow);
    },
    changeHiddenDInfoShow(val) {
      this.$refs.hiddenDInfo.getData(val);
      this.isHiddenDInfoShow = !this.isHiddenDInfoShow;
    },
    changeVideoInfoShow() {
      this.isVideoInfoShow = !this.isVideoInfoShow;
    },
    changePicInfoShow(obj) {
      this.picObj = obj;
      this.isPicInfoShow = !this.isPicInfoShow;
    },
    changeFireAlarmInfoShow(val) {
      this.$refs.fireAlarmInfo.getData(val);
      this.isFireAlarmInfoShow = !this.isFireAlarmInfoShow;
    },
    changeDeviceInfoShow() {
      this.isDeviceInfoShow = !this.isDeviceInfoShow;
    },
    changeRegionalHDInfoShow(val) {
      this.$refs.regionalHDInfo.getData(val);
      this.isRegionalHDInfoShow = !this.isRegionalHDInfoShow;
    },
    changePicSearchShow() {
      this.ifLogoClick = !this.ifLogoClick;
      console.log('this.iftopClick : ', this.iftopClick);
      this.topclick(false);
    },
    msgNormal(obj) {


      // console.log('-----hiddrenwarn---' + obj);


      this.isbimData = obj.data;
      this.yjProductkey = obj.productKey;
      this.yjDeviceName = obj.deviceName;
      this.type = obj.type;
      this.yjEmId = obj.id;
      let lat = parseFloat(obj.data.lat);
      let lon = parseFloat(obj.data.lon);

      if (obj.eventType === 'out_side') { // 经纬度
        this.$refs.map.msgFly(lon, lat, this.yjDeviceName, obj.type);
      }
      else if (obj.eventType === 'blue_print') { // 平面图
        this.$refs.map.msgFly(lon, lat, '', '');
        setTimeout(() => {
          this.isfloorShow = true;
          this.isFloorInfoShow = !this.isFloorInfoShow;
        }, 2000);

      }
      else if (obj.eventType === 'bim') { // bim
        this.$refs.map.msgFly(lon, lat, '', '');
        setTimeout(() => {
          this.isbimShow = true;
          this.$refs.map.msgOpenBim(obj.data);
        }, 2000);

      }

    },
    msgAlarmFirst(obj) {
      this.ifAlarm.lat = obj.lat;
      this.ifAlarm.lon = obj.lon;
    },
    updateHiddenPoint(obj) {
      this.$refs.map.updateHiddenPoint(obj);
    },
    msgAction(obj) {

      this.qiehuan();
      console.log('-----hiddrenwarn---', obj);
      let lat = parseFloat(obj.data.lat);
      let lon = parseFloat(obj.data.lon);
      // this.$refs.map.msgFly(lon, lat, '', '');
      this.isbimData = obj.data;
      this.yjProductkey = obj.productKey;
      this.yjDeviceName = obj.deviceName;
      this.yjEmId = obj.id;
      this.type = obj.type;
      if (obj.eventType === 'other' || obj.eventType === 'out_side') { // 经纬度
      }
      else if (obj.eventType === 'blue_print') { // 平面图

        this.isfloorShow = true;
        // this.isFloorInfoShow = !this.isFloorInfoShow;
      }
      else { // bim
        this.isbimShow = true;
        /* this.$refs.map.msgOpenBim(obj); */
      }
      // this.$refs.map.setYingjiResourcePoint(obj.data.lon, obj.data.lat);


      /* this.$refs.map.msgFly(obj.lon, obj.lat, obj.deviceName, 'fireWarn');


          this.yjProductkey = obj.productKey;
          this.yjDeviceName = obj.deviceName;
          this.yjEmId = obj.id; */

    },
    msgClick(obj) {
      this.$refs.map.msgFly(obj.lon, obj.lat, obj.deviceName, obj.type);
    },
    toNormal() {
      this.isfloorShow = false;
      this.isbimShow = false;
      this.isVideoInfoShow = false;
      this.qiehuan();
    },
    qiehuan() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.timer2) {
        clearTimeout(this.timer2);
        this.timer2 = null;
      }
      if (this.timer0) {
        clearTimeout(this.timer0);
        this.timer0 = null;
      }
      if (this.yingji === 0 && this.typeName === 0) {
        this.typeName = 1;
        this.showmain = 0;
        this.yingji = 1;
        this.viedoshow = 0;
        this.backshow = false;
        // document.getElementById('abu').innerText = '应急';
      }
      else if (this.yingji !== 0 && this.typeName === 1) {
        this.typeName = 0;
        this.showmain = 0;
        this.viedoshow = 1;
        this.yingji = 0;
        this.isAlarmShow = false;
        this.backshow = false;
        // document.getElementById('abu').innerText = '主页1';
      }
    },
    action() {
      //  0主页1 1应急 2主页2
      this.timer0 = setTimeout(() => {
        this.isAlarmShow = true;

        // 当报警滚动条出现的时候 ifAlarm为true 报警状态

        this.timer5 = setTimeout(() => {
          clearTimeout(this.timer5);
          this.timer5 = null;
        }, 6000);

        clearTimeout(this.timer0);
        this.timer0 = null;
      }, 4000);
      // this.timer = setTimeout(() => {
      //   if (this.typeName === 0) {
      //     this.typeName = 1;
      //     this.showmain = 0;
      //     this.yingji = 1;
      //     this.viedoshow = 0;
      //     this.backshow = false;
      //     // document.getElementById('abu').innerText = '应急';
      //   }
      //   clearTimeout(this.timer);
      //   this.timer = null;
      // }, 5 * 60 * 1000);
      // if (this.typeName === 0) {
      //   this.typeName = 1;
      //   this.showmain = 0;
      //   this.yingji = 1;
      //   this.viedoshow = 0;
      //   this.backshow = false;
      //   // document.getElementById('abu').innerText = '应急';
      // }
    },
    action2() {
      // this.timer2 = setTimeout(() => {
      //   if (this.typeName === 1) {
      //     this.typeName = 0;
      //     this.showmain = 0;
      //     this.viedoshow = 1;
      //     this.yingji = 0;
      //     this.isAlarmShow = false;
      //     this.backshow = false;
      //     // document.getElementById('abu').innerText = '主页1';
      //   }
      //   clearTimeout(this.timer2);
      //   this.timer2 = null;
      // }, 3 * 60 * 1000);
      // if (this.typeName === 1) {
      //   this.typeName = 0;
      //   this.showmain = 0;
      //   this.viedoshow = 1;
      //   this.yingji = 0;
      //   this.isAlarmShow = false;
      //   this.backshow = false;
      //   // document.getElementById('abu').innerText = '主页1';
      // }
    },
    back() {
      this.typeName = 0;
      this.showmain = 0;
      this.viedoshow = 1;
      this.yingji = 0;
      this.isAlarmShow = false;
      this.backshow = false;
      this.isfloorShow = false;
      this.isbimShow = false;
      // document.getElementById('abu').innerText = '主页1';
    },
    changePage() {
      if (!this.isDisable) {
        this.flag1 = !this.flag1;
      }
    },
    alarmShow() {
      this.isAlarmShow = !this.isAlarmShow;
    },
    getFlag1(val) {
      this.flag1 = val;
    },
    getPage(val) {
      this.page = val;
    },
    getNum1(val) {
      if (val === 1) {
        this.showmain = 1;
        this.backshow = true;
        this.alarmshow = false;
      }
      else if (val === 3) {
        this.showmain = 2;
        this.backshow = true;
        this.alarmshow = false;
      }
      else {
        this.showmain = 0;
      }
      // this.showmain=
    },
    getNum2(val) {
      this.isDisable = val;
    },
    getNum3(val) {
      if (val === 1) {
        this.viedoshow = 1;
      }
      else {
        this.viedoshow = 0;
      }
    },
    setFontSize() {
      let designSize = 2880; // 设计图尺寸
      let html = document.documentElement;

      let wW = html.clientWidth; // 窗口宽度
      let rem = wW * 100 / designSize;
      document.documentElement.style.fontSize = rem + 'px';
    },
    getTime() {
      let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      this.time = this.$utils.renderTime(new Date(), 'HH:mm:ss');
      this.data = this.$utils.renderTime(new Date(), 'YYYY.MM.DD');
      this.day = weekday[new Date().getDay()];
    },
    heartbeat() {
      console.log('心跳');
      this.socketApi.sendSock(
        'ping',
        this.getData
      );
    },
    getData(msg) {
      console.log('websocket数据', msg);
      if (msg.data.type === 'device') { // 推送更新设备总览数据,重新请求消防核心指标数据
        this.normalWsRightUp = msg.data;
        this.noTopDataUpdate = !this.noTopDataUpdate;
      }
      else if (msg.data.type === 'town') { // 推送更新消防隐患数据,重新请求消防核心指标数据
        this.normalWsRightDown = msg.data;
        this.noTopDataUpdate = !this.noTopDataUpdate;
      }
      else if (msg.data.type === 'multiple') { // 推送更新综合评估
        this.normalWsLeftTop = msg.data;
      }
      else if (msg.data.type === 'fireWarn' || msg.data.type === 'hiddenWarn') { // 推送更新消息数据
        this.normalWsBottom = msg.data;
        if (msg.data.type === 'fireWarn') { // 重新请求火灾报警和消防核心指标
          this.noLeftDownUpdate = !this.noLeftDownUpdate;
          this.noTopDataUpdate = !this.noTopDataUpdate;
          if (msg.data.eventType === '1') {
            this.fireMsg = msg.data;
          }
        }
        else { // 重新请求设备总览和消防隐患
          this.noRightUpUpdate = !this.noRightUpUpdate;
          this.noRightDownUpdate = !this.noRightDownUpdate;
        }

        // if (msg.data.eventType === '1') { // 警情信息
        //   this.alarmMsg = msg.data.address + '，' + msg.data.devName + msg.data.eventName;
        //   this.isAlarmShow = true;
        //   // 当报警滚动条出现的时候 ifAlarm为true 报警状态


        //   this.timer0 = setTimeout(() => {
        //     this.isAlarmShow = false;
        //     clearTimeout(this.timer0);
        //     this.timer0 = null;
        //   }, 10 * 1000);
        // }
      }
      else if (msg.data.type === 'siteStation') { // 推送更新应急下火情警报
        this.yingjiWsRight = msg.data;
      }
      else if (msg.data.type === 'accessPerson') { // 推送更新应急下触达人员信息
        this.yingjiWsLeftBottom = msg.data;
      }
      else if (msg.data.type === 'controlRoom') { // 推送更新应急下消控室信息
        this.yingjiWsLeftTop1 = msg.data;
      }
      else if (msg.data.type === 'miniFireStation') { // 推送更新应急下微型消防站信息,重新请求消控室信息
        this.yingjiWsLeftTop2 = msg.data;
        this.yjLeftTop1Update = !this.yjLeftTop1Update;
      }
    },
    getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          // 判断这个cookie的参数名是不是我们想要的
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    },
    iftoLogin() {
      let cookie = document.cookie;
      if (cookie === '' || cookie === null || cookie === 'undefined' || cookie.indexOf('user_id') === -1 || cookie.indexOf(
        'ssid'
      ) === -1) {
        Message.error('请先登录');
        // setTimeout(() => {
        //   // location.href = 'https://home.citylink.hzcloudtown.com/';
        // }, 1500);
      }
      else {
        let userId = this.getCookie('user_id');
        let ssid = this.getCookie('ssid');

        if (userId === '' || userId === 'undefined' || userId === null) {
          Message.error('请先登录');
          setTimeout(() => {
            location.href = 'https://home.citylink.hzcloudtown.com/';
          }, 1500);

        }
        else if (ssid === '' || ssid === 'undefined' || ssid === null) {
          Message.error('请先登录');
          setTimeout(() => {
            location.href = 'https://home.citylink.hzcloudtown.com/';
          }, 1500);

        }

      }
    }
    /* stop() {
          let domStop = document.getElementById('stop');
          if (domStop.innerText.includes('停止')) {
            clearInterval(this.timer); //  在Vue实例销毁前，清除我们的定时器
            domStop.innerText = '启动自动切换';
          }
          else if (domStop.innerText.includes('启动')) {
            this.timer = setInterval(this.action, 5 * 1000);
            domStop.innerText = '停止自动切换';
          }
        } */
  },
  mounted() {
    // this.yingji = 0;
    // this.timer = setInterval(this.action, 5 * 60 * 1000);
    // document.documentElement.style.fontSize = 100 + 'px';
    this.setFontSize();
    window.addEventListener('resize', () => {
      this.setFontSize();
    });
    // document.documentElement.style.fontSize = 133.33 + 'px';
    this.getTime();
    this.timer3 = setInterval(this.getTime, 1000);
    this.heartbeat();
    this.timer4 = setInterval(this.heartbeat, 50 * 1000);
    this.iftoLogin();
  },
  beforeDestroy() {
    if (this.timer0) {
      clearTimeout(this.timer0);
      this.timer0 = null;
    }
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.timer1) {
      clearTimeout(this.timer1);
      this.timer1 = null;
    }
    if (this.timer2) {
      clearTimeout(this.timer2);
      this.timer2 = null;
    }
    if (this.timer3) {
      clearTimeout(this.timer3);
      this.timer3 = null;
    }
    if (this.timer4) {
      clearTimeout(this.timer4);
      this.timer4 = null;
    }
    if (this.timer5) {
      clearTimeout(this.timer5);
      this.timer5 = null;
    }
    /* if (this.timer) {


          clearInterval(this.timer); //  在Vue实例销毁前，清除我们的定时器
        } */
  }
};
</script>
<style lang="scss">
  .large3-warp {
    width: 100%;
    // min-width: 2880px;
    // min-width: 3840px;
    height: 100%;
    // min-height: 1620px;
    // min-height: 2160px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    color: #fff;

    .buildInfoBox {
      position: absolute;
      width: auto;
      height: auto;
      top: 30%;
      left: 40%;
      z-index: 999;
    }

    .analyBox {
      width: 42%;
      height: 70%;
      position: fixed;
      z-index: 110;
      top: 2.65rem;
      left: 9.5rem;
    }

    .floorInfo-warp {
      position: absolute;
      width: 80%;
      height: 80%;
      top: calc(0.6rem + 10%);
      left: 10%;
      z-index: 2010;
    }

    .microInfo-warp {
      position: absolute;
      width: 74%;
      height: 80%;
      top: calc(0.6rem + 10%);
      left: 13%;
      z-index: 2010;
    }

    .buildfloor-warp {
      position: absolute;
      width: 80%;
      height: 80%;
      top: calc(0.6rem + 10%);
      left: 13%;
      z-index: 2010;
    }

    .deviceInfo-warp {
      position: absolute;
      width: 68%;
      height: 77%;
      top: calc(0.6rem + 10%);
      left: 16%;
      z-index: 2010;
    }

    .detailInfo-warp {
      position: absolute;
      width: 62%;
      height: 68%;
      top: 16%;
      left: 19%;
      z-index: 2010;
    }

    .detailInfo-warp1 {
      position: absolute;
      width: 62%;
      height: 68%;
      top: 16%;
      left: 19%;
      z-index: 2010;
    }

    .hiddenDInfo-warp {
      position: absolute;
      width: 62%;
      height: 67%;
      top: 16%;
      left: 19%;
      z-index: 2010;
    }

    .fireAlarmInfo-warp {
      position: absolute;
      width: 62%;
      height: 65.5%;
      top: 17.5%;
      left: 19%;
      z-index: 2010;
    }

    .regionalHDInfo-warp {
      position: absolute;
      width: 42%;
      height: 75%;
      top: 14.5%;
      left: 29%;
      z-index: 2010;
    }

    .videoInfo-warp {
      position: absolute;
      width: 61%;
      height: 80%;
      top: calc(0.6rem + 10%);
      left: 19.3%;
      z-index: 2010;
    }

    .picInfo-warp {
      position: absolute;
      width: 61%;
      height: 80%;
      top: calc(0.6rem + 10%);
      left: 19.3%;
      z-index: 2010;
    }

    .dapingfubenBox {
      position: absolute;
      width: 41%;

      height: 52%;
      top: 23.5%;
      left: 29%;
      z-index: 2010;
    }


    .shebeiDetailBox {
      position: absolute;
      width: 30%;
      height: 52%;
      top: 23.5%;
      left: 35%;
      z-index: 2010;
    }

    .mapWarp {
      width: 100%;
      height: 100%;
      background: #000;
      // position: fixed;
      // top: 0;
      // left: 0;
      // right: 0;
      // bottom: 0;
      // z-index: -1;
    }

    .btnBox {
      // width: 9%;
      // height: 1.72rem;
      display: flex;
      width: 2rem;
      transition: all 0.5s;
      cursor: pointer;
      border-radius: .1rem;
      padding: 0.2rem .25rem;
      // line-height: .72rem;
      text-align: center;
      font-size: .28rem;
      font-weight: 400;
      background-color: rgba($color: #1287ff, $alpha: 0.8);
      z-index: 100;

      .btnBg1 {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin: 0 0.17rem;
        background: url("../../assets/img/new/bim.png") no-repeat;
        background-size: 100% 100%;
      }

      .btnBg2 {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin: 0 0.17rem;
        background: url("../../assets/img/new/pingmian.png") no-repeat;
        background-size: 100% 100%;
      }

      .btnBg3 {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin: 0 0.17rem;
        background: url("../../assets/img/new/ziyuan.png") no-repeat;
        background-size: 100% 100%;
      }

      .btnBg4 {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin: 0 0.17rem;
        background: url("../../assets/img/new/important.png") no-repeat;
        background-size: 100% 100%;
      }

      .fangda {
        margin: auto;
        display: block;
        width: .5rem;
        height: .5rem;
        border-bottom: rgba(255, 255, 255, 0.4) solid 1px;
        background: url("../../assets/img/new/fangda.png") no-repeat center;
        background-size: 60%;
      }

      .suoxiao {
        margin: auto;
        display: block;
        width: .5rem;
        height: .5rem;
        background: url("../../assets/img/new/suoxiao.png") no-repeat center;
        background-size: 60% 5%;
      }
    }

    .btnBox1 {
      // width: 9%;
      // height: 1.72rem;
      width: 2rem;
      transition: all 0.5s;
      cursor: pointer;
      border-radius: .1rem;
      padding: 0.2rem .25rem;
      // line-height: .72rem;
      text-align: center;
      font-size: .28rem;
      font-weight: 400;
      background-color: rgba($color: #1287ff, $alpha: 0.8);
      z-index: 100;

      .el-checkbox {
        color: #fff;
        margin: .1rem 0;
        .btnBg1 {
          width: 0.4rem;
          height: 0.4rem;
          display: block;
          margin: 0 0.17rem;
          background: url("../../assets/img/new/yingjiziyuan.png") no-repeat;
          background-size: 100% 100%;
          float: left;
        }
        .btnBg2 {
          width: 0.4rem;
          height: 0.4rem;
          display: block;
          margin: 0 0.17rem;
          background: url("../../assets/img/new/weixingxiaofangzhan.png") no-repeat;
          background-size: 100% 100%;
          float: left;
        }
        .btnBg3 {
          width: 0.4rem;
          height: 0.4rem;
          display: block;
          margin: 0 0.17rem;
          background: url("../../assets/img/new/xiaokongshi.png") no-repeat;
          background-size: 100% 100%;
          float: left;
        }
        .btnBg1_2 {
          background: url("../../assets/img/new/yingjiziyuan_white.png") no-repeat;
          background-size: 100% 100%;
        }
        .btnBg2_2 {
          background: url("../../assets/img/new/weixingxiaofangzhan_white.png") no-repeat;
          background-size: 100% 100%;
        }
        .btnBg3_2 {
          background: url("../../assets/img/new/xiaokongshi_white.png") no-repeat;
          background-size: 100% 100%;
        }
      }

      .el-checkbox__inner {
        background: none;
      }
    }

    .btnBg {
      background-color: rgba(58, 72, 84, 0.9);
    }

    .btnBox2 {
      // width: 9%;
      // height: 1.72rem;
      transition: all 0.5s;
      cursor: pointer;
      border-radius: .1rem;
      padding: .05rem .1rem;
      // line-height: .72rem;
      text-align: center;
      font-size: .28rem;
      font-weight: 400;
      background-color: rgba(58, 72, 84, 0.9);
      z-index: 100;

      .fangda {
        margin: auto;
        display: block;
        width: .5rem;
        height: .5rem;
        border-bottom: rgba(255, 255, 255, 0.4) solid 1px;
        background: url("../../assets/img/new/fangda.png") no-repeat center;
        background-size: 60%;
      }

      .suoxiao {
        margin: auto;
        display: block;
        width: .5rem;
        height: .5rem;
        background: url("../../assets/img/new/suoxiao.png") no-repeat center;
        background-size: 60% 5%;
      }
    }

    .title {
      width: calc(100% - .9rem);
      height: .72rem;
      background-image: -webkit-linear-gradient(left, #0A2138, #3A4754);
      padding: 0 .45rem;
      line-height: .72rem;
      font-size: .33rem;
      text-align: left;
      // font-weight: bolder;
      border-radius: .08rem .08rem 0 0;
      font-weight: 700;

      span {
        // background-image: -webkit-linear-gradient(10deg, #0076ff, #00e9ff, #0275ba);
        // background-clip: text;
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        // padding-left: .55rem;
        color: #fff;
      }
    }

    .content {
      width: calc(100% - .76rem);
      // height: calc(100% - 1.04rem);
      height: calc(100% - 1.48rem);
      // box-shadow: inset 0 0 .1rem rgba($color: #0C33AD, $alpha: 0.8);
      // padding: .16rem .38rem;
      padding: .38rem .38rem;
      // background: rgba(2, 13, 41, 0.85) url("../../assets/img/new/borderBottom.png") no-repeat left bottom;
      // background-size: 100%;
      background: rgba(58, 72, 84, .9);
      color: #9BA8C1;
      font-size: .24rem;
      font-weight: 400;
    }

    header {
      height: 1.2rem;
      width: calc(100% - .7rem);
      //  background-color: aqua;
      position: absolute;
      left: 0;
      top: 0;
      // line-height: .7rem;
      font-size: .38rem;
      font-weight: bolder;
      // background: url("../../assets/img/new/headerBg.png") no-repeat;
      // background-size: 100% 100%;
      background: #3A4854;
      padding: 0 .35rem;
      display: flex;
      justify-content: space-between;
      color: #fff;

      .left {
        height: 100%;
        // width: 5rem;
        width: 30%;
        // background: url("../../assets/img/logo.png") no-repeat;
        // background-size: 100% 100%;
        cursor: pointer;
        font-size: .6rem;
        line-height: 1.2rem;
        text-align: left;
      }

      .center {
        height: 100%;
        // width: calc(100% - 10rem);
        width: 40%;
        font-size: .6rem;
        line-height: 1.2rem;
      }

      .right {
        height: calc(100% - .4rem);
        width: 2rem;
        padding: .2rem 0 .2rem calc(30% - 2rem);


        >div:nth-child(1) {
          font-size: .46rem;
        }


        >div:nth-child(2) {
          font-size: .2rem;
          text-align: left;
        }

        span {
          display: block;
          float: left;
        }

        span:nth-child(2) {
          float: right;
        }
      }

      // span {
      //   background-image: -webkit-linear-gradient(45deg, #a9f1fe, #dcfefc, #accdfc, #d8e5ff);
      //   background-clip: text;
      //   -webkit-background-clip: text;
      //   -webkit-text-fill-color: transparent;
      // }
    }

    .searchBox {
      width: 19.3%;
      height: 40%;
      position: fixed;
      z-index: 100;
      left: 0.14rem;
      top: 1.32rem;
    }

    .picSearchBox {
      width: 19.5%;
      height: 40%;
      position: fixed;
      z-index: 1;
      top: 1.3rem;
      left: 0.1rem;
    }

    .leftBox {
      width: 20%;
      height: calc(100% - 1.28rem);
      position: absolute;
      top: 1.28rem;
      left: 0;

      .comprehensiveEvaluation-warp {
        width: 100%;
        height: 45%;
        padding: 0 .05rem .08rem .1rem;
        box-sizing: border-box;
      }

      .equipmentCondition-warp {
        width: 100%;
        height: 55%;
        padding: 0 .05rem .08rem .1rem;
        box-sizing: border-box;
      }

      .emergencyAssessment-warp {
        width: 100%;
        height: 30%;
        padding: 0 .05rem .08rem .1rem;
        box-sizing: border-box;
      }
    }

    .leftBox1 {
      width: 20%;
      height: calc(100% - 1.28rem);
      position: absolute;
      top: 1.28rem;
      left: 0;

      // width: 26%;
      // height: calc(100% - 1.44rem);
      // position: absolute;
      // top: 1.44rem;
      // left: 0;
      .controlroomInfo-warp {
        width: 100%;
        height: 15%;
        // padding: 0 .16rem .32rem .16rem;
        padding: 0 .05rem .08rem .1rem;
        box-sizing: border-box;
      }


      .emergencyFireStation-warp {
        width: 100%;
        height: 15%;
        // padding: 0 .16rem .32rem .16rem;
        padding: 0 .05rem .08rem .1rem;
        box-sizing: border-box;
      }

      .emergencyGroupInfo-warp {
        width: 100%;
        // height: 55%;
        height: 70%;
        // padding: 0 .16rem .32rem .16rem;
        padding: 0 .05rem .08rem .1rem;
        box-sizing: border-box;
      }

      .microFireStationInfo-warp {
        width: 100%;
        height: 15%;
        // padding: 0 .16rem .32rem .16rem;
        padding: 0 .05rem .08rem .1rem;
        box-sizing: border-box;
      }
    }

    // .leftBox3 {
    //   position: absolute;
    //   top: 1.28rem;
    //   left: 20.5%;
    // }
    // .leftBox3:hover{
    //   color:#3091FA !important;
    //   transition: all 0.5s;
    // }
    // .box3Click{
    //   color:#3091FA !important;
    //   transition: all 0.5s;
    // }
    .leftBox6 {
      // height: ;
      position: absolute;
      top: 1.28rem;
      left: 5.85rem;
      z-index: 10;
    }

    // .leftBox6:hover{
    //   color:#3091FA !important;
    //   transition: all 0.5s;
    // }
    .box4Click {
      color: #3091FA !important;
      transition: all 0.5s;
    }

    .leftBox5 {
      position: absolute;
      top: 2.2rem;
      left: 5.85rem;
    }

    .leftBox7 {
      background: none;
      position: absolute;
      color: #fff !important;
      top: 3rem;
      left: 5.85rem;
    }

    .zoomBox {
      position: absolute;
      bottom: .1rem;
      right: 5.85rem;
    }

    // .leftBox5:hover{
    //   color:#3091FA !important;
    //   // transition: all 0.5s;
    // }
    .centerTopBox {
      width: calc(60% - .1rem);
      min-height: 1.1rem;
      position: absolute;
      top: 1.28rem;
      left: 20%;
      padding: 0 .05rem;

      .topData-warp {
        width: 100%;
        // height: 2rem;
      }

      .alarmInfo-warp {
        width: 100%;
        height: .7rem;
        margin: .4rem auto;
        position: absolute;
      }
    }

    .centerTopBox1 {
      width: calc(48% - .32rem);
      height: 1.1rem;
      position: absolute;
      top: 1.28rem;
      left: 26%;
      padding: 0 .16rem;

      .topTime-warp {
        width: 100%;
        height: 1.1rem;
        box-sizing: border-box;
      }
    }

    .centerTopBox2 {
      width: calc(60% - .32rem);
      min-height: 1.1rem;
      position: absolute;
      top: 1.3rem;
      left: 20%;
      padding: 0 .16rem;
    }

    .video-warp {
      position: absolute;
      top: 3.78rem;
      // top: 3.78rem;
      top: calc(1.45rem + ((100% - 1.3rem) * 0.15));
      left: 20.5%;
      margin: auto;
      right: 20.5%;
      // width: 48%;
      height: calc(100% - 4.02rem);
      // height: calc(100% - 4.02rem);
      height: calc(100% - (1.3rem + ((100% - 1.3rem) * 0.15)) - .26rem);
    }

    .centerDownBox {
      width: calc(48% - .32rem);
      height: 1.08rem;
      position: absolute;
      bottom: 0%;
      left: 26%;
      padding: 0 .16rem;

      .option-warp {
        width: 100%;
        height: 1.08rem;
        // padding: .62rem 0 .32rem 0;
        padding-bottom: .32rem;
        box-sizing: border-box;
      }
    }

    .centerDownBox1 {
      width: 100%;
      position: absolute;
      // top: 9.85rem;
      bottom: .32rem;
    }

    .centerBox {
      //   主页2
      width: calc(60% - .32rem);
      height: 1.1rem;
      position: absolute;
      top: 1.2rem;
      left: 20%;
      padding: 0 .16rem;
    }

    .rightBox {
      height: calc(100% - 1.3rem);
      width: 20%;
      position: absolute;
      top: 1.3rem;
      right: 0;

      .alarmConditions-warp {
        width: 100%;
        height: 45%;
        padding: 0 .1rem .08rem .05rem;
        box-sizing: border-box;
      }

      .workingSituation-warp {
        width: 100%;
        height: 55%;
        padding: 0 .1rem .08rem .05rem;
        box-sizing: border-box;
      }


      .examine-warp {
        width: 100%;
        height: 30%;
        padding: 0 .38rem .15rem .19rem;
        box-sizing: border-box;
      }
    }

    .rightBox1 {
      // height: calc(100% - 1.44rem);
      // width: 26%;
      // position: absolute;
      // top: 1.44rem;
      // right: 0;
      height: calc(100% - 1.3rem);
      width: 20%;
      position: absolute;
      top: 1.3rem;
      right: 0;

      .fireScene-warp {
        width: 100%;
        height: 100%;
        padding: 0 .1rem .08rem .05rem;
        // padding: 0 .38rem .21rem .19rem;
        box-sizing: border-box;
      }
    }

    .rightBox2 {
      height: auto;
      width: 15%;
      position: absolute;
      top: 1.3rem;
      right: 5.7rem;

      .videoList-warp {
        width: 100%;
        height: auto;
        padding: 0 .1rem .08rem .05rem;
        // padding: 0 .38rem .21rem .19rem;
        box-sizing: border-box;
      }
    }

    .first {
      background: url('../../assets/img/new/bell.png') no-repeat center center;
      background-size: 100% 100%;
      width: .6rem;
      height: .6rem;
      position: absolute;
      left: 35%;
      top: 63%;
      border-radius: .5rem;
      border: none;
      outline: none;
      cursor: pointer;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: bluePulse;
    }

    .first1 {
      background: url('../../assets/img/new/safe.png') no-repeat center center;
      background-size: 100% 100%;
      width: .6rem;
      height: .6rem;
      position: absolute;
      left: 50%;
      top: 34%;
      border-radius: .5rem;
      border: none;
      outline: none;
      cursor: pointer;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: bluePulse;
    }

    .first2 {
      background: url('../../assets/img/new/urgent.png') no-repeat center center;
      background-size: 100% 100%;
      width: .6rem;
      height: .6rem;
      position: absolute;
      left: 55.5%;
      top: 64%;
      border-radius: .5rem;
      border: none;
      outline: none;
      cursor: pointer;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: bluePulse;
    }

    .Point1-enter-active {

      animation: tada 1s, ;
    }

    .Point1-leave-active {
      animation: zoomOut 1s;
    }

    @keyframes bluePulse {
      50% {
        background-color: #036075;
        box-shadow: 0 0 .27rem #2daebf;
      }

      to {
        box-shadow: 0 0 .09rem #333;
      }
    }

    @keyframes tada {
      from {

        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }

      10%,
      20% {
        -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
      }

      30%,
      50%,
      70%,
      90% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
      }

      40%,
      60%,
      80% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
      }

      to {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }

    .tada {
      -webkit-animation-name: tada;
      animation-name: tada;
    }
  }

  // .VIDEO {
  //   background: url('../../assets/img/new/VIDEO.png') no-repeat center center;
  //   background-size: 100% 100%;
  //   height: 1rem;
  //   width: 1rem;
  //   position: absolute;
  //   left: 5.5rem;
  //   top: 0.1rem;
  //   cursor: pointer;
  // }
  // .VIDEO:hover {
  //   transition: transform .3s ease;
  //   transform: translate(0px, 5px) perspective(500px) rotateX(30deg);
  // }
  .el-dropdown {
    height: 1rem;
  }

  .el-dropdown+.el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
