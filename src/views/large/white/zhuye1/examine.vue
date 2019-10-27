<template>
  <div class="examine">
    <div class="title"><span>园区巡检</span></div>
    <div class="content">
      <table class="examine-table" cellspacing="0">
        <tr>
          <th>单位机构</th>
          <th>巡检任务</th>
          <th>完成率</th>
        </tr>
        <tr>
          <td><div>国际会展中心一期</div></td>
          <td><div>1200</div></td>
          <td><div>89</div></td>
        </tr>
        <tr>
          <td><div>国际会展中心一期</div></td>
          <td><div>620</div></td>
          <td><div>70</div></td>
        </tr>
        <tr>
          <td><div>润峰产业园</div></td>
          <td><div>1412</div></td>
          <td><div>60</div></td>
        </tr>
        <tr>
          <td><div>中大产业园</div></td>
          <td><div>1444</div></td>
          <td><div>80</div></td>
        </tr>
        <tr>
          <td><div>鹏辉产业园</div></td>
          <td><div>912</div></td>
          <td><div>80</div></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'examine',
  data() {
    return {
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.examine {
  width: 100%;
  height: 100%;
  .examine-table {
    width: 100%;
    height: 100%;
    td {
      width: 28%;
      padding-left: 0;
      padding-right: 0;
    }
    td:nth-child(1) {
      width: 44%;
      text-align: left;
    }
    tr {
      padding-top: .08rem;
    }
    tr:nth-child(even) {
      div {
        background: #C1E4FF;
      }
    }
    tr:nth-child(odd) {
      div {
        background: #B4D8FF;
      }
    }
  }
}
</style>
