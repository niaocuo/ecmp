<template>
  <!-- 设备档案 -->
  <div>
    <h2>设备档案</h2>
    <el-row>
      <el-col :span="8">
        <span>设备类别:{{ equipment.category }}</span>
      </el-col>
      <el-col :span="8">
        <span>设备名称:{{ equipment.name }}</span>
      </el-col>
      <el-col :span="8">
        <span>设备编号:{{ equipment.serialNumber }}</span>
      </el-col>
      <el-col :span="8">
        <span>设备类型:{{ equipment.type }}</span>
      </el-col>
      <el-col :span="8">
        <span>厂家名称:{{ equipment.vendor }}</span>
      </el-col>
      <el-col :span="8">
        <span>{{ title }}:{{ equipment.capacity }}</span>
      </el-col>
      <el-col :span="8">
        <span>网关IP:{{ equipment.gatewayIp }}</span>
      </el-col>
      <el-col :span="8">
        <span>终端资产编号:{{ equipment.number }}</span>
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
