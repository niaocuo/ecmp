<template>
  <!-- 配变负载率 -->
  <div class="app-container backtext">
    <el-form ref="treeform" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="站点名称">
        <el-select v-model="formInline.statename" size="mini" placeholder="请选择" @change="changeRsubdistrict">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="配电房">
        <el-select v-model="formInline.distributionRoom" size="mini" placeholder="请选择" @change="changeRstation">
          <el-option
            v-for="item in distributionRoomOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="变压器">
        <el-select v-model="formInline.transformer" size="mini" placeholder="请选择">
          <el-option
            v-for="item in transformerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="echartBox">
      <div class="echartBoxTopInfo">
        <label>选择时间</label>
        <el-date-picker
          v-model="formInline.timer"
          size="mini"
          class="dataMonth"
          value-format="timestamp"
          placeholder="请选择日期"
        />
        <label class="info-label">变压器容量:</label>
        <span>123</span>
        <label class="info-label">平均负载率:</label>
        <span>123</span>
        <label class="info-label">最大负载率:</label>
        <span>123</span>
      </div>

      <LineChart :chart-data="lineChartData" />
    </div>
  </div>
</template>
<script>
import LineChart from './components/LineChart'
import { getRsubdistrictLaber, getRstationLaber, getRtransformerLaber } from '@/api/common'
import { getTranLoadrateDay } from '@/api/rMpDefinInfo'
export default {
  components: { LineChart },
  data() {
    return {
      formInline: {
        statename: '', // 站点
        distributionRoom: '', // 配电房
        transformer: '', // 变压器
        timer: new Date().getTime()
      },
      value3: '',
      lineChartData: {
        expectedData: [] // 负载率数据
      },
      transformerOptions: [], // 变压器下拉
      distributionRoomOptions: [], // 配电房下拉
      stateOptions: [] // 站点下拉
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const result = await getRsubdistrictLaber()
      this.stateOptions = result.data
      // const res = await getRstationLaber()
      // this.distributionRoomOptions = res.data
      // const data = await getRtransformerLaber()
      // this.transformerOptions = data.data
    },
    async changeRsubdistrict(val) {
      const result = await getRstationLaber(val)
      this.formInline.distributionRoom = ''
      this.formInline.transformer = ''
      this.transformerOptions = []
      this.distributionRoomOptions = result.data
    },
    async changeRstation(val) {
      const result = await getRtransformerLaber(val)
      this.formInline.transformer = ''
      this.transformerOptions = result.data
    },
    async onSubmit() {
      if (this.formInline.transformer === '') {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        })
      } else {
        const temp = {
          trId: this.formInline.transformer,
          collDate: this.formInline.timer
        }
        const result = await getTranLoadrateDay(temp)
        this.lineChartData.expectedData = result.data
      }
    }
  }
}
</script>
<style lang="scss">
// html{
//   background-color: #163548;
// }
// .el-breadcrumb__inner a{
//   color: #ffffff
// }
// .backtext{
//   .el-form-item__label{
//     color: #ffffff
//   }
//   .el-input__inner{
//     background: transparent;
//     color: #ffffff;
//     border-color: aqua
//   }
//   .el-select .el-input .el-select__caret{
//     color: #ffffff
//   }
// }

</style>
<style lang="scss" scoped>
  .app-container{
    background: #163548;
    min-height: calc(100vh - 50px - 20px - 61px);
  }
  .echartBox{
    .echartBoxTopInfo{
      font-size: 0;
      margin-bottom: 30px;
      span{
        font-size: 14px;
        color: #fff;
      }
      label{
        text-align: right;
        font-size: 14px;
        color: #ffffff;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
      }
      .info-label{
        margin-left: 20px;
        color: gray;
         padding: 0 2px 0 0;
      }
    }

  }

</style>
