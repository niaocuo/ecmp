<!--谐波电流-->
<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col v-for="(item,index) in infoCardList" :key="index" :span="4">
        <el-card class="info-card">
          <span>{{ item.name }}</span>
          <p>{{ item.value }}</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 柱状图 -->
    <label>选择时间</label>
    <el-date-picker
      v-model="barTimer"
      size="mini"
      type="month"
      class="dataMonth"
      placeholder="请选择日期"
    />
    <harmonicColumnarEchart :bar-data="barcharData" />
    <!-- 折线图 -->
    <label>选择时间</label>
    <el-date-picker
      v-model="lineTimer"
      size="mini"
      class="dataMonth"
      placeholder="请选择日期"
    />
    <harmonicColumnarLineEchart :chart-data="lineChartData" />
  </div>
</template>
<script>
import harmonicColumnarEchart from './harmonicColumnarEchart'
import harmonicColumnarLineEchart from './harmonicColumnarLineEchart'

export default {
  components: { harmonicColumnarEchart, harmonicColumnarLineEchart },
  props: {
    selectData: {
      type: Object,
      default() {
        return {
          statename: '', // 站点名称
          distributionRoom: '', // 配电房
          watthourmeter: '' // 电表
        }
      }
    }
  },
  data() {
    return {
      lineChartData: {
        THDUa: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91], // ua
        THDUb: [320, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160], // ub
        THDUc: [120, 140, 171, 114, 145, 100, 135, 110, 22, 41, 114, 122, 170, 105, 110, 92, 101, 104, 182, 160, 105, 100, 102, 121, 104, 112, 180, 125, 140, 12, 81] // uc
      },
      barcharData: {
        Arate: [79, 52, 200, 334, 390, 10, 12, 13, 14],
        Brate: [80, 52, 200, 334, 390, 100, 123, 140, 155],
        Crate: [79, 52, 200, 334, 390, 52, 200, 334, 52, 200, 334]
      },
      barTimer: '',
      lineTimer: '',
      infoCardList: [
        {
          name: '最大A相电流总畸变率',
          value: '19.8%'
        },
        {
          name: '最大B相电流总畸变率',
          value: '19.8%'
        },
        {
          name: '最大C相电流总畸变率',
          value: '19.8%'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.info-card{
  .el-card__body{
    padding: 10px;
  }
}
</style>
<style lang="scss" scoped>
.content{
  font-size: 14px;
  color: #fff;
  .info-card{
    background: #264861;
    color: #fff;
    border: none;
    text-align: center;
    margin: 20px 0;
    p{
      margin: 0;
      padding:0;
      margin-top: 10px;
      font-size: 24px;
    }
  }
}
</style>
