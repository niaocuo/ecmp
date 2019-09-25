<template>
  <div class="dashboard-editor-container">

    <panel-group />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-radio-group v-model="radio" class="line-radio-group" size="mini" @change="handleSetLineChartData(radio)">
        <el-radio-button label="messages">负荷 </el-radio-button>
        <el-radio-button label="newVisitis">电量 </el-radio-button>
      </el-radio-group>
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;">
      <table-sechar style="padding-left:10px" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TableSechar from './components/TableSechar'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91], // 昨天数据
    actualData: [120, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160]// 今天数据
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 82],
    actualData: [180, 160, 151, 106, 145, 150, 130, 20, 144, 160, 130, 140, 82, 91, 154, 162, 140, 145, 134, 105, 20, 144, 160, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TableSechar
    // TransactionTable,
    // TodoList
    // BoxCard
  },
  data() {
    return {
      value2: '',
      radio: 'newVisitis',
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
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
    margin-bottom: 32px;
  }
}
.dataMonth{
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 9;
}
.line-radio-group{
  position: absolute;
  right: 40px;
  top: 10px;
  z-index: 9;
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
