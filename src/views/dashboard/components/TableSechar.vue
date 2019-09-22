<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用途">
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
    <el-table>
      <el-table-column label="序号" />
      <el-table-column label="名称" />
      <el-table-column label="行业" />
      <el-table-column label="类型" />
      <el-table-column label="类型" />
      <el-table-column label="联系人" />
      <el-table-column label="电话" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: '',
      // 查询条件表单
      formInline: {
        userId: '',
        loginName: '',
        createTime: ''
      }
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
