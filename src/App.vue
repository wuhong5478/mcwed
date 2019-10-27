<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
@import "./assets/css/reset.scss";
@import "./assets/css/animation.scss";

body, html{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 14px;
  color: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
