<!--谐波电流-->
<template>
  <div class="content">
    <el-row gutter="20">
      <el-col v-for="(item,index) in infoCardList" :key="index" :span="4">
        <el-card class="info-card">
          <span>{{ item.name }}</span>
          <p>{{ item.value }}</p>
        </el-card>
      </el-col>
    </el-row>
    <!-- 柱状图 -->
    <harmonicColumnarEchart />
  </div>
</template>
<script>
import harmonicColumnarEchart from './harmonicColumnarEchart'
export default {
  components: { harmonicColumnarEchart },
  data() {
    return {
      infoCardList: [
        {
          name: '最大A相电流总畸变率',
          value: '19.8%'
        },
        {
          name: '最大B相电流总畸变率',
          value: '19.8%'
        },
        {
          name: '最大C相电流总畸变率',
          value: '19.8%'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.info-card{
  .el-card__body{
    padding: 10px;
  }
}
</style>
<style lang="scss" scoped>
.content{
  font-size: 14px;
  color: #fff;
  .info-card{
    background: #264861;
    color: #fff;
    border: none;
    text-align: center;
    margin: 20px 0;
    p{
      margin: 0;
      padding:0;
      margin-top: 10px;
      font-size: 24px;
    }
  }
}
</style>
