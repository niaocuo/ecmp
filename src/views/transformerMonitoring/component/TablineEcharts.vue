<template>
  <!-- tab 折线图 -->
  <div>
    <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="数据时间">
        <el-date-picker v-model="formInline.timer" value-format="timestamp" size="mini" placeholder="发生时间" style="width: 150px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="tabActiveName">
      <el-tab-pane v-for="item in tabsOption" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <LineChart :chart-data="lineChartData" />
  </div>
</template>
<script>
import LineChart from './LineChart'
import { getFiveMinuteData } from '@/api/rMpDefinInfo'
// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91], // 昨天数据
//     actualData: [120, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160, 165, 120, 82, 91, 134, 105, 160]// 今天数据
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140, 82, 91, 154, 162, 140, 145, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 82],
//     actualData: [180, 160, 151, 106, 145, 150, 130, 20, 144, 160, 130, 140, 82, 91, 154, 162, 140, 145, 134, 105, 20, 144, 160, 130]
//   }
// }

export default {
  components: { LineChart },
  props: {
    tabsOption: {
      type: Array,
      default: () => {
        const defaultOPtion = [
          {
            label: '油温',
            name: '1'
          },
          {
            label: '功率因数',
            name: '2'
          },
          {
            label: '功率',
            name: '3'
          }
        ]
        return defaultOPtion
      }
    },
    mtId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formInline: {
        timer: new Date().getTime()
      },
      lineChartData: {},
      tabActiveName: '', // 折线图切换默认选中
      pathName: this.$route.name
    }
  },
  computed: {
    // （tabs切换 || 时间变化）  数据跟着变化
    // lineChartData() {
    //   const time = this.formInline.timer || new Date().getTime()
    //   // this.getlineChartData(this.tabActiveName, time, this.mtId)
    //   // return this.lineData
    // }

  },
  watch: {
    formInline: {
      deep: true,
      handler(val) {
        const time = val.timer || new Date().getTime()
        this.getlineChartData(this.tabActiveName, time, this.mtId)
      }
    },
    tabActiveName: {
      deep: true,
      handler(val) {
        this.getlineChartData(val, this.formInline.time, this.mtId)
      }
    },
    mtId: {
      deep: true,
      handler(val) {
        this.getlineChartData(this.tabActiveName, this.formInline.time, val)
      }
    }
  },
  beforeMount() {
    switch (this.pathName) {
      case 'transformerMonitoring': // 配变监测
        this.tabActiveName = '1'
        break
      case 'linemonitoring': // 线路监测
        this.tabActiveName = '4'
        break
      case 'switchMonitoring': // 开关监测
        this.tabActiveName = '7'
        break
    }
  },
  methods: {
    onSubmit() {
      console.log(this.lineChartData)
      // const time = this.formInline.timer || new Date().getTime()
      // return this.getlineChartData(this.tabActiveName, time, this.mtId)
    },

    // 查询折线数据
    async getlineChartData(activeName, time, mtId) {
      console.log('查询折线数据')
      console.log(`当前tab name:${activeName}`)
      console.log(`当前时间：默认今天:${time}`)
      console.log(`mtId:${mtId}`)
      const data = {
        mtId: mtId,
        collDate: time
      }
      // if (activeName === '1') {
      data.mpCodes = ['YWa', 'YWb', 'YWc']
      // }
      const result = await getFiveMinuteData(data)
      const newVisitis = {
        expectedData: result.data.YWa
      }
      this.lineChartData = newVisitis
      console.log(result.data)
      // this.lineData = newVisitis
      // return newVisitis
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
