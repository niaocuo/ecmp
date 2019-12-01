<template>
  <!-- 设备档案 -->
  <div>
    <h2>设备档案</h2>
    <el-row>
      <el-col :span="8">
        <span>设备名称:</span>
      </el-col>
      <el-col :span="8">
        <span>变压器类型:</span>
      </el-col>
      <el-col :span="8">
        <span>设备编号:</span>
      </el-col>
      <el-col :span="8">
        <span>设备型号:</span>
      </el-col>
      <el-col :span="8">
        <span>变压器容量:</span>
      </el-col>
      <el-col :span="8">
        <span>运行状态:</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '变压器容量'
    },
    equipment: {
      type: Object,
      default: function() {
        return {
          category: '',
          name: '',
          serialNumber: '',
          type: '',
          vendor: '',
          capacity: '',
          gatewayIp: '',
          number: ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
span{
  margin: 12px 0;
  display: block;
  font-size: 14px
}
</style>
