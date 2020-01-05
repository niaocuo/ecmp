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
        value-format="timestamp"
      />
    </div>
    <voltageDeviationEchart :chart-data="lineChartData" />
  </div>
</template>

<script>
import TopSelect from './conponents/topSelect'
import voltageDeviationEchart from './conponents/voltageDeviationEchart' // 电压偏差折线
import { getFiveMinuteData } from '@/api/rMpDefinInfo'
export default {
  components: { TopSelect, voltageDeviationEchart },
  data() {
    return {
      timer: new Date().getTime(),
      lineChartData: {
        Ua: [], // ua
        Ub: [], // ub
        Uc: [] // uc
      }
    }
  },
  methods: {
    // 监听头部下拉条件及查询按钮
    async topSelevtChange(val) {
      if (val.watthourmeter === '') {
        this.$message({
          message: '请选择需要查询的电表！',
          type: 'warning'
        })
      } else {
        const data = {
          mtId: val.watthourmeter,
          collDate: this.timer,
          mpCodes: ['Ua', 'Ub', 'Uc']
        }
        const result = await getFiveMinuteData(data)
        this.lineChartData.Ua = result.data.Ua
        this.lineChartData.Ub = result.data.Ub
        this.lineChartData.Uc = result.data.Uc
        console.log(result.data)
      }
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
