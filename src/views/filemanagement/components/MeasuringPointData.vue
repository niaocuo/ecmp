<template>
  <div>
    <h2>测点数据</h2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="测点名称">
        <el-input v-model="formInline.name" size="small" placeholder="测点名称" />
      </el-form-item>
      <el-form-item label="测点类型">
        <el-select v-model="formInline.region" size="small" placeholder="测点类型">
          <el-option label="类型一" value="shanghai" />
          <el-option label="类型二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      :height="tableHeight"
      :header-cell-style="headerStyle"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
      />
      <el-table-column
        prop="name"
        label="测点名称"
        width="180"
      />
      <el-table-column
        prop="code"
        label="测点编码"
      />
      <el-table-column
        prop="address"
        label="测点地址"
      />
      <el-table-column
        prop="address"
        label="数据时间"
      />
      <el-table-column
        prop="address"
        label="当前数值"
      />
      <el-table-column
        prop="date"
        label="系数"
        width="180"
      />
      <el-table-column
        prop="address"
        label="测点类型"
      />
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        name: '',
        region: ''
      },
      tableData: []
    }
  },
  computed: {
    tableHeight() {
      const clientHeight = document.body.clientHeight
      const tableh = clientHeight - 470
      return tableh + 'px'
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    headerStyle() {
      return {
        color: '#000',
        textAlign: 'center'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
