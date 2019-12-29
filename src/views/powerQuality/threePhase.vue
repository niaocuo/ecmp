<template>
  <!-- 电能质量-功率因数 path:powerFactor-->
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
    <threePhaseEchart :chart-data="lineChartData" />
  </div>
</template>

<script>
import TopSelect from './conponents/topSelect'
import threePhaseEchart from './conponents/threePhaseEchart' // 功率因数折线

export default {
  components: { TopSelect, threePhaseEchart },
  data() {
    return {
      timer: '',
      lineChartData: {
        Aelectric: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91], // A相电流
        Belectric: [320, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160], // B相电流
        Celectric: [120, 140, 171, 114, 145, 100, 135, 110, 22, 41, 114, 122, 170, 105, 110, 92, 101, 104, 182, 160, 105, 100, 102, 121, 104, 112, 180, 125, 140, 12, 81], // c相电流
        ImbalanceRate: [0, 2, 1, 4, 2, 0, 5, 4, 5, 0, 5, 0, 2, 1, 4, 5, 0, 5, 0, 2, 1, 4, 5, 0, 5, 0, 2, 1, 4, 5, 0]// 不平衡率
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
