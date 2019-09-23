<template>
  <div class="dashboard-editor-container">
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <el-row :gutter="20">
      <el-col :span="16" class="box-item">
        <div class="dataMonth">
          <el-date-picker
            v-model="value2"
            type="month"
            size="mini"
            placeholder="请选择月份"
          />
        </div>
        <dowble-bar-chart :chart-data="lineChartData" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <user-info />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16" class="box-item">
        <div class="dataMonth">
          <el-date-picker
            v-model="value3"
            size="mini"
            placeholder="请选择日期"
          />
        </div>
        <line-chart :chart-data="lineChartData" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :span="16" class="box-item">
        <table-sechar style="padding-left:10px" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <RunnableBlock />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TableSechar from './components/TableSechar'
import DowbleBarChart from './components/DowbleBarChart'
import LineChart from './components/LineChart'
import UserInfo from './components/UserInfo'
import RunnableBlock from './components/RunnableBlock'
import BarChart from './components/BarChart'

const lineChartData = {
  expectedData: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91], // 昨天数据
  actualData: [120, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160]// 今天数据
}

export default {
  name: 'DashboardAdmin',
  components: {
    TableSechar,
    DowbleBarChart,
    UserInfo,
    LineChart,
    BarChart,
    RunnableBlock
  },
  data() {
    return {
      value2: '',
      value3: '',
      lineChartData: lineChartData
    }
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px 0;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    position: relative;
    margin-bottom: 5px;
  }
}
.dataMonth{
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 9;
}
.box-item{
  background:#fff;
  padding:16px 16px 0;
  margin-bottom:10px;
  position: relative;
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
