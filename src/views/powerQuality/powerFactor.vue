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
    <powerFactorEchart :chart-data="lineChartData" />
  </div>
</template>

<script>
import TopSelect from './conponents/topSelect'
import powerFactorEchart from './conponents/powerFactorEchart' // 功率因数折线

export default {
  components: { TopSelect, powerFactorEchart },
  data() {
    return {
      timer: '',
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91], // 昨天数据
        actualData: [320, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160]// 今天数据
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
