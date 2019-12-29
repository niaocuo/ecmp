<template>
  <!-- 电能质量-电压偏差 path:voltageDeviation-->
  <div class="app-container">
    <TopSelect @valueChange="topSelevtChange" />
    <div class="quality-content">
      <label>选择时间</label>
      <el-date-picker
        v-model="timer"
        size="mini"
        class="dataMonth"
        placeholder="请选择日期"
      />
    </div>
    <voltageDeviationEchart :chart-data="lineChartData" />
  </div>
</template>

<script>
import TopSelect from './conponents/topSelect'
import voltageDeviationEchart from './conponents/voltageDeviationEchart' // 电压偏差折线

export default {
  components: { TopSelect, voltageDeviationEchart },
  data() {
    return {
      timer: '',
      lineChartData: {
        Ua: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91], // ua
        Ub: [320, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160], // ub
        Uc: [120, 140, 171, 114, 145, 100, 135, 110, 22, 41, 114, 122, 170, 105, 110, 92, 101, 104, 182, 160, 105, 100, 102, 121, 104, 112, 180, 125, 140, 12, 81] // uc
      }
    }
  },
  methods: {
    // 监听头部下拉条件及查询按钮
    topSelevtChange(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.quality-content{
  font-size: 0;
  margin-bottom: 20px;
  label{
    text-align: right;
    font-size: 14px;
    color: #ffffff;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
}

</style>
