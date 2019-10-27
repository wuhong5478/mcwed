// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios';
import App from './App';
import utils from './utils';
import router from './router';
import services from './services';
import 'element-ui/lib/theme-chalk/index.css';
import * as socketApi from './assets/js/socket.js';

Vue.config.productionTip = false;

Vue.prototype.$services = services;
Vue.prototype.$axios = axios;
Vue.prototype.$utils = utils;
Vue.prototype.socketApi = socketApi;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
