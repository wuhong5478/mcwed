import { Message, Loading } from 'element-ui';
import service from './service';
import storageM from '../storage';
import CONFIG from './config/index';

const ServiceConf = {
  ...CONFIG
};

export default {
  async postLoading({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    const $loading = Loading.service({
      target: document.querySelector('div.contain'),
      lock: true,
      fullscreen: false,
      text: '请求中'
    });
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.post(urlKey, params);
    $loading.close();
    if (res && res.code === 200 || res && res.code === 500) {
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else {
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
    }
    return res;
  },
  async get({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.get(urlKey, params);
    if (res && res.code === 200 || res && res.code === 500) {
      res.status = true;
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else {
      res.status = false;
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
    }
    return res;
  },
  async post({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.post(urlKey, params);
    console.log(res);
    if (res.code) {
      if (res && res.code === 200 || res && res.code === 500) {
        res.status = true;
        if (cache) {
          storage.$set({
            key: urlKey,
            parameter: res
          });
        }
      }
      else {
        res.status = false;
        const msg = res.msg ? res.msg : '操作异常';
        Message.error(msg);
      }
    }
    else if (res && res.message === 'success') {
      res.status = true;
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else {
      res.status = false;
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
    }
    return res;
  },
  async postJson({
    type,
    url,
    params = {},
    storageType = 'sessionStorage',
    cache = false,
    reflush = false
  }) {
    let urlKey = `${ServiceConf[type]['$getway']}/${ServiceConf[type][url]}`;
    const storage = storageM[storageType];
    if (cache) {
      let storageData = storage.$get({ key: urlKey });
      if (storageData && !reflush) {
        return storageData;
      }
    }
    let res = await service.postJson(urlKey, params);
    if (res && res.code === 200 || res && res.code === 500) {
      res.status = true;
      if (cache) {
        storage.$set({
          key: urlKey,
          parameter: res
        });
      }
    }
    else {
      res.status = false;
      const msg = res.msg ? res.msg : '操作异常';
      Message.error(msg);
    }
    return res;
  },

  async setHeader({ key, val }) {
    await service.setHeader({
      key,
      val
    });
  }
};
