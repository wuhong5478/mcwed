export default {
  // $getway: 'bimApi',
  $getway: process.env.NODE_ENV === 'production' ? 'https://bim.citylink.hzcloudtown.com' : 'bimApi',
  publishWarn: 'hangzhou/AliCloudApi/api/Warn/publishWarn' // 隐患告警信息推送
};
