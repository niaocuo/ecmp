<template>
  <div style="margin-bottom:20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.loginName" size="mini" placeholder="用途" />
      </el-form-item>
      <el-form-item label="行业">
        <el-select v-model="formInline.userId" filterable clearable size="mini" placeholder="请选择">
          <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="地区">
        <el-input v-model="formInline.loginName" size="mini" placeholder="地区" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border size="mini">
      <el-table-column label="序号" width="100" type="index" align="center" />
      <el-table-column label="地区" prop="name" align="center" />
      <el-table-column label="用户名" prop="type" align="center" />
      <el-table-column label="行业" prop="industry" align="center" />
      <el-table-column label="类型" prop="capacity" align="center" />
      <el-table-column label="容量" prop="capacity" align="center" />
      <el-table-column label="联系人" prop="contacts" align="center" />
      <el-table-column label="电话" prop="telephone" align="center" />
      <el-table-column label="坐标" prop="telephone" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 下拉表
      option: '',
      // 查询条件表单
      formInline: {
        userId: '',
        loginName: '',
        createTime: ''
      },
      tableData: [
        { id: '1', name: '测试用户名称', industry: '纺织制造行业', type: '测试类型', capacity: '15613Kwh', contacts: '来呢西人', telephone: '18324938847' },
        { id: '1', name: '测试用户名称', industry: '纺织制造行业', type: '测试类型', capacity: '15613Kwh', contacts: '来呢西人', telephone: '18324938847' },
        { id: '1', name: '测试用户名称', industry: '纺织制造行业', type: '测试类型', capacity: '15613Kwh', contacts: '来呢西人', telephone: '18324938847' },
        { id: '1', name: '测试用户名称', industry: '纺织制造行业', type: '测试类型', capacity: '15613Kwh', contacts: '来呢西人', telephone: '18324938847' },
        { id: '1', name: '测试用户名称', industry: '纺织制造行业', type: '测试类型', capacity: '15613Kwh', contacts: '来呢西人', telephone: '18324938847' }

      ]
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style>

</style>
