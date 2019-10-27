export default {
  // $getway: process.env.NODE_ENV === 'production' ? 'https://cloudfire.chnwin.com.cn' : 'yunqiApi',
  // $getway: process.env.NODE_ENV === 'production' ? 'http://120.55.234.38' : 'yunqiApi',
  $getway: process.env.NODE_ENV === 'production' ? 'https://cloudfire.citylink.hzcloudtown.com' : 'yunqiApi',
  range: 'api/device/geography/range', // 经纬度和级别范围范围查询设备
  geography: 'api/device/geography', // 经纬度和级别查询设备
  detail: 'api/device/detail', // 查询设备详情和设备属性
  deviceList: 'api/screen/category/list', // 查询首页设备总览信息
  fireGetData: 'api/screen/fireAlarmAnalysis/getData', // 查询首页火灾报警信息
  fire1GetData: 'api/screen/fireWarn/getData', // 最新查询首页火灾报警信息
  importantGetData: 'api/screen/importantAnalysis/getData', // 查询首页消防核心指标
  important2GetData: 'api/screen/importantData/getData', // 最新查询首页消防核心指标
  townGetData: 'api/screen/townAnalysis/getData', // 查询首页消防隐患信息
  taskGetData: 'api/screen/task/getData', // 查询首页消防隐患信息
  multipleAnalysisGetData: 'api/screen/multipleAnalysis/getData', // 查询首页综合评估信息
  messageListGetData: 'api/screen/messageList/getData', // 查询首页消息模块数据
  controlRoomGetData: 'api/emergencyScreen/controlRoom/getData', // 查询应急消控室信息
  accessPersonGetData: 'api/emergencyScreen/accessPerson/getData', // 查询应急触达人员信息
  important1GetData: 'api/emergencyScreen/important/getData', // 查询应急重要数据信息
  miniFireStationGetData: 'api/emergencyScreen/miniFireStation/getData', // 查询应急微型消防室信息
  siteStationGetData: 'api/emergencyScreen/siteStation/getData', // 查询应急火情警报信息
  emergencyStationGetData: 'api/emergencyScreen/emergencyStationData/getData', // 查询应急火情警报信息
  getResourceList: 'api/screen/resourceList/getData', // 普通模式下应急资源列表
  getResourceByLatLonList: 'api/screen/resourceByLatLonList/getData', // 应急模式下应急资源列表
  getDeviceTypeList: 'api/screen/getDeviceTypeList/getData', // 普通模式下筛选地图上的设备列表,这个功能不要了
  getDevicePonit: 'api/screen/getDeviceListByType/getData', // 普通模式下筛选地图上的设备打点,这个功能不要了
  getBuildingTaskWarnList: 'api/screen/getBuildingTaskWarnList/getData', // 普通模式进入页面打点隐患
  getBuildingTaskWarnByWarnId: 'api/screen/getBuildingTaskWarnByWarnId/getData', // 推送隐患报警时获取隐患打点信息
  heatMapListGetData: 'api/screen/heatMapList/getData', // 查询热力图信息
  heatMapBuildList: 'api/screen/heatMapBuildList/getData', // 查询热力图信息
  videoShowGetData: 'api/screen/videoShow/getData', // 视频监控窗口
  videoShowStopStream: 'api/screen/videoShow/stopStream', // 关闭视频流
  videoShowList: 'api/screen/videoShowList/getData', // 视频流列表
  showDataById: 'api/screen/showDataById/getData', // 查询返回bim或平面图或坐标
  emergencyStatusLimitData: 'api/emergencyScreen/emergencyStatusLimitData/getData', // 页面加载后查询已确认在处理状态的火情报警
  getEmeSuppliesGetData: 'api/screen/getEmeSupplies/getData', // 查询微消站信息
  getTaskWarnGetData: 'api/screenMap/mapTaskWarnDetail/getData', // 查询隐患接口信息
  getFireWarnGetData: 'api/screenMap/mapFireWarnDetail/getData', // 查询火警接口信息
  getSourceDetailGetData: 'api/screenMap/mapEmeSourceDetail/getData', // 查询应急资源详情接口信息
  getMiniStationDetailGetData: 'api/screenMap/mapMiniStationDetail/getData', // 查询微消站消防设备详情接口信息，
  getDeviceCategoryGetData: 'api/screenMap/mapDeviceCategoryList/getData', // 通过类型获取设备
  getDeviceListByCategory: 'api/screenMap/mapDeviceListByCategory/getData', // 通过类型 根据资源名称获取应急资源列表
  getDeviceDetail: 'api/screenMap/mapDeviceDetail/getData', // 地图通过id 隐患具体信息
  getArchitectureDetailData: 'api/screenMap/mapArchitectureDetailData/getData', // 通过类型 显示建筑的bim或者平面图,
  getArchitectureByBuildNo: 'api/screenMap/mapArchitectureByBuildNoDetail/getData', // 通过类型 获取设备.
  getFireWarnAnalysisData: 'api/screenMap/mapFireWarnAnalysisData/getData', // 通过类型 显示建筑获取所在园区火警分析
  getControlRooms: 'api/screen/getControlRooms/getData', // 消控室打点
  mapControlRoomDetail: 'api/screenMap/mapControlRoomDetail/getData', // 消控室详情弹窗
  taskWarnAnalysisData: 'api/screenMap/mapTaskWarnAnalysisData/getData', // 查询悬浮隐患分析数据
  getfireWarnReport: 'api/emergencyScreen/fireWarnReportById/getData', // 通过类型 获取火警报告
  getTaskWarnGetDataList: 'api/screenMap/mapTaskWarnList/getData', // 查询悬浮隐患接口信息
  getFireWarnGetDataList: 'api/screenMap/mapFireWarnList/getData', // 查询悬浮火警接口信息
  getSearchEmeReList: 'api/screenSearch/searchEmeReListList/getData', // 通过类型 根据资源名称获取应急资源列表
  getDeviceByPoint: 'api/screenMap/mapDeviceByPointData/getData', // 通过类型 根据设备查询点位信息
  getiotpictureUrl: 'api/taskwarn/getiotpictureUrl', // 获取隐患图片
  getLiveData: 'api/screenMap/controlRoom/getLiveData', // 地图通过消控室id获取视频流
  searchDeptList: 'api/screenSearch/searchDeptList/getData', // 地图通过名称获取社会单位
  searchArchListByDeptId: 'api/screenSearch/searchArchListByDeptId/getData', // 社会单位获取具体单位
  searchImportDeptList: 'api/screenSearch/searchImportDeptList/getData', // 获取重点单位列表
  searchArctitureList: 'api//screenSearch/searchArctitureList/getData', // 通过类型 获取建筑信息'
  searchDeviceList: 'api/screenSearch/searchDeviceList/getData', // 地图通过id 设备信息
  searchTaskWarnList: 'api/screenSearch/searchTaskWarnList/getData', // 地图通过id 隐患具体信息
  searchFireWarnList: 'api/screenSearch/searchFireWarnList/getData'// 地图通过id 火警具体信息

};
