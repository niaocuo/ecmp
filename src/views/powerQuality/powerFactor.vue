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
        value-format="timestamp"
      />
    </div>
    <powerFactorEchart :chart-data="lineChartData" />
  </div>
</template>

<script>
import TopSelect from './conponents/topSelect'
import powerFactorEchart from './conponents/powerFactorEchart' // 功率因数折线
import { getFiveMinuteData } from '@/api/rMpDefinInfo'
export default {
  components: { TopSelect, powerFactorEchart },
  data() {
    return {
      timer: new Date().getTime(),
      lineChartData: {
        expectedData: [],
        actualData: []
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
          mpCodes: ['COSθ', 'Q']
        }
        const result = await getFiveMinuteData(data)
        this.lineChartData.expectedData = result.data.COSθ
        this.lineChartData.actualData = result.data.Q
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
