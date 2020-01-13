<template>
  <!--电量电费  path:electricityTariff-->
  <div class="content app-container">
    <div class="item-block-bg mb20">
      <el-form ref="treeform" :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户名称:">
          <el-input v-model="formInline.name" style="width:180px" size="mini" placeholder="客户名称" />
        </el-form-item>
        <el-form-item label="计费电表:">
          <el-select v-model="formInline.Watthour" size="mini" placeholder="计费电表">
            <el-option value="1" />
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="数据时间:">
            <el-radio-group v-model="radioDate" size="mini" style="position: relative;top:-1px">
              <el-radio-button label="date">今年</el-radio-button>
              <el-radio-button label="month">去年</el-radio-button>
            </el-radio-group>
            <el-date-picker
              v-model="formInline.Timer"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              type="monthrange"
              size="mini"
            />
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button type="primary" size="mini" @click="onSubmit('treeform')">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div>
      <el-row :gutter="20" class="mb20">
        <el-col style="width:20%">
          <div class="item-block-bg top-item">
            总电量
            <p>15616kWh</p>
          </div>
        </el-col>
        <el-col style="width:20%">
          <div class="item-block-bg top-item">
            总电费
            <p>64651元</p>
          </div>
        </el-col>
        <el-col style="width:20%">
          <div class="item-block-bg top-item">
            基本电费
            <p>64651元</p>
          </div>
        </el-col>
        <el-col style="width:20%">
          <div class="item-block-bg top-item">
            电度电费
            <p>64651元</p>
          </div>
        </el-col>
        <el-col style="width:20%">
          <div class="item-block-bg top-item">
            力度电费
            <p>64651元</p>
          </div>
        </el-col>
      </el-row>
      <div class="item-block-bg">
        <el-radio-group v-model="echartbutton" class="mb20" size="mini">
          <el-radio-button label="date">总量费</el-radio-button>
          <el-radio-button label="month">基本电费</el-radio-button>
          <el-radio-button label="date1">电度电费</el-radio-button>
          <el-radio-button label="month1">力度电费</el-radio-button>
        </el-radio-group>
        <BarChart :axis-data="axisData" :echarts-value="echartsvalue" />
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from './components/BarChart'
export default {
  components: { BarChart },
  data() {
    return {
      radioDate: 'date',
      echartbutton: 'date',
      echartsvalue: {
        yearOnYear: [79, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 0], // 电费曲线
        electricity: [9, 52, 200, 334, 390, 9, 52, 200, 33, 334, 390, 9] // 电量柱形
      }, // 电量数据
      axisData: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12'], // X轴坐标
      formInline: {
        name: '', // 客户名称
        Watthour: '', // 电表
        Timer: [] // 选择时间
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  color: #fff;
  .right-item{
    p{
      text-align: center;
      font-size: 20px;
    }
    div{
      padding: 0 5px;
      display: flex;
      justify-content: space-between;
    }
  }
  .top-item{
    &>p{
      text-align: center
    }
  }
}
</style>
