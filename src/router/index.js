import Vue from 'vue';
import Router from 'vue-router';

const Large3 = () => import(/* webpackChunkName: "organizationalManagement" */ '@/views/large/index3');
// const LargeNC = () => import(/* webpackChunkName: "organizationalManagement" */ '@/views/large/largeNC/index');
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Large3',
      component: Large3
    }
    // {
    //   path: '/largeNC',
    //   name: 'LargeNC',
    //   component: LargeNC
    // }
  ]
});
