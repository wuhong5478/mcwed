<template>
  <div class="topData-blue">
    <div>
      <p>已完成巡查任务</p>
      <div>11200</div>
    </div>
    <div>
      <p>已完成维保任务</p>
      <div>8200</div>
    </div>
    <div>
      <p>接入设备数量</p>
      <div>32000</div>
    </div>
    <div>
      <p>接入建筑数量</p>
      <div>15</div>
    </div>
    <div>
      <p>消控室数量</p>
      <div>10</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topData'
};
</script>

<style lang="scss">
.topData-blue{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  > div{
    width: 18%;
    height: 100%;
    background: url("../../../../assets/img/topBg.png") no-repeat;
    background-size: 100% 100%;
    > p{
      font-size: .2rem;
      line-height: .38rem;
    }
    > div{
      font-size: .4rem;
      color: #ffd200;
      line-height: .64rem;
    }
  }
}
</style>
