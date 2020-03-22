<template>
  <div class="app-container">
    <div class="bg-item">
      <h3>查询条件</h3>
      <el-form ref="treeform" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户编号">
          <el-input v-model="formInline.name" size="mini" style="width:150px" placeholder="资产编号" />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="formInline.position" size="mini" style="width:150px" placeholder="安装位置" />
        </el-form-item>
        <el-form-item label="所属地区">
          <el-input v-model="formInline.position" size="mini" style="width:150px" placeholder="安装位置" />
        </el-form-item>
        <el-form-item label="所属行业">
          <el-input v-model="formInline.position" size="mini" style="width:150px" placeholder="安装位置" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit('treeform')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bg-item">
      <h3>客户信息列表</h3>
      <div class="operation_button">
        <el-button type="primary" size="mini" @click="onSubmit('treeform')">新增</el-button>
        <el-button type="primary" size="mini" @click="onSubmit('treeform')">修改</el-button>
        <el-button type="primary" size="mini" @click="onSubmit('treeform')">删除</el-button>
      </div>
      <el-table
        v-loading="terminalTableListLoading"
        :data="terminalTableList"
        element-loading-text="Loading"
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="序号" type="index" width="50" />
        <el-table-column prop="rsubdistrict.consNo" align="center" label="资产编号" width="150" />
        <el-table-column prop="rsubdistrict.consNo" align="center" label="终端名称" />
        <el-table-column prop="rsubdistrict.consNo" align="center" label="安装位置" />
        <el-table-column prop="rsubdistrict.consNo" align="center" label="终端类型" />
        <el-table-column prop="rsubdistrict.consNo" align="center" label="所属网关" width="95" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      terminalTableListLoading: false,
      formInline: {
        name: '',
        position: ''
      },
      terminalTableList: [
        {
          consNo: 132233 // 资产编号
        },
        {
          consNo: 132233 // 资产编号
        },
        {
          consNo: 132233 // 资产编号
        },
        {
          consNo: 132233 // 资产编号
        }
      ]
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style lang="scss" scoped>
.bg-item{
  color: #fff;
  &:not(:last-child){
    margin-bottom: 10px;
  }
  h3{
    font-size: 16px;
  }
  .operation_button{
      float: right;
      margin-top: 10px;
      margin-bottom: 20px;
    }
}
</style>
