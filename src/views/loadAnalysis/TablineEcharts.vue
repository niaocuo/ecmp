<template>
  <!-- tab 折线图 -->
  <div>
    <LineChart :chart-data="lineChartData" />
  </div>
</template>
<script>
import LineChart from './LineChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91], // 昨天数据
    actualData: [120, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160]// 今天数据
  }
}
// 查询折线数据
const getlineChartData = (time, treenodeid) => {
  if (treenodeid >= 0) {
    console.log('查询折线数据')
    console.log(`当前时间：默认今天:${time}`)
    console.log(`树节点ID:${treenodeid}`)
    return lineChartData.newVisitis
  } else {
    return {}
  }
}
export default {
  components: { LineChart },
  props: {
    treeNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formInline: {
        timer: new Date()
      }
    }
  },
  computed: {
    // （tabs切换 || 时间变化）  数据跟着变化
    lineChartData() {
      const time = this.formInline.timer || new Date()
      return getlineChartData(time, this.treeNodeId)
    }

  },
  methods: {
    onSubmit() {

    }

  }
}
</script>
<style lang="scss" scoped>

</style>
