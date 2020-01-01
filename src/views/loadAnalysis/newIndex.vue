<template>
  <!-- 电量分析 path:coulometricanalysis-->
  <div class="content app-container">
    <div class="item-block-bg mb20">
      <el-form ref="treeform" :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户名称:">
          <el-input v-model="formInline.name" style="width:180px" size="mini" placeholder="客户名称" />
        </el-form-item>
        <div>
          <el-form-item label="数据时间:">
            <el-radio-group v-model="radioDate" size="mini" style="position: relative;top:-1px">
              <el-radio-button label="date">日</el-radio-button>
              <el-radio-button label="month">月</el-radio-button>
              <el-radio-button label="year">年</el-radio-button>
            </el-radio-group>
            <el-date-picker v-model="formInline.Timer" :type="radioDate" size="mini" />
          </el-form-item>
          <el-form-item label-width="0px">
            <el-button type="primary" size="mini" @click="onSubmit('treeform')">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="item-block-bg">
            <TablineEcharts :date-type="radioDate" />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="item-block-bg right-item mb20">
            <span class="item-tit">最大负荷</span>
            <p>564123Kwh</p>
            <div style="font-size:14px">
              <span>2018-12-23</span>
            </div>
          </div>
          <div class="item-block-bg right-item mb20">
            <span class="item-tit">最小负荷</span>
            <p>564123Kwh</p>
            <div style="font-size:14px">
              <span>2019-12-23</span>
            </div>
          </div>
          <div class="item-block-bg right-item mb20">
            <span class="item-tit">平均负荷</span>
            <p style="line-height:40px">564123Kwh</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import TablineEcharts from './TablineEcharts'
export default {
  components: { TablineEcharts },
  data() {
    return {
      radioDate: 'date',
      echartsvalue: {
        peak: [79, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 200, 334, 390, 9, 52, 200, 334, 390], // 峰
        valley: [9, 52, 200, 334, 390, 9, 52, 200, 33], // 谷
        flat: [200, 334, 390, 9, 52, 200, 334, 3], // 平
        yearOnYear: [2, 20, 34, 30, 9, 2, 0, 34, 30, 9, 12, 20, 34]// 同比
      }, // 电量数据
      axisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 28, 30], // X轴坐标
      formInline: {
        name: '', // 客户名称
        Watthour: '', // 电表
        Timer: new Date() // 选择时间
      }
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
