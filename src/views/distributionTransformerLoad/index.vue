<template>
  <!-- 配变负载率 -->
  <div class="app-container backtext">
    <el-form ref="treeform" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="站点名称">
        <el-select v-model="formInline.statename" size="mini" placeholder="请选择">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="配电房">
        <el-select v-model="formInline.distributionRoom" size="mini" placeholder="请选择">
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
        <el-button type="primary" size="mini" @click="onSubmit('treeform')">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="echartBox">
      <div class="echartBoxTopInfo">
        <label>选择时间</label>
        <el-date-picker
          v-model="value3"
          size="mini"
          class="dataMonth"
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
export default {
  components: { LineChart },
  data() {
    return {
      formInline: {
        statename: '', // 站点
        distributionRoom: '', // 配电房
        transformer: '' // 变压器
      },
      value3: '',
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91, 154, 162, 140, 145, 120, 82, 91] // 负载率数据
      },
      transformerOptions: [ // 变压器下拉
        {
          value: '选项1',
          label: '站点1'
        }, {
          value: '选项2',
          label: '站点2'
        }, {
          value: '选项3',
          label: '站点3'
        }
      ],
      distributionRoomOptions: [ // 配电房下拉
        {
          value: '选项1',
          label: '站点1'
        }, {
          value: '选项2',
          label: '站点2'
        }, {
          value: '选项3',
          label: '站点3'
        }
      ],
      stateOptions: [ // 站点下拉
        {
          value: '选项1',
          label: '站点1'
        }, {
          value: '选项2',
          label: '站点2'
        }, {
          value: '选项3',
          label: '站点3'
        }
      ]
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
