<template>
  <div class="content app-container">
    <div class="item-block-bg mb20">
      <el-form ref="treeform" :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户名称:">
          <el-select v-model="formInline.subdistrictId" size="mini" placeholder="请选择" @change="onSubmit">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="数据时间:">
          <el-date-picker
            v-model="formInline.capacityDate"
            type="date"
            placeholder="选择日期"
            size="mini"
            value-format="timestamp"
            :picker-options="pickerOptions"
          />
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="item-block-bg">
            <LineChart :chart-data="lineChartData" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="item-block-bg right-item mb20">
            <span class="item-tit">最大负荷</span>
            <p>{{ maxData }}Kwh</p>
            <div style="font-size:14px">
              <span>{{ time }}</span>
            </div>
          </div>
          <div class="item-block-bg right-item mb20">
            <span class="item-tit">最小负荷</span>
            <p>{{ minData }}Kwh</p>
            <div style="font-size:14px">
              <span>{{ time }}</span>
            </div>
          </div>
          <div class="item-block-bg right-item mb20">
            <span class="item-tit">平均负荷</span>
            <p style="line-height:40px">{{ avgData }}Kwh</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import LineChart from './LineChart'
import { getRsubdistrictLaber } from '@/api/common'
import { getCapacityDay } from '@/api/capacityDay'
import dayjs from 'dayjs'
export default {
  components: { LineChart },
  data() {
    return {
      stateOptions: [], // 站点下拉
      maxData: '',
      minData: '',
      avgData: '',
      formInline: {
        subdistrictId: '', // 客户名称
        capacityDate: new Date().getTime() // 选择时间
      },
      lineChartData: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6// 如果没有后面的-8.64e6就是不可以选择今天的
        }
      }
    }
  },
  computed: {
    // （tabs切换 || 时间变化）  数据跟着变化
    time() {
      return dayjs(this.formInline.capacityDate).format('YYYY-MM-DD')
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async onSubmit() {
      const result = await getCapacityDay(this.formInline)
      this.lineChartData = result.data
      this.maxData = result.data.attributeData.maxData
      this.minData = result.data.attributeData.minData
      this.avgData = result.data.attributeData.avgData
    },
    async init() {
      const result = await getRsubdistrictLaber()
      this.stateOptions = result.data
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  color: #fff;
  .right-item{
  min-height: 127px;
    p{
      text-align: center;
      font-size: 20px;
    }
    div{
      text-align: center;
    }
  }
}
</style>
