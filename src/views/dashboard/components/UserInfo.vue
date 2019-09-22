<template>
  <div class="content-item">
    <el-row :gutter="15">
      <el-col :span="8">
        <div class="item">
          <p>用户数量</p>
          <p>32户</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <p>配电数量</p>
          <p>32户</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <p>安全运行</p>
          <p>100天</p>
        </div>
      </el-col>
      <el-col :span="24">
        <bar-chart :axis-data="xAxisData" height="200px" bar-number="tow" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BarChart from './BarChart'
export default {
  components: { BarChart },
  data() {
    return {
      xAxisData: ['网点', '仪表', '测点']
    }
  }
}
</script>
<style lang="scss" scoped>
    .content-item{
        padding: 8px 16px;
        .item{
            text-align: center;
            height: 82px;
            // background-image: linear-gradient(90deg,
            //     rgba(100, 18, 250, 0.58) 0%,
            //     rgba(24, 152, 216, 0.58) 100%),
            // linear-gradient(
            //     #000000,
            //     #000000);
            // padding-top: 10px;
                p{
                    font-size: 22px;
                    margin: 0;
                    text-align: center;
                    line-height: 30px;
                    &:first-child {
                       font-size: 18px;
                    }
                }
        }
    }
</style>
