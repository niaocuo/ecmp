<template>
  <!-- tab 折线图 -->
  <div>
    <el-form ref="formInline" :model="formInline" class="demo-form-inline">
      <el-form-item label="选择参数">
        <el-checkbox-group v-model="formInline.checkList">
          <el-checkbox label="P">有功功率</el-checkbox>
          <el-checkbox label="Q">无功功率</el-checkbox>
          <el-checkbox label="S">视在功率</el-checkbox>
          <el-checkbox label="COSθ">功率因数</el-checkbox>
          <el-checkbox label="MD">最大需量</el-checkbox>
          <el-checkbox label="['Ua','Ub','Uc']">相电压</el-checkbox>
          <el-checkbox label="['Uab','Ubc','Uac']">线电压</el-checkbox>
          <el-checkbox label="['Ia','Ib','Ic']">电流</el-checkbox>
          <el-checkbox label="['YWa','YWb','YWc']">油温</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数据时间">
        <el-date-picker v-model="formInline.timer" value-format="timestamp" size="mini" placeholder="发生时间" style="width: 150px;" />
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item> -->
    </el-form>
    <el-tabs v-model="tabActiveName">
      <el-tab-pane v-for="item in tabsOption" :key="item.name" :label="item.label" :name="item.name" />
    </el-tabs>
    <LineChart :chart-data="lineChartData" :unit="unit" />
  </div>
</template>
<script>
import LineChart from './LineChart'
import { getFiveMinuteData } from '@/api/rMpDefinInfo'
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
        timer: new Date().getTime(),
        checkList: [] // 参数
      },
      lineChartData: {},
      tabActiveName: '', // 折线图切换默认选中
      pathName: this.$route.name,
      unit: 'kW'
    }
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
        const time = this.formInline.timer || new Date().getTime()
        this.getlineChartData(val, time, this.mtId)
      }
    },
    mtId: {
      deep: true,
      handler(val) {
        const time = this.formInline.timer || new Date().getTime()
        this.getlineChartData(this.tabActiveName, time, val)
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
      const time = this.formInline.timer || new Date().getTime()
      return this.getlineChartData(this.tabActiveName, time, this.mtId)
    },
    // 查询折线数据
    async getlineChartData(activeName, time, mtId) {
      const data = {
        mtId: mtId,
        collDate: time
      }
      let keyNames = []
      switch (activeName) {
        case '1':
          data.mpCodes = ['YWa', 'YWb', 'YWc']
          keyNames = ['配变油温A相', '配变油温B相', '配变油温C相']
          this.unit = '℃'
          break
        case '2':
          data.mpCodes = ['COSθ']
          keyNames = ['功率因数']
          this.unit = ''
          break
        case '3':
          data.mpCodes = ['P', 'Q', 'S']
          keyNames = ['有功功率', '无功功率', '视在功率']
          this.unit = 'kW'
          break
        case '4':
          data.mpCodes = ['Ua', 'Ub', 'Uc']
          keyNames = ['A相电压', 'B相电压', 'C相电压']
          this.unit = 'V'
          break
        case '5':
          data.mpCodes = ['Uab', 'Ubc', 'Uca']
          keyNames = ['A相线电压', 'B相线电压', 'C相线电压']
          this.unit = 'V'
          break
        case '6':
          data.mpCodes = ['f']
          keyNames = ['频率']
          this.unit = 'Hz'
          break
        case '7':
          data.mpCodes = ['Ia', 'Ib', 'Ic']
          keyNames = ['A相电流', 'B相电流', 'C相电流']
          this.unit = 'A'
          break
        case '8':
          data.mpCodes = ['P', 'Q', 'S']
          keyNames = ['有功功率', '无功功率', '视在功率']
          this.unit = 'kW'
          break
        case '9':
          data.mpCodes = ['COSθ']
          keyNames = ['功率因数']
          this.unit = ''
          break
      }
      const result = await getFiveMinuteData(data)
      const lineChartData = {
        keyNames: keyNames,
        data: result.data
      }
      this.lineChartData = lineChartData
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
