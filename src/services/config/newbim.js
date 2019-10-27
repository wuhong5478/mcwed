export default {
  // $getway: 'bimApi',
  $getway: process.env.NODE_ENV === 'production' ? 'https://bim.citylink.hzcloudtown.com' : 'bimApi',
  setLayerCon: 'hangzhou/AliCloudApi/api/Cons/setLayerCon' // 新的隐患 推送2合一的api
};
